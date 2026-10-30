"""Synthetic package tests pin failure paths; actual vendor-backed artifacts are checked separately."""
from pathlib import Path
import hashlib,importlib,json,shutil,struct,sys,tempfile,unittest,zipfile
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
import package_browser
class DesktopPackages(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory(prefix='tetris-desktop-package-');self.addCleanup(self.temp.cleanup);self.root=Path(self.temp.name);r=self.root
  for directory in ['scripts','dist/assets','dist/schemas','schemas','docs','src/platform/electron','artifacts']:(r/directory).mkdir(parents=True,exist_ok=True)
  (r/'package.json').write_text(json.dumps({'version':'1.8.0'}));schema=(ROOT/'schemas/game-save.schema.json').read_bytes();(r/'schemas/game-save.schema.json').write_bytes(schema);(r/'dist/schemas/game-save.schema.json').write_bytes(schema)
  self.html=b'<html><script type="module" src="./assets/main.js"></script></html>';(r/'dist/index.html').write_bytes(self.html)
  for name in ['main.js','file-worker-test.js','sql-wasm-browser-test.wasm']:(r/'dist/assets'/name).write_text('fixture '+name)
  for name in ['LICENSE','THIRD-PARTY-NOTICES.txt','docs/INSTALL.md','docs/CONTROLS.md','docs/FILE-FORMAT.md']:(r/name).write_text('Fixture guide/license '+name)
  (r/'docs/WINDOWS-QUICKSTART.txt').write_text('Extract and run ClassicTetris.exe. No separate Node or server.');(r/'src/platform/electron/main.cjs').write_text('fixture desktop main');(r/'src/platform/electron/asset-policy.cjs').write_text('fixture policy');(r/'gh.tkn').write_text('fixture secret never packaged')
  self.browser=package_browser.build(r,r/'artifacts/classic-tetris-browser-v1.8.0.zip')
  pe=bytearray(256);pe[:2]=b'MZ';struct.pack_into('<I',pe,0x3c,0x80);pe[0x80:0x84]=b'PE\0\0';struct.pack_into('<H',pe,0x84,0x8664);struct.pack_into('<H',pe,0x98,0x20b)
  self.vendor={'electron.exe':bytes(pe),'version':b'45.2.0\n','LICENSE':b'Vendor license','LICENSES.chromium.html':b'Vendor notices','resources.pak':b'pak','icudtl.dat':b'icu','v8_context_snapshot.bin':b'v8','snapshot_blob.bin':b'snapshot','locales/en-US.pak':b'locale','resources/default_app.asar':b'default app','dxcompiler.dll':b'vendor dll'}
  self.runtime=r/'runtime.zip';self.write_vendor();self.target=r/'artifacts/desktop.zip'
 def write_vendor(self):
  with zipfile.ZipFile(self.runtime,'w',compression=zipfile.ZIP_DEFLATED) as z:
   for n,b in self.vendor.items():z.writestr(n,b)
  descriptor={'electronVersion':'45.2.0','assets':{'win32-x64':{'filename':'electron-v45.2.0-win32-x64.zip','url':'https://github.com/electron/electron/releases/download/v45.2.0/electron-v45.2.0-win32-x64.zip','sha256':hashlib.sha256(self.runtime.read_bytes()).hexdigest()}}};(self.root/'scripts/electron-runtime.json').write_text(json.dumps(descriptor))
 def modules(self):
  self.assertTrue((ROOT/'scripts/package_windows.py').exists(),'Windows package producer must exist');self.assertTrue((ROOT/'scripts/verify_windows.py').exists(),'Independent Windows package verifier must exist');return importlib.import_module('package_windows'),importlib.import_module('verify_windows')
 def build(self):
  producer,verifier=self.modules();producer.build(self.root,self.runtime,self.target);return verifier
 def rewrite(self,change,update_manifest=True):
  with zipfile.ZipFile(self.target) as z:members={n:z.read(n) for n in z.namelist()}
  change(members)
  if update_manifest:
   m=json.loads(members['DESKTOP-MANIFEST.json']);m['files']={n:hashlib.sha256(b).hexdigest() for n,b in members.items() if n!='DESKTOP-MANIFEST.json'};members['DESKTOP-MANIFEST.json']=(json.dumps(m,sort_keys=True,indent=2)+'\n').encode()
  with zipfile.ZipFile(self.target,'w',compression=zipfile.ZIP_DEFLATED) as z:
   for n,b in sorted(members.items()):
    item=zipfile.ZipInfo(n,date_time=(1980,1,1,0,0,0));item.create_system=3;item.external_attr=0o100644<<16;item.compress_type=zipfile.ZIP_DEFLATED;z.writestr(item,b)
  self.target.with_suffix('.zip.sha256').write_text(hashlib.sha256(self.target.read_bytes()).hexdigest()+'  '+self.target.name+'\n')
 def test_complete_package_binds_vendor_host_renderer_and_version(self):
  verifier=self.build();m=verifier.verify(self.target,root=self.root,runtime_zip=self.runtime,require_checksum=True)
  self.assertEqual(m['kind'],'windows-electron');self.assertEqual(m['version'],'1.8.0');self.assertEqual(m['platform'],'win32');self.assertEqual(m['arch'],'x64');self.assertEqual(m['electronVersion'],'45.2.0')
  with zipfile.ZipFile(self.target) as z:
   self.assertEqual(z.read('ClassicTetris.exe'),self.vendor['electron.exe']);self.assertEqual(z.read('resources/app/renderer/index.html'),self.html);self.assertEqual(z.read('LICENSE'),self.vendor['LICENSE']);self.assertEqual(z.read('README-WINDOWS.txt'),(self.root/'docs/WINDOWS-QUICKSTART.txt').read_bytes());app=json.loads(z.read('resources/app/package.json'));self.assertEqual(app['main'],'main.cjs');self.assertEqual(app['version'],'1.8.0');self.assertNotIn('dependencies',app);self.assertNotIn('gh.tkn',z.namelist());self.assertNotIn('electron.exe',z.namelist())
 def test_repeated_package_is_byte_reproducible(self):
  producer,_=self.modules();producer.build(self.root,self.runtime,self.target);first=self.target.read_bytes();producer.build(self.root,self.runtime,self.target);self.assertEqual(first,self.target.read_bytes())
 def test_runtime_checksum_mismatch_rejects_before_packaging(self):
  producer,_=self.modules();self.runtime.write_bytes(b'tampered')
  with self.assertRaisesRegex(ValueError,'checksum'):producer.build(self.root,self.runtime,self.target)
 def test_wrong_runtime_architecture_rejects_even_with_fixture_source_digest(self):
  producer,_=self.modules();pe=bytearray(self.vendor['electron.exe']);struct.pack_into('<H',pe,0x84,0x14c);self.vendor['electron.exe']=bytes(pe);self.write_vendor()
  with self.assertRaisesRegex(ValueError,'architecture'):producer.build(self.root,self.runtime,self.target)
 def test_wrong_vendor_version_rejects(self):
  producer,_=self.modules();self.vendor['version']=b'44.0.0';self.write_vendor()
  with self.assertRaisesRegex(ValueError,'version'):producer.build(self.root,self.runtime,self.target)
 def test_missing_vendor_license_rejects(self):
  producer,_=self.modules();del self.vendor['LICENSES.chromium.html'];self.write_vendor()
  with self.assertRaises(ValueError):producer.build(self.root,self.runtime,self.target)
 def test_unsafe_vendor_path_rejects(self):
  producer,_=self.modules();self.vendor['../escape.dll']=b'escape';self.write_vendor()
  with self.assertRaises(ValueError):producer.build(self.root,self.runtime,self.target)
 def test_vendor_case_collision_rejects(self):
  producer,_=self.modules();self.vendor['LICENSE.txt']=b'one';self.vendor['license.TXT']=b'two';self.write_vendor()
  with self.assertRaises(ValueError):producer.build(self.root,self.runtime,self.target)
 def test_stale_browser_input_rejects(self):
  producer,_=self.modules();(self.root/'dist/assets/main.js').write_text('updated build')
  with self.assertRaisesRegex(ValueError,'browser|renderer'):producer.build(self.root,self.runtime,self.target)
 def test_changed_host_with_updated_artifact_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.update({'resources/app/main.cjs':b'tampered host'}))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_changed_vendor_with_updated_artifact_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.update({'dxcompiler.dll':b'tampered vendor'}))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_missing_vendor_member_with_updated_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.pop('dxcompiler.dll'))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_stale_renderer_with_updated_artifact_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.update({'resources/app/renderer/assets/main.js':b'stale build'}))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_sensitive_extra_member_with_updated_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.update({'gh.tkn':b'never ship'}))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_wrong_manifest_version_is_rejected(self):
  verifier=self.build()
  def change(m):
   x=json.loads(m['DESKTOP-MANIFEST.json']);x['version']='1.7.0';m['DESKTOP-MANIFEST.json']=json.dumps(x).encode()
  self.rewrite(change)
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_checksum_sidecar_is_required_and_filename_specific(self):
  verifier=self.build();self.target.with_suffix('.zip.sha256').write_text('0'*64+'  wrong.zip\n')
  with self.assertRaisesRegex(ValueError,'checksum'):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime,require_checksum=True)
 def test_symlink_member_is_rejected(self):
  verifier=self.build()
  with zipfile.ZipFile(self.target,'a') as z:
   item=zipfile.ZipInfo('link');item.create_system=3;item.external_attr=0o120777<<16;item.compress_type=zipfile.ZIP_DEFLATED;z.writestr(item,'ClassicTetris.exe')
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_duplicate_member_is_rejected(self):
  import warnings
  verifier=self.build()
  with warnings.catch_warnings():
   warnings.simplefilter('ignore',UserWarning)
   with zipfile.ZipFile(self.target,'a') as z:
    item=zipfile.ZipInfo('LICENSE',date_time=(1980,1,1,0,0,0));item.create_system=3;item.external_attr=0o100644<<16;item.compress_type=zipfile.ZIP_DEFLATED;z.writestr(item,b'duplicate')
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_wrong_desktop_entry_with_updated_manifest_is_rejected(self):
  verifier=self.build()
  def change(m):
   x=json.loads(m['resources/app/package.json']);x['main']='remote.cjs';m['resources/app/package.json']=json.dumps(x).encode()
  self.rewrite(change)
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_traversal_member_with_updated_manifest_is_rejected(self):
  verifier=self.build();self.rewrite(lambda m:m.update({'../escape.dll':b'escape'}))
  with self.assertRaises(ValueError):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
 def test_corrupt_payload_crc_is_rejected_even_with_updated_sidecar(self):
  import zlib
  verifier=self.build()
  with zipfile.ZipFile(self.target) as z:item=z.getinfo('README-WINDOWS.txt')
  data=bytearray(self.target.read_bytes());n,e=struct.unpack_from('<HH',data,item.header_offset+26);offset=item.header_offset+30+n+e;data[offset]^=0x40;self.target.write_bytes(data);self.target.with_suffix('.zip.sha256').write_text(hashlib.sha256(data).hexdigest()+'  '+self.target.name+'\n')
  with self.assertRaises((ValueError,zipfile.BadZipFile,zlib.error)):verifier.verify(self.target,root=self.root,runtime_zip=self.runtime)
if __name__=='__main__':unittest.main()
