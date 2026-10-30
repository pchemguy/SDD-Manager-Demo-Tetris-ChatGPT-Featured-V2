# Windows Electron delivery strategy

## Phase10 — Windows Electron platform

Deliver the existing usable browser game as an offline portable Windows10/11x64 Electron application and retain browser delivery. The single coherent increment includes a secure thin desktop host, complete Windows runtime/assets, shared renderer, configuration/manual-file compatibility and dual-platform1.9.0 release. Installer/store/updater/signing provisioning, other desktop OS distribution and gameplay changes are excluded. Existing Phase1–9 boundaries and completed ranges remain intact.

## Milestone10.1 — Offline desktop host and Windows package

Establish the earliest meaningful desktop outcome: a real local renderer in an isolated Electron window with compatible gameplay/profile/native-file behavior and a complete Windows portable artifact. Pin verified official runtime inputs before using them. Implement restrictive in-process local origin and window lifecycle around the existing renderer; exercise offline startup and malicious/missing-resource rejection. Validate settings cookie/URL/close-relaunch, session/toggle lifetime, normal gameplay and real JSON/SQLite worker/WASM paths with available desktop facilities. Produce the complete inspected Windows package with independent provenance/member/entry/renderer verification and reproducibility.

Use real runtime smoke where facilities exist, with native Windows runner orchestration when actually accessible. Source staging can establish host behavior before final packaging; final extracted artifact acceptance remains explicit. Missing native facilities are reported unverified rather than fabricated or made a blocking prerequisite; feasible build/policy/artifact failures remain blockers. The demonstrable artifact informs any human steering; existing full-implementation authority permits normal continuation without another approval pause. Fold whole-milestone independent code/coverage review, repaired/rechecked findings, appropriate checks/report/HANDOFF into the final delivery task because this group has fewer than4 delivery tasks.

## Milestone10.2 — Verified dual-platform distribution

Depends on complete published/closed10.1. Complete actual extracted Windows runtime acceptance and feasible hosted CI, player/developer instructions/version/notices and browser/desktop package integrity. Verify both actual distributions from a clean install, all existing source/built/extracted managed Chromium/Firefox regressions, desktop isolation/profile/manual-file/error/lifecycle/layout behavior where executable, and deterministic pinned Windows artifact equivalence. Keep finite measured CI/test budgets; never hide failed mandatory checks as skips. Distinguish native Windows, any Linux Electron and browser evidence. Fold independent whole-milestone code/docs/package review, checks/repairs/rechecks and report/HANDOFF into its last delivery task.

## Milestone10.3 — Phase review

One dedicated phase-review unit assesses the whole implementation/contracts/coverage/current docs/task persistence and final TODO aggregation. Incorporate accepted platform scope into current authorities, transfer new tasks once into main ownership, archive eligible009 sources and preserve frozen001–008. Current adjacent QC and navigation must agree before complete verified feature integration into its recorded refreshed main parent.

## Integration, release and evidence

After all tasks/publication/tracking/reviews and feasible exits pass, integrate by explicit two-parent merge into the actual recorded main parent, run merged checks and publish/read back. Version1.9.0 covers both platforms and retains game-save format1. Create the eligible default-branch release commit/annotated tag with the same complete notes body, stable browser and Windows ZIP/checksum pairs, latest selection and actual anonymous tag/latest bytes for all four assets. Verify both release-source main/tag CI outcomes for applicable workflows/jobs; record actual provider outcomes in the owning parent-only followup without moving the tag. Never claim a native facility/check ran without evidence.

The main risks are local-origin worker/WASM/cookie behavior, native file/focus/profile lifetime, runtime provenance/complete dependencies and strict package trust. Early composed-runtime checks address the first two; independent pinned-vendor/package verification and actual extraction address the latter. Shared renderer equivalence and full browser regression guard platform preservation. No unresolved design decision is deferred into implementation.

## Scoped physical allocation

Existing core/application/UI and browser source remain in their accepted homes. The following new paths are proposed allocations, not claims that files exist. C12/C13 stay outside shared UI/application boundaries; no FEATURE-LAYOUT file or generic platform tree is introduced.

| Physical home | Owner and allocation |
| --- | --- |
| src/platform/electron/main.cjs | C12 Electron main/window/profile/native download lifecycle and restricted local protocol composition; standalone CommonJS main entry copied into the desktop app. |
| src/platform/electron/asset-policy.cjs | C12 DOM/Electron-free URL/member/MIME/CSP/isolation policy used by main and direct unit tests. |
| scripts/electron-runtime.json, scripts/electron_runtime.py | C13 pinned vendor version/official URLs/digests and checked build-time fetch/cache; no player startup network. |
| scripts/package_windows.py, scripts/verify_windows.py | C13 deterministic Windows assembler and independent actual-archive/vendor/renderer verifier, stable aliases/checksums. Reuse browser manifest/allowlist inputs without weakening them. |
| tests/desktop/host-policy.test.mjs, tests/desktop/runtime.spec.ts, playwright.desktop.config.ts | Pure policy success/rejection plus actual available Electron launch/isolation/profile/game/file/lifecycle checks with isolated profiles/downloads. Excluded from browser suite and both player archives. |
| tests/fixtures/desktop_package_checks.py, scripts/test-desktop-package.py | Desktop success/rejection/integrity fixture checks with synthetic vendor fixtures explicitly separated from actual generated artifact verification. |
| scripts/desktop-env.mjs | Finite actual desktop runner/runtime selection/staging/cleanup if required by execution facilities; no product debug or gameplay hook. |
| scripts/check-boundaries.mjs, package.json, package-lock.json, .github/workflows/ci.yml | Shared dependency boundary guard, exact1.9.0 metadata/scripts and applicable browser/Windows native CI. Existing browser source/built/extracted coverage remains intact. |
| README.md, docs/INSTALL.md, docs/CONTROLS.md, docs/DEVELOPMENT.md, docs/FILE-FORMAT.md, THIRD-PARTY-NOTICES.txt | Current supported platforms, portable/native setup, profile/manual-file/session behavior, verified commands/evidence limits, vendor provenance/notices and dual-artifact release guidance. |
| artifacts/, artifacts/release/ | Ignored generated versioned/stable browser and Windows ZIP/checksum pairs; Windows staging/caches stay ignored and never become browser inputs. |
| Current main PROJECT/design/SPEC with spec/electron.md, PLAN/layout/TASKS, adjacent QC, AGENTS and HANDOFF | Final incorporated current platform intent/ownership/navigation; prior executable ranges preserved, new tasks transferred exactly once. |
| docs/dev/features/009_a7a3b12-windows-electron/10.1.md,10.2.md,PHASE-REPORT.md,IMPLEMENTATION-REPORT.md | Fixed milestone/phase/final evidence and actual provider outcomes; eligible009 source/preparation/QC archive after final incorporation. Frozen001–008 unchanged. |

Provisional module interfaces are finalized in executable tasks from ED contracts; physical placement alone creates no implementation. Shared renderer entry and Save/Restore adapters remain existing browser paths unless real composed checks expose a necessary scoped adaptation, which requires design/SPEC/QC reconciliation before claiming equivalence.
