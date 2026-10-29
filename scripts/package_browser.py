"""Create deterministic allowlisted static-browser archives; never include checkout secrets."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {'index.html', 'LICENSE', 'THIRD-PARTY-NOTICES.txt', 'docs/INSTALL.md', 'docs/CONTROLS.md'}
ASSET_TYPES = {'.js', '.css', '.svg', '.png', '.jpg', '.webp', '.woff', '.woff2', '.ico'}

def allowed_name(name: str) -> bool:
    """Accept canonical portable member names and only deployment-owned files."""
    p = PurePosixPath(name)
    return bool(re.fullmatch(r'[A-Za-z0-9_./-]+', name)) and str(p) == name and not p.is_absolute() and '..' not in p.parts and (name in REQUIRED or name == 'BUILD-MANIFEST.json' or (name.startswith('assets/') and p.suffix in ASSET_TYPES))

def safe_bytes(root: Path, path: Path) -> bytes:
    """Reject symbolic links in any selected source path component."""
    current = root
    for part in path.relative_to(root).parts:
        current /= part
        if current.is_symlink():
            raise ValueError('Symbolic links are not deployment inputs')
    return path.read_bytes()

def collect(root: Path) -> dict[str, bytes]:
    """Collect built assets plus mandatory license and deployer documents."""
    dist = root / 'dist'
    if dist.is_symlink() or not dist.is_dir():
        raise ValueError('A real dist directory is required')
    members = {}
    for path in sorted(dist.rglob('*')):
        if path.is_symlink():
            raise ValueError('Symbolic links are not deployment inputs')
        if path.is_file():
            name = path.relative_to(dist).as_posix()
            if not allowed_name(name) or name in REQUIRED - {'index.html'} or name == 'BUILD-MANIFEST.json':
                raise ValueError('Unexpected build asset: ' + name)
            members[name] = safe_bytes(root, path)
    for name in REQUIRED - {'index.html'}:
        members[name] = safe_bytes(root, root / name)
    if not REQUIRED <= members.keys():
        raise ValueError('Missing required deployment member')
    return members

def build(root: Path, target: Path) -> Path:
    """Write deterministic ZIP bytes and an adjacent checksum for exactly those bytes."""
    members = collect(root)
    version = json.loads((root / 'package.json').read_text())['version']
    if not re.fullmatch(r'\d+\.\d+\.\d+', version):
        raise ValueError('Expected a stable semantic version')
    manifest = {'version': version, 'kind': 'static-browser', 'files': {name: hashlib.sha256(data).hexdigest() for name, data in sorted(members.items())}}
    members['BUILD-MANIFEST.json'] = (json.dumps(manifest, indent=2, sort_keys=True) + '\n').encode()
    target.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, data in sorted(members.items()):
            entry = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.external_attr = 0o100644 << 16
            archive.writestr(entry, data)
    digest = hashlib.sha256(target.read_bytes()).hexdigest()
    target.with_suffix(target.suffix + '.sha256').write_text(digest + '  ' + target.name + '\n')
    return target

if __name__ == '__main__':
    version = json.loads((ROOT / 'package.json').read_text())['version']
    result = build(ROOT, ROOT / 'artifacts' / ('classic-tetris-browser-v' + version + '.zip'))
    print(result.name, hashlib.sha256(result.read_bytes()).hexdigest())
