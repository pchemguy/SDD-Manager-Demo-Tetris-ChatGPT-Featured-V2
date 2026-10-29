# Main documentation preparation record

## Current control

- Mode: autodoc/onepass, selected by the user's initial request on 2026-10-29.
- Scope: browser-based classic Tetris, with the three baseline recommendations confirmed by the user's `yes` response.
- Approval basis: PROJECT requires human acceptance. ARCHITECTURE through TASKS have mode-scoped preapproval after that acceptance. Product clarification does not itself approve PROJECT.
- Tracking: preparation and implementation GitHub tracking enabled by root AGENTS.md. The native [sdd-docs-main milestone](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/1) and all nine standard issues were created and read back before repository modifications.
- Publication: publish and verify every owned commit. No local-only exception applies.
- Next boundary: publish PROJECT for human review. Continue accepted preparation through DOCS-008, then stop before DOCS-009 package QC and implementation.

## Scope and confirmed decisions

One documentation pass covers the complete classic browser-game scope supplied by the user. No later scope passes are selected.

| Decision | Resolution | Basis |
| --- | --- | --- |
| Classic gameplay | Movement, rotation, soft drop, line clearing, score, levels, pause and restart. Hold, ghost, next-piece preview, 7-bag, wall kicks and hard drop are outside the current scope. | Agent recommendations explicitly confirmed by the user. |
| Locking | Lock when a gravity or soft-drop attempt cannot move the piece downward. No separate lock timer and no movement/rotation timer resets. | Agent recommendation explicitly confirmed by the user. |
| Reuse and platforms | Shared TypeScript game logic and UI; browser-specific integration remains separate. Windows Electron delivery is future scope. | Initial request and confirmed recommendation. |
| Versioning and releases | Select an appropriate initial version and increase it for delivered changes. Publish a GitHub release, corresponding tag and notes after each completed, verified and integrated implementation phase. | Initial user request; no implementation phase or release has yet been delivered. |

Detailed behavioral contracts and verification commands belong in later documents. No unresolved material brief-scope decision is known; newly discovered material decisions require human input under onepass mode.

## Decisions and document evidence

| Task | Current evidence / decision basis |
| --- | --- |
| DOCS-001 | Initialization checks below; completion is submitted with DOCS_TASKS and HANDOFF in the same commit. Publication and issue closure require subsequent readback. |
| DOCS-002 | PROJECT proposal pending. Human acceptance remains active. |
| DOCS-003 | Not started; preapproved after accepted PROJECT. |
| DOCS-004 | Not started; preapproved after accepted ARCHITECTURE. |
| DOCS-005 | Not started; preapproved subject to required SPEC QC. |
| DOCS-006 | Not started; preapproved subject to PLAN strategy QC. |
| DOCS-007 | Not started; preapproved subject to combined PLAN/layout QC. |
| DOCS-008 | Not started; preapproved subject to TASKS QC; final selected autodoc boundary. |
| DOCS-009 | Not selected; whole-package QC remains outside the current autodoc pass. |

## Initialization

- All four root files existed initially: AI_DISCLOSURE.md, SDD-MANAGER.md, AGENTS.md and SKILL_DISCOVERY_PROTOCOL.md. All were retained; none was copied or rewritten.
- Compared each root file's bytes with its blob in initial commit `f7a8c8bb5076598be2bab852ea7307d5176d9e6b`; all match.
- Created DOCS_TASKS from the bundled template with only DOCS-001 checked. This separate preparation record and HANDOFF retain workflow state and evidence.
- All-present initialization permits continuation without an additional approval pause.
- Default manual provenance setup is enabled. Scaffold seed `c9b6793bdb263091fa6566a6e300df85e8cee9fd` was published from `design-docs/ai-logs`, based on initial main `f7a8c8bb5076598be2bab852ea7307d5176d9e6b`.
- Explicit two-parent merge `c6000d2dbeac5b4d0f27fbb46d92e9f48d7fa63f` integrated the scaffold into main. Both seed and merge were pushed and exactly read back by the supervised publication utility with confirmed process cleanup.
- Scaffold copies match the package assets byte for byte. No conversation was recorded. The provenance branch is retained for manual records.
- Repository credential exclusion is verified; no credential is tracked. Credentials remain outside document and report content.
- Package source: repository-bundled SDD Manager 0.15.4. Root discovery protocol was executed read-only; SDD Manager and standalone Technical Writing Assistant entries were inspected. Discovery produced no repository changes.
- Current reset: none.

## Pending transitions

Publish/read back the initialization commit on design-docs/main, then close/read back DOCS-001 issue #1 with that commit's evidence. Only afterward publish the PROJECT proposal; keep DOCS-002 unchecked until human approval. Recover later effects from Git and GitHub before replaying any operation.
