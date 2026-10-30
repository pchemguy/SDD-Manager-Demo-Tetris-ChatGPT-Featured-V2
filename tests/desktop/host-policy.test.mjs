import {fileURLToPath} from 'node:url';
/** ED03/04: a widened origin/path/method or MIME/CSP policy must fail these checks. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),file=new URL('../../src/platform/electron/asset-policy.cjs',import.meta.url);
function policy(){assert.ok(existsSync(file),'Desktop asset policy must exist');return require(fileURLToPath(file))}
const names=new Set(['index.html','assets/game-abc.js','assets/game.css','assets/file-worker-abc.js','assets/sql-wasm-browser-abc.wasm','schemas/game-save.schema.json','docs/INSTALL.md','LICENSE']);
for(const [name,mime] of [['index.html','text/html; charset=utf-8'],['assets/game-abc.js','text/javascript; charset=utf-8'],['assets/game.css','text/css; charset=utf-8'],['schemas/game-save.schema.json','application/json; charset=utf-8'],['assets/sql-wasm-browser-abc.wasm','application/wasm']]){
 test('serves approved local '+name,()=>{const p=policy();assert.equal(p.APP_ORIGIN,'https://classic-tetris.invalid');assert.deepEqual(p.resolveAsset(p.APP_ORIGIN+'/'+name+'?v=1','GET',names),{relativePath:name,mime,head:false})});
}
test('HEAD preserves MIME and suppresses body',()=>{assert.deepEqual(policy().resolveAsset('https://classic-tetris.invalid/index.html','HEAD',names),{relativePath:'index.html',mime:'text/html; charset=utf-8',head:true})});
for(const url of ['http://classic-tetris.invalid/index.html','https://evil.invalid/index.html','https://classic-tetris.invalid.evil/index.html','https://user:password@classic-tetris.invalid/index.html','https://classic-tetris.invalid:444/index.html','file:///index.html','https://classic-tetris.invalid/../index.html','https://classic-tetris.invalid/%2e%2e/index.html','https://classic-tetris.invalid/assets%2fgame-abc.js','https://classic-tetris.invalid/assets\\game-abc.js','https://classic-tetris.invalid/assets/%00game-abc.js','https://classic-tetris.invalid/%zz','https://classic-tetris.invalid/docs/INSTALL.md','https://classic-tetris.invalid/LICENSE','https://classic-tetris.invalid/missing.js']){
 test('rejects untrusted request '+url,()=>assert.equal(policy().resolveAsset(url,'GET',names),null));
}
for(const method of ['POST','PUT','DELETE','OPTIONS','get'])test('rejects method '+method,()=>assert.equal(policy().resolveAsset('https://classic-tetris.invalid/index.html',method,names),null));
test('rejects unapproved existing-looking runtime asset',()=>assert.equal(policy().resolveAsset('https://classic-tetris.invalid/assets/old.js','GET',names),null));
test('content policy permits local module workers and WASM without inline script or general eval',()=>{const csp=policy().contentPolicy;assert.match(csp,/script-src 'self' 'wasm-unsafe-eval'/);assert.match(csp,/worker-src 'self'/);assert.match(csp,/connect-src 'self'/);assert.match(csp,/object-src 'none'/);assert.match(csp,/frame-ancestors 'none'/);assert.doesNotMatch(csp,/'unsafe-inline'|'unsafe-eval'|\*|https?:/)});
test('Windows profile uses a valid absolute APPDATA and rejects relative overrides',()=>{const p=policy();assert.equal(typeof p.chooseAppData,'function','Windows profile selection must be explicit');assert.equal(p.chooseAppData('win32',{APPDATA:'C:\\isolated profile'},'C:\\default'),'C:\\isolated profile');assert.equal(p.chooseAppData('win32',{APPDATA:'relative'},'C:\\default'),'C:\\default');assert.equal(p.chooseAppData('linux',{APPDATA:'C:\\ignored'},'/isolated'),'/isolated')});
