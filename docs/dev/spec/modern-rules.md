# Modern rules contracts

This focused child of [SPEC](../SPEC.md) owns current F-01–F-08 contracts. R-01 retains board/spawn geometry; R-04 retains classic clear/level/gravity formulas; R-06/R-08/R-09 retain lifecycle, observer/error and portability guarantees. [Configuration S-01–S-08](session-configuration.md) owns selected/active rule values, disabled actions, general policy choice and live display visibility. No classic selector, hidden rows or desktop delivery is included.

## F-01 Rotation and landing (R-01/R-03)

Retain the ten-column/twenty-row board, spawn definitions and occupied-cell legality. Rotation labels 0/R/2/L correspond to 0/1/2/3. Clockwise adds one modulo four, counterclockwise subtracts one modulo four. O is a no-op. For other types, rotate about the existing matrix center, then test the following offsets in listed order relative to the original origin. Return the first legal candidate; otherwise retain the original piece. No cumulative offsets, alternative tables or correction beyond these tests apply.

Offsets below use the application's coordinates: positive x right, positive y **down**. They are the project’s explicit SRS tables, checked against the [published SRS reference](https://www.tetris.wiki/SRS), whose y axis is opposite. Strict ceiling legality still rejects any occupied cell above row zero; this bounded rule set does not promise full Guideline compliance.

| Transition | J/L/S/T/Z ordered offsets |
| --- | --- |
| 0→R | (0,0), (-1,0), (-1,-1), (0,2), (-1,2) |
| R→0 | (0,0), (1,0), (1,1), (0,-2), (1,-2) |
| R→2 | (0,0), (1,0), (1,1), (0,-2), (1,-2) |
| 2→R | (0,0), (-1,0), (-1,-1), (0,2), (-1,2) |
| 2→L | (0,0), (1,0), (1,-1), (0,2), (1,2) |
| L→2 | (0,0), (-1,0), (-1,1), (0,-2), (-1,-2) |
| L→0 | (0,0), (-1,0), (-1,1), (0,-2), (-1,-2) |
| 0→L | (0,0), (1,0), (1,-1), (0,2), (1,2) |

| Transition | I ordered offsets |
| --- | --- |
| 0→R | (0,0), (-2,0), (1,0), (-2,1), (1,-2) |
| R→0 | (0,0), (2,0), (-1,0), (2,-1), (-1,2) |
| R→2 | (0,0), (-1,0), (2,0), (-1,-2), (2,1) |
| 2→R | (0,0), (1,0), (-2,0), (1,2), (-2,-1) |
| 2→L | (0,0), (2,0), (-1,0), (2,-1), (-1,2) |
| L→2 | (0,0), (-2,0), (1,0), (-2,1), (1,-2) |
| L→0 | (0,0), (1,0), (-2,0), (1,2), (-2,-1) |
| 0→L | (0,0), (-1,0), (2,0), (-1,-2), (2,1) |

`landing(board, piece)` returns a detached copy at the maximum legal y reachable by repeated downward steps at fixed x/orientation. It never crosses an obstruction or changes the board. A grounded piece returns its own placement. Ghost and hard drop use this same function. `tryRotate(board, piece, direction)` uses direction 1 or -1 and returns a candidate or null; invalid integration direction throws RangeError before mutation.

Acceptance: cover all eight transitions in both families, O invariance, first-legal ordering when multiple candidates fit, fallback after obstruction and complete failure at wall/floor/ceiling/stack. Landing fixtures prove last legal row and board/input immutability.

## F-02 Seven-bag and next-only preview (R-02)

Begin each refill with I,J,L,O,S,T,Z. For i=6 down through 1, obtain a finite random r in [0,1), compute j=floor(r*(i+1)) and swap entries i and j. Each refill consumes exactly six callback values. Consume the resulting bag from index zero. Refill only when an upcoming type is needed and none remains. Construction/ready consumes no randomness; start/restart discard prior bag state, shuffle afresh, consume active and expose the single next type. Ensure one look-ahead is available after each consumption, even across a bag boundary.

Every seven consecutive consumed types aligned to a bag boundary contains each kind once; boundary repeats are legal. Exactly one next type is public. Preview means the next type consumed by a normal lock/spawn or empty-slot hold, never a second independent random draw. Swapping occupied hold does not advance it. Pausing and snapshot reads consume no randomness.

Acceptance: controlled six-value shuffle permutation/order, repeated bags and boundary repeats; preview matches lock and empty-hold successors. An invalid/throwing callback at any refill step leaves the entire session transaction unchanged, including bag cursor and clocks. External callback side effects are outside rollback; retry may use new supplied values.

## F-03 Hold (R-02/R-06)

When active holdEnabled is true, while running with an active piece and canHold true, store the outgoing type. If held was null, consume the next type; otherwise use the held type without consuming next. Spawn the replacement at ordinary orientation zero/position. Set canHold false, gravity remainder zero and establish fresh grounding state. Holding never locks the outgoing piece, clears rows or awards points. It preserves existing statistics and settled board. Further holds before a successful lock are unchanged no-ops. Pause/resume, moves, kicks and delayed hard drop do not re-enable hold.

A lock enables hold for the newly spawned piece only when active holdEnabled is true. Disabled hold is an unchanged no-op with canHold false and slot Off under S-05. A blocked replacement (including held replacement) enters game-over with active/ghost null and canHold false; retain board/statistics, resulting held value and next type after any actual consumption. Construction has held/next/ghost null and canHold false. Fresh start/restart has held null, canHold true when enabled and spawn succeeds, and one public next. Game-over commands do not hold; restart resets this state.

Acceptance: first hold, rejected double hold, swap after lock without next consumption, rotated-piece reset, pause/ineligible actions and blocked held/queued spawn. Test bag-refill failure during empty hold for whole-state rollback.

## F-04 Landing countdown and time (R-03/R-05)

This section defines gravity-interval policy. [S-03](session-configuration.md#s-03-general-locking-policies) defines failed-downward policy, which has no grounding countdown.

Grounded means a legal active piece cannot move down one cell. Following every successful spawn, hold, move, rotation or downward placement, evaluate grounding. Airborne→grounded starts lockRemaining at gravityInterval(current level), independently of gravity remainder. Grounded→grounded preserves the countdown, including failed commands/O rotation. Grounded→airborne cancels it; the next landing starts a full fresh interval. No move-reset cap or total piece-life limit applies.

While running, advance consumes elapsed time chronologically against the next gravity tick and, when grounded, lock deadline. Both clocks advance concurrently. At a gravity tick attempt one downward row; blocked gravity does not lock or reset the countdown. Gravity remainder continues modulo its interval even while grounded. If that tick causes landing, only elapsed time after that event counts toward the new lock timer. At a lock deadline (including exact equality), lock/clear/progress/spawn atomically. If gravity and lock coincide, process lock first. Stop that advance at its first lock/game-over and discard excess elapsed; a spawned piece starts with gravity remainder zero and fresh grounding state. `advance(0)` does not advance a positive countdown. New-piece grounding at the same event cannot consume discarded elapsed.

Successful manual movement/rotation/soft drop/hard drop preserves gravity remainder unless it causes a lock or replaces the piece. A blocked soft drop adds no score and does not lock early. Manual actions consume no elapsed time. Pause preserves all clocks and ignores durations/actions while paused; resume does not catch up. Frame clamping and first-zero-delta browser policy remain R-05. Level/speed cannot change without locking; capture the current interval when grounding and use the updated level for the next piece.

Acceptance: grounded at level one stays active after 999ms and locks at 1000ms; prove this for floor and stack. With gravity remainder 999ms at a manual landing, advance(1) must not lock and countdown still has 999ms. A landing partway through advance counts only its tail. Cover continuous-support moves, failed commands, support escape/relanding, O rotation, both-direction floor kicks, pause/resume, coincident events, large elapsed, nonfinite/negative input rejection and hold/restart resets. Exact model tests are separate from browser real-time evidence.

## F-05 Hard drop and options (R-03/R-04/R-06)

When active hardDropEnabled is true, hardDrop moves active to canonical landing and adds2 points per descended row. General hard-drop policy follows the selected general policy: interval locking starts/preserves the F-04 countdown; failed-downward locking only places/scores and waits for an actual subsequent failed gravity/soft-drop attempt. A repeated zero-distance general drop does not score, lock or reset clocks. Movement/rotation/eligible hold remain available before lock. Immediate hard-drop policy atomically settles after placement, including zero distance, under either general policy. Disabled hard drop is unchanged with no score/draw/timer/notification effects. [S-04](session-configuration.md) owns exact behavior and rollback acceptance.

SessionOptions retains exactly {immediateHardDropLock:boolean} as a legacy input/mirror. dispatch accepts either this exact legacy form or complete four-field RuleOptions on Start/Restart, validates before effects/eligibility and copies active rules. Legacy selects enabled hard drop/hold and interval general locking plus its flag. Omission preserves current active rules. Snapshot.options is the original boolean projection; Snapshot.rules contains detached complete active values. [S-02](session-configuration.md) owns exact errors/precedence/copying.

The six-control panel owns one selected page context. Its immediate-lock checkbox projects general versus immediate; the legacy callback receives only the original boolean form. Pending gameplay changes apply at Start/Restart, never during the current game. Display changes act immediately. Defaults/lifetime/dependent policy control and native interaction follow S-01/S-07.

Acceptance: all four general×hard-drop pairs at positive/zero distance, disabled no-op/notifications, eligible hold, exact additive score/clears, copied/legacy inputs, rollback, ineligible Start and native next-game-only effects across Restart/reload.

## F-06 Presentation and controls (R-07/R-10)

When enabled, render exactly one Next miniature and one Hold slot (empty initially); hidden preview and disabled Hold read Off with no stale miniature/type under S-05. Derive ghost from the active piece. Ready/game-over have no active ghost; paused retains its frozen projection. The [conditional display contracts](ghost-visibility.md) control whole-ghost visibility; Always show remains default and canonical projection remains available. Display a visible ghost with a distinct outline/pattern and explicit occupied-cell semantics; active wins overlapping cells. Settled data remains separate. Use orientation-zero miniatures, labeled with their type; show hold-unavailable status. Snapshot board, active, ghost, options and rules are detached; mutating any returned object cannot affect future operations.

Board-focused keys: arrows left/right/down retain movement/soft drop; Up and X clockwise; Z counterclockwise; C and Shift hold; Space hard drop. Enter start, P/Escape pause/resume, R restart retain eligibility. Only left/right/softDrop accept native repeat; other repeated keydowns are ignored. Prevent handled board-key defaults. Native buttons expose rotate clockwise/counterclockwise, hold and hard drop plus existing lifecycle controls; disable status-ineligible actions, active disabled hard drop and hold while unavailable. Buttons/checkbox/editable elements do not also dispatch board shortcuts. All six native settings retain ordinary focus/activation without auto-pausing when focus stays inside the app.

Render the full 200-cell board and all panels/controls without page horizontal overflow at 320 CSS pixels. Maintain visible focus, restrained lifecycle announcements and focus return after gameplay buttons. Update legend/docs for Space's changed binding. No touch/swipe/gamepad/remapping or additional scoring features are required.

Acceptance: actual board keys and native controls agree, no double-dispatch, single-action repeat ignored, next/hold miniatures match actual state, ghost/active overlap remains legible, layout screenshots at 320px and ordinary width, pause/focus/visibility recovery and repeated mount teardown without runtime/console errors.

## F-07 Boundary and errors (R-08/R-09)

Keep existing methods and construction callbacks; extend Action with rotateCCW, hold and hardDrop. Snapshot exposes next, held, canHold, ghost, legacy options and detached active rules as defined above and in S-02. Bag remaining/cursors and clocks stay private. Failed random/validation transitions cannot change statistics, queue, hold, timers or notify observers. A valid changed operation notifies each current observer once after full commit; unchanged operations do not notify. Listener errors remain isolated; reentrant operations remain rejected. All core/session work is deterministic given callback values and semantic time/actions; no global randomness or browser APIs enter these modules.

Acceptance: invalid draws during start, refill on lock and empty hold; cloned next/held value types and ghost/options objects; listener failures, reentry and unchanged actions. Retain DOM-free type/boundary checks and host teardown tests. C-07 selected values are detached in-memory context only; no public persistent format is added.

## F-08 Delivery and compatibility (R-10/R-11/R-12)

The current browser uses these modern contracts. Retain prior release artifacts/history. Source, built and extracted-prefix tests must exercise real modern gameplay in isolated Chromium and Firefox, with source-only deterministic fixtures excluded from production. Include modern controls/timing/options documentation, correct version/manifest and archive/checksum integrity. Native headed focus remains a separately reported evidence limit, not an implied desktop test. Preserve strict package allowlisting, secret exclusion, relative assets and no runtime backend/Node requirement.
