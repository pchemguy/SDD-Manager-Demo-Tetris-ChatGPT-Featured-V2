"""Independently verify actual Windows archives against trusted vendor and current source inputs."""
from pathlib import Path,PurePosixPath
import hashlib,json,re,stat,struct,zipfile
from electron_runtime import ROOT,ensure_runtime,runtime_asset,verify_runtime
from package_browser import collect,safe_bytes
from verify_package import verify as verify_browser

def verify(path:Path,*,root:Path=ROOT,runtime_zip:Path|None=None,require_checksum:bool=False)->dict:
    """A rewritten self-reported manifest cannot authorize changed host/vendor/renderer bytes."""
    descriptor=json.loads(safe_bytes(root,root/'scripts/electron-runtime.json'));asset=runtime_asset(descriptor,'win32-x64');runtime_zip=runtime_zip or ensure_runtime('win32-x64');verify_runtime(runtime_zip,asset['sha256'])
    version=json.loads(safe_bytes(root,root/'package.json'))['version'];browser=root/'artifacts'/f'classic-tetris-browser-v{version}.zip';browser_manifest=verify_browser(browser,require_checksum=True)
    if browser_manifest['version']!=version:raise ValueError('Browser/application version mismatch')
    with zipfile.ZipFile(browser) as b:renderer={name:b.read(name) for name in b.namelist()}
    current=collect(root)
    if set(renderer)!=(set(current)|{'BUILD-MANIFEST.json'}) or any(renderer[n]!=data for n,data in current.items()) or renderer['schemas/game-save.schema.json']!=safe_bytes(root,root/'schemas/game-save.schema.json'):raise ValueError('Stale browser inputs')
    with zipfile.ZipFile(runtime_zip) as vendor,zipfile.ZipFile(path) as archive:
        entries=archive.infolist();names=set();case_names=set();total=0
        if len(entries)>1024:raise ValueError('Too many desktop members')
        for item in entries:
            name=item.filename;p=PurePosixPath(name);mode=item.external_attr>>16
            reserved={'con','prn','aux','nul'}|{f'{stem}{i}' for stem in ['com','lpt'] for i in range(1,10)}
            if not re.fullmatch(r'[A-Za-z0-9_./-]+',name) or str(p)!=name or p.is_absolute() or any(x in {'.','..'} or x.endswith('.') or x.split('.')[0].lower() in reserved for x in p.parts) or name.casefold() in case_names or item.flag_bits&1 or stat.S_IFMT(mode)!=stat.S_IFREG or item.date_time!=(1980,1,1,0,0,0) or item.compress_type!=zipfile.ZIP_DEFLATED:
                raise ValueError('Unsafe/noncanonical desktop member: '+name)
            if item.file_size>512*1024*1024:raise ValueError('Oversized desktop member')
            total+=item.file_size;names.add(name);case_names.add(name.casefold())
        if total>1024*1024*1024:raise ValueError('Oversized desktop archive')
        if archive.testzip() is not None:raise ValueError('Desktop CRC failed')
        manifest=json.loads(archive.read('DESKTOP-MANIFEST.json'))
        for key,value in {'version':version,'kind':'windows-electron','platform':'win32','arch':'x64','electronVersion':descriptor['electronVersion'],'runtime':asset,'renderer':{'filename':browser.name,'sha256':hashlib.sha256(browser.read_bytes()).hexdigest()}}.items():
            if manifest.get(key)!=value:raise ValueError('Desktop metadata/provenance mismatch: '+key)
        if set(manifest.get('files',{}))!=names-{'DESKTOP-MANIFEST.json'}:raise ValueError('Desktop manifest/member mismatch')
        for name,digest in manifest['files'].items():
            if hashlib.sha256(archive.read(name)).hexdigest()!=digest:raise ValueError('Desktop content digest mismatch: '+name)
        vendor_names=vendor.namelist()
        if len(vendor_names)!=len(set(n.casefold() for n in vendor_names)):raise ValueError('Ambiguous trusted runtime members')
        required={'electron.exe','version','LICENSE','LICENSES.chromium.html','resources.pak','icudtl.dat','v8_context_snapshot.bin','snapshot_blob.bin','locales/en-US.pak'}
        if not required<=set(vendor_names) or vendor.read('version').decode('ascii').strip()!=descriptor['electronVersion']:raise ValueError('Required runtime/version missing')
        expected={('ClassicTetris.exe' if n=='electron.exe' else n) for n in vendor_names}|{'DESKTOP-MANIFEST.json','README-WINDOWS.txt','resources/app/package.json','resources/app/main.cjs','resources/app/asset-policy.cjs'}|{'resources/app/renderer/'+n for n in renderer}
        if names!=expected:raise ValueError('Unexpected or missing desktop member')
        for original in vendor_names:
            name='ClassicTetris.exe' if original=='electron.exe' else original
            if hashlib.sha256(archive.read(name)).digest()!=hashlib.sha256(vendor.read(original)).digest():raise ValueError('Vendor runtime source mismatch: '+name)
        exe=archive.read('ClassicTetris.exe')
        try:
            off=struct.unpack_from('<I',exe,0x3c)[0];valid=exe[:2]==b'MZ' and exe[off:off+4]==b'PE\0\0' and struct.unpack_from('<H',exe,off+4)[0]==0x8664 and struct.unpack_from('<H',exe,off+24)[0]==0x20b
        except struct.error:valid=False
        if not valid:raise ValueError('Incorrect executable architecture')
        for name in ['main.cjs','asset-policy.cjs']:
            if archive.read('resources/app/'+name)!=safe_bytes(root,root/'src/platform/electron'/name):raise ValueError('Desktop host source mismatch')
        app=json.loads(archive.read('resources/app/package.json'));expected_app={'name':'classic-tetris-desktop','productName':'Classic Tetris','version':version,'main':'main.cjs','type':'commonjs','private':True}
        if app!=expected_app:raise ValueError('Desktop app entry/version mismatch')
        for name,data in renderer.items():
            if archive.read('resources/app/renderer/'+name)!=data:raise ValueError('Renderer source mismatch')
        if archive.read('README-WINDOWS.txt')!=safe_bytes(root,root/'docs/WINDOWS-QUICKSTART.txt'):raise ValueError('Desktop guide source mismatch')
    sidecar=path.with_suffix(path.suffix+'.sha256')
    if require_checksum and not sidecar.is_file():raise ValueError('Desktop checksum missing')
    if sidecar.exists() and sidecar.read_text().split()!=[hashlib.sha256(path.read_bytes()).hexdigest(),path.name]:raise ValueError('Desktop checksum mismatch')
    return manifest

if __name__=='__main__':
    version=json.loads((ROOT/'package.json').read_text())['version'];path=ROOT/'artifacts'/f'classic-tetris-windows-x64-v{version}.zip';result=verify(path,require_checksum=True)
    print(f'Verified {path.name}: {len(result["files"])} member digests; trusted runtime/current renderer/host')
