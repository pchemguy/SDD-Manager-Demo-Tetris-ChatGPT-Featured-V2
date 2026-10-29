/** Run compiled unit files portably, without relying on shell glob expansion. */
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const dir = '.test-build/tests/unit';
const files = readdirSync(dir).filter(n => n.endsWith('.test.js')).map(n => `${dir}/${n}`);
if (!files.length) throw new Error('No unit tests discovered');
process.exitCode = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' }).status ?? 1;
