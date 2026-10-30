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
| FDOCS-003–009 | Not started. |

## Pending transitions

Initialization published/read back and issue69 closed/read back. FEATURE proposal70e4800f published/read back and accepted by user ok. Persist/publish acceptance and close issue70, then proceed through necessary design/specification/plan/layout/task preparation to FDOCS-008; stop before package QC. No downstream design, QC, integration, implementation or release has run.

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
