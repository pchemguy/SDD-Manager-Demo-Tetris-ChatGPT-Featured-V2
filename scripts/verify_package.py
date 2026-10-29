"""Validate deployment contents/hashes/links before extracting into an owned static server."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import hashlib
import json
import re
import shutil
import stat
import sys
import zipfile
from package_browser import ROOT, REQUIRED, allowed_name

def validate_members(members):
    """Reject duplicate, noncanonical, encrypted, excessive or nonregular entries."""
    names = set()
    total = 0
    for item in members:
        mode = item.external_attr >> 16
        if not allowed_name(item.filename) or item.filename in names or item.flag_bits & 1 or stat.S_ISLNK(mode) or stat.S_IFMT(mode) not in (0, stat.S_IFREG):
            raise ValueError('Unsafe archive member: ' + item.filename)
        if item.file_size > 32 * 1024 * 1024:
            raise ValueError('Oversized deployment entry')
        total += item.file_size
        names.add(item.filename)
    if total > 128 * 1024 * 1024:
        raise ValueError('Oversized deployment archive')

def verify(path: Path) -> dict:
    """Validate complete CRC, manifest digests, required files and local entry references."""
    with zipfile.ZipFile(path) as archive:
        validate_members(archive.infolist())
        if archive.testzip() is not None:
            raise ValueError('Archive CRC failed')
        names = set(archive.namelist())
        if not (REQUIRED | {'BUILD-MANIFEST.json'}) <= names:
            raise ValueError('Missing required deployment member')
        manifest = json.loads(archive.read('BUILD-MANIFEST.json'))
        if manifest.get('kind') != 'static-browser' or not re.fullmatch(r'\d+\.\d+\.\d+', manifest.get('version', '')):
            raise ValueError('Invalid manifest metadata')
        if set(manifest.get('files', {})) != names - {'BUILD-MANIFEST.json'}:
            raise ValueError('Manifest/member mismatch')
        for name, digest in manifest['files'].items():
            if hashlib.sha256(archive.read(name)).hexdigest() != digest:
                raise ValueError('Content hash mismatch: ' + name)
        html = archive.read('index.html').decode()
        for ref in re.findall(r'(?:src|href)=[\'"]([^\'"]+)', html):
            if ref.startswith('data:'):
                continue
            member = ref[2:] if ref.startswith('./') else ref
            if ref.startswith('/') or not member or member not in names:
                raise ValueError('Missing/nonlocal entry asset: ' + ref)
    sidecar = path.with_suffix(path.suffix + '.sha256')
    if sidecar.exists():
        expected = sidecar.read_text().split()
        if expected != [hashlib.sha256(path.read_bytes()).hexdigest(), path.name]:
            raise ValueError('Archive checksum mismatch')
    return manifest

def extract(path: Path) -> Path:
    """Extract only validated content into the owned prefix test tree."""
    verify(path)
    root = ROOT / 'artifacts/extracted'
    if root.is_symlink():
        raise ValueError('Unsafe extraction root')
    if root.exists():
        shutil.rmtree(root)
    target = root / 'nested/game'
    target.mkdir(parents=True)
    with zipfile.ZipFile(path) as archive:
        for name in archive.namelist():
            dest = target / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(archive.read(name))
    return root

if __name__ == '__main__':
    version = json.loads((ROOT / 'package.json').read_text())['version']
    package = ROOT / 'artifacts' / ('classic-tetris-browser-v' + version + '.zip')
    manifest = verify(package)
    if manifest['version'] != version:
        raise ValueError('Package/source version mismatch')
    print('Verified', package.name, len(manifest['files']), 'content digests', flush=True)
    if '--serve' in sys.argv:
        directory = extract(package)
        ThreadingHTTPServer(('127.0.0.1', 4173), partial(SimpleHTTPRequestHandler, directory=str(directory))).serve_forever()
