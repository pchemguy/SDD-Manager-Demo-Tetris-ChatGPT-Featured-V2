# Conditional ghost visibility — preparation record

## Identity and request

Campaign002_0adba6e, full baseline0adba6e9898e9c1bb2389cca3ad23bd8fadfacb9, published main after modern v1.1.0 evidence. Preparation branch design-docs/002_0adba6e-conditional-ghost-visibility, creation parent/default preparation target main. Intended implementation branch feature/002_0adba6e-conditional-ghost-visibility only after accepted preparation integration. Reserved report/archive prefix docs/dev/features/002_0adba6e-conditional-ghost-visibility; no implementation branch exists yet.

Original user request: Open a feature campaign to implement conditional ghost-piece visibility. Provide a ghost visibility mode that dynamically hides the ghost when its projected landing position is in the upper half, above the midline, and shows it again when it returns to the lower half.

Accepted baseline: PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC and spec/modern-rules.md, PLAN, layout and completed TASKS; supported implementation v1.1.0. Session derives ghost through canonical landing. Shared view renders ghost cells and an accessible landing description. Active/settled cells, landing geometry, hard drop, hold, kicks, scoring and two clocks remain baseline guarantees. Prior closed feature001 records are frozen; not a new validity target.

## Current control

Continue project preference autodoc/onepass, pass1 for this feature only. FEATURE approval remains active; downstream design-through-TASKS document checkpoints are preapproved after brief acceptance, subject to technical QC. No material-decision delegation is inferred. FEATURE was approved by the user’s “k” in response to the published brief and explicit approval question. The active autodoc stop is after FDOCS-008 before package QC/integration/implementation unless explicitly requested. No new implementation range is activated by opening this campaign. Preserve earlier completed task/phase ranges.

Reporting Standard: concise consequential decisions/results. Minimal and Explicit profiles remain available. Tracking enabled by root AGENTS policy. Required campaign milestone and all nine complete FDOCS issue identities/markers/native associations were verified before repository writes. Existing protected credential storage/ignore rules and manual provenance scaffold are reused unchanged; no transcript was recorded or setup replayed.

## Decisions and cross-scope applicability

| Topic | Source/status and rationale |
| --- | --- |
| Dynamic upper-half hide/lower-half restore | User supplied. Reevaluate after changes to projected landing; whole-ghost visibility, not cell clipping. |
| Selector and default | Accepted with the brief: Always and Lower half only; Always initially retains v1.1.0 behavior. No third Never mode. |
| Midline predicate | Accepted with the brief: use lowest occupied projected cell, not padded matrix origin. On20 rows, hide when that cell is in rows1–10, show in rows11–20. Straddling projection stays visible. |
| Timing and lifetime | Accepted with the brief: display mode applies immediately, survives start/restart and pause/resume for the mounted app; reload resets Always; no persisted preference. No debounce/hysteresis. |
| Accessibility and rule isolation | Accepted with the brief: hidden ghost has no rendered ghost cells or landing-row announcement; describe conditional suppression. Keep canonical projection available for hard drop and detached snapshot contract. Paused projection/visibility stay frozen except direct display-mode changes. |
| Delivery/version | Accepted with the brief: additive browser v1.2.0 after complete verified phase integration; retain v1.1.0 artifacts and all existing rules/controls. |

Cross-scope decisions: none beyond this one pass. Reconsider predicate/default/selection lifetime only through explicit user correction or material conflicting evidence. No future scopes inferred.

## Stage evidence

| Stage | Assessment and state |
| --- | --- |
| FDOCS-001 | Linux/bash usable Git worktree, clean published main baseline, campaign/global-sequence collision scan, existing instructions/auth/provenance and nine-stage tracking verified. Initialization published/read back; FDOCS-001 issue42 closed/read back. |
| FDOCS-002 | FEATURE proposal reviewed against current session ghost derivation and shared-view cell/accessible-description rendering; all requested behavior covered. Canonical projection must remain independent of display suppression. Source SHA256 df766608bc3b4bf8f1defcfd9e4453e225ea6352840cf0b6996c876163eb2dbb. Human accepted the presented brief/defaults with “k”; accepted product text removes proposal-only approval narration, preserving the approved behavior. FDOCS-002 completion records exact current source below. |
| FDOCS-003–009 | Pending ordered downstream assessments under autodoc preapproval. |

## Hosted preparation mapping

Milestone #11 (sdd-docs-002_0adba6e), open/read back.

| Stage | Verified issue |
| --- | --- |
| FDOCS-001 | [#42](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/42) |
| FDOCS-002 | [#43](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/43) |
| FDOCS-003 | [#44](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/44) |
| FDOCS-004 | [#45](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/45) |
| FDOCS-005 | [#46](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/46) |
| FDOCS-006 | [#47](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/47) |
| FDOCS-007 | [#48](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/48) |
| FDOCS-008 | [#49](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/49) |
| FDOCS-009 | [#50](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/50) |

## Current reset and pending transitions

No reset. Record/publish/read back FDOCS-002 acceptance, close43 then continue ordered FDOCS-003–008 under autodoc; stop before FDOCS-009. No product code, version, release or main contract changes authorized at this checkpoint.

## FDOCS-002 completion

User accepted the published FEATURE and explicit defaults with k: Always/Lower half only, retained Always default, lowest occupied landing cell rows1–10 hidden/11–20 shown, straddling visible and immediate nonpersistent selection. Canonical projection/gameplay unchanged; target v1.2.0. Continue autodoc downstream documents only; stop before package QC.

Source identities (SHA-256):
- docs/dev/FEATURE.md: fd21c9a6fce63ad400c6e973b31901dd0ac393da4d3b89ca0ade62ed9b488348

Publish/read back this coherent completion before closing/readback of issue #43 or dependent work.

## FDOCS-003 completion

Assessed accepted ARCHITECTURE and approved FEATURE against current core/session/UI/host. Existing shared DOM UI boundary already owns presentation; keep the display preference in that mount, not SessionOptions or browser global storage. Canonical detached ghost, hard-drop landing, transaction clocks and dependency direction stay unchanged. No new architectural block or overlay is necessary. Reuse is an assessment, not an inferred new human approval.

Source identities (SHA-256):
- docs/dev/ARCHITECTURE.md: fcfa9e68c8c05f48ce6affe03f45f9a9063046db38f23273890da58b454b90f0
- docs/dev/FEATURE.md: fd21c9a6fce63ad400c6e973b31901dd0ac393da4d3b89ca0ade62ed9b488348

Publish/read back this coherent completion before closing/readback of issue #44 or dependent work.

## FDOCS-004 completion

Scoped C-05 decomposition owns pure visibility predicate, per-mount display preference/latest snapshot, one rendering decision for cells/text and owned selector cleanup. Retain all session/view API boundaries and C-06 native focus/shortcut resources. Downstream design acceptance is covered by approved autodoc scope; reviewed dependency direction and verification seams, no unresolved design decision.

Source identities (SHA-256):
- docs/dev/FEATURE_DECOMPOSITION.md: f90feffc9a91a5917fdaa6fab7082ed4744bfbc1e2cda1d7bb79af0a9bf69b9b

Publish/read back this coherent completion before closing/readback of issue #45 or dependent work.

## FDOCS-005 completion

G-01–G-05 specify occupied-cell midline predicate, dynamic mode/lifetime, common cell/accessibility suppression, native focus and immutable canonical gameplay boundaries plus static-delivery acceptance. Scoped SPEC/design QC report records exact source identities and Ready; approved brief covered, no unresolved material choice or conformance finding. No tests or implementation claimed.

Source identities (SHA-256):
- docs/dev/FEATURE-SPEC.md: f146ce63d65c0e1e7e921689917eff1e3f8dd328bf18c8dacb131c87d0f26cf5
- docs/dev/FEATURE-SPEC-REVIEW-REPORT.md: 49679dd7783cd1821902c85defde0a79265f0bfa6051dd9b428bebe6b679c719

Publish/read back this coherent completion before closing/readback of issue #46 or dependent work.
