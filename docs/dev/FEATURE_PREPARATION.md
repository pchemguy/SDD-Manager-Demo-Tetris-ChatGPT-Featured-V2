# Feature preparation record

## Identity and request

Campaign `006_ea39055`, slug `006_ea39055-leaderboard`. Original baseline/branch-off `ea3905572ff8e3fa473862e154faccee9055c18b`, creation parent and preparation integration target `main`. Preparation branch `design-docs/006_ea39055-leaderboard`. Reserved implementation branch `feature/006_ea39055-leaderboard` begins only after accepted preparation is verified, explicitly merged and published into main, and implementation is authorized. Reserved historical package `docs/dev/features/006_ea39055-leaderboard/` is not created during opening.

Original human request: Open a feature campaign to implement "leaderboard" capability. Show a leaderboard panel with the 10 best completed-game results, ranked by score. Update it after each game and keep the history only for the current session.

Main v1.5.0 is implemented, verified, integrated and released; no prior unfinished campaign resumes. Accepted context: [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [configuration](spec/session-configuration.md), [browser persistence](spec/configuration-persistence.md), [PLAN](PLAN.md), [layout](layout.md) and [TASKS](TASKS.md). Main TASKS owns completed T-001–T-046. Frozen feature001–005 records remain unchanged. Existing manual conversation scaffold under docs/ai-logs and its design-docs/ai-logs branch are reused; recording remains manual.

## Current control

- Mode: autodoc/onepass, retained from the original project-wide instruction. One scope/pass: session-only top-ten completed-game leaderboard. First FEATURE accepted by human reply "k" to the published brief at20e4bbfd4d4902645168fbbbbf52d249c491d237; blob e97e41c1340ecbbb60b2497214364689f7c5df50. Following that acceptance, later necessary document checkpoints through FDOCS-008 are preapproved by the mapped mode; stop before whole-package QC.
- Authorized range now: complete the accepted single-scope autodoc document pass through FDOCS-008, then stop before package QC/integration/implementation. Earlier QC/full-implementation authorization ended with campaign005 and does not authorize this campaign's implementation.
- Strict preservation: retain completed prior phase/task ranges, frozen campaigns, tags and releases. No multipass or flexible integration selected.
- Tracking: enabled by AGENTS default and retained project policy. Native campaign preparation milestone and all nine exact issue identities/markers/associations verified before the first repository write. No product phase objects or product tasks projected.
- Reporting: concise Standard updates; actual host Linux/bash. Existing eligible repository and protected authentication reused. No product tests or environment installs needed for opening documentation.
- Next stage: FDOCS-005.

## Decision provenance

Supplied requirements: a visible leaderboard panel; best ten completed-game results by score; update after each game; history only for the current session.

Human-accepted brief decisions (reply "k" to the complete published proposal): completed means a transition to Game Over, including normal spawn failure or blocked Hold spawn; interrupted Start/Restart does not submit an unfinished run. Record final post-action score exactly once, including zero. Rank descending with earlier completion first for ties; retain distinct equal-score games and evict the latest lowest-ranked entry on overflow. Use a compact rank/score display; no names or dates. Keep history across Start/Restart within the same page lifetime; clear on reload, closing/reopening, or fresh independent page. Keep settings cookie/URL persistence unchanged and do not persist leaderboard data. Preserve detached reusable state and host separation. New game rules and settings remain unchanged; no extra preference or compatibility grouping is proposed. The accepted brief settles these product decisions; detailed contracts remain with the downstream specification.

## Tracking

Preparation milestone [26](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/26) named `sdd-docs-006_ea39055`.

| Stage | GitHub issue |
| --- | --- |
| FDOCS-001 | [#101](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/101) |
| FDOCS-002 | Human reply "k" accepts published FEATURE at20e4bbfd4d4902645168fbbbbf52d249c491d237, blob e97e41c1340ecbbb60b2497214364689f7c5df50, including completion, ties, reset, no-storage and retained-gameplay boundaries. Autodoc preapproves later necessary document stages through008 only. No implementation or package-QC grant inferred. |
| FDOCS-003 | FEATURE_ARCHITECTURE defines C04 transactional game/history ownership with a pure C09 ranking helper, C05 snapshot projection and C06 explicit-controller lifetime. Accepted main architecture retained elsewhere; reviewed against actual session.run, settle, Hold and mount paths. Single authority/no cycles/no storage and atomic notification/rollback boundaries assessed; autodoc preapproval applies. No product implementation. |
| FDOCS-004 | FEATURE_DECOMPOSITION assigns C09 pure ranking, C04 transactional bounded history/Snapshot, C05 read-only panel and C06 optional explicit-session remount. Existing three mount arguments/cleanup and configuration persistence remain compatible. Reviewed actual session subscription/rollback and mount teardown paths; no competing store or observer race. Autodoc preapproval applies; specification owns exact acceptance. |
| FDOCS-005 | [#105](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/105) |
| FDOCS-006 | [#106](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/106) |
| FDOCS-007 | [#107](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/107) |
| FDOCS-008 | [#108](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/108) |
| FDOCS-009 | [#109](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/109) |

## Stage evidence

| Stage | Source and assessment |
| --- | --- |
| FDOCS-001 | Clean eligible Git worktree at published main `ea3905572ff8e3fa473862e154faccee9055c18b`; campaign/branch collision checks clear; pre-write native milestone/nine issues verified. Existing adoption/disclosure/provenance retained. Context/task/control/HANDOFF initialization co-closes here; publish/read back and issue closure follow. |
| FDOCS-002 | Human reply "k" accepts published FEATURE at20e4bbfd4d4902645168fbbbbf52d249c491d237, blob e97e41c1340ecbbb60b2497214364689f7c5df50, including completion, ties, reset, no-storage and retained-gameplay boundaries. Autodoc preapproves later necessary document stages through008 only. No implementation or package-QC grant inferred. |
| FDOCS-003 | FEATURE_ARCHITECTURE defines C04 transactional game/history ownership with a pure C09 ranking helper, C05 snapshot projection and C06 explicit-controller lifetime. Accepted main architecture retained elsewhere; reviewed against actual session.run, settle, Hold and mount paths. Single authority/no cycles/no storage and atomic notification/rollback boundaries assessed; autodoc preapproval applies. No product implementation. |
| FDOCS-004 | FEATURE_DECOMPOSITION assigns C09 pure ranking, C04 transactional bounded history/Snapshot, C05 read-only panel and C06 optional explicit-session remount. Existing three mount arguments/cleanup and configuration persistence remain compatible. Reviewed actual session subscription/rollback and mount teardown paths; no competing store or observer race. Autodoc preapproval applies; specification owns exact acceptance. |
| FDOCS-005 | Specification and scoped QC pending. |
| FDOCS-006 | Delivery strategy and scoped QC pending. |
| FDOCS-007 | Layout assessment/combined QC pending. |
| FDOCS-008 | Executable tasks and scoped QC pending; mapped autodoc stop. |
| FDOCS-009 | Whole-package QC not selected or performed. |

## Pending transitions

FDOCS-004 accepted or assessed under the approved brief/autodoc mode. Publish/read back this owning completion, then close/read back issue 104 before dependent work. Next stage FDOCS-005. No product implementation, version change or release claimed.
