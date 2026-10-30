# Feature preparation record

## Identity and request

Campaign: 005_5153bbf, associated slug 005_5153bbf-url-get-cookie-persistence. Full original baseline and branch-off: 5153bbf695ba68dfff4af5faf2821d2d2eb94488, on creation parent/main preparation target `main`. Preparation branch: `design-docs/005_5153bbf-url-get-cookie-persistence`. Reserved implementation branch: `feature/005_5153bbf-url-get-cookie-persistence`, to be created only after accepted preparation is verified, explicitly merged and published into `main`, and implementation is authorized. Reserved historical package: `docs/dev/features/005_5153bbf-url-get-cookie-persistence/`; no archive or extra package navigation is created now.

The human requested opening a feature campaign for “URL GET and cookie persistence”: support cookies and URL query parameters for all existing configuration settings; restore saved or URL-supplied settings on reload/reopening, using sensible defaults otherwise. Resolve each setting independently by explicit URL value, then saved cookie, then default. Every player setting change saves its cookie and updates its URL parameter. Explicit URL values, including defaults, are saved in corresponding cookies. Omitted URL parameters retain saved cookie values rather than overwriting them with defaults.

Accepted main source: v1.4.0 integrated/released state at the baseline, with current [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [session configuration](spec/session-configuration.md), [PLAN](PLAN.md), [layout](layout.md) and [TASKS](TASKS.md). Main TASKS remains sole owner of completed T-001–T-040; no new product task exists yet. Active proposed feature sources are `docs/dev/FEATURE*`; all four closed feature packages remain frozen.

## Current control

- Mode: autodoc/onepass, retained from the human's project-wide autodoc instruction. One scope/pass only: the requested six-setting URL/cookie capability. The human accepted FEATURE blob edfb2f944044bc1993f1aaab31efb2a028155df2 in published proposal228ce8ab10bfca9e92456a23858d3f66d4f8f6c7 with “k” on 2026-10-30. Later necessary document checkpoints through FDOCS-008 are preapproved by that mode.
- Delivery policy: strict preservation of completed prior phase/task ranges; no multipass or flexible scope is selected.
- Authorized range now: prepare the accepted six-setting persistence document pass through FDOCS-008. Autodoc ends at FDOCS-008 before whole-package QC; the prior campaign's QC/full-implementation grant ended and does not authorize this feature's implementation.
- Tracking: enabled by repository AGENTS default and retained project policy. Preparation milestone and all nine exact campaign/stage markers/native associations verified before the first repository write. Product phase activation has not occurred.
- Reporting: Standard, with concise meaningful progress. No new execution-host setup is needed for document preparation; actual host Linux/bash. The optional cloud environment-status tool and policy snapshot were unavailable; actual authenticated GitHub API reads independently verified repository access and current default/main identity.
- Next stage: FDOCS-005; later covered document preparation remains preapproved. Stop after FDOCS-008 before whole-package QC.

## Decisions and cross-scope applicability

The supplied per-setting precedence and explicit-default/omitted-parameter rules are requirements, not agent proposals. The six current settings/defaults and selected-versus-active timing are established main contracts. The browser reload-to-default/no-storage guarantee is intentionally changed only for browser entry restoration; reusable configuration contexts and current-game rules retain their boundaries.

Accepted with the exact FEATURE proposal: existing configuration field names as query keys; exact enum strings and true/false booleans; invalid URL values fall back independently to saved/default values without overwriting a cookie; first repeated parameter wins; separate named cookies lasting one year, scoped to the app directory and host; edits replace the current URL while preserving unrelated parameters/fragment; browser-source/write failure cannot stop in-memory play; restore only settings, with no live cross-tab/history synchronization or game-state persistence. The human’s “k” accepts these presented choices; implementation remains outside this document-pass grant. Detailed current product intent belongs in FEATURE; downstream exact contracts remain pending.

No other scope sequence/cross-scope pass is selected. Reconsider accepted choices only if new evidence or human scope direction warrants it; never import unrelated conversation preferences.

## Tracking

Preparation milestone: [sdd-docs-005_5153bbf](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/22) (native milestone 22).

| Stage | GitHub issue |
| --- | --- |
| FDOCS-001 | [#86](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/86) |
| FDOCS-002 | Human accepted FEATURE blob edfb2f944044bc1993f1aaab31efb2a028155df2, presented at published228ce8ab10bfca9e92456a23858d3f66d4f8f6c7, with “k” on 2026-10-30. Scope/edge choices and browser-only compatibility consequences accepted; downstream FDOCS-003–008 preapproved under retained autodoc/onepass. Brief coverage assessment remains applicable; no source changes since presentation. |
| FDOCS-003 | FEATURE_ARCHITECTURE blob e788464082ee8fa680bd7bbbb638a29823ebcf2c; accepted FEATURE edfb2f944044bc1993f1aaab31efb2a028155df2 and main architecture36b58d4da6d85a2445c455af7dfcb60bd6d166ec govern. sdd-design assessment: one selected authority, browser adapter wrapping the existing structural controller, unidirectional dependencies, once-per-page restoration and independent best-effort effects; no session/UI storage globals, scheduler, backend or new gameplay setting. Canonical validation retained in C-07. No unresolved architectural choice; accepted by autodoc preapproval after the human brief approval. |
| FDOCS-004 | FEATURE_DECOMPOSITION blob 918f6af4ecb9001fc3124fe73cb4eca8fc9d844f; accepted architecture6b7b504219c9c27700f6dde9625cd5490fec18d1 and main decomposition290e8dc38f4b7bd4d7ca66b14b7e5516a95086b6 govern. sdd-design review: C-07 owns canonical validation/defaults, C-08 owns pure formats plus independent browser effects, C-06 only composes the adapter, and C-04/C-05 keep current selected/active responsibilities. Existing structural controller avoids new view callbacks/subscriptions; detached before/after diff prevents no-op/invalid writes; immutable page scope and current edit URL have explicit ownership. No cycles, duplicated state or unresolved component boundary. Autodoc preapproval applies. |
| FDOCS-005 | [#90](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/90) |
| FDOCS-006 | [#91](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/91) |
| FDOCS-007 | [#92](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/92) |
| FDOCS-008 | [#93](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/93) |
| FDOCS-009 | [#94](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/94) |

## Stage evidence

| Stage | Source/applicability and decision/QC evidence |
| --- | --- |
| FDOCS-001 | Clean eligible Git worktree; local/remote default main both 5153bbf695ba68dfff4af5faf2821d2d2eb94488; campaign/branch collision readback clear; all nine hosted issues and milestone verified. Existing AGENTS/discovery/disclosure/usage and manual provenance scaffold reused without resetting main initialization. Context/record/task/HANDOFF initialized coherently; owning commit publication and issue closure follow this checkpoint. |
| FDOCS-002 | Human accepted FEATURE blob edfb2f944044bc1993f1aaab31efb2a028155df2, presented at published228ce8ab10bfca9e92456a23858d3f66d4f8f6c7, with “k” on 2026-10-30. Scope/edge choices and browser-only compatibility consequences accepted; downstream FDOCS-003–008 preapproved under retained autodoc/onepass. Brief coverage assessment remains applicable; no source changes since presentation. |
| FDOCS-003 | FEATURE_ARCHITECTURE blob e788464082ee8fa680bd7bbbb638a29823ebcf2c; accepted FEATURE edfb2f944044bc1993f1aaab31efb2a028155df2 and main architecture36b58d4da6d85a2445c455af7dfcb60bd6d166ec govern. sdd-design assessment: one selected authority, browser adapter wrapping the existing structural controller, unidirectional dependencies, once-per-page restoration and independent best-effort effects; no session/UI storage globals, scheduler, backend or new gameplay setting. Canonical validation retained in C-07. No unresolved architectural choice; accepted by autodoc preapproval after the human brief approval. |
| FDOCS-004 | FEATURE_DECOMPOSITION blob 918f6af4ecb9001fc3124fe73cb4eca8fc9d844f; accepted architecture6b7b504219c9c27700f6dde9625cd5490fec18d1 and main decomposition290e8dc38f4b7bd4d7ca66b14b7e5516a95086b6 govern. sdd-design review: C-07 owns canonical validation/defaults, C-08 owns pure formats plus independent browser effects, C-06 only composes the adapter, and C-04/C-05 keep current selected/active responsibilities. Existing structural controller avoids new view callbacks/subscriptions; detached before/after diff prevents no-op/invalid writes; immutable page scope and current edit URL have explicit ownership. No cycles, duplicated state or unresolved component boundary. Autodoc preapproval applies. |
| FDOCS-005 | Pending specification and scoped QC. |
| FDOCS-006 | Pending delivery strategy and scoped QC. |
| FDOCS-007 | Pending layout assessment/combined QC. |
| FDOCS-008 | Pending tasks and QC; mapped autodoc stop before FDOCS-009. |
| FDOCS-009 | Pending; no whole-package QC selected or performed. |

## Current reset and pending transitions

No reset. FDOCS-001 initialization74def8a909e1e5b98a2e330a6d37387c31b70235 and FEATURE proposal228ce8ab10bfca9e92456a23858d3f66d4f8f6c7 were published/read back. The human accepted the exact FEATURE proposal with “k” on 2026-10-30. Earlier stages through FDOCS-003 are committed/published with their issues closed/read back. Publish/read back this FDOCS-004 completion, then close/read back issue89; recover these effects from Git/API rather than replaying writes. After confirmed closure, continue only the covered document pass through FDOCS-008. FDOCS-009/issue94 and milestone22 stay open. No whole-package QC readiness, preparation integration, product implementation, version change or release is claimed.
