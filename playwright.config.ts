/** Isolated actual-runner environment and application acceptance targets. */
import { defineConfig } from '@playwright/test';
const target = process.env.TEST_TARGET ?? 'source';
const port = 4173;
export default defineConfig({
  testDir: './tests/browser', testIgnore: target === 'source' ? [] : ['**/remount.spec.ts','**/ghost-view.spec.ts','**/penetrator-view.spec.ts'], timeout: 20000, globalTimeout: 300000,
  expect: { timeout: 5000 }, workers: 1, retries: 0,
  use: { baseURL: `http://127.0.0.1:${port}${target === 'extracted' ? '/nested/game/' : '/'}`, headless: true, actionTimeout: 5000, navigationTimeout: 10000, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }, { name: 'firefox', use: { browserName: 'firefox', launchOptions: process.env.SDD_FIREFOX_RECOVERY === '1' ? { env: { ...process.env, MOZ_DISABLE_CONTENT_SANDBOX: '1' } } : {} } }],
  webServer: { command: target === 'source' ? `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort` : target === 'built' ? `npx --no-install vite preview --host 127.0.0.1 --port ${port} --strictPort` : 'python scripts/verify_package.py --serve', url: `http://127.0.0.1:${port}`, reuseExistingServer: false, timeout: 30000 },
});
