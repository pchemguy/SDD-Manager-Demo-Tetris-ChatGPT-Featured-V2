# Main documentation preparation record

## Current control

- Mode: autodoc/onepass, selected by the user's initial request on 2026-10-29.
- Scope: browser-based classic Tetris, with the three baseline recommendations confirmed by the user's `yes` response.
- Approval basis: PROJECT was approved by the user's `k` response to the published proposal at commit `8e5fcc878ea39dc5b3c5f38f6b8a0b43ff0c0eb6`. ARCHITECTURE through TASKS have mode-scoped preapproval.
- Tracking: preparation and implementation GitHub tracking enabled by root AGENTS.md. The native [sdd-docs-main milestone](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/1) and all nine standard issues were created and read back before repository modifications.
- Publication: publish and verify every owned commit. No local-only exception applies.
- Next boundary: DOCS-008 autodoc stop after publication/issue closure. DOCS-009 package QC, preparation integration and implementation are not selected.

## Scope and confirmed decisions

One documentation pass covers the complete classic browser-game scope supplied by the user. No later scope passes are selected.

| Decision | Resolution | Basis |
| --- | --- | --- |
| Classic gameplay | Movement, rotation, soft drop, line clearing, score, levels, pause and restart. Hold, ghost, next-piece preview, 7-bag, wall kicks and hard drop are outside the current scope. | Agent recommendations explicitly confirmed by the user. |
| Locking | Lock when a gravity or soft-drop attempt cannot move the piece downward. No separate lock timer and no movement/rotation timer resets. | Agent recommendation explicitly confirmed by the user. |
| Reuse and platforms | Shared TypeScript game logic and UI; browser-specific integration remains separate. Windows Electron delivery is future scope. | Initial request and confirmed recommendation. |
| Versioning and releases | Select an appropriate initial version and increase it for delivered changes. Publish a GitHub release, corresponding tag and notes after each completed, verified and integrated implementation phase. | Initial user request; no implementation phase or release has yet been delivered. |

Detailed behavioral contracts are in SPEC and planned verification commands are in TASKS. No unresolved material brief-scope decision is known; newly discovered material decisions require human input under onepass mode.

## Decisions and document evidence

| Task | Current evidence / decision basis |
| --- | --- |
| DOCS-001 | Initialization commit `b666fad9cd229338ad0d93e6e8acb94dce4cfff5` is published and exactly read back. Issue #1 is closed as completed with completion evidence. Checks are retained below. |
| DOCS-002 | [PROJECT](PROJECT.md) approved by the user's `k` response. Accepted unchanged proposal commit `8e5fcc878ea39dc5b3c5f38f6b8a0b43ff0c0eb6`; accepted PROJECT blob: `c321b57d5b4033f67170b13f8fb3b9b920cde0e7`. |
| DOCS-003 | Accepted under autodoc preapproval. Reviewed against accepted PROJECT: all major responsibilities have one owner, dependencies are acyclic, shared UI supports a future Electron renderer, and core/session testing is independent of browser APIs. No material scope change or unresolved structural decision. Reviewed state: `docs/dev/ARCHITECTURE.md` blob `9f25f4b30b84e2b9d95eeb920ffa0b399a657bce`. |
| DOCS-004 | Accepted under autodoc preapproval. Reviewed C-01 through C-06 against ARCHITECTURE: unique state ownership, explicit provided/required boundaries, no dependency cycles, detached snapshots, atomic lock/clear/spawn collaboration, lifecycle cleanup and independently assessable seams. Exact contracts remain owned by SPEC. Reviewed state: `docs/dev/DECOMPOSITION.md` blob `7ee0b9887853edaf73e78053d5abadb7ded5d94e`. |
| DOCS-005 | Accepted under autodoc preapproval. SPEC/design conformance review is Ready in SPEC-REVIEW-REPORT. R-01 through R-12 cover geometry, random spawn, failed-downward locking, progression, pause/time boundaries, integration errors, shared UI/host separation, browser evidence and static release acceptance. Manual boundary walkthrough and Markdown checks completed. SPEC review Revision 1 resolves S-01 by clarifying listener-error injection and initial subscription behavior; current SPEC blob `87368c5c720058b401f6ef3bc3b3cfceb06fcc26`. No unresolved defect or runtime claim. Initial reviewed state: `docs/dev/SPEC.md` blob `6f3bcf0d11f9446e9ca894aa5ba2bef69e996d38`; `docs/dev/SPEC-REVIEW-REPORT.md` blob `a6a53927129451c0601577fc59de3884726e8665`. |
| DOCS-006 | Accepted under autodoc preapproval. PLAN strategy QC is Ready for layout in PLAN-REVIEW-REPORT. One coherent classic-only phase has three delivery milestones plus the dedicated single-task phase review milestone. R-01 through R-12 have explicit delivery routes; initial release 1.0.0 follows verified default integration. Combined layout readiness remains pending. Reviewed state: `docs/dev/PLAN.md` blob `a84d51def9a21dc9dd17589dd88f124b5187609a`; `docs/dev/PLAN-REVIEW-REPORT.md` blob `95414baf09a48058cc32801010f848cee6a472b2`. |
| DOCS-007 | Accepted under autodoc preapproval. Combined PLAN/layout review Revision 1 is Ready for TASKS. C-01 through C-06 map to owned source/test seams; generated browsers, profiles, builds and credentials are isolated from allowlisted deployment. Existing AGENTS policies are preserved with current navigation; no unimplemented command is claimed validated. Reviewed state: `docs/dev/layout.md` blob `8c801bdcd0234e5c8a73da8acb24d2273483b827`; `docs/dev/PLAN-REVIEW-REPORT.md` blob `5b3a66ecd689ed2e6aeb3c7c646b014a925fdf5d`; `AGENTS.md` blob `9e4bce516c9e11c01105a67270a9dd85f5258c5c`. |
| DOCS-008 | Accepted under autodoc preapproval. TASKS/PLAN conformance review is Ready with 13 unchecked product tasks: 11 delivery and 2 dedicated reviews. Revision 1 resolves TQ-01/TQ-02 executable-input sequencing; IDs, milestone boundaries and counts remain unchanged. Checked hierarchy, prerequisites, current links, ownership, review thresholds and evidence separation. HANDOFF records the DOCS-008 stop; package QC and implementation remain unselected. Reviewed state: `docs/dev/TASKS.md` blob `e0b80c3a115187a7402ffde3bba0a4d6c0765fa4`; `docs/dev/TASKS-REVIEW-REPORT.md` blob `0c42d3ff5429e2f6a550253f4d3633ea06e54ff2`; `docs/dev/HANDOFF.md` blob `ceb1b000902d43766a12db2236dccc2bf177853f`; `AGENTS.md` blob `0105ae3d4591fd8d373172d8450eee2198185903`. |
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

Publish/read back the DOCS-008 completion commit and close/read back its corresponding issue before dependent work. Completed earlier issue closures are verified externally. Stop after DOCS-008; DOCS-009 package QC, preparation integration and implementation remain unselected. Recover actual effects from Git and GitHub before replay.
