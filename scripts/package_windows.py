"""Assemble a deterministic Windows x64 Electron ZIP from trusted vendor and browser inputs."""
from pathlib import Path,PurePosixPath
import hashlib,json,re,shutil,stat,struct,zipfile
from electron_runtime import ROOT,ensure_runtime,runtime_asset,verify_runtime
from package_browser import collect,safe_bytes
from verify_package import verify as verify_browser

MAX_MEMBER=512*1024*1024
MAX_TOTAL=1024*1024*1024
REQUIRED_VENDOR={'electron.exe','version','LICENSE','LICENSES.chromium.html','resources.pak','icudtl.dat','v8_context_snapshot.bin','snapshot_blob.bin','locales/en-US.pak'}

def valid_name(name:str)->bool:
    p=PurePosixPath(name)
    reserved={'con','prn','aux','nul'}|{f'{stem}{i}' for stem in ['com','lpt'] for i in range(1,10)}
    return bool(re.fullmatch(r'[A-Za-z0-9_./-]+',name)) and str(p)==name and not p.is_absolute() and all(part not in {'.','..'} and not part.endswith('.') and part.split('.')[0].lower() not in reserved for part in p.parts)

def checked_members(archive:zipfile.ZipFile)->dict[str,bytes]:
    """Bound and validate every source member before reading any payload."""
    info=archive.infolist();seen=set();total=0
    if len(info)>1024:raise ValueError('Too many runtime archive members')
    for item in info:
        mode=item.external_attr>>16
        if not valid_name(item.filename) or item.filename.casefold() in seen or item.is_dir() or item.flag_bits&1 or stat.S_IFMT(mode) not in {0,stat.S_IFREG}:
            raise ValueError('Unsafe or duplicate runtime member: '+item.filename)
        if item.file_size>MAX_MEMBER:raise ValueError('Oversized runtime member')
        total+=item.file_size;seen.add(item.filename.casefold())
    if total>MAX_TOTAL:raise ValueError('Oversized runtime archive')
    if archive.testzip() is not None:raise ValueError('Runtime CRC failed')
    return {item.filename:archive.read(item) for item in info}

def require_x64(executable:bytes)->None:
    try:
        offset=struct.unpack_from('<I',executable,0x3c)[0]
        valid=executable[:2]==b'MZ' and executable[offset:offset+4]==b'PE\0\0' and struct.unpack_from('<H',executable,offset+4)[0]==0x8664 and struct.unpack_from('<H',executable,offset+24)[0]==0x20b
    except struct.error:valid=False
    if not valid:raise ValueError('Runtime executable architecture must be PE x64')

def build(root:Path,runtime_zip:Path,target:Path)->Path:
    """Produce exactly vendor runtime plus current shared renderer and two desktop host modules."""
    version=json.loads(safe_bytes(root,root/'package.json'))['version']
    if not isinstance(version,str) or not re.fullmatch(r'\d+\.\d+\.\d+',version):raise ValueError('Invalid application version')
    descriptor=json.loads(safe_bytes(root,root/'scripts/electron-runtime.json'));asset=runtime_asset(descriptor,'win32-x64');verify_runtime(runtime_zip,asset['sha256'])
    with zipfile.ZipFile(runtime_zip) as archive:vendor=checked_members(archive)
    if not REQUIRED_VENDOR<=vendor.keys():raise ValueError('Required runtime/license member missing')
    if vendor['version'].decode('ascii').strip()!=descriptor['electronVersion']:raise ValueError('Runtime version mismatch')
    require_x64(vendor['electron.exe'])
    browser=root/'artifacts'/f'classic-tetris-browser-v{version}.zip';manifest=verify_browser(browser,require_checksum=True)
    if manifest['version']!=version:raise ValueError('Browser version mismatch')
    with zipfile.ZipFile(browser) as archive:renderer={name:archive.read(name) for name in archive.namelist()}
    expected=collect(root)
    if set(renderer)!=(set(expected)|{'BUILD-MANIFEST.json'}) or any(renderer[name]!=data for name,data in expected.items()):raise ValueError('Stale browser renderer distribution')
    if renderer['schemas/game-save.schema.json']!=safe_bytes(root,root/'schemas/game-save.schema.json'):raise ValueError('Stale browser canonical schema')
    members={};case_names=set()
    def add(name,data):
        if not valid_name(name) or name.casefold() in case_names:raise ValueError('Desktop member collision')
        members[name]=data;case_names.add(name.casefold())
    for name,data in vendor.items():add('ClassicTetris.exe' if name=='electron.exe' else name,data)
    for name in ['main.cjs','asset-policy.cjs']:add('resources/app/'+name,safe_bytes(root,root/'src/platform/electron'/name))
    app={'name':'classic-tetris-desktop','productName':'Classic Tetris','version':version,'main':'main.cjs','type':'commonjs','private':True}
    add('resources/app/package.json',(json.dumps(app,indent=2,sort_keys=True)+'\n').encode())
    for name,data in renderer.items():add('resources/app/renderer/'+name,data)
    add('README-WINDOWS.txt',safe_bytes(root,root/'docs/WINDOWS-QUICKSTART.txt'))
    result={'version':version,'kind':'windows-electron','platform':'win32','arch':'x64','electronVersion':descriptor['electronVersion'],'runtime':asset,'renderer':{'filename':browser.name,'sha256':hashlib.sha256(browser.read_bytes()).hexdigest()},'files':{name:hashlib.sha256(data).hexdigest() for name,data in sorted(members.items())}}
    add('DESKTOP-MANIFEST.json',(json.dumps(result,indent=2,sort_keys=True)+'\n').encode())
    target.parent.mkdir(parents=True,exist_ok=True)
    if target.is_symlink():raise ValueError('Desktop output cannot be a symbolic link')
    with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for name,data in sorted(members.items()):
            item=zipfile.ZipInfo(name,date_time=(1980,1,1,0,0,0));item.create_system=3;item.external_attr=0o100644<<16;item.compress_type=zipfile.ZIP_DEFLATED;archive.writestr(item,data,compresslevel=9)
    digest=hashlib.sha256(target.read_bytes()).hexdigest();target.with_suffix(target.suffix+'.sha256').write_text(digest+'  '+target.name+'\n')
    return target

if __name__=='__main__':
    version=json.loads((ROOT/'package.json').read_text())['version'];target=build(ROOT,ensure_runtime('win32-x64'),ROOT/'artifacts'/f'classic-tetris-windows-x64-v{version}.zip')
    stable=ROOT/'artifacts/release/classic-tetris-windows-x64.zip';stable.parent.mkdir(parents=True,exist_ok=True)
    if stable.is_symlink():raise ValueError('Desktop release alias cannot be a symbolic link')
    shutil.copyfile(target,stable);digest=hashlib.sha256(stable.read_bytes()).hexdigest();stable.with_suffix('.zip.sha256').write_text(digest+'  '+stable.name+'\n');print(f'Built {target.name} {target.stat().st_size} bytes SHA256 {digest}')
