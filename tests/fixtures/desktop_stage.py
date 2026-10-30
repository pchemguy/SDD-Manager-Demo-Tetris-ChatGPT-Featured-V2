"""Own disposable actual Electron runtime/app staging; never part of either player package."""
from pathlib import Path
import json,os,shutil,stat,subprocess,sys,zipfile,tempfile
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from electron_runtime import ensure_runtime
from verify_package import verify as verify_browser

platform='win32-x64' if sys.platform=='win32' else 'linux-x64'
base=Path(tempfile.mkdtemp(prefix='Classic Tetris Desktop '))
(base/'.owned-test-stage').write_text('Classic Tetris desktop acceptance only')
version=json.loads((ROOT/'package.json').read_text())['version']
browser=ROOT/'artifacts'/f'classic-tetris-browser-v{version}.zip'
verify_browser(browser,require_checksum=True)
probe=os.environ.get('SDD_ELECTRON_LOCAL_PROBE')=='1'
if probe and sys.platform!='linux':raise ValueError('Local probe override applies only to the diagnosed Linux host')
kind='staged-source'
# The later package task automatically makes this same runner consume its actual verified ZIP.
if platform=='win32-x64' and (ROOT/'scripts/package_windows.py').exists():
    subprocess.run([sys.executable,str(ROOT/'scripts/package_windows.py')],check=True,cwd=ROOT)
    subprocess.run([sys.executable,str(ROOT/'scripts/verify_windows.py')],check=True,cwd=ROOT)
    archive=ROOT/'artifacts'/f'classic-tetris-windows-x64-v{version}.zip'
    with zipfile.ZipFile(archive) as z:z.extractall(base/'packaged')
    executable=base/'packaged/ClassicTetris.exe';args=[];kind='packaged'
else:
    runtime=base/'vendor';runtime.mkdir()
    with zipfile.ZipFile(ensure_runtime(platform)) as z:
        z.extractall(runtime)
        if platform=='linux-x64':
            for item in z.infolist():
                p=runtime/item.filename
                if p.is_file():p.chmod((item.external_attr>>16)&0o777 or 0o644)
    app=base/'app';app.mkdir()
    for name in ['main.cjs','asset-policy.cjs']:shutil.copyfile(ROOT/'src/platform/electron'/name,app/name)
    metadata={'name':'classic-tetris-desktop','productName':'Classic Tetris','version':version,'main':'main.cjs'}
    if probe:
        metadata['main']='local-probe.cjs'
        (app/'local-probe.cjs').write_text("// External test-only substitute for this host's denied singleton socket. Never shipped.\nconst electron=require('electron');electron.app.requestSingleInstanceLock=()=>true;require('./main.cjs');\n")
    (app/'package.json').write_text(json.dumps(metadata))
    with zipfile.ZipFile(browser) as z:z.extractall(app/'renderer')
    executable=runtime/('electron.exe' if platform=='win32-x64' else 'electron')
    args=(['--ozone-platform=headless','--no-sandbox','--disable-gpu'] if probe else [])+[str(app)]
(base/'unrelated working directory').mkdir()
out={'base':str(base),'kind':kind,'platform':platform,'appVersion':version,'executable':str(executable),'args':args,'cwd':str(base/'unrelated working directory'),'localProbe':probe}
(ROOT/'artifacts/desktop-stage.json').write_text(json.dumps(out,indent=2)+'\n')
print('DESKTOP_STAGE '+json.dumps(out),flush=True)
