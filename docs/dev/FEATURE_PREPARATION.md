# UI layout feature preparation

## Identity and scope

- Campaign: `008_b7c9813`; reserved archive/report association: `features/008_b7c9813-ui-layout/`. No archive/navigation package is created during preparation.
- Accepted main baseline and preparation branch-off: `b7c98134963d5dde5fd9bb743b8117c485f3ef24`, the clean published `main` checkpoint after v1.7.0.
- Creation parent/default preparation target/intended implementation parent: `main` in `pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2`.
- Working branch: `design-docs/008_b7c9813-ui-layout`; intended later implementation branch: `feature/008_b7c9813-ui-layout`, not created or activated.
- Active source owners: [FEATURE](FEATURE.md) when drafted, this evidence record and [feature documentation tasks](FEATURE_DOCS_TASKS.md). Affected main context: [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [layout](layout.md), [PLAN](PLAN.md), [TASKS](TASKS.md). The absent FEATURE link is pending FDOCS-002 authoring, not an accepted input.

## Original request

Open a feature campaign to implement "UI layout" capability. Arrange panels left to right: Leaderboard; Game info and controls immediately left of the Board; Board centered on the screen; Settings immediately right of the Board; Controls/help right of Settings. Keep Board and Game info/controls visible. Place individual show/hide buttons for Leaderboard, Settings and Controls/help in Game info/controls above Start/Restart and Pause/Start. Keep Board centered as panels are hidden or shown.

## Current control

- Mode: interactive/onepass, pass1, one supplied scope: UI layout. Default applies; no future-checkpoint preapproval or implementation range was granted for this new campaign. Prior campaign007 authority is completed, not reused.
- Reporting: Standard after concise explicit entry report. Minimal, Standard and Explicit change reporting detail, not approval or QC gates.
- Preserve existing completed phases/tasks1–61 and frozen campaigns001–007. No multipass sequence or flexible replanning selected.
- Scope: open preparation and publish a reviewable FEATURE, then pause for first brief acceptance before dependent design/specification. No implementation, release, new product task projection or main-document incorporation now.
- Tracking: enabled by root AGENTS default. Native milestone [34](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/34), `sdd-docs-008_b7c9813`; nine exact campaign-qualified issues134–142 were read back open with task/scope markers and native milestone associations before branch or repository writes.
- Existing disclosure/adoption, manual provenance branch and root instructions are retained; no main initialization replay or new transcript setup.
- Next stage: FDOCS-002 draft and human acceptance. FDOCS-001 publication and issue closure must be reconciled before dependent work.

## Decisions and proposals

| Item | Basis and status |
| --- | --- |
| Five-panel order, centered Board, always-available Board and Game info/controls, three independent toggles above primary actions | Supplied human requirements. |
| Existing behavior | Inspection: C05 game-view/styles currently put leaderboard/actions/help inside Game information beside Board, with an open native Settings disclosure below. Layout change affects shared DOM/CSS and acceptance selectors; no new game rule or seventh configuration setting is requested. |
| Narrow screens | Material open choice: strict five-column order cannot fit the existing supported320px viewport with readable Board plus Game info. Brief will propose responsive stacking, with centered Board and no hide toggle for either essential panel; proposal requires human acceptance. |
| Initial visibility and lifetime | Proposal for brief: all optional panels initially shown; view-local manual visibility, no added cookies, URL fields or save-file data. Existing persistence domains remain exact. |
| Primary actions | Preserve Start/Restart and pause/continue semantics. Interpret the requested Pause/Start as continuing the current paused game, not resetting it; exact state captions remain for specification. |
| Layout mechanism | Deferred until accepted intent: evaluate balanced side regions/CSS grid against other techniques; no algorithm or new dependency selected in this brief stage. |

## Stage evidence

| Stage | Evidence and state |
| --- | --- |
| FDOCS-001 | Clean main/local/remote exact baseline verified; no unfinished workflow branch; actual Linux/bash with Node24.22.1, Python3.12.14 and Git2.51.1. Existing ignored/untracked conventional credential reused without modification. Nine pinned-template preparation definitions and associations verified. Task-only records initialized with001 checked; this coherent context commit requires normal push/readback then issue134 closure/readback. |
| FDOCS-002 | FEATURE not yet drafted or accepted; issue135 remains open. |
| FDOCS-003–009 | Pending in dependency order; issues136–142 open. No downstream document readiness or product implementation claimed. |

## Pending effects and next boundary

Publish/read back this context commit, then close/read back issue134 with its exact commit evidence. Draft FEATURE with seed-coverage and retained-guarantee review, publish it and stop for human acceptance. Package QC, preparation integration and milestone closure remain pending later stages. Do not invent acceptance from a published draft.
