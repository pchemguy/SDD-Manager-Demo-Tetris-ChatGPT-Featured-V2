/** Bind provisioning and automation to this repository's owned browser cache. */
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
const child = spawn(process.execPath, ['node_modules/playwright/cli.js', ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: resolve('.browser-cache') } });
const timer = setTimeout(() => child.kill('SIGTERM'), 300000);
child.on('exit', code => { clearTimeout(timer); process.exitCode = code ?? 1; });
