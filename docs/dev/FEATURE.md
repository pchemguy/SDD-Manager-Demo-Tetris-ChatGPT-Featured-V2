# Modern rule extensions

## Outcome and scope

Upgrade the released browser game with hold, a single next-piece preview, a ghost landing projection, 7-bag generation, SRS wall kicks in both rotation directions, hard drop and a full-gravity-interval lock delay. The modern rules become the default; a separate classic-mode selector is outside this feature. Existing single-player browser delivery and future desktop reuse constraints remain those of [PROJECT](PROJECT.md) and [ARCHITECTURE](ARCHITECTURE.md).

## Piece flow and player information

Each shuffled bag contains each of I, J, L, O, S, T and Z exactly once. Bags follow consecutively and can repeat a type across their boundary. Randomness remains injectable and independently testable. The preview displays only the single next piece to spawn. Later pieces in the bag are not shown. Holding into an empty slot consumes the next queued piece; swapping an occupied slot does not consume the queue. Preview and active piece always agree with actual generation.

The player may hold once before the current piece locks. Holding stores its type and brings the held or queued replacement into the ordinary spawn orientation/position, with fresh piece timers. Movement, rotation, soft drop or delayed hard drop do not restore hold eligibility; a completed lock does. Blocked replacement spawn ends the game using the retained blocked-spawn rule. Start/restart reset the bag/queue, held slot and hold eligibility; pause preserves them.

The ghost shows the lowest legal straight-down landing of the current piece using the settled board. It is display-only and remains distinct from active and settled cells without depending on color alone. It updates after moves, kicks, rotation and hold. When ghost and active cells coincide, active-piece visibility takes precedence. Preview and hold panels use the shared view and remain usable at the existing 320 CSS-pixel layout boundary.

## Rotation and drop controls

Use explicit SRS clockwise and counterclockwise transition kick tables, with separate I behavior, shared J/L/S/T/Z behavior and no O displacement. Try candidates in specified order and retain the original piece if all fail. Exact tables, board-axis conversion and acceptance fixtures belong in the specification. Keep the existing ten-by-twenty visible board and strict occupied-cell legality, including the upper boundary: kicks do not authorize hidden or out-of-board cells. This is a bounded SRS-based rotation capability, not a claim of complete Tetris Guideline compliance.

Retain arrow-left/right movement, arrow-down soft drop, arrow-up clockwise rotation and existing lifecycle controls. Add X for clockwise, Z for counterclockwise, C or Shift for hold and Space for hard drop. Space therefore changes from its released clockwise alias to hard drop; the visible legend and controls guide must make that change clear. Single-action keys ignore native repeat; movement and soft-drop repeat retain their current policy. Semantic UI controls provide the new actions and the immediate-lock option within the existing browser/shared-view split. Full touch/swipe controls, remapping, gamepad support and custom key-repeat tuning are outside scope.

Hard drop moves immediately to the same landing used by the ghost. Award two points per descended cell; a zero-distance drop awards zero. Keep current soft-drop and line-clear scores, level thresholds and gravity-speed curve. Do not add T-spin, combo, back-to-back or perfect-clear awards.

## Grounded timing and the hard-drop option

Becoming grounded means the current legal active piece can no longer move down one cell. Grounding caused by gravity, soft drop, movement, a kick, spawn, hold or hard drop starts a fresh countdown equal to one full current gravity interval. Capture that interval at landing, independently of any partially accumulated gravity time. Ground contact does not lock immediately, and a blocked downward attempt cannot shorten the countdown.

Successful or failed movement, rotation and blocked soft/hard drop while still grounded do not reset or extend the countdown. If a move or kick actually leaves support, discard the landing countdown; becoming grounded again starts a new full interval. There is no fixed reset cap or elapsed per-piece lifetime limit in this landing-only policy. Pause freezes both gravity and lock timing; resume has no wall-clock catch-up. Holding/restarting replaces the piece and resets its timing. The precise elapsed-event ordering, equality boundary and excess-time handling must be specified and tested; retain the existing safeguard that one advance cannot cascade locks across multiple new pieces.

Hard drop uses this same delayed-lock policy by default. A drop onto the ground starts a fresh full landing interval; dropping an already grounded piece preserves its running countdown. During delayed locking the player may still move, rotate or hold if otherwise eligible. An immediate-hard-drop-lock pre-game checkbox defaults off; selecting it makes hard drop lock after placement, including a zero-distance hard drop. Apply the selected value when starting or restarting a session, keep the current session's rule fixed, and preserve it across pause/resume. Reload returns to the default; persisted preferences are outside scope. Immediate locking changes only hard-drop behavior, not ordinary gravity or soft-drop grounding.

## Retained guarantees and compatibility

Keep transactional session updates, detached snapshots, listener-error isolation, explicit time/random inputs and the current pause/focus/lifecycle cleanup guarantees. No host timers or browser globals enter shared game logic. The browser still requires no account, backend or runtime Node.js; relative assets and extracted-prefix deployment remain supported.

This feature intentionally replaces independent per-spawn random draws, no-kick clockwise-only rotation and failed-downward immediate locking. It expands session commands/snapshots and changes deterministic fixtures accordingly. These are internal application interfaces rather than a separately released public library. Retain previous completed task/release evidence as history and update current governing documents at eligible incorporation. The existing v1.0.0 release/tag/assets remain unchanged.

## Approach and delivery

Extend the existing pure rules, transactional session, shared DOM view and thin browser adapter. Replacing the engine or adding a UI framework would discard useful verified boundaries without addressing a delivery requirement. Keeping two selectable rule engines would add a scope the modern-default decision excludes. Separate detailed components/contracts and physical allocation remain design/specification responsibilities.

Target the next browser capability release as v1.1.0, with appropriate later increments if delivery requires more than one phase. Each completed phase must pass review, regression checks, explicit integration and the standing GitHub-release policy. Deliver the static ZIP/checksum, updated controls/install documentation and notes about changed default behavior. Electron packaging, a backend, multiplayer, save/replay and additional guideline features remain outside scope.

## Success criteria

A player can see forthcoming/held/ghost pieces, hold and swap legally, rotate using both-direction kicks and hard-drop under the chosen locking policy. Every bag has seven unique types; preview consumption is consistent through hold and lock. Deterministic tests establish exact landing-time/reset/drop/pause boundaries and blocked-spawn behavior; isolated Chromium and Firefox tests exercise actual controls, responsive rendering, recovery and packaged static deployment. Required package integrity and lifecycle/error checks continue to pass.
