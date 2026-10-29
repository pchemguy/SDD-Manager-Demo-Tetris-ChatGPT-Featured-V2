# System specification

## Scope and ownership

This specification defines the classic game in [PROJECT](PROJECT.md), implemented through the boundaries in [ARCHITECTURE](ARCHITECTURE.md) and components C-01 through C-06 in [DECOMPOSITION](DECOMPOSITION.md). R-01 through R-12 are the acceptance groups. Modern rules are the current default. The focused [modern rules contracts](spec/modern-rules.md) own F-01–F-08 within R-01–R-08 and their R-10–R-12 acceptance. [Conditional ghost visibility](spec/ghost-visibility.md) G-01–G-05 extends presentation while preserving canonical projection and gameplay. Electron delivery is excluded.

## R-01 Board and piece geometry

C-01/C-02 use a board of 10 columns and 20 visible rows. Coordinates start at the upper left: x increases right and y increases down. There are no hidden rows. Each settled cell is empty or one of I, J, L, O, S, T, Z. An active piece is stored separately and contains exactly four occupied cells.

The following local coordinates define orientation zero. Spawn x is floor((10 - matrix size) / 2), and spawn y is zero. Empty padding in the matrix is not occupied.

| Piece | Matrix size | Occupied local cells (x,y) |
| --- | --- | --- |
| I | 4 | (0,1), (1,1), (2,1), (3,1) |
| J | 3 | (0,0), (0,1), (1,1), (2,1) |
| L | 3 | (2,0), (0,1), (1,1), (2,1) |
| O | 2 | (0,0), (1,0), (0,1), (1,1) |
| S | 3 | (1,0), (2,0), (0,1), (1,1) |
| T | 3 | (1,0), (0,1), (1,1), (2,1) |
| Z | 3 | (0,0), (1,0), (1,1), (2,1) |

A placement is legal exactly when all occupied cells are within the board and overlap no settled cell. For matrix size N, clockwise maps local (x,y) to (N - 1 - y, x); counterclockwise maps to (y, N - 1 - x). O occupied cells remain invariant. [F-01](spec/modern-rules.md#f-01-rotation-and-landing-r-01r-03) defines both directions, ordered kick offsets, O invariance and canonical landing. No hidden occupied cells above row zero are allowed.

## R-02 Piece generation and spawning

[F-02/F-03](spec/modern-rules.md) define six-draw seven-bag generation, exactly one public next type, hold consumption and fresh orientation-zero replacement. Ordinary spawn uses the coordinates in R-01 after row removal. A blocked replacement ends the game with no active/ghost and retained board/statistics; the resulting next/held state follows F-03. There is no separate top-out while a legal active piece exists.

## R-03 Downward movement and locking

Left/right attempt one column and soft drop one row. Successful soft drop scores one point per moved row; gravity scores none. Blocked downward attempts do not lock early. [F-04/F-05](spec/modern-rules.md) define the independent full-gravity-interval landing countdown and delayed/immediate hard drop. Lock/clear/progression/spawn is one atomic transition, never a partially observed board.

## R-04 Row clearing and progression

C-02 removes every full row simultaneously, moves remaining rows down while preserving their order, and adds empty rows at the top. Unfilled rows are retained. A lock can clear zero through four rows.

Score starts at zero, total lines at zero and level at one. Line-clear awards for 1/2/3/4 rows are 40/100/300/1200 multiplied by the level immediately before that clear. Add cleared rows to total lines, then set level to 1 + floor(total lines / 10). A zero-line lock adds no clear points. Soft-drop points are additive and survive a later clear. Hard drop adds two points per traversed row under F-05; no combo or other bonus applies.

Gravity interval in milliseconds is max(100, 1000 - 75 * (level - 1)). The next spawned piece uses the updated level. Restart resets score, total lines, level and gravity remainder.

## R-05 Elapsed time

C-04 consumes running elapsed time chronologically against concurrent gravity and grounding clocks as defined in [F-04](spec/modern-rules.md#f-04-landing-countdown-and-time-r-03r-05). Lock wins coincident deadlines. Stop at the first lock/game-over and discard excess time; no advance can cascade locks across pieces. Manual actions do not consume elapsed time. Pause freezes both clocks; spawn/hold/restart establish fresh clocks.

The browser host uses requestAnimationFrame timestamps. Its first frame after start/resume has delta zero; later deltas are clamped to [0,100] milliseconds before reaching the session. This prevents wall-clock catch-up after a stall. The host clears its timestamp baseline on pause, hidden state, loss of focus and restart. Model elapsed-time tests are separate from actual browser timing tests.

## R-06 Session lifecycle

Statuses are ready, running, paused and game-over. Construction produces ready with an empty board, zero score/lines, level one and no active piece. Start operates only from ready. Restart from any status creates a fresh running game with a new spawn; there is no confirmation dialog or persisted session.

Pause changes running to paused. Resume changes paused to running. Other status-ineligible lifecycle actions do nothing. Movement/rotation/soft drop/hold/hard drop do nothing outside running. Reload creates a new ready session. Pausing preserves the board, active piece, progression and both clocks.

Losing window focus, hiding the document or moving focus outside the game mount pauses a running session. Returning focus/visibility does not automatically resume. Closing/unmounting the app cancels the owned frame, removes owned listeners/subscriptions and removes only its own UI nodes. Mounting again creates one fresh session without duplicated input handling or frames.

## R-07 Input and presentation

The board is keyboard focusable and named. [F-06](spec/modern-rules.md#f-06-presentation-and-controls-r-07r-10) owns the full key map, native-button/checkbox behavior and exactly-one next/hold/ghost presentation. Space hard-drops; Up/X rotate clockwise, Z counterclockwise, C/Shift hold. Only movement/soft drop accepts key repeat. Lifecycle shortcuts, native input behavior, disabled states and focus return follow F-06. The legend is always available without hover. [G-01–G-05](spec/ghost-visibility.md) add an immediate per-view Ghost visibility selector with Always default and Lower half only, without changing board shortcuts or session options.

Render the complete board, distinct settled/active occupied cells, score, total lines, level, and ready/running/paused/game-over status. Use distinguishable piece colors with visible cell borders; color is not the sole way to distinguish filled versus empty cells or session status. Announce lifecycle changes through restrained accessible status text; do not announce every gravity frame. At viewport widths of at least 320 CSS pixels, the board and controls remain usable without horizontal page overflow.

## R-08 Integration contract and errors

C-04 exposes createSession(random, onListenerError?), getSnapshot(), dispatch(action, options?), advance(elapsedMs) and subscribe(listener), returning an unsubscribe function. Actions are start, restart, left, right, rotate, rotateCCW, softDrop, hold, hardDrop, pause and resume. Snapshots expose status, copied settled board, copied active piece or null, score, lines, level, next, held, canHold, ghost and copied options under F-07. Snapshot mutation must not alter later session behavior. Options validation and start/restart copying follow F-05. No browser object is part of the session API.

dispatch returns the resulting snapshot; advance returns the resulting snapshot. Notify subscribers once after a state-changing public operation; an unchanged operation produces no notification. A single advance may move through several rows but publishes only its final snapshot. Subscribers must not dispatch reentrant operations; reject reentrant dispatch/advance with an Error before mutation. Subscribing does not invoke the listener immediately; callers obtain the initial state with getSnapshot(). Unsubscribe is idempotent. A throwing subscriber must not prevent other subscribers from observing a committed transition; report that listener failure to the host error channel without rolling back committed gameplay.

Unknown actions, non-finite/negative elapsed durations or invalid random values raise RangeError before mutation. A throwing random callback propagates its error without changing game state. Validate random generation for a lock/spawn transition before committing the transition. Legal commands rejected by board geometry are normal no-ops, not errors. The production random source is valid by construction; test injection exercises failures.

The session supplies an injected onListenerError(error) callback, defaulting to a no-op for isolated use; the browser host reports errors through console.error. If that error callback throws, the session contains it and continues notifying other subscribers. Rendering or input integration failures must not silently restart or alter the rules state.

## R-09 Portability and dependencies

Rules and session modules use TypeScript without DOM, window, document, scheduler or global Math.random access. Randomness and durations are explicit inputs. Shared UI uses the supplied mount element's document and semantic action callbacks; window-level keyboard, focus, visibility and frame scheduling belong to the browser host. Dependencies remain acyclic in the direction defined by ARCHITECTURE.

The built app requires no Node.js installation, account, backend, remote asset service or worker at runtime. Local HTML, CSS and JavaScript served over static HTTP are sufficient. Direct file:// loading is not a required delivery mode. The nonpersistent next-game option in F-05 and view-local ghost visibility preference in G-02 are supported; reload resets both to their defaults. No persisted settings are supported.

## R-10 Browser verification

Verify the assembled app in isolated Playwright-managed Chromium headless shell and managed Firefox, using one absolute project/job-specific PLAYWRIGHT_BROWSERS_PATH. Browser-independent planning requires no installation. During implementation, verify provisioning and representative launch/session/render/teardown through the actual runner before dependent browser work, following repository policies.

Exercise real keyboard focus/input, control actions, rendering screenshots, reload and repeated context/page lifecycle. Test auto-pause handlers with controlled events and document whether native focus/visibility transitions were actually exercised; synthetic events do not prove native OS-window behavior. Native headed focus behavior unavailable on the execution host is reported as unverified and excluded from feasible headless gates under the browser policy. A failure in feasible required headless behavior remains a blocker.

## R-11 Distribution and releases

Deliver a versioned ZIP of static browser assets, installation/hosting instructions, gameplay controls and release notes. Assets use relative URLs suitable for hosting below a path prefix. Exclude credentials, browser binaries/profiles, node_modules, source-only development caches and absolute workspace paths from the deployment archive. Include the license and required notices. Document reproducible build and verification commands, package contents and SHA-256 checksum.

Each completed implementation phase is verified and integrated before its GitHub release/tag/notes are published. Installation instructions explain that the ZIP is a static deployment package; development dependencies are needed only to build from source. Evidence distinguishes checks performed, unavailable checks and unverified behavior. Do not claim Electron, signed installer or store distribution.

## R-12 Acceptance scenarios

| Scenario | Required observation | Components |
| --- | --- | --- |
| Start and ordinary play | Empty ready board starts with one legal piece; input/gravity can move and rotate it; settled cells never overlap or leave bounds. | C-01, C-02, C-04, C-05, C-06 |
| Grounded boundary | Ground contact preserves the piece; successful lateral/rotation actions remain possible; one full interval after grounding locks exactly once; continuous support does not reset the deadline. | C-01, C-02, C-04 |
| Clock boundary | Exact interval attempts downward movement; sub-interval time does not; late landing gets a separate full countdown; support escape/relanding, pause and coincident events obey F-04; lock discards residual time. | C-03, C-04, C-06 |
| Clear and progression | Fixtures for zero through four cleared rows verify compaction, score, pre-clear multiplier and crossing 10 total lines; gravity reaches its 100 ms floor. | C-02, C-03, C-04 |
| Spawn failure | A blocked next spawn after row removal ends the game with retained statistics and no active piece. | C-02, C-04, C-05 |
| Recovery | Pause/resume freezes/restores the same state; restart/reload reset correctly; hidden/blurred sessions require explicit resume. | C-04, C-05, C-06 |
| Integration misuse | Bad random/duration/action inputs do not partially mutate state; snapshots cannot mutate state; unsubscribed and throwing listeners obey R-08. | C-04, C-06 |
| Browser delivery | Both managed browser targets can start/play/pause/restart the built app; screenshots show a complete usable board; keyboard and button actions do not double-dispatch. | C-05, C-06 |
| Package portability | Extracted deployment archive runs under a static HTTP path prefix without Node.js or network asset dependencies; archive exclusions and relative assets are verified. | C-06 / delivery |

Modern acceptance additionally requires every F-01–F-08 scenario in the focused child, including ordered kick families, bag/refill rollback, hold/queue exchange, detached ghost, both hard-drop policies and next-game option isolation.
