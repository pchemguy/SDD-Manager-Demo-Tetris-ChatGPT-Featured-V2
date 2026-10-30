/** Enforce the reusable core/session import and browser-global boundary. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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
