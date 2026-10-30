# URL and cookie persistence delivery plan

## Delivery objective

Deliver the six-setting persistence capability in [FEATURE](FEATURE.md) and U-01–U-08 of [FEATURE-SPEC](FEATURE-SPEC.md) on the verified v1.4.0 browser baseline. Keep existing Phases1–5 and T-001–T-040 unchanged. Phase6 adds one bounded browser capability and releases v1.5.0 after complete verification and integration; Electron and other platforms remain outside this delivery.

## Phase 6 — URL GET and cookie persistence

| Milestone | Working outcome and dependency | Required exit evidence |
| --- | --- | --- |
| 6.1 — Restored and synchronized browser settings | After accepted, whole-package-QC-verified and published preparation plus eligible hosted phase activation, establish canonical format/precedence handling, fault-contained persisted configuration and actual browser-entry composition. All six native controls restore independently and save their edits to cookies/current URL. | Pure domain/format/resolution tests; injected source/write/atomic/no-op tests; actual six-control URL/cookie/default, explicit-default and omitted-parameter cases; native edit/reload demonstration with unchanged selected/active timing in managed Chromium and Firefox. Independent whole-milestone code review, separate tests/repairs, milestone report and HANDOFF belong to its final implementation task. |
| 6.2 — Persistence lifetime and browser distribution | After6.1 closes, complete actual reload/reopen/two-page/context and prefix-hosting/failure coverage, retained gameplay/focus regression and accurate v1.5.0 distribution/docs. | Actual source/built/extracted-prefix persistence acceptance in both browsers; supported cookie/path/expiry and history/state preservation, blocked-source effects and no game-state restore; same-context versus pure-context compatibility; full type/boundary/unit/package/build/browser checks and representative320px/native UI checks. Strict archive content/CRC/manifest/credential exclusion, checksum and byte reproducibility. Independent whole-milestone code review, repairs, demonstrated extracted installation, report/HANDOFF in its final implementation task. |
| 6.3 — Phase review | After both delivery milestones and their task issues close, assess U-01–U-08 and preserved gameplay/configuration guarantees. | Exactly one dedicated phase code-review/testing/report task; independent inspection separate from execution. Current main-document incorporation and QC, unique task transfer, eligible005 archive, actual task-closing-diff audit, phase/final reports and TODO aggregation. Fix required findings before closure. |

Two delivery milestones plus the excluded one-task phase review fit the narrow coherent outcome. The first delivers useful end-to-end restoration/edit behavior; the second proves lifetime, failure and portable distribution. Separating every setting, browser source or cookie write into milestones would fragment one precedence contract. A third packaging-only milestone adds no independent capability. This explicit 1–2 count assessment retains two; no unrelated feature or padding is added.

At6.1, demonstrate conflicting URL/cookie values, omitted settings retaining saved selections, an edit returning to default and reload into Ready with the correct settings. At6.2, demonstrate the extracted app under a non-root hosting prefix and a new page restoring cookies while game progress remains fresh. These checkpoints let the human assess the behavior and request an explicit amendment if needed; they add no routine permission pause to an authorized implementation range.

## Dependencies and contract coverage

| Contracts | Delivery route | Integration/regression evidence |
| --- | --- | --- |
| U-01–U-02 |6.1 canonical validation/codec and load resolution | All fields/defaults, strict booleans, duplicates/invalid inputs, mixed sources and explicit-default/omitted write distinctions. |
| U-03–U-04 |6.1 independent effects;6.2 actual browser/path failures | Cookie scope/attributes and history preservation, atomic patches/no-op behavior, independent throwing/denied sources and writes. |
| U-05–U-06 |6.1 page composition;6.2 lifetime | One selected authority, unchanged structural controller, Start/Restart capture/live displays, remount/reopen/page isolation and no restored game state. |
| U-07 |6.1 relevant regression;6.2 full docs/regression;6.3 incorporation | Pure boundaries, native input, current and pending rules, ordinary/penetrator acceptance, current canonical documents and frozen history. |
| U-08 |6.2 distribution;6.3 final review/integration; postintegration release | All three shipped targets, reproducible strict relative archive, provider source/body/assets/download checks and actual release-source CI. |

Canonical validation and pure format resolution precede effect composition; the persisted controller precedes browser entry wiring; lifecycle/distribution extends the same integrated app. Do not change the shared view API or add state subscriptions merely to observe settings. Keep initial explicit URL-to-cookie saves separate from edit-driven changed-key effects, preventing fallback defaults from overwriting saved cookies.

## Verification and principal risks

Use table-driven exact domain/source cases, injected callbacks with the real configuration controller for failure/atomicity, and normal native controls/reload/new pages for shipped-browser acceptance. Add persistence tests to all source/built/extracted targets; source-only lifecycle fixtures supplement context boundaries but cannot replace shipped acceptance. Keep current managed Chromium/Firefox and process-local diagnosed recovery policy. Measure suite durations and adjust only finite documented budgets as needed; never skip a required browser/target to fit a budget.

Review focus: explicit default/false values accidentally treated as absence; invalid first duplicates silently replaced by later values; cookie denial preventing URL updates or play; cookie/default fallback polluting URLs; persisted pending rules changing active gameplay; same-context remount rerunning restoration; unrelated URL/history.state loss; prefix cookie leakage. Each risk belongs to direct acceptance at its owning component and then representative assembled coverage. Actual HTTPS flags may be checked through injected serialization when no HTTPS server is available; distinguish that from observed native HTTPS cookie acceptance. Native headed OS focus remains an explicit existing limit, not a new blocking task.

## Integration and release

Use persistent `feature/005_5153bbf-url-get-cookie-persistence` created from its recorded published preparation-containing main parent. Preparation whole-package QC, explicit two-parent preparation merge/default publication and phase projection must precede product task execution. Partial task ranges push and pause on the feature branch. Close only verified/published task issues and milestone objects; phase review waits for both delivery milestone closures.

At the final phase boundary, incorporate delivered scope into current PROJECT/design/SPEC and its focused configuration child/PLAN/layout, reassess affected adjacent current QC, transfer new executable tasks exactly once into main TASKS, and archive eligible active005 feature/preparation/adjacent-QC sources under the reserved feature prefix. Preserve prior closed packages and original completed task evidence. Milestone reports stay at `docs/dev/features/005_5153bbf-url-get-cookie-persistence/reports/phases/6/6.1.md` and `6.2.md`; phase evidence at its `PHASE-REPORT.md`, final outcome at the feature-root `IMPLEMENTATION-REPORT.md`.

Integrate only the complete verified phase by explicit two-parent merge into its recorded main parent. Run merged-state checks and source/artifact identity comparisons, publish/read back main, then create the eligible default-branch v1.5.0 release commit/annotated tag with exact finalized notes. Publish stable ZIP/checksum assets and verify body/source/latest/inventory, actual public download bytes and release-source CI. Record actual release outcomes in an owning task's parent-only evidence followup without moving the release tag. Document preparation performs none of those implementation/release operations.

## Scoped physical allocation

[Main layout](layout.md) remains the repository-wide owner. The following feature allocation adds C-08 within the existing browser platform directory; main layout's no-storage/current-version statements remain the v1.4.0 baseline until accepted incorporation. Paths marked new are intended physical homes, not implementation claims.

| Path | Component / purpose |
| --- | --- |
| src/application/configuration.ts | C-07 existing module: expose canonical pure field validation while retaining controller/default/rule-projection contracts. |
| src/platform/browser/configuration-codec.ts (new) | C-08 pure URL/cookie resolution, cookie scope/assignment and current-URL construction; explicit inputs, no ambient DOM or side effects. |
| src/platform/browser/configuration-persistence.ts (new) | C-08 callback-based persisted-controller factory, initial explicit URL saves, atomic delegation and independently contained changed-field effects. |
| src/platform/browser/main.ts | C-06 actual page entry supplies document/window callbacks to C-08; reusable mountGame default and existing native lifecycle stay intact. |
| tests/unit/configuration.test.ts | Existing pure C-07 domain/detachment/unknown-key regression plus exported validator agreement. |
| tests/unit/configuration-codec.test.ts (new) | Strict six-setting formats/precedence/duplicates, default/omitted cases, immutability, cookie attributes/path and URL semantics. |
| tests/unit/configuration-persistence.test.ts (new) | Real C-07 with injected sources/effects: initialization, no-op/invalid atomicity, multi-field patches, failures and context reuse. |
| tests/browser/configuration-persistence.spec.ts (new) | Real page-entry native restoration/edits/reload/reopen/cookies/history/failure behavior for source/built/extracted targets; not excluded from distribution acceptance. |
| tests/browser/configuration.spec.ts and existing lifecycle/remount/ghost/penetrator suites/fixtures | Amend only obsolete browser-entry no-storage/reload-default assertions; preserve pure-context/default isolation, focus, rule timing and ordinary/penetrator regressions. Existing source-only fixtures remain excluded from shipped targets. |
| tsconfig.test.json, scripts/test-unit.mjs | Existing compiled Node test discovery/compiler ownership; adjust only if new DOM-free modules/tests need explicit inclusion. |
| scripts/check-boundaries.mjs | Retain core/application protection and check shared UI cannot import platform modules; allow C-06/C-08 to import reusable modules. |
| playwright.config.ts, scripts/browser-env.mjs | Keep managed browsers, three actual targets and finite measured budgets. Extend budget only when measured execution justifies it, with the wrapper still longer than the suite. |
| README.md, docs/CONTROLS.md, docs/INSTALL.md, docs/DEVELOPMENT.md | Player query/cookie behavior, supported hosting/scope, changed lifetime, unchanged gameplay controls and validated development commands/evidence limits. |
| package.json, package-lock.json, scripts/package_browser.py, scripts/verify_package.py, tests/package/, existing release/CI inputs | v1.5.0 metadata and any existing version assertions; strict reproducible relative archive/checksum, current shipped guides and artifact verification. Do not add another package path or dependency. |
| docs/dev/spec/configuration-persistence.md (new at incorporation) | Canonical U-01–U-08 child linked from current SPEC after the delivered delta is incorporated. |
| docs/dev/PROJECT.md, ARCHITECTURE.md, DECOMPOSITION.md, SPEC.md and affected spec children, PLAN.md, layout.md, TASKS.md, adjacent QC reports, AGENTS.md | Current product/owner reconciliation at complete phase review; preserve earlier ranges and update only affected current documents. |
| docs/dev/features/005_5153bbf-url-get-cookie-persistence/ | Fixed6.1/6.2/phase/final evidence and eligible005 source/preparation/QC archive after final incorporation. |

Public release assets remain `classic-tetris-browser.zip` and its `.sha256` sidecar; local intended outputs are `artifacts/classic-tetris-browser-v1.5.0.zip` and its matching sidecar. Archive membership remains the established build assets, manifest, license/notices and shipped instructions; no codec source, tests, fixtures, docs/dev, credentials, browser cache or node_modules ships. RELEASE-NOTES retains the exact final body at the release boundary; internal highlights remain ignored and are cleaned up only after verified publication consumption.

The adapter's two files separate deterministic format logic from effects without adding a service layer or generic storage abstraction. Both compile without DOM types because effects enter through explicit callbacks; only main.ts binds actual browser objects. C-05's structural controller consumer requires no additional callback or storage import. The component-to-path map supports each milestone without moving unrelated modules or changing existing source-only fixture ownership.
