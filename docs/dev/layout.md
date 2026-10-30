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

The conventional ignored gh.tkn remains beside root .gitignore. It is never an asset, fixture, report input or archive member. Packaging allowlists contents and rejects symlinks, unsafe archive paths and credential-like files. The final artifact names are classic-tetris-browser-v1.4.0.zip and classic-tetris-browser-v1.4.0.zip.sha256 under artifacts/.

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

C-04 owns private bag/hold/options/active rules and policy-specific clocks; C-05 renders snapshots and selected settings; C-07 owns selected memory; C-06 projects its rules and owns browser resources. TASKS is the sole current executable task owner. Version metadata and local artifacts use v1.4.0; stable release asset names remain unchanged.

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

Canonical core/session and host resources retain their previous ownership. Current application metadata/package uses1.4.0; stable release asset names are unchanged. TASKS owns all executable product tasks.

## Session configuration allocation

| Path | Owner |
| --- | --- |
| src/application/configuration.ts | C-07 six types/defaults, atomic detached memory and four-rule projection; no DOM/RNG/storage. |
| src/application/session.ts | C-04 exact legacy/complete inputs, active rules, both policies and disabled actions. |
| src/ui/game-view.ts, src/ui/styles.css, src/ui/ghost-visibility.ts | C-05 six native settings, current/pending state, live concealment, pure visibility predicate/type re-export and explicit refresh. |
| src/platform/browser/main.ts | C-06 one page context, rule projection on Start/Restart, existing frame/input/focus teardown. |
| tests/unit/configuration.test.ts, tests/unit/configuration-session.test.ts | Selected96/active16 combinations, exact timing/disabled/rollback/compatibility. |
| tests/browser/configuration.spec.ts | Actual six controls, live/pending rules, no-storage/URL and independent pages across source/built/extracted. |
| tests/browser/ghost-view.spec.ts, tests/browser/remount.spec.ts, tests/fixtures/ | Source-only exact refresh/lifetime seams, excluded from distribution. |
| docs/dev/spec/session-configuration.md | Current S-01–S-08 contracts. |
| docs/dev/features/003_3977abb-session-only-game-configuration/ | Historical eligible source/preparation/adjacent-QC archive; fixed Phase4 milestone/phase/final reports. |

Current static package uses1.4.0 and stable release ZIP/checksum names. No storage adapter/backend/new platform is allocated. TASKS alone owns all40 executable product tasks.

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
| package.json, package-lock.json, existing scripts/CI/release inputs |1.4.0 metadata, relative build, strict reproducible package and source/artifact/readback checks. |
| docs/dev/features/004_1cadd99-penetrator-mode/ | Fixed milestone5.1/5.2/phase/final evidence and eligible accepted-source/preparation/adjacent-QC archive. |

Local versioned artifacts use classic-tetris-browser-v1.4.0.zip and sidecar; public release assets retain classic-tetris-browser.zip and matching checksum filename. Existing allowlisted assets/docs/licenses only; no test trace/HTML fixture, credential, dev source/cache or browser installation ships. RELEASE-NOTES remains the exact retained release body; the internal highlights file stays ignored and is consumed only after publication verification. No persisted schema, service, generic plugin layer or new runtime dependency is allocated.
