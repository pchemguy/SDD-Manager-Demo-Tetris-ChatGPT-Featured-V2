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

Run `npm run typecheck`, `npm run check:boundaries`, `npm run test:unit`, `npm run test:package`, and `npm run build`. `npm run test:unit` compiles TypeScript and runs Node tests without shell glob assumptions; `npm run test:package` selects the local pinned pytest tools. `npm run package` creates artifacts/classic-tetris-browser-v1.8.0.zip and its checksum; `npm run verify:package` checks all members, CRCs, manifest digests, required instructions and local asset references. Archive generation fixes entry times/order/modes; repeated actual build/package bytes were compared successfully.

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

A local managed Firefox diagnostic found pointer events could be swallowed when scrolling between controls with virtual time paused; document capture showed no pointer/mouse delivery. Keeping the native targets onscreen at 1000×1200 passed three consecutive cases. The expanded settings tests keep targets onscreen using 1600/1800px viewport heights; narrow/full-page layout screenshots and separate focus/lifecycle cases remain required. No production input or timing workaround was added.

## Configuration API and verification

createConfiguration() in src/application/configuration.ts owns one detached six-field selected value. update(patch) validates atomically, getSnapshot() copies, and toRuleOptions() projects the four gameplay rules. There is no storage, RNG or observer broadcast. createSession dispatch accepts the exact legacy immediateHardDropLock input or a complete four-rule value on Start/Restart; Snapshot.options keeps its legacy shape and Snapshot.rules is detached active state. Omitted model options retain active rules.

mountGame(mount, random?, configuration?) and createGameView(mount, onAction, onOptionsChange?, configuration?) retain legacy arguments. Reuse an explicit context for same-context remount retention; omission creates independent defaults. The view exposes refreshConfiguration() after external updates. Legacy option callbacks still receive only the immediateHardDropLock boolean projection. The browser entry supplies one shared context and projects it only for Start/Restart.

The 294 unit tests cover 96 selected configurations, 16 active combinations, exact timing/lock/drop pairs, rollback and compatibility. The 110 source and 94 built/extracted browser cases cover native controls, active/pending rules, all 6 display combinations, concealed accessible hints, canonical drop/queue, same-context remount/fresh contexts/reload/independent pages and independent cookie/URL persistence, denied sources/effects and pure-context storage guards. Source-only fixtures supplement exact boundaries and never ship. Keep source files unchanged during Vite-served acceptance: editing an HTML fixture can reload an unrelated running page. Full reruns are required after an invalidated source run. Phase4 milestone and final evidence remains under docs/dev/features/003_3977abb-session-only-game-configuration/.

## Penetrator APIs and verification

src/core/penetrator.ts owns penetratingLanding(board,piece) and canTraverse(board,piece): scan every downward origin through barriers, require in-board occupied cells and retain a valid final landing. tryRotate accepts an optional candidate predicate with unchanged default canPlace and ordered tables. lockWithAppearance couples logical occupancy and a separate boolean Appearance mask through one retained-row permutation; legacy lock still returns exactly board/cleared.

Session snapshots add penetratorActive, penetratorBonuses (0–3) and detached penetratorCells rows. activatePenetrator spends once on an eligible running piece, draws no RNG and inhibits Hold. Session owns mode-sensitive support, canonical ghost/drop, award/white lock/spawn transactions and refill rollback. No production board setter or free bonus exists. Configuration remains six selected page-memory values.

Public deterministic traces in tests/fixtures/penetrator-gameplay.ts earn four real quadruples to verify the cap. Model tests cover16 active-rule combinations, independent pockets/kicks/compaction, exact late remainders/support/reset/top-out/error boundaries. Actual source/built/extracted apps earn and spend via native keys, including disabled/failed-downward/immediate policies. Source-only penetrator-view and lifecycle fixtures cover exact appearance, all6 display choices, announcement restraint and retained/fresh contexts; they never ship.

The expanded full source suite measured approximately2.9 minutes locally; Playwright has a finite600-second global budget and the browser wrapper a660-second process bound. Keep source/fixtures and built assets unchanged while their suites run. Managed Chromium156 headless shell and Firefox157 are isolated in .browser-cache; diagnosed local Firefox recovery remains opt-in. Native headed OS focus and Electron are unverified/out of scope. Campaign004 evidence is under docs/dev/features/004_1cadd99-penetrator-mode/reports/phases/5/.

## Persistence lifetime verification

The expanded persistence suite measured 110 source cases in 218.5s and 94 built cases in 199.5s on the documented managed browsers.26 focused extracted-prefix cases passed in 21.8s, including real cookie attributes/expiry, host and non-root sibling-path isolation. The finite suite budget is600s with a660s wrapper, retaining cleanup headroom over measured execution. No browser/target is skipped to fit that budget.

Real page tests cover blocked cookie/history effects, two pages with reload-only synchronization and explicit URL priority, reopened contexts loaded with saved cookies, live paused edits and earned inventory resetting on reload. Source-only lifecycle tests reuse the real persisted controller across remounts after browser sources change, then verify an omitted-context mount still uses pure defaults even with a conflicting URL. Pure source-fault tests remain distinct from actual HTTPS cookie engine acceptance, which is unverified on this HTTP-only local server.

## Browser persistence API and delivery

The pure C-07 isConfigurationValue predicate shares the canonical six-field domain with the browser codec; defaults remain owned by createConfiguration(). Browser-only configuration-codec.ts resolves explicit search/cookie strings and constructs cookie/URL text. configuration-persistence.ts exports createBrowserConfiguration({readUrl,readCookies,writeCookie,replaceUrl}), returning the unchanged structural configuration controller. The page binds document/window callbacks and preserves history.state in replaceState.

Restore once before mount. Initial valid URL fields save to cookies; omitted/invalid fields do not overwrite or refresh cookies and fallback fields do not fill the URL. Actual updates delegate validation first, then save changed keys independently and replace the current URL once. Equal/empty/invalid patches have no persistence effects. A retained context does not reread browser sources during remount; fresh explicitly created contexts and omitted mount arguments remain pure defaults.

The actual source/built/extracted persistence suite exercises all six native fields, explicit defaults/false, independent fallbacks, duplicate/invalid input, unrelated query/fragment/history state, cookie attributes and expiry, two pages and reopened contexts, denied writes, paused live displays and actual earned-inventory reset. Source-only remount tests supplement lifetime without shipping fixtures. Cookies/URL never enter game snapshots or change active rules mid-game. The package includes the local worker, lazy SQLite runtime/WASM, canonical schema, notices and format guide, with embedded 1.8.0 metadata and stable public ZIP/checksum names. Actual native HTTPS cookie acceptance and OS-window focus remain unverified; HTTP browser engine behavior and pure HTTPS serialization are checked separately.

## Session leaderboard implementation and checks

C-09 src/application/leaderboard.ts exports GameResult and recordResult(history,finalResult): a pure validated descending top-ten insertion with earlier ties first and detached outputs. C-04 owns Snapshot.leaderboard and commits one complete final result with score/UUID/UTC timestamp on running-to-game-over before observers. Successful Start/Restart preserves results; failed transactions preserve both game/history. Completion metadata comes from explicit injected callbacks; ranking reads no clock and owns no global store or persistence callback.

mountGame retains its original mount/random/configuration arguments and cleanup return; an optional fourth explicit Session supports sequential retained-controller remount. Its RNG/reporter stay owned by that controller; default mounts and fresh page entry create independent controllers. Do not schedule one explicit controller through simultaneous mounts. C-05 renders semantic rank/score rows and the empty message without submission or focus effects.

Leaderboards are tested through literal ranking inputs, actual session ordinary/Hold top-out and failures, and real source/built/extracted page-entry completion. Source-only leaderboard-view.spec.ts and fixtures/leaderboard.html inspect empty/zero/ten rows and retained/fresh remount; they never ship. The twelve-game browser trace uses normal DOM keyboard events through the real board handler, without production game-state setters. Completion leaves settings cookies/URL/web storage unchanged; reload/new pages restore settings but not scores.

Expanded acceptance measured126 source cases in262.1s and106 built cases in217.6s, plus12 focused extracted-prefix leaderboard cases in34.2s. Phase8 uses finite600s suite and660s wrapper budgets; preserve dedicated managed Chromium/Firefox and process-local recovery. Native headed OS focus/actual HTTPS cookie engine remain unverified. The current static browser package uses1.8.0 metadata; historical phase7 reports retain their own final clean-install/full-distribution evidence.

## Completion metadata

`createSession(random, reporter, metadata)` requires explicit `newId()` and `completedAt()` callbacks. The browser host supplies cryptographic UUIDv4 values and canonical UTC timestamps at Game Over. Pure ranking validates and preserves complete `{id, score, timestamp}` records. Unit/source-only fixtures inject deterministic sources; these helpers never ship. A metadata failure rolls back the ending transition before observers; source side effects themselves are external inputs.

## Portable snapshot schema

`schemas/game-save.schema.json` is the canonical version1 JSON Schema. `npm run generate:save-validator` deterministically compiles the standalone runtime validator; `npm run check:save-validator` rejects stale output and runs before type/unit checks. The generated validator uses pinned Ajv8.20.0 and ajv-formats3.0.1; no runtime eval is needed. `file-snapshot.ts` additionally checks unique IDs, real canonical UTC times, score order and duplicate JSON members. Build copies the canonical schema to `dist/schemas/`; deployment allowlisting includes exactly that schema path. The pure codec does not itself download, restore or persist settings.

## Checked manual restore seam

`restoreSnapshot` validates the complete portable value, prepares selected configuration and captures current browser values at commit time. `Session.replaceLeaderboard` publishes history only after its synchronous collaborator commits checked persistence and the prepared selection; observers see both together. `prepareConfigurationRestore` attempts all six explicit cookies and one URL/history update, reads back visible values, and compensates owned values/absence after recoverable failures. Native control edits retain their existing best-effort behavior. Cookie/history APIs offer no cross-resource transaction: browser refusal of compensation is an explicit failure with uncommitted memory, not successful Restore. Original cookie expiry metadata is not readable; compensation preserves values under the existing application scope/attributes.

## File workers and lifecycle

The browser's `file-transfer.ts` owns actual file bytes, downloads, transient workers, deadlines and cancellation. `file-persistence.ts` stays DOM-free and unit-testable as the validated commit seam. Both belong to C11; this physical split keeps Window/File/Worker types out of the Node core/session test target. `file-worker.ts` has no live-state or persistence capability. Vite constructs its relative bundled URL from the module URL; all parsing occurs off the UI thread. Per-mount disposal fences late replies and cleans workers/timers/object URLs. Source-only file lifecycle fixtures inject explicit WorkerAccess capabilities; they are excluded from built/extracted targets and never ship.

The file-persistence source run reached the former300s global limit after135 passing cases with7 not run and no individual assertion failures. Expanded native/lifecycle acceptance therefore uses600s/660s, including cleanup headroom; all required browsers and targets remain enabled. The expanded focused run initially found a test setup ordering error (immediate-lock control selected after disabling Hard drop); selecting that value before disabling the control preserves the intended pending-versus-active assertion and passes both browsers.

## SQLite worker runtime

sql.js1.15.2 is pinned and loaded lazily only for SQLite operations. The browser export is paired with its actual `sql-wasm-browser.wasm` asset; Node codec tests use the package's Node runtime variant. SQLite lives only in transient worker memory. C11 validates table/column/storage/version/integrity and then the same portable domain contract; fixed queries, disabled schema trust/CHECK evaluation during integrity inspection and read-only mode avoid executing file-supplied SQL. Exact integer text is checked before conversion to JavaScript numbers. Python sqlite3 independently inspects honest exported database bytes.

`TEST_TARGET=runtime` with the `@sqlite-worker` browser grep serves the actual build under `/nested/game/` using a source-only prefix server. It is a runtime smoke, not package verification; final built/extracted acceptance remains required. The smoke follows the worker referenced by the active entry rather than selecting an arbitrary old filename. Firefox may revalidate the WASM with304; tests require a matching prior200/application-wasm response and successful real encode/decode. A real-build regression plants stale code and verifies cleanup and a single active worker; this existing build behavior passes without an additional build wrapper. Final distribution must still verify its exact clean candidate/manifest and repeated bytes.

Cold source SQLite initially caused a Vite reconnect/navigation after late dependency discovery; worker/module/WASM responses were200 rather than an HTML worker-entry failure. Explicit `optimizeDeps.include` for sql.js fixes the observed source optimizer path, confirmed with a cleared owned cache in both browsers. No Windows linked-path reproduction is claimed. SQLite initialization prefetches and validates local WASM before invoking the SDK, then passes the binary directly; corrupt assets return a clear operation error without an SDK abort diagnostic or breaking JSON/gameplay. Source tests distinguish Vite URL-import JavaScript from actual WASM responses and permit304 only after a valid prior200 for that same binary URL.

## Both-format native acceptance

The single Save choice exposes JSON and SQLite; Restore detects content rather than trusting a filename. Actual native downloads/uploads preserve a genuine completion through both codecs, with exported SQLite opened by Python sqlite3 and externally constructed databases accepted. Native replacement tests first replace different nonempty history, then restore an empty history; restoring never merges or fabricates a completion. Later real Game Over results join restored history under ordinary ranking rules.

Both-format page tests check explicit equal/default settings, rejected final settings, same-name retry, recoverable cookie/history write failures, restart retention and reload/new-page score reset. Earned-gameplay traces preserve penetrator bank, active mode and settled white mask. Paused board/Hold/queue and gravity-phase checks flush the native dialog's queued focus-pause event while still paused before resuming; they complement pure lock-countdown preservation tests. Source-only worker seams cover deadline/startup failures, busy controls, cancellation, delayed reading/replies and teardown cleanup. Run browser targets serially: overlapping runners share output paths and can invalidate trace cleanup independently of app behavior.

## UI layout ownership and acceptance

C05 retains the same view construction/board/render/refresh/destroy interface. It owns three local disclosure bindings with unique per-view IDs; native hidden semantics conceal entire panels, including file controls. There is no Session action, selected-setting field, URL/cookie value or portable snapshot member for visibility. C06 keeps focus/keyboard/frame ownership. The two lifecycle buttons dispatch existing start/restart/pause/resume actions, with paused Start explicitly described as resume.

Equal side tracks anchor the actual280px playfield to the viewport center at1440px and above. Narrow layout reuses the same DOM and stacks content; no resize store or second game loop is needed. Existing selected controls and Board DOM retain focus/identity. A programmatic hide transfers focus out of a descendant before concealing it; destroy removes each owned toggle handler.

`tests/browser/ui-layout.spec.ts` measures absolute geometry, all8 visibility states, responsive transition, native activation/focus, hidden-state retention, lifecycle behavior and help readability on every source/built/extracted target. Existing file tests gate real worker network requests to prove native JSON/SQLite completion and validation failure while panels are hidden; codecs and downloads remain real. Source-only ghost/remount fixtures supplement distinct-view IDs/independence/disposed handlers and retained-context fresh visibility. They remain excluded from shipped targets and archives.

Run the browser targets serially under the existing finite600s suite/660s wrapper and25min CI limits, preserving both managed browsers. UI integration checks passed34 source and30 each built/extracted-prefix cases before the metadata update; full current distribution results belong to the campaign milestone/phase report. Initial whole-source selector failures from removed summary and Ready Restart were corrected without weakening their keyboard/error/recovery assertions. No native Windows/headed focus or actual HTTPS engine evidence is inferred from these checks.
