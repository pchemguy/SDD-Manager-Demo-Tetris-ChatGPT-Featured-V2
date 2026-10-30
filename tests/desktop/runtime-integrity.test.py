"""ED08: real file validation must reject an untrusted runtime before it can be used."""
import importlib.util, pathlib, tempfile, unittest, hashlib, sys
ROOT=pathlib.Path(__file__).resolve().parents[2]
class RuntimeIntegrity(unittest.TestCase):
 def load(self):
  source=ROOT/'scripts/electron_runtime.py';self.assertTrue(source.exists(),'Checked Electron runtime helper must exist')
  spec=importlib.util.spec_from_file_location('desktop_runtime_under_test',source);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module
 def test_checked_runtime_accepts_matching_real_bytes(self):
  m=self.load()
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'runtime.zip';p.write_bytes(b'vendor fixture bytes');self.assertEqual(m.verify_runtime(p,hashlib.sha256(p.read_bytes()).hexdigest()),p)
 def test_tampered_runtime_is_rejected(self):
  m=self.load()
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'runtime.zip';p.write_bytes(b'tampered')
   with self.assertRaisesRegex(ValueError,'checksum'):m.verify_runtime(p,'0'*64)
 def test_symlink_runtime_is_rejected(self):
  m=self.load()
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'runtime.zip';p.write_bytes(b'vendor');link=p.with_name('link.zip')
   try:link.symlink_to(p)
   except OSError:self.skipTest('Host lacks symlink creation for this fixture')
   with self.assertRaisesRegex(ValueError,'link'):m.verify_runtime(link,hashlib.sha256(p.read_bytes()).hexdigest())
 def test_descriptor_rejects_remote_or_mismatched_vendor_source(self):
  m=self.load();base={'electronVersion':'45.2.0','assets':{'win32-x64':{'filename':'electron-v45.2.0-win32-x64.zip','url':'https://evil.invalid/runtime.zip','sha256':'0'*64}}}
  with self.assertRaisesRegex(ValueError,'official'):m.runtime_asset(base,'win32-x64')
 def test_actual_pinned_descriptor_uses_exact_official_asset(self):
  import json
  m=self.load();descriptor=json.loads((ROOT/'scripts/electron-runtime.json').read_text());a=m.runtime_asset(descriptor,'win32-x64');self.assertEqual(a['filename'],'electron-v45.2.0-win32-x64.zip');self.assertEqual(a['sha256'],'8b3475a4c1e56ac70f4802b4fc05db758c8821c766f26445acdb90e3c4e68e71')
if __name__=='__main__':unittest.main()
