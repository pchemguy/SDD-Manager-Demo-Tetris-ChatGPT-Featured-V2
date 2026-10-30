# Session leaderboard contracts

## Scope and ownership

L-01–L-08 extend [SPEC](../SPEC.md) under [PROJECT](../PROJECT.md), [ARCHITECTURE](../ARCHITECTURE.md) and [DECOMPOSITION](../DECOMPOSITION.md). C-04 owns transactional controller history; C-09 pure ranking; C-05 projection; C-06 page lifetime. Existing game/scoring/configuration/browser-persistence contracts remain unchanged. [Manual files](file-persistence.md) add complete result metadata and explicit portable replacement; no automatic score storage or seventh setting exists.

## L-01 — Completed game and final score

A result qualifies only when a successful controller transaction changes status from running to game-over. Both lock/clear/next-spawn failure and blocked Hold-spawn failure qualify. Store the final candidate score after all successful score changes in that ending transaction. Include zero. A restart of ready/running/paused/game-over state creates no result by itself; unfinished games are abandoned. No result is recorded merely by mounting, rendering, pausing, losing focus or destroying a view.

Acceptance: exercise actual lock and Hold top-out paths with nonzero and zero scores; compare the submitted score to the ending Snapshot.score. Start/Restart before top-out adds nothing; restart after top-out retains exactly the already-recorded result.

## L-02 — Ranking and capacity

Keep at most ten individual results. Each result has exactly id, score and timestamp under File F-01. No name, active configuration or unfinished-game data is included. Sort descending by score. Insert a tied result after existing results with the same score. Retain equal-score games as distinct entries. Truncate after position ten; an incoming score below the current tenth, or equal to it after earlier ties, does not displace retained entries. Visible ranks are consecutive 1 through current length, with no shared or skipped rank numbers.

Acceptance: literal histories cover empty insertion, highest/middle/lowest insertion, multiple equal scores, ten zero-score games and more than ten completions. Assert the exact resulting ordered score sequence and ten-row cap, not only a sortedness predicate.

## L-03 — Pure calculation and detached values

C-09 accepts an ordered current history and complete final result and returns a new ordered capped history. It does not mutate its inputs, read clocks/RNG/storage or retain state. Scores must be non-negative safe integers; IDs and real canonical UTC timestamps follow File F-01. Malformed history/result/score types cause TypeError; numeric values outside that domain, history longer than ten or history not in descending order cause RangeError. Caller data remains unchanged on errors. C-04 passes only valid committed history and an accepted complete candidate result with explicit completion metadata.

Public session snapshots include a detached leaderboard result array and detached entries; mutating returned data must not affect current or future snapshots, rendering or controller history. No observer receives a reference to owned mutable history.

Acceptance: freeze inputs, mutate returned arrays/objects and later snapshots, check rejection classes and retained originals. Ranking neither invokes RNG nor changes configuration.

## L-04 — Atomic completion and notification

Within the existing controller transaction, derive candidate game state, recognize L-01 and read explicit ID/UTC callbacks once for the qualifying attempted completion and derive complete history before publishing the candidate. Commit score/status/history together, then notify existing subscribers with the same complete detached snapshot. Exactly one result is recorded per game regardless of repeated snapshots, post-game actions, frame advances or rerenders. A Game Over subscriber already sees the completed result even if another listener throws. Existing listener isolation and reentrant-operation rejection remain intact.

A failure before commit, including invalid integration input, completion metadata failure, piece draw/refill failure or ranking failure, preserves prior game and history state and emits no successful-change notification. External RNG callback effects remain outside transaction rollback as specified by the main game contracts. A failed Start/Restart also preserves the prior state/history.

Acceptance: deterministic session tests cover dispatch/advance/soft and hard-drop completion paths, both locking policies, listener throw/reentry, repeated post-game commands and draw failure followed by recovery. Verify one completion and consistent listener snapshots, with no extra RNG calls or elapsed-duration consumption.

## L-05 — Game and page lifetime

Fresh createSession starts ready with empty history. Successful Start/Restart resets gameplay fields according to existing contracts while preserving history. Pause/resume preserves it. Default mountGame creates a fresh independent Session; existing first three arguments and cleanup function remain usable. An optional explicit Session in the fourth argument is reused without restarting it, rereading configuration sources or reconstructing history. Sequential teardown/remount with that same controller preserves its game/history; a fresh default mount has empty history. The host must use a controller with only one live mount at a time.

Actual page entry creates a new controller for each new page lifetime. Reload, navigation to a fresh game page and closing/reopening create an empty leaderboard. Independently opened pages have independent lists. No score/history cookie, URL field, localStorage, sessionStorage, account, server or cross-tab synchronization is introduced. Existing settings restore through C-08 normally, even when the leaderboard clears.

Acceptance: real source fixture tests cover retained-controller sequential remount and fresh default mount; real page tests cover Restart retention, reload/new page isolation and remembered-settings restoration alongside empty history. Teardown must cancel its owned callbacks/listeners, stop notifications to a destroyed view and never submit a result.

## L-06 — Panel and accessibility

Display a clearly labelled optional Leaderboard panel left of Game info on wide screens under [UL01–10](ui-layout.md), with responsive stacking and independent Show/Hide. Render rank and decimal score for each retained result, in L-02 order. With no results show “No completed games yet.” Update within the same normal rendering turn as the ending score/status; no reload, manual refresh or additional action is needed. Rerender replaces rows instead of appending duplicate DOM entries. A shorter list or fresh context clears obsolete rows.

Use a semantic table with Rank and Score headers, or equivalent labelled list semantics available to assistive technology. Completion/ranking never moves focus. No modal, editable score, row button or keyboard binding is added. At widths320 and1000 CSS pixels the panel remains readable and does not cover the board, settings or existing controls. Document scrolling may be used on narrow screens; no horizontal clipping or unreadable compressed board is acceptable.

Acceptance: actual shared view and page inspect empty/one/ten rows, score/rank text, accessible label/header semantics, stable focus and screenshots at both widths. Do not infer acceptance from DOM existence alone.

## L-07 — Retained game/configuration guarantees

Use ordinary score without normalization or per-configuration boards; all permitted game rules, including penetrator, compete together. Preserve scoring, queue, Hold, ghost projection, lock clocks and bonus inventory. History must not consume random draws or schedule time. Existing six native controls, selected-versus-active timing, URL/cookie effects, input exclusion for native controls, focus/visibility pause and teardown remain governed by main SPEC.

Acceptance: existing ordinary/modern/ghost/configuration/persistence/penetrator and lifecycle suites pass. Add a completed-game trace under immediate and general hard-drop locking rather than assuming all endings originate from one input. Verify completion/ranking history changes do not save settings or alter URL/cookies. Manual Restore follows its separate checked file contract.

## L-08 — Browser distribution

The deployable static browser archive includes the leaderboard code/UI and accurate player installation/control guidance. Keep local assets relative and the existing strict member/manifest/checksum/exclusion policy; no test fixture, trace, development source, credential or browser cache ships. Source, built and extracted deployments must support L-01–L-07 through managed Chromium and Firefox. Source-only fixtures may test internal view/remount seams; actual game completion/panel/lifetime coverage must run against built and extracted page entry too. Native headed browser-window focus and public-network HTTPS cookie-engine limits remain reported separately; Desktop delivery/native acceptance belongs to [ED01–12](electron.md); these leaderboard contracts remain shared.

Acceptance: verify a clean install/build, type and boundary checks, unit/package/environment checks, actual source/built/extracted browser suites, repeated build/package identity, strict contents and extracted-prefix hosting. A completed integrated phase receives a minor release with notes and deployable ZIP/checksum, following the established default-branch release source/tag/body/asset/public-download/CI verification contract.

Manual Restore replaces the whole list, including empty history, without submitting a game or resetting current gameplay. Imported tie order is retained; later genuine completions rank normally. File validation, effects and explicit-default persistence follow [File F-01–F-12](file-persistence.md).
