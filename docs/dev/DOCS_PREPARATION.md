# Main documentation preparation record

## Current control

- Mode: autodoc/onepass, selected by the user's initial request on 2026-10-29.
- Scope: browser-based classic Tetris, with the three baseline recommendations confirmed by the user's `yes` response.
- Approval basis: PROJECT was approved by the user's `k` response to the published proposal at commit `8e5fcc878ea39dc5b3c5f38f6b8a0b43ff0c0eb6`. ARCHITECTURE through TASKS have mode-scoped preapproval.
- Tracking: preparation and implementation GitHub tracking enabled by root AGENTS.md. The native [sdd-docs-main milestone](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/1) and all nine standard issues were created and read back before repository modifications.
- Publication: publish and verify every owned commit. No local-only exception applies.
- Next boundary: record PROJECT acceptance and verified issue closure, then continue accepted preparation through DOCS-008, then stop before DOCS-009 package QC and implementation.

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
| DOCS-001 | Initialization commit `b666fad9cd229338ad0d93e6e8acb94dce4cfff5` is published and exactly read back. Issue #1 is closed as completed with completion evidence. Checks are retained below. |
| DOCS-002 | [PROJECT](PROJECT.md) approved by the user's `k` response. Accepted unchanged proposal commit `8e5fcc878ea39dc5b3c5f38f6b8a0b43ff0c0eb6`; accepted PROJECT blob: `c321b57d5b4033f67170b13f8fb3b9b920cde0e7`. |
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

Publish/read back the PROJECT acceptance commit and close/read back issue #2 before architecture. Then complete DOCS-003 through DOCS-008 under autodoc preapproval and stop before package QC. Recover actual publication/closure state from Git and GitHub before replay.
