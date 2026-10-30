"""Pinned official Electron runtime inputs. Downloads are build-time only, never app startup."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import re
import tempfile
import urllib.request

ROOT=Path(__file__).resolve().parents[1]
DESCRIPTOR=ROOT/'scripts/electron-runtime.json'

def runtime_asset(descriptor:dict,platform:str)->dict:
    """Accept an exact official stable-release asset, not a moving or alternate vendor URL."""
    version=descriptor.get('electronVersion','')
    if not re.fullmatch(r'\d+\.\d+\.\d+',version) or platform not in {'win32-x64','linux-x64'}:
        raise ValueError('Invalid supported Electron runtime identity')
    asset=descriptor.get('assets',{}).get(platform,{})
    filename=f'electron-v{version}-{platform}.zip'
    url=f'https://github.com/electron/electron/releases/download/v{version}/{filename}'
    if asset.get('filename')!=filename or asset.get('url')!=url:
        raise ValueError('Runtime must use the exact official Electron release asset')
    if not re.fullmatch(r'[a-f0-9]{64}',asset.get('sha256','')):
        raise ValueError('Runtime must have a pinned SHA256 checksum')
    return dict(asset)

def verify_runtime(filename:Path,expected_sha256:str)->Path:
    """Check real bytes before parsing or extracting a runtime archive."""
    if filename.is_symlink():raise ValueError('Runtime symbolic links are not accepted')
    if not filename.is_file():raise ValueError('Pinned runtime file is missing')
    digest=hashlib.sha256()
    with filename.open('rb') as stream:
        for block in iter(lambda:stream.read(1024*1024),b''):digest.update(block)
    if digest.hexdigest()!=expected_sha256:raise ValueError('Electron runtime checksum mismatch')
    return filename

def ensure_runtime(platform:str,cache:Path|None=None)->Path:
    """Atomically cache only verified public vendor bytes; never send repository credentials."""
    descriptor=json.loads(DESCRIPTOR.read_text());asset=runtime_asset(descriptor,platform)
    cache=cache or ROOT/'artifacts/electron-runtime'
    if cache.is_symlink():raise ValueError('Runtime cache symbolic link is not accepted')
    cache.mkdir(parents=True,exist_ok=True);target=cache/asset['filename']
    if target.exists() or target.is_symlink():return verify_runtime(target,asset['sha256'])
    handle,name=tempfile.mkstemp(prefix='.electron-download-',dir=cache);temporary=Path(name)
    try:
        print('Downloading pinned official Electron '+descriptor['electronVersion']+' '+platform,flush=True)
        request=urllib.request.Request(asset['url'],headers={'User-Agent':'Classic-Tetris-build'})
        total=0;reported=0
        with os.fdopen(handle,'wb') as output,urllib.request.urlopen(request,timeout=45) as response:
            while True:
                block=response.read(1024*1024)
                if not block:break
                total+=len(block)
                if total>512*1024*1024:raise ValueError('Electron runtime exceeds the build input limit')
                output.write(block)
                if total-reported>=32*1024*1024:print(f'Runtime download {total//(1024*1024)} MiB',flush=True);reported=total
        verify_runtime(temporary,asset['sha256']);temporary.replace(target)
        print('Verified runtime SHA256 '+asset['sha256'],flush=True)
        return target
    finally:
        temporary.unlink(missing_ok=True)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('platform',choices=['win32-x64','linux-x64']);args=parser.parse_args()
    print(ensure_runtime(args.platform))
