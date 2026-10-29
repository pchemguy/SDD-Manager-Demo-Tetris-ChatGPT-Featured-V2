# Development

Use Node.js 24+, npm and Python 3.11+ for packaging. The browser deployment requires none of these tools at player runtime. Dependencies are pinned in package-lock.json.

Validated tooling entry points: `npm ci`, `npm run typecheck`, `npm run check:boundaries`, `npm run build`, `npm run browsers:install`, and `npm run test:environment`. Game unit/application checks are added by subsequent tasks; the current bootstrap is explicitly nonplayable.

## Browser isolation and observed recovery

scripts/browser-env.mjs binds provisioning and execution to the absolute repository .browser-cache directory. Playwright 1.64.1 uses Chromium headless shell 156.0.8078.4 revision 1248 and managed Firefox 157.0 revision 1555. Environment tests exercise two independent contexts/pages per browser with input, rendering/screenshots and teardown; this is not game acceptance.

The execution proxy returned a 195-byte Site Unavailable HTML page for the Chromium CDN ZIP. Its official Chrome for Testing source succeeded: https://storage.googleapis.com/chrome-for-testing-public/156.0.8078.4/linux64/chrome-headless-shell-linux64.zip. Downloaded size: 125797539 bytes; SHA-256: c3e50596aef52c58f8fda3c6b3411c33d34c88b177b3ed1c2243359fd3b8ba20. The complete archive passed ZIP CRC checks, traversal/link rejection and extraction with preserved executable modes into the matching managed cache directory. Browser versions were not changed to retry. Firefox and FFmpeg succeeded through Playwright's official Microsoft fallback. Both owned installers had exited before their retained empty installation lock was removed.

Firefox's initial page creation crashed. DEBUG=pw:browser identified writing /proc/self/uid_map: EPERM. Only for trusted local tests in this diagnosed host, set SDD_FIREFOX_RECOVERY=1; the Firefox project then supplies MOZ_DISABLE_CONTENT_SANDBOX=1 to its browser process. Re-evaluate this opt-in on another host. Chromium uses the default managed headless-shell mode without a channel override. No system/personal browser or profile is used.

In Bash: `SDD_FIREFOX_RECOVERY=1 npm run test:environment`. In Windows CMD, set the variable for the selected command/session only. No PowerShell is required. Inherited npm http-proxy and NO_COLOR/FORCE_COLOR warnings were observed; they did not fail compilation, build or the two browser tests.
