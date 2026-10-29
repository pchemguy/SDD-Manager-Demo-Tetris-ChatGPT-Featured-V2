/** Enforce the reusable core/session import and browser-global boundary. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
for (const dir of ['src/core', 'src/application']) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).filter(n => n.endsWith('.ts'))) {
    const text = readFileSync(join(dir, name), 'utf8');
    if (/from\s+['"][^'"]*(?:ui|platform)\//.test(text) || /\b(?:window|document|requestAnimationFrame|setTimeout)\s*[.(]|Math\.random/.test(text)) throw new Error(`Browser dependency in ${dir}/${name}`);
  }
}
console.log('Core/session dependency boundaries passed');
