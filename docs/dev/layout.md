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
| src/ui/game-view.ts, src/ui/styles.css | C-05: reusable DOM view and styles; semantic actions only. |
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

The conventional ignored gh.tkn remains beside root .gitignore. It is never an asset, fixture, report input or archive member. Packaging allowlists contents and rejects symlinks, unsafe archive paths and credential-like files. The final artifact names are classic-tetris-browser-v1.0.0.zip and classic-tetris-browser-v1.0.0.zip.sha256 under artifacts/.

Root AGENTS.md retains execution policies and links current authorities. Setup/check commands are added there only after their implementation and validation; this planned layout does not claim those commands already work.
