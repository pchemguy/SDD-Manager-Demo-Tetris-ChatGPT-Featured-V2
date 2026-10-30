> Historical campaign009 source/evidence snapshot; current product owners are [PROJECT](../../PROJECT.md), [SPEC](../../SPEC.md), [PLAN](../../PLAN.md), [layout](../../layout.md) and sole executable [TASKS](../../TASKS.md). Archived checklists are non-executable.

# Windows Electron contracts

ED01–ED12 define the second delivery platform under FEATURE/design. Existing current SPEC and all game/UL/U/L/File contracts remain except the explicit platform additions here. C12 owns desktop runtime behavior; C13 owns distribution. Browser delivery stays independently usable.

## ED-01 — Supported delivery and launch

Provide a portable Windows10/11x64 ZIP with ClassicTetris.exe at its root. Extract the complete directory and double-click the executable from a normal user account; do not require admin installation, Node.js, npm, Python, a development server or internet bootstrap. Include all Electron runtime binaries/resources, app host/metadata and renderer dependencies. Launch from an arbitrary working directory and a path with spaces. Report missing/corrupt required local content clearly, with no remote fallback. The distribution is unsigned; installation guidance accurately identifies this and any actual native execution limits. No installer/store/updater/other desktop OS artifact is required.

## ED-02 — Shared renderer and retained browser

The desktop renderer is byte-identical to the renderer content of the same-version verified browser build/package: index, built JS/CSS, worker/WASM and canonical JSON Schema. Retain the browser's static HTTP/HTTPS and relative-prefix hosting, stable asset names, controls/layout/accessibility, six-setting timing and JSON/SQLite version1 compatibility. Desktop-only host/runtime files never enter the browser build/archive. Core/application/UI cannot import Electron/Node or acquire desktop branches. No duplicate game state/logic or production test-only gameplay hook exists.

## ED-03 — Local origin and content policy

Load https://classic-tetris.invalid/index.html through an Electron in-process HTTPS handler bound to the app session. There is no listening socket/server or DNS/network forwarding. Only this exact origin, GET/HEAD and renderer index/asset/schema members approved by the trusted packaged manifest may resolve. Ignore query for asset lookup while retaining it in page history. Reject unknown/unsafe/malformed paths, other origins/ports/credentials, unsupported methods, symlinks/escapes and missing required files. Return correct HTML/JS/CSS/JSON/WASM MIME; HEAD has no body. Never expose arbitrary local paths, manifests/credentials or development source via the handler.

Use restrictive content policy with local scripts/styles/worker/fetch and required WASM compilation, no inline script/eval or CSP bypass. Block nonlocal network requests, unexpected navigation/popups/webviews and permission requests. Permit only legitimate local resources and app-generated blob downloads. No open-external or arbitrary URL/file capability is exposed to renderer content.

## ED-04 — Renderer isolation

Explicitly disable Node integration in renderer/workers/subframes; enable context isolation, sandbox and web security. No preload/IPC bridge or Node global is exposed. Production launch never disables sandbox/web security or opens debugging ports/devtools automatically. Electron/Node access belongs solely to C12. Host unit/policy checks and actual runtime assertions where available establish configuration and resource containment; browser-only execution does not establish Electron isolation.

## ED-05 — Window and application lifetime

Open one resizable game window, titled Classic Tetris, with usable initial dimensions at least1440x900 CSS content pixels where display permits. Keep shared responsive layout/viewport centering when resized, including narrow widths supported by the game. Native focus loss/visibility pause uses existing C06; returning focus never implicitly resumes. Normal Pause/Start and Board shortcuts retain their behavior.

Allow one active process/window per desktop profile. A second launch focuses/restores the existing window without resetting active gameplay; do not accept command-line URLs/deep links to load content. Closing the window exits; a subsequent cold launch starts ready with empty session leaderboard and all optional panels shown. No window/game/session/URL history is automatically restored. Flush owned cookie storage on normal shutdown, with bounded failure handling; startup/load/download/shutdown failures report clear native diagnostics where renderer is unavailable.

## ED-06 — Settings and profile

Use an isolated stable ClassicTetris application profile under the current user's application-data directory. Do not write settings into the extracted application directory or share a browser's profile. The exact six selected fields use existing host-only one-year cookies and URL syntax at the fixed origin. Native edits update the changed cookie/query field; valid Restore applies all six checked cookie/URL values. Query values still precede cookies/defaults. Fresh cold launch has no previous query and restores selected cookies while starting fresh game/history/visibility. No extra setting, automatic score persistence or unfinished-game save is introduced. Verify normal close/relaunch retention with isolated test profiles when a desktop runtime is available.

## ED-07 — Manual native files

Keep existing Settings Save/Restore and formats, including hidden-panel state/operation behavior. Restore uses the native file picker and accepts JSON/SQLite by content; complete shared validation/staging precedes every results/settings/cookie/URL change. Preserve stable IDs, integer scores, UTC timestamps, exact six settings and existing rollback/error guarantees. Restored results replace the session leaderboard and later genuine completion joins it; cold launch clears results unless manually restored again.

Save exports through the existing worker/codecs and one blob download, with a native destination flow and default classic-tetris-save.json or classic-tetris-save.sqlite filename. Host accepts only app-origin JSON/SQLite blob downloads; deny arbitrary remote downloads. Canceling destination/file selection changes no application data and leaves the app usable; native download failure is reported clearly. UI export status retains browser handoff semantics, not a guarantee that a canceled native destination wrote a file. Test real cross-platform/cross-format roundtrips and invalid-final-field zero mutation, including after panel hide/show. Do not substitute mocked codecs for bundled worker/WASM acceptance.

## ED-08 — Pinned runtime and artifact integrity

Pin an actual supported stable Electron Windows x64 release and official runtime ZIP SHA256 in build inputs; reject checksum mismatch before use. Record official URL/version/digest and vendor license/notices. No moving latest runtime URL, unsigned ad-hoc binary or download-on-player-start. Preserve all required vendor binaries/resources; renamed executable bytes still match their pinned vendor source. C13 verifies trusted runtime members and exact shared renderer/app host inputs, not merely an attacker-editable self-reported manifest. Reject missing/stale/unexpected members, duplicates, case collisions, unsafe ZIP paths, symlinks, corrupt CRC, wrong executable/version/architecture metadata, altered digests and credential/source/test/cache inclusion. Required vendor binary/debug assets are distinguished from forbidden checkout source; do not drop required files by a browser-only allowlist.

## ED-09 — Reproducible outputs

Generate artifacts/classic-tetris-windows-x64-v1.9.0.zip with filename-specific .sha256 and stable release/classic-tetris-windows-x64.zip plus its checksum. The desktop manifest records app version1.9.0, kind windows-electron, target win32/x64, runtime provenance and member digests. Repeated package creation from identical pinned inputs yields identical bytes. Independently extract and verify actual artifacts/entry/resources, aliases/checksums, manifest/CRC/digests, vendor provenance and renderer equivalence. Existing browser artifacts remain independently verified under their own strict policy; all current application/package/install metadata agrees on1.9.0. Game save format remains1.

## ED-10 — Release and documentation

Applicable1.9.0 and later dual-platform GitHub releases contain exactly the browser ZIP/checksum and Windows x64 ZIP/checksum, with stable names. Retain exact release-body/source/tag agreement, latest selection and actual anonymous tag/latest download-byte verification for all four assets. Release notes and README/install/controls/development guides explain both platforms, extraction/launch, offline bundled operation, unsigned status, separate profiles, session/manual files and actual supported/unverified checks. Include required licenses/notices and checksum verification. Do not claim native Windows compatibility/installation was tested unless actual execution supports it. Preserve existing releases/tags; no updater or release of a source-only desktop stub.

## ED-11 — Verification scope

Require meaningful host-policy/security/error unit tests, package success/rejection/integrity/reproducibility checks and full existing browser source/built/extracted acceptance in managed Chromium/Firefox. Test actual packaged renderer/runtime assets, offline startup, gameplay/lifecycle/layout/settings/cookie/URL/relaunch, native JSON/SQLite transfer/invalid atomicity and isolation/network containment using available desktop facilities. Dedicated test profiles/download paths isolate user data. Prefer an actually available hosted Windows runner for native package smoke/acceptance; do not require unavailable facilities or label cross-build/browser checks native. Missing target-native execution is excluded by default and reported unverified; feasible in-scope build/test failures remain blockers. Keep finite measured runner/suite/CI budgets and source-only fixture exclusions.

## ED-12 — Completion acceptance

All ED contracts map to accepted design, bounded tasks and actual evidence. Both verified artifacts and required reviews/documentation/tracking closures are present, no unresolved blocker/TODO remains, current authorities incorporate accepted scope and main TASKS uniquely owns prior and new global IDs. Integrate the complete phase explicitly into its actual recorded main parent, verify/publish the merged result, then eligible default release-source/tag/body/assets/public downloads and applicable actual CI outcomes. Reports distinguish implemented, cross-built, inspected and natively executed behavior and all unavailable facilities. Frozen earlier campaigns and existing browser behavior remain preserved.
