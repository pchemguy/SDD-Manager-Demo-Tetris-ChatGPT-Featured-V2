/** Enforce the reusable core/session import and browser-global boundary. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { builtinModules } from 'node:module';
for (const dir of ['src/core', 'src/application']) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir,{recursive:true}).filter(n => typeof n==='string' && /\.(ts|js)$/.test(n))) {
    const text = readFileSync(join(dir, name), 'utf8');
    if (/from\s+['"][^'"]*(?:ui|platform)\//.test(text) || /\b(?:window|document|requestAnimationFrame|setTimeout)\s*[.(]|Math\.random/.test(text)) throw new Error(`Browser dependency in ${dir}/${name}`);
  }
}
// Shared DOM presentation consumes explicit configuration; it cannot import its browser adapter.
if(existsSync('src/ui'))for(const name of readdirSync('src/ui').filter(n=>n.endsWith('.ts'))){
 const text=readFileSync(join('src/ui',name),'utf8');
 if(/from\s+['"][^'"]*platform\//.test(text))throw new Error('Platform dependency in src/ui/'+name);
}
console.log('Core/application and shared UI dependency boundaries passed');

// Desktop privileges never enter the reusable view or browser renderer.
const nativeModules=new Set(builtinModules.flatMap(name=>[name,'node:'+name]));
for(const dir of ['src/core','src/application','src/ui','src/platform/browser']){
 for(const name of readdirSync(dir,{recursive:true}).filter(n=>typeof n==='string'&&/\.(?:ts|js)$/.test(n))){
  const source=readFileSync(join(dir,name),'utf8');
  for(const match of source.matchAll(/(?:from\s+|require\(\s*)['"]([^'"]+)['"]/g)){
   const target=match[1];if(nativeModules.has(target)||target==='electron'||target.startsWith('electron/')||target.includes('/electron/'))throw new Error('Desktop dependency in '+dir+'/'+name);
  }
 }
}
console.log('Shared/browser code contains no desktop or Node imports');
