"""Adversarial real-file fixtures for archive content, integrity and extraction safety."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile
import pytest
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts'))
from package_browser import collect, build
from verify_package import validate_members, verify

@pytest.fixture
def source(tmp_path):
    for name,data in {'package.json':'{"version":"1.0.0"}', 'dist/index.html':'<script src="./assets/app.js"></script>', 'dist/assets/app.js':"console.log('fixture')", 'dist/assets/file-worker-Ab12.js':'worker fixture', 'LICENSE':'MIT fixture', 'THIRD-PARTY-NOTICES.txt':'Third-party fixture', 'docs/INSTALL.md':'Serve statically.', 'docs/CONTROLS.md':'Arrow keys.', 'docs/FILE-FORMAT.md':'Portable formats.', 'dist/schemas/game-save.schema.json':'{"type":"object"}', 'dist/assets/sql-wasm-browser-Ab12.wasm':'wasm fixture'}.items():
        p=tmp_path/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(data)
    return tmp_path

def test_collect_is_exact_allowlisted_content(source):
    assert set(collect(source))=={'index.html','assets/app.js','assets/file-worker-Ab12.js','LICENSE','THIRD-PARTY-NOTICES.txt','docs/INSTALL.md','docs/CONTROLS.md','docs/FILE-FORMAT.md','schemas/game-save.schema.json','assets/sql-wasm-browser-Ab12.wasm'}

def test_secret_and_symlink_inputs_are_rejected(source):
    p=source/'dist/assets/gh.tkn';p.write_text('synthetic-secret')
    with pytest.raises(ValueError):collect(source)
    p.unlink();p.symlink_to(source/'LICENSE')
    with pytest.raises(ValueError):collect(source)

@pytest.mark.parametrize('name',['../escape.js','/absolute.js','assets\\escape.js','gh.tkn','node_modules/app.js'])
def test_unsafe_members_are_rejected(name):
    with pytest.raises(ValueError):validate_members([zipfile.ZipInfo(name)])

def test_duplicate_and_link_members_are_rejected():
    with pytest.raises(ValueError):validate_members([zipfile.ZipInfo('index.html'),zipfile.ZipInfo('index.html')])
    z=zipfile.ZipInfo('assets/link.js');z.external_attr=0o120777<<16
    with pytest.raises(ValueError):validate_members([z])

def test_real_archive_manifest_digest_and_reproducibility(source):
    a=build(source,source/'one.zip');b=build(source,source/'two.zip')
    assert a.read_bytes()==b.read_bytes()
    manifest=verify(a);assert manifest['version']=='1.0.0'
    assert manifest['files']['assets/app.js']==hashlib.sha256(b"console.log('fixture')").hexdigest()
    assert a.with_suffix('.zip.sha256').read_text().startswith(hashlib.sha256(a.read_bytes()).hexdigest())

def test_missing_reference_and_content_corruption_are_rejected(source):
    (source/'dist/index.html').write_text('<script src="./assets/missing.js"></script>')
    a=build(source,source/'bad.zip')
    with pytest.raises(ValueError):verify(a)
    (source/'dist/index.html').write_text('<script src="./assets/app.js"></script>')
    good=build(source,source/'good.zip')
    with zipfile.ZipFile(good) as z:members={name:z.read(name) for name in z.namelist()}
    members['assets/app.js']=b'altered'
    corrupt=source/'corrupt.zip'
    with zipfile.ZipFile(corrupt,'w') as z:
        for name,data in members.items():z.writestr(name,data)
    with pytest.raises(ValueError):verify(corrupt)

def test_complete_delivery_requires_checksum_sidecar(source):
    package=build(source,source/'pair.zip')
    package.with_suffix('.zip.sha256').unlink()
    assert verify(package)['version']=='1.0.0'
    with pytest.raises(ValueError):verify(package,require_checksum=True)

@pytest.mark.parametrize('name', ['schemas/other.json','assets/data.json','assets/arbitrary.wasm','user-save.sqlite'])
def test_unowned_format_assets_are_rejected(name):
    with pytest.raises(ValueError):validate_members([zipfile.ZipInfo(name)])

def test_schema_and_format_guide_are_mandatory(source):
    for name in ['dist/schemas/game-save.schema.json','docs/FILE-FORMAT.md']:
        path=source/name;data=path.read_bytes();path.unlink()
        with pytest.raises((ValueError,FileNotFoundError)):collect(source)
        path.write_bytes(data)

@pytest.mark.parametrize('name',['dist/assets/file-worker-Ab12.js','dist/assets/sql-wasm-browser-Ab12.wasm'])
def test_missing_runtime_is_rejected(source,name):
    (source/name).unlink()
    with pytest.raises(ValueError):collect(source)

def test_zip_host_metadata_is_identical_on_windows_and_unix(source,monkeypatch):
    """ZIP host defaults must not change shared browser/desktop provenance by build OS."""
    import package_browser
    canonical=build(source,source/'unix.zip').read_bytes()
    original=zipfile.ZipInfo
    class WindowsInfo(original):
        def __init__(self,*args,**kwargs):
            super().__init__(*args,**kwargs);self.create_system=0
    monkeypatch.setattr(package_browser.zipfile,'ZipInfo',WindowsInfo)
    windows=build(source,source/'windows.zip').read_bytes()
    assert windows==canonical
