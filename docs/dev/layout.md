# Repository layout

## Ownership map

This map assigns physical homes to the components in [DECOMPOSITION](DECOMPOSITION.md) and delivery in [PLAN](PLAN.md). Product source/test/tooling paths below describe the intended layout; their listing does not claim they have been implemented. Development documents and bundled agent instructions already exist.

| Path | Owner and purpose |
| --- | --- |
| src/core/types.ts | Shared board/piece/progression value types used by C-01 through C-04. |
| src/core/pieces.ts | C-01: piece definitions and orientation transforms. |
| src/core/board.ts | C-02: placement, movement, locking and simultaneous row compaction. |
| src/core/progression.ts | C-03: scoring, level and gravity interval functions. |
| src/application/session.ts | C-04: session lifecycle, commands, elapsed time, snapshots/subscriptions and integration error boundaries. |
| src/ui/game-view.ts, src/ui/styles.css | C-05: reusable DOM view/styles, controlled settings, snapshot projection and semantic actions. |
| src/platform/browser/main.ts | C-06: composition, frame/input/focus/visibility lifecycle and teardown. |
| index.html | Static browser entry with the mount element and source module entry. |
| tests/unit/ | Node-run compiled TypeScript tests for core, progression and session contracts. |
| tests/browser/ | Playwright tests for assembled source/built/extracted applications, controls, rendering and lifecycle. |
| tests/fixtures/ | Deterministic board/sequence fixtures and isolated UI/session integration harnesses. Not a production debug interface or deployment asset. |
| scripts/check-boundaries.mjs | Static import/global boundary checks for core/session versus UI/host. |
| scripts/browser-env.mjs | Set a consistent absolute isolated browser cache path for runner/provisioning; launch the local pinned Playwright CLI. |
| scripts/package_browser.py | Python standard-library ZIP creation, allowlisted deployment contents and SHA-256 checksum generation. |
| scripts/verify_package.py | Extract/archive inspection and deployment-content/path checks, including exclusions. |
| package.json, package-lock.json | Pinned npm development toolchain and repeatable command entry points; application version. |
| tsconfig.json, tsconfig.core.json, tsconfig.test.json | Browser typecheck, DOM-free core/session check and Node test compilation ownership. |
| vite.config.ts, playwright.config.ts | Relative production assets and actual source/preview/extracted test-server targets. |
| .github/workflows/ci.yml | Reproducible type/unit/build and isolated Chromium/Firefox checks; no signing or Electron jobs. |
| README.md, docs/INSTALL.md, docs/CONTROLS.md, docs/DEVELOPMENT.md | User-facing overview, static deployment, gameplay and developer instructions. |
| RELEASE-NOTES.md | Finalized release message used for the Git tag and GitHub release. |
| docs/dev/ | Current development authorities, preparation evidence and executable task list. |
| docs/dev/reports/phases/1/ | Milestone reports 1.1.md, 1.2.md, 1.3.md and PHASE-REPORT.md. |
| docs/dev/reports/IMPLEMENTATION-REPORT.md | Final implementation outcome and aggregated remaining TODOs. |
| docs/ai-logs/ | Manually maintained, non-authoritative provenance records; excluded from routine validation. |
| .agents/ | Existing bundled plugin/skill instructions; not product source or deployment content. |

## Dependencies and placement rules

src/core imports only its own value/rule modules. src/application may import core; it may not import UI/platform modules. src/ui consumes session snapshot/action types and an injected mount element. src/platform/browser composes those modules and owns window-level APIs. No core/session module reads browser globals or a global random source. Keep DOM-free compiler configuration and boundary checks separate from browser compilation.

Tests follow responsibility rather than mirroring every implementation function. Shared fixtures live in tests/fixtures; production code does not import tests. Integration harnesses mount real session/UI components without adding global state-injection APIs to the shipped app. Documentation links route to the authoritative root rather than duplicate behavior contracts.

Node's runner executes compiled unit tests from .test-build. Playwright uses the pinned local package through scripts/browser-env.mjs; the wrapper assigns one absolute .browser-cache location consistently to provisioning and execution. No personal/system browser or profile is selected. npm scripts provide cross-platform entry points without requiring PowerShell.

Packaging uses Python 3.11+ standard-library scripts; this is a developer/release prerequisite, not a player runtime dependency. The archive contains dist assets, LICENSE, required notices and installation/control instructions. Verify it after final docs are included, then test extracted static assets through an owned HTTP server.

## Generated and secret paths

dist/, artifacts/, .test-build/, .browser-cache/, test-results/, playwright-report/, node_modules/ and local caches are generated and ignored. Browser profiles/downloads and temporary extraction/server state live only in owned ignored directories. Never package .agents, docs/dev, source tests, credentials or browser installations.

The conventional ignored gh.tkn remains beside root .gitignore. It is never an asset, fixture, report input or archive member. Packaging allowlists contents and rejects symlinks, unsafe archive paths and credential-like files. The final artifact names are classic-tetris-browser-v1.5.0.zip and classic-tetris-browser-v1.5.0.zip.sha256 under artifacts/.

Root AGENTS.md retains execution policies and links current authorities. Setup/check commands are added there only after their implementation and validation; this planned layout does not claim those commands already work.

## Modern phase allocation

| Path | Owner |
| --- | --- |
| src/core/kicks.ts | C-02 ordered SRS candidates; board legality and geometry only. |
| src/core/bag.ts | Pure six-draw shuffle; no singleton state. |
| docs/dev/spec/modern-rules.md | Focused current F-01–F-08 behavioral contracts. |
| tests/unit/kicks.test.ts, tests/unit/bag.test.ts | Literal geometry and deterministic bag acceptance. |
| tests/browser/modern-rules.spec.ts | Actual modern controls, panels, timers and options. |
| docs/dev/features/001_0882e5d-modern-rule-extensions/ | Historical accepted feature/preparation/QC sources and retained Phase 2 reports. |

C-04 owns private bag/hold/options/active rules and policy-specific clocks; C-05 renders snapshots and selected settings; C-07 owns selected memory; C-06 projects its rules and owns browser resources. TASKS is the sole current executable task owner. Version metadata and local artifacts use v1.5.0; stable release asset names remain unchanged.

## Conditional ghost allocation

| Path | Owner |
| --- | --- |
| src/ui/ghost-visibility.ts | C-05 pure typed occupied-cell predicate. |
| src/ui/game-view.ts, src/ui/styles.css | Explicit selected-context mode/latest snapshot, native select, common cell/text rendering and cleanup. |
| tests/unit/ghost-visibility.test.ts, tsconfig.test.json | DOM-free28 shape/orientation boundary tests and compiler inclusion. |
| tests/browser/ghost-visibility.spec.ts | Actual native controls, high-stack crossings, hidden hard drop and lifecycle. |
| tests/browser/ghost-view.spec.ts, tests/fixtures/ghost-visibility.html | Source-only shared-view fixture, excluded from built/extracted suites and package. |
| docs/dev/spec/ghost-visibility.md | Current focused G-01–G-05 contracts. |
| docs/dev/features/002_0adba6e-conditional-ghost-visibility/ | Historical current-campaign feature/preparation/QC archive and fixed Phase3 milestone/phase/final reports. |

Canonical core/session and host resources retain their previous ownership. Current application metadata/package uses1.5.0; stable release asset names are unchanged. TASKS owns all executable product tasks.

## Session configuration allocation

| Path | Owner |
| --- | --- |
| src/application/configuration.ts | C-07 six types/defaults, atomic detached memory and four-rule projection; no DOM/RNG/storage. |
| src/application/session.ts | C-04 exact legacy/complete inputs, active rules, both policies and disabled actions. |
| src/ui/game-view.ts, src/ui/styles.css, src/ui/ghost-visibility.ts | C-05 six native settings, current/pending state, live concealment, pure visibility predicate/type re-export and explicit refresh. |
| src/platform/browser/main.ts | C-06 one page context, rule projection on Start/Restart, existing frame/input/focus teardown. |
| tests/unit/configuration.test.ts, tests/unit/configuration-session.test.ts | Selected96/active16 combinations, exact timing/disabled/rollback/compatibility. |
| tests/browser/configuration.spec.ts | Actual six controls, live/pending rules, pure-context isolation/browser persistence and independent pages across source/built/extracted. |
| tests/browser/ghost-view.spec.ts, tests/browser/remount.spec.ts, tests/fixtures/ | Source-only exact refresh/lifetime seams, excluded from distribution. |
| docs/dev/spec/session-configuration.md | Current S-01–S-08 contracts. |
| docs/dev/features/003_3977abb-session-only-game-configuration/ | Historical eligible source/preparation/adjacent-QC archive; fixed Phase4 milestone/phase/final reports. |

Current static package uses1.5.0 and stable release ZIP/checksum names. C-08 owns browser persistence; no backend/new delivery platform is allocated. TASKS alone owns all46 executable product tasks.

## Penetrator allocation


Penetrator implementation and verification have the following physical owners.

| Path | Responsibility |
| --- | --- |
| src/core/penetrator.ts | C-02 pure deepest legal landing and guarded traversal predicate; explicit board/piece inputs. |
| src/core/types.ts, src/core/board.ts | Appearance type/empty factory and appearance-aware lock with shared row compaction; retain logical Board and exact legacy lock result. |
| src/core/kicks.ts | Optional pure candidate predicate with unchanged default tables/order/O/error behavior. |
| src/application/session.ts | C-04 detached bank/mode/mask, ordinary four-line awards, activation/hold/traversal/grounding/drop/ghost selection and atomic lock/spawn/rollback. |
| src/ui/game-view.ts, src/ui/styles.css | C-05 active/settled/ghost white flags, bonus symbols/count, mode/Hold descriptions and stale-state clearing; retain six native settings. |
| src/platform/browser/main.ts | C-06 nonrepeated board B action and existing input/frame/focus lifecycle. |
| tests/unit/penetrator.test.ts, tests/unit/appearance.test.ts | Literal pocket/bounds/kick/immutability and coupled row-mask compaction tests. |
| tests/unit/penetrator-session.test.ts, existing session suites | Earn/spend/cap/hold/lifetime/timers/drop/ghost/rollback and legacy regression. |
| tests/fixtures/penetrator-gameplay.ts | Deterministic legal random/action traces shared by tests to earn actual four-line awards; not production imports or setters. |
| tests/browser/penetrator.spec.ts | Actual source/built/extracted earned-bonus B gameplay, policies, ghost/drop and indicator/white lifecycle. |
| tests/browser/penetrator-view.spec.ts, tests/fixtures/penetrator-view.html | Source-only real-view snapshot appearance/bonus/accessibility boundary fixture. |
| tests/browser/configuration.spec.ts, remount.spec.ts, lifecycle.spec.ts and existing fixtures | Settings independence, focus/repeat, reset and resource/lifetime regression. |
| playwright.config.ts, tsconfig.test.json if needed | Explicit source-only fixture exclusion for built/extracted, compiler coverage and measured finite suite budget. |
| README.md, docs/CONTROLS.md, INSTALL.md, DEVELOPMENT.md | Accurate key/bonuses/colors/Hold/landing/settings/lock policy and static deployment guidance. |
| package.json, package-lock.json, existing scripts/CI/release inputs |1.5.0 metadata, relative build, strict reproducible package and source/artifact/readback checks. |
| docs/dev/features/004_1cadd99-penetrator-mode/ | Fixed milestone5.1/5.2/phase/final evidence and eligible accepted-source/preparation/adjacent-QC archive. |

Local versioned artifacts use classic-tetris-browser-v1.5.0.zip and sidecar; public release assets retain classic-tetris-browser.zip and matching checksum filename. Existing allowlisted assets/docs/licenses only; no test trace/HTML fixture, credential, dev source/cache or browser installation ships. RELEASE-NOTES remains the exact retained release body; the internal highlights file stays ignored and is consumed only after publication verification. The six-field browser format belongs to C-08; no service, generic plugin layer or new runtime dependency is allocated.

## Browser persistence allocation

C-08 has pure codec and callback effect modules within the browser platform directory. The following map owns current source, tests and documents.

| Path | Component / purpose |
| --- | --- |
| src/application/configuration.ts | C-07 existing module: expose canonical pure field validation while retaining controller/default/rule-projection contracts. |
| src/platform/browser/configuration-codec.ts | C-08 pure URL/cookie resolution, cookie scope/assignment and current-URL construction; explicit inputs, no ambient DOM or side effects. |
| src/platform/browser/configuration-persistence.ts | C-08 callback-based persisted-controller factory, initial explicit URL saves, atomic delegation and independently contained changed-field effects. |
| src/platform/browser/main.ts | C-06 actual page entry supplies document/window callbacks to C-08; reusable mountGame default and existing native lifecycle stay intact. |
| tests/unit/configuration.test.ts | Existing pure C-07 domain/detachment/unknown-key regression plus exported validator agreement. |
| tests/unit/configuration-codec.test.ts | Strict six-setting formats/precedence/duplicates, default/omitted cases, immutability, cookie attributes/path and URL semantics. |
| tests/unit/configuration-persistence.test.ts | Real C-07 with injected sources/effects: initialization, no-op/invalid atomicity, multi-field patches, failures and context reuse. |
| tests/browser/configuration-persistence.spec.ts | Real page-entry native restoration/edits/reload/reopen/cookies/history/failure behavior for source/built/extracted targets; not excluded from distribution acceptance. |
| tests/browser/configuration.spec.ts and existing lifecycle/remount/ghost/penetrator suites/fixtures | Amend only obsolete browser-entry no-storage/reload-default assertions; preserve pure-context/default isolation, focus, rule timing and ordinary/penetrator regressions. Existing source-only fixtures remain excluded from shipped targets. |
| tsconfig.test.json, scripts/test-unit.mjs | Existing compiled Node test discovery/compiler ownership; adjust only if new DOM-free modules/tests need explicit inclusion. |
| scripts/check-boundaries.mjs | Retain core/application protection and check shared UI cannot import platform modules; allow C-06/C-08 to import reusable modules. |
| playwright.config.ts, scripts/browser-env.mjs | Keep managed browsers, three actual targets and finite measured budgets. Extend budget only when measured execution justifies it, with the wrapper still longer than the suite. |
| README.md, docs/CONTROLS.md, docs/INSTALL.md, docs/DEVELOPMENT.md | Player query/cookie behavior, supported hosting/scope, changed lifetime, unchanged gameplay controls and validated development commands/evidence limits. |
| package.json, package-lock.json, scripts/package_browser.py, scripts/verify_package.py, tests/fixtures/package_checks.py, existing release/CI inputs | v1.5.0 metadata and any existing version assertions; strict reproducible relative archive/checksum, current shipped guides and artifact verification. Do not add another package path or dependency. |
| docs/dev/spec/configuration-persistence.md | Canonical U-01–U-08 child linked from current SPEC as the canonical U contract owner. |
| docs/dev/PROJECT.md, ARCHITECTURE.md, DECOMPOSITION.md, SPEC.md and affected spec children, PLAN.md, layout.md, TASKS.md, adjacent QC reports, AGENTS.md | Current product/owner reconciliation at the owning phase review; preserve earlier ranges and update only affected current documents. |
| docs/dev/features/005_5153bbf-url-get-cookie-persistence/ | Fixed6.1/6.2/phase/final evidence and eligible005 source/preparation/QC archive after final incorporation. |

Public release assets remain `classic-tetris-browser.zip` and its `.sha256` sidecar; local intended outputs are `artifacts/classic-tetris-browser-v1.5.0.zip` and its matching sidecar. Archive membership remains the established build assets, manifest, license/notices and shipped instructions; no codec source, tests, fixtures, docs/dev, credentials, browser cache or node_modules ships. RELEASE-NOTES retains the exact final body at the release boundary; internal highlights remain ignored and are cleaned up only after verified publication consumption.

The adapter's two files separate deterministic format logic from effects without adding a service layer or generic storage abstraction. Both compile without DOM types because effects enter through explicit callbacks; only main.ts binds actual browser objects. C-05's structural controller consumer requires no additional callback or storage import. The component-to-path map supports each milestone without moving unrelated modules or changing existing source-only fixture ownership.

## Session leaderboard allocation

This scoped allocation supports the intended [leaderboard architecture](FEATURE_ARCHITECTURE.md), [component model](FEATURE_DECOMPOSITION.md), [L contracts](FEATURE-SPEC.md) and [Phase7 plan](FEATURE-PLAN.md). New paths below are intended allocations, not claims of implemented files. Unaffected owners and earlier phase/task ranges stay intact.

| Path | Component / physical responsibility |
| --- | --- |
| src/application/leaderboard.ts | C-09 pure score-result types, validation and detached top-ten insertion; no DOM/platform/storage imports or mutable singleton. |
| src/application/session.ts | C-04 transaction-owned history, additive detached Snapshot field, final-score completion and Start/Restart preservation. |
| src/ui/game-view.ts, src/ui/styles.css | C-05 read-only labelled rank/score panel, empty state, narrow/wide layout and existing focus-preserving render path. |
| src/platform/browser/main.ts | C-06 optional explicit Session argument and unchanged default fresh controller/page-entry/cleanup. No history storage or settings-codec modification. |
| tests/unit/leaderboard.test.ts | Literal ranking/tie/capacity/zero/validation/immutability fixtures. |
| tests/unit/leaderboard-session.test.ts, existing session suites | Final-score/once-only/ordinary and Hold endings, rollback/listener/reentry, reset, policies/RNG/clock and detached-history tests. |
| tests/browser/leaderboard.spec.ts | Actual page-entry completion/ranking/Restart/reload/new-page/settings-independence and panel acceptance on source/built/extracted. |
| tests/browser/leaderboard-view.spec.ts, tests/fixtures/leaderboard.html | Source-only injected real-view snapshots and explicit-controller sequential remount seam; no production setter. |
| tests/fixtures/leaderboard-gameplay.ts if shared trace needed | Test-only deterministic legal action/RNG trace for real top-out; no production import or fixture shortcut to game state. |
| Existing snapshot fixtures, configuration/lifecycle/remount/browser tests | Supply detached history field and preserve earlier consumer/control/resource/persistence acceptance. |
| tsconfig.test.json, scripts/test-unit.mjs, scripts/check-boundaries.mjs | Existing DOM-free compiler/discovery and dependency enforcement; new application tests already fit directories, adjust only demonstrated gaps. |
| playwright.config.ts, scripts/browser-env.mjs | Explicit source-only fixture exclusion for built/extracted targets, dedicated Chromium/Firefox and measured finite suite/wrapper budgets. |
| README.md, docs/CONTROLS.md, docs/INSTALL.md, docs/DEVELOPMENT.md | Accurate leaderboard qualification/ties/page lifetime, preserved configuration behavior, deployment and verified commands/evidence limits. |
| package.json, package-lock.json, existing package/release/CI scripts and package tests | Planned1.6.0 version metadata and strict relative/reproducible browser ZIP/checksum using current build path and allowlist. No new dependency or publisher. |
| docs/dev/spec/leaderboard.md | Intended canonical L-01–L-08 owner after accepted phase incorporation; active FEATURE-SPEC remains owner until then. |
| docs/dev/PROJECT.md, ARCHITECTURE.md, DECOMPOSITION.md, SPEC.md and affected children, PLAN.md, layout.md, TASKS.md, current adjacent QC and AGENTS.md | Owning final phase task reconciles accepted scope/current navigation and unique executable task ownership. |
| docs/dev/features/006_ea39055-leaderboard/reports/phases/7/7.1.md,7.2.md,PHASE-REPORT.md and package IMPLEMENTATION-REPORT.md | Fixed milestone/phase/final implementation evidence. Eligible006 accepted sources/preparation/adjacent QC archive at final incorporation; earlier records untouched. |

Intended local distribution: artifacts/classic-tetris-browser-v1.6.0.zip and corresponding checksum; stable public assets remain classic-tetris-browser.zip and classic-tetris-browser.zip.sha256. Existing build assets/manifest/license/notices/shipped guides only; no source fixture/trace, docs/dev, credential, dependency/browser cache or development source in the archive. Keep finalized root RELEASE-NOTES and ignored internal highlights ownership under the established release workflow. No FEATURE-LAYOUT or extra service/package tree is allocated.
