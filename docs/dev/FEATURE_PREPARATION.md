# Feature preparation record

Control/evidence only; FEATURE_DOCS_TASKS owns preparation checkoffs. Main TASKS retains32 completed product tasks. No implementation work is authorized by this campaign opening.

## Identity and request

Campaign `004_1cadd99`, slug penetrator-mode. Full original baseline/creation parent `1cadd995008432ec1fe6668f6000d14ed4333692` on actual default main, refreshed through GitHub metadata and exact Git readback. Preparation branch `design-docs/004_1cadd99-penetrator-mode`; preparation integration target main. Intended future implementation branch `feature/004_1cadd99-penetrator-mode` is reserved, not created; it must start from published preparation integration. Reserved reports/archive prefix docs/dev/features/004_1cadd99-penetrator-mode; no preparatory README created.

Original request (verbatim, user message):

> Open a feature campaign to implement "penetrator mode" capability:
>
> Allow the player to turn the current falling piece into a penetrator with a hotkey, provided a penetrator bonus is available. A penetrator can pass through occupied cells without destroying them. This ability lasts until the piece locks; its final position must be entirely within the board without overlapping occupied cells.
>
> For a penetrator, hard drop must pass through blocking cells to the lowest valid landing position. The ghost piece must preview that same position whenever it is visible.
>
> Clearing four lines at once awards one penetrator bonus, granting one activation of the penetrator ability. Allow up to three bonuses to accumulate.
>
> Render penetrator pieces entirely white, and do not use white for regular pieces. Show the available bonuses in the game info and controls panel using one symbol per bonus, such as a lightning bolt. Update the indicator whenever a bonus is earned or spent.


Accepted context: [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [modern](spec/modern-rules.md), [ghost](spec/ghost-visibility.md), [configuration](spec/session-configuration.md), [PLAN](PLAN.md), [layout](layout.md) and [TASKS](TASKS.md). Current browser v1.3.0 fully integrated/published with completed phase4; no active feature sources, uncommitted changes or pending prior publication. Existing adoption/disclosure/manual provenance/authentication retained. Actual host Linux/bash; Windows-only shell policy does not apply here. No native/browser runtime work is needed to open the campaign.

## Current control

Autodoc/onepass carried from the user's project instruction, one penetrator scope; strict delivery preservation. User ok accepted the published FEATURE brief70e4800fc77b771d5342b4b34fc63153dadb87b8 / blob fb61a262fed18781bdcc8101c8d55d6c7cde943e and its proposed interactions. Necessary subsequent design-through-FEATURE-TASKS checkpoints are covered by autodoc under that acceptance; stop after FDOCS-008 before package QC, preparation merge or implementation unless separately authorized. Prior feature's full-implementation grant is complete and does not authorize this feature's implementation.

Repository-default GitHub tracking retained. Native preparation milestone18 and all9 issues69–77 were projected/read back before any repository/branch write: exact stage titles/briefs/markers/campaign scope/dependencies/native milestone association verified. No product Phase5 projection or issue is created at this point.

## Material decisions and proposed interactions

User-supplied: one activation spends a bonus; pass through occupied cells without destruction; valid in-board non-overlapping final placement; lowest valid penetrating hard drop and matching visible ghost; one bonus per four-line clear, bank cap3; white penetrator/never-white regular pieces; one indicator symbol per available bonus.

Accepted with the first brief (user ok): B is the free board-focused activation key; no repeat/double spend and no activation outside running/active/bonus-available conditions. Hold is disabled while penetration is active, avoiding an undefined ability transfer/cancel/refund. Movement/rotation may overlap settled cells but must retain a valid landing at or below the candidate, avoiding an impossible lock state. Existing bounds and ordered rotation kicks remain; no cell destruction or implicit upward rescue. Penetrating grounding uses the lowest valid landing and retains selected general/hard-drop policies; activation cancels a deadline only if it actually leaves support, otherwise preserves it. Start/Restart/reload start with zero bonuses; pause/game over retain the current game's bank. White is retained on penetrator-locked cells until removed; logical I–Z shape identity remains. White active/visible ghost styling is exclusive to penetrators; regular-piece white borders must be removed. No new setting/platform/persistence/scoring bonus is proposed. Target minor release1.4.0 after complete verified integration, without changing current version now.

## Stage evidence

| Stage | Evidence |
| --- | --- |
| FDOCS-001 | Clean published main baseline, governing current inputs/actual host, campaign identity/source ownership, carried mode/checkpoint, existing provenance/authentication and complete preparation projection verified. Initialization4a349dfe0db7b3abfdc6e7e8bf92d6cee7b5c255 published/read back; issue69 closed/read back before brief drafting. |
| FDOCS-002 | FEATURE proposal blob `fb61a262fed18781bdcc8101c8d55d6c7cde943e` authored/reviewed by sdd-design against the supplied seed and current PROJECT/SPEC/modern/ghost/configuration/implementation seams. All requested outcomes covered; proposed interactions explicitly separated. User ok accepted this exact proposal; status wording only is normalized in the accepted source. Downstream necessary documents are preapproved under autodoc; implementation is not authorized. |
| FDOCS-003/004 | Necessary architecture/component overlays accepted under autodoc and published; issues71/72 closed/read back. |
| FDOCS-005 | P-01–P-08 SPEC/design QC Revision2 Ready, PEN-S01 resolved; published06b1601, issue73 closed/read back. |
| FDOCS-006/007 | Strategy then combined physical-map QC Ready, published0fda5fd/f4fec2e; issues74/75 closed/read back. |
| FDOCS-008 | FEATURE-TASKS33–40 and adjacent conformance QC Ready in this stage closing tree; publication/issue76 closure follows. |
| FDOCS-009 | Not started; whole-package QC requires separate authorization. |

## Pending transitions

FDOCS-001–007 published/read back and issues69–75 closed/read back. Publish/read back FDOCS-008 with task-list QC/HANDOFF, then close/read back issue76 and stop. FDOCS-009 issue77 and milestone18 stay open. Whole-package QC, preparation integration, phase projection, implementation and1.4.0 release are not executed. Current app remains1.3.0; main TASKS/product code/shipped inputs and prior closed records unchanged.

## Completed stage evidence

### FDOCS-002 — Accept penetrator mode brief

User ok accepted the exact published brief70e4800f/fb61a262, including B/Hold/reachability/timing/reset/white-settled interactions and1.4.0 target. Normalize proposal wording without scope change; record first approval and carried autodoc preapproval through necessary task preparation. Stop before FDOCS-009; no implementation grant.

Sources: `docs/dev/FEATURE.md` blob `3ca6e5a8d4b41a81971dcb02eaaf4ca878a1bf6d`.

### FDOCS-003 — Define penetrator rule and appearance ownership

Autodoc preapproval applies after accepted brief. Necessary architecture overlay keeps logical Board/shape compatibility with a separate transaction-owned white-cell mask, shared compaction and one pure penetrating landing authority. Review covers ownership/dependencies/clocks/rollback/native seams; no unresolved design choice, storage or new setting. Decomposition next.

Sources: `docs/dev/FEATURE_ARCHITECTURE.md` blob `9a2d7e3f82598a13036cb9a2b1645b5cd2177156`.

### FDOCS-004 — Define penetrator component contracts and state flow

Autodoc preapproval applies. Scoped decomposition assigns C02 pure reachability/landing, default-compatible predicate kicks and shared appearance compaction; C04 mode/bank/mask plus atomic award/spawn; C05 snapshot-only white/bonus rendering; C06 nonrepeating B. Review preserves public legacy shapes/defaults, active-rule/configuration separation and feasible deterministic/actual-browser seams. No unresolved boundary or product behavior.

Sources: `docs/dev/FEATURE_DECOMPOSITION.md` blob `a0e2e6122ca971a6960acbd57fa7a1fd3f9e5c96`.

### FDOCS-005 — Specify penetrating placement rewards timing and presentation

Autodoc acceptance applies. P01–P08 define exact guarded transit/deepest landing and compatible APIs, B/bank/Hold/lifetime, both selected lock/drop policies, white-mask lock/clear/award atomicity, native/accessibility and actual earned-bonus static delivery. Scoped SPEC/design QC Ready with exact sources and objective acceptance; no unresolved material choice. No implementation/tests executed.

Sources: `docs/dev/FEATURE-SPEC.md` blob `09cfe0fd7052928775d7581a03e0c2762e85a959`, `docs/dev/FEATURE-SPEC-REVIEW-REPORT.md` blob `74116f19b471e2ab7e80ebaa8668ed3dc44a6dc1`.

FDOCS-005 precision recheck: PEN-S01 resolved before planning/issue closure. P-03 separates rejected lateral/rotation invariance from blocked-down locking and preserves specified upward kicks while excluding upward rescue. FEATURE-SPEC blob `8febc774b234aae010d6275f927180d4151b0a4d`; adjacent QC Revision2 Ready, accepted scope unchanged. Publish/read back correction then close issue73.

### FDOCS-006 — Plan bounded penetrator delivery milestones

Autodoc applies; current SPEC/design QC Revision2 Ready. One bounded Phase5 has two justified delivery milestones: playable earned penetrator loop, then completed native presentation/lifetime/distribution; separate mandatory phase review follows. Strategy QC Ready with full P01–P08 coverage, demonstrations, dependencies and review/release exits. Physical allocation/combined QC remains next; TASKS held.

Sources: `docs/dev/FEATURE-PLAN.md` blob `8952e2649b1116584a2231a7721aad7b9882bfb5`, `docs/dev/FEATURE-PLAN-REVIEW-REPORT.md` blob `30e29d959a4f384b8dc2b8e785659d0da60d64b4`.

### FDOCS-007 — Assign penetrator implementation and verification homes

Autodoc applies. FEATURE-PLAN physical map assigns C02/C04/C05/C06 code, appearance/landing/session tests, deterministic earned-game traces, actual versus source-only browser fixtures, compiler/runner exclusions,1.4 distribution and fixed report/archive owners. Combined PLAN/layout QC Revision2 Ready with exact identities; no unresolved placement or source duplication. Task derivation eligible.

Sources: `docs/dev/FEATURE-PLAN.md` blob `9ed0334208558c87f8c0d26db67beb4b8f02256a`, `docs/dev/FEATURE-PLAN-REVIEW-REPORT.md` blob `eead28af136bdcea8ba0240e0e8d1841a5fbfd34`.

### FDOCS-008 — Prepare reviewed penetrator implementation tasks

Autodoc preparation through tasks complete: T033–T040 across Phase5 two delivery milestones and one phase review;4/2 delivery counts assessed, standalone5.1 review T037 and final-delivery5.2 review T039 assigned, T040 owns final phase/incorporation/archive/audit/release evidence. Adjacent task conformance QC Ready with unique IDs, exact hierarchy/links/source identities; all product tasks unchecked. HANDOFF/AGENTS updated. Stop before FDOCS-009/package QC; no implementation/version change.

Sources: `docs/dev/FEATURE-TASKS.md` blob `7ac058f73feb2c85310f9bde15cfe5a4d226ab47`, `docs/dev/FEATURE-TASKS-REVIEW-REPORT.md` blob `3f99f813ba798e2ce3c92b4b59416027bbfc3625`, `AGENTS.md` blob `de7e0b5bd9b74d1c7b2cbbc6ac99622f06d7b601`.
