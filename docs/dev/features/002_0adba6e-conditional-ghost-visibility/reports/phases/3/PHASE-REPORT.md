# Phase 3 — Conditional ghost visibility

## Delivered scope and independent review

T-024–T-026 implement G-01–G-05 for browser1.2.0: native Always/default and Lower half only selection, occupied-cell bottom-edge9/10 midline predicate with straddling visible, immediate common cell/text rendering and per-view lifetime/reset. Canonical Snapshot.ghost remains detached and available for hard drop, while SessionOptions/Action/model/host APIs and all modern gameplay/clocks remain unchanged.

Independent read-only code review found CG-R1 missing conditional rotation/hold/replacement acceptance and CG-R2 incomplete intermediate native selection/active-coordinate assertions. Actual reachable high-stack fixtures and native assertions were strengthened; recheck resolved both. A separate whole-Milestone3.1 review and subsequent independent whole-phase review inspected all G contracts, production/tests/docs/version/package boundaries and retained modern guarantees, finding no remaining critical/important/minor issue. Archive inspection confirmed exact reported size/hash/version/members and fixture exclusion. Tests were separately executed by the implementation owner.

Final independent current-document QC found CG-DOC1: inherited PLAN/layout current-version wording still named1.1.0 and counted both phases. Corrected to1.2.0/all browser phases; adjacent plan/task review cycles retain the original finding and rechecked current identities. G-01–G-05 transferred intact with coherent modern semantics, unique TASKS ownership and preserved prior campaign. Independent final recheck confirmed CG-DOC1 resolved and no remaining document finding. Final report/link checks complete below.

## Verification and evidence limits

T-024 observed29 missing-helper assertions and2 missing-selector browser failures before production changes. All142 unit tests, typecheck/boundaries/build passed. T-025 fresh npm ci,142units,11package tests,2environment and52 source/48 built/48 extracted Chromium/Firefox cases passed. T-026 freshly reran typecheck/boundaries/142units/11package tests/build/package/strict verification and all48 extracted-prefix cases after incorporation. Exact source/archive equality proves full source/built evidence remains applicable; no production/shipped-doc bytes changed during T-026.

Pure fixtures cover all28 shape/orientations at occupied bottom indices9/10 plus null/straddling/immutability. Shared-view snapshots cover cell/text synchronization, frozen paused changes and isolated mounts; actual app tests create a high stack and cross with lateral movement, both rotations, hold and lock/spawn, including hidden hard-drop geometry/scoring. Native keyboard choices, no shortcut double-dispatch, active-coordinate stability, start/restart/reload/remount, external pause and teardown runtime/console guards pass. Inspected320/1000px focus/layout and upper-hidden/lower-restored screenshots.

Local Firefox paused-time scrolling initially swallowed a native pointer click before DOM delivery; capture showed no pointer/mouse events. Auto-wait/frame/screenshot-size diagnostics did not fix it. Onscreen1000×1200 native targets passed3 consecutive runs and all full suites, without production workaround. Managed Chromium headless shell156.0.8078.4 and Firefox157.0 use dedicated project cache; Firefox restricted-host recovery remains explicit/process-local. Native headed OS-window focus remains unverified; synthetic handler tests do not prove it. Electron/native installers are outside delivery. Inherited npm proxy/color warnings are non-failing.

## Distribution and task persistence

ZIP18710 bytes,8 regular members/7 manifest content digests, SHA256 e7390b76e36ca3b011e1d2e1041fa0f6bb9fc9a8c9293c2e03b35fe001de85af. Repeated actual builds/packages reproduce identical bytes; strict integrity/path/prefix/local-assets and secret/development/source-fixture scans pass. Stable ZIP/checksum copies are identical. Exact retained release body SHA256 f6c5f769c0056476df605f2683f98e2275ed149991ba61485dc46a587ba8aa4a. No feature-tip release is claimed.

Canonical PROJECT/ARCHITECTURE/DECOMPOSITION/SPEC plus focused ghost-visibility and modern-rules children, PLAN/layout and sole TASKS owner incorporate accepted scope. Current campaign sources/preparation/adjacent QC move together under this package with repaired links and historical/non-executable markers. Original review identities remain historical; affected current main reviews append source-specific reassessment/correction cycles. Prior closed feature001, Phase1/2 reports and completed tasks are preserved.

Exact T-024/T-025 closing parent diffs each contain one leading owning ID, one initial task checkoff and verified result/evidence; T-025 includes milestone report/HANDOFF with initial closure. Semantic T-026 transfer compares parent FEATURE-TASKS with main TASKS: only T-026 changes unchecked→checked; archived lists supply no executable ownership. All26 IDs are unique, previous main TASKS bytes preserved as prefix, all current/new archive links resolve. The actual T-026 committed diff is rechecked before integration.

## Integration readiness

Implementation parent/return main1bbfae895b4fd889d59dbe00b3263ca0e01d4898; original campaign baseline0adba6e9898e9c1bb2389cca3ad23bd8fadfacb9. T-0247052c705713391be48d93e42ec40052e87980795 and T-025540a887d16534fffb317494762c39407e4b53644 are published; issues51/52 and delivery milestone12 closed/read back. Publish this T-026 result/report/HANDOFF/initial closure, close53/review milestone13, then explicitly merge verified complete phase to main and publish/read back. Default-branch exact-body release marker/tag and GitHub1.2.0 publication/download/CI outcomes are recorded afterward in a task-owned parent-only follow-up without moving the tag.

## TODO

None. All findings resolved and required feasible checks complete. Native/Electron limitations above are evidence boundaries, not deferred product tasks.

## Post-integration document clarification — CG-DOC2

Final release-source recheck caught inherited R-09 wording permitting only the F-05 option despite accepted G-02 display preference. Current SPEC now names both nonpersistent settings/reload defaults, with adjacent SPEC/QC recheck. No product/shipped-doc/archive byte changed. The already published1.2.0 release tag remains pinned at ca684155c3f60672153b2e494690071abf1978af; this task-owned parent-only clarification does not move it or claim provider publication.

## Actual integration and release — T-026 parent-only evidence

Published feature2793a287ceab3f55d8eb9f949594e29fdffadce3 was explicitly merged to main by c0df86a06e4ef67791987913dff6be81b2cbd4a1, first parent1bbfae895b4fd889d59dbe00b3263ca0e01d4898. Merged142unit/11package/type/boundary/build/strictverify and6 focused built Chromium/Firefox cases passed. Exact source/shipped-document/archive equality retains the full52source/48built/48extracted evidence. Current task/source ownership and actual T026 semantic closing diff were audited. Preparation issues42–50/milestone11 and implementation issues51–53/milestones12/13 are closed/read back; repository tracking readback found zero open issues/milestones.

Default-branch release commit ca684155c3f60672153b2e494690071abf1978af and annotated tag object afaceff526079a2c565739824c72d9b5e2d63b25 were published/read back to exact objects; tag peels to that source on main first-parent history. Release commit body, tag body and GitHub body match retained RELEASE-NOTES.md bytes exactly, SHA256 f6c5f769c0056476df605f2683f98e2275ed149991ba61485dc46a587ba8aa4a. Complete previous-v1.1.0-through-pinned-marker coverage was refreshed before tagging. Current main later clarified R-09/CG-DOC2 in af40fed19ff511add1895a0017490383e6c817d0, with independent focused recheck confirming resolved; no app/shipped-document/archive change and no tag movement. Prior reviewed identities remain historical.

[Published latest v1.2.0 release](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/tag/v1.2.0), release ID428322121, has exactly the following assets. Provider size/digests, latest selection/body/source and unauthenticated public download bytes were verified against local stable files:

| Asset | Bytes | SHA-256 |
| --- | --- | --- |
| [classic-tetris-browser.zip](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/download/v1.2.0/classic-tetris-browser.zip) | 18710 | `e7390b76e36ca3b011e1d2e1041fa0f6bb9fc9a8c9293c2e03b35fe001de85af` |
| [classic-tetris-browser.zip.sha256](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/download/v1.2.0/classic-tetris-browser.zip.sha256) | 93 | `3bf509402c019804db5557ba6bedbc565eb99f3e39b66b6089742f066417c796` |

Release-source GitHub CI completed successfully:

- [Run 40942828080](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/actions/runs/40942828080): completed/success at ca684155c3f60672153b2e494690071abf1978af.
- [Run 40942778711](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/actions/runs/40942778711): completed/success at ca684155c3f60672153b2e494690071abf1978af.

Final notes are retained; internal highlights were removed only after exact published-body consumption and successful download verification. Reconciliation after an interrupted local publisher reused the same existing release/assets, without duplicate objects or uploads. v1.0.0/v1.1.0 tags/releases and closed campaign001 remain preserved. This evidence-only follow-up supplies no new task checkoff and keeps v1.2.0 pinned. TODO None; native headed OS-window focus remains unverified, and Electron remains outside browser scope.
