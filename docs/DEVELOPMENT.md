# Development

Use Node.js 24+, npm and Python 3.11+ for packaging. The browser deployment requires none of these tools at player runtime. Dependencies are pinned in package-lock.json.

Validated tooling entry points: `npm ci`, `npm run typecheck`, `npm run check:boundaries`, `npm run build`, `npm run browsers:install`, and `npm run test:environment`. The playable browser loop is implemented. `npm run test:unit` checks deterministic rules/session behavior. `SDD_FIREFOX_RECOVERY=1 TEST_TARGET=built npm run test:browser` checks the built application on this diagnosed Linux host; use the ordinary command without the recovery variable on unrestricted hosts. Complete controls and static deployment packaging are implemented. Browser acceptance now fails on runtime/console errors and distinguishes source-only remount harnesses from built assets.

## Browser isolation and observed recovery

scripts/browser-env.mjs binds provisioning and execution to the absolute repository .browser-cache directory. Playwright 1.64.1 uses Chromium headless shell 156.0.8078.4 revision 1248 and managed Firefox 157.0 revision 1555. Environment tests exercise two independent contexts/pages per browser with input, rendering/screenshots and teardown; this is not game acceptance.

The execution proxy returned a 195-byte Site Unavailable HTML page for the Chromium CDN ZIP. Its official Chrome for Testing source succeeded: https://storage.googleapis.com/chrome-for-testing-public/156.0.8078.4/linux64/chrome-headless-shell-linux64.zip. Downloaded size: 125797539 bytes; SHA-256: c3e50596aef52c58f8fda3c6b3411c33d34c88b177b3ed1c2243359fd3b8ba20. The complete archive passed ZIP CRC checks, traversal/link rejection and extraction with preserved executable modes into the matching managed cache directory. Browser versions were not changed to retry. Firefox and FFmpeg succeeded through Playwright's official Microsoft fallback. Both owned installers had exited before their retained empty installation lock was removed.

Firefox's initial page creation crashed. DEBUG=pw:browser identified writing /proc/self/uid_map: EPERM. Only for trusted local tests in this diagnosed host, set SDD_FIREFOX_RECOVERY=1; the Firefox project then supplies MOZ_DISABLE_CONTENT_SANDBOX=1 to its browser process. Re-evaluate this opt-in on another host. Chromium uses the default managed headless-shell mode without a channel override. No system/personal browser or profile is used.

In Bash: `SDD_FIREFOX_RECOVERY=1 npm run test:environment`. In Windows CMD, set the variable for the selected command/session only. No PowerShell is required. Inherited npm http-proxy and NO_COLOR/FORCE_COLOR warnings were observed; they did not fail compilation, build or the two browser tests.

## Repeatable source and package checks

Install the pinned Node toolchain with `npm ci`. Install the optional Python test tools into the owned directory with `python -m pip install --target .test-tools -r requirements-dev.txt`; no global Python environment change is required. Package construction itself uses only the Python standard library.

Run `npm run typecheck`, `npm run check:boundaries`, `npm run test:unit`, `npm run test:package`, and `npm run build`. `npm run test:unit` compiles TypeScript and runs Node tests without shell glob assumptions; `npm run test:package` selects the local pinned pytest tools. `npm run package` creates artifacts/classic-tetris-browser-v1.2.0.zip and its checksum; `npm run verify:package` checks all members, CRCs, manifest digests, required instructions and local asset references. Archive generation fixes entry times/order/modes; repeated actual build/package bytes were compared successfully.

Run `npm run browsers:install`, then `npm run test:environment` for isolated browser capability checks. `npm run test:browser` runs the source application, including source-only remount fixtures. With TEST_TARGET=built it runs against production dist; with TEST_TARGET=extracted it verifies/extracts the ZIP and serves it below /nested/game/. Built/extracted runs exclude the source-only harness and include actual delivery-app interactions. Runtime and console errors, including page closure, fail app acceptance.

In Bash on this diagnosed restricted host, use `SDD_FIREFOX_RECOVERY=1 TEST_TARGET=extracted npm run test:browser`. In Windows CMD on an ordinary host, use `set "TEST_TARGET=extracted"`, run `npm run test:browser`, then `set "TEST_TARGET="`. The Firefox recovery switch is not a general Windows setting. Use only the repository's isolated browsers, not personal installations or profiles.

## Release procedure

Complete phase review, reports, tracking closure and explicit verified integration into main before publishing. Rebuild and verify final static assets after installation/control documentation is finalized. Local candidate names are versioned; publish the same verified ZIP bytes under the stable GitHub asset name classic-tetris-browser.zip, with a sidecar naming that stable file. This supports latest-release links without moving an existing tag.

Prepare the complete retained RELEASE-NOTES.md and ignored internal .release-highlights.md from complete Git history. The finalized Markdown is used verbatim as the default-branch release commit body, annotated-tag body and GitHub release body. Tag the verified default-branch release commit. Create a draft, attach/verify the ZIP and checksum, then publish and verify latest, tag/source, body and downloaded asset bytes. Keep notes after publication; remove only the owned internal highlights draft after verified consumption. CI performs local-style checks and packages the candidate; it is not a second release publisher.

## Verification limits

Native headed OS-window focus and future Electron delivery were not tested. Actual page focus/keyboard input is distinguished from controlled blur/visibility events. Firefox local testing uses the documented opt-in sandbox workaround; ordinary environments should first run without it. No signing or store distribution is provided for this static browser package.

## Modern-rule verification

The v1.1.0 model suite covers both kick families/directions, six-draw bag order/refill failures, one-next preview, once-per-lock hold/top-out, canonical ghost, exact independent grounding deadlines, hard-drop scores/options and detached transaction state. Browser modern-rules checks exercise real keys/native controls, delayed/immediate drop, next-game-only configuration, checked reload, repeat/focus and running narrow screenshots. Deployment tests derive expected manifest version from package metadata rather than a hardcoded prior release. Feature milestone evidence remains under docs/dev/features/001_0882e5d-modern-rule-extensions/reports/phases/2/. Follow current HANDOFF for completed versus pending integration/publication.

## Conditional ghost checks

The pure UI visibility helper uses canonical occupied cells; all 28 shape/orientation boundary cases and the complete session suite run without a DOM. Source-only ghost-view fixtures exercise rendering, snapshot isolation and independent mounts; the runner excludes them from built/extracted targets and packaging. Shipped-app cases create a real high stack and cross the midline with movement, both rotations, hold and replacement, including hidden hard drop. Native selector cases verify intermediate keyboard choices, focus, pause/restart/reload and shortcut exclusion.

A local managed Firefox diagnostic found pointer events could be swallowed when scrolling between controls with virtual time paused; document capture showed no pointer/mouse delivery. Keeping the native targets onscreen at 1000×1200 passed three consecutive cases. These model-timed gameplay cases therefore use that viewport; narrow/full-page layout screenshots and separate focus/lifecycle cases remain required. No production input or timing workaround was added.
