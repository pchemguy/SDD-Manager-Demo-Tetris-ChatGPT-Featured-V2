# Component decomposition

## Relationship to architecture

The [architecture](ARCHITECTURE.md) separates rules, session orchestration, shared UI and browser integration. The following logical components keep rules and UI reusable without introducing a platform abstraction framework. [SPEC](SPEC.md) owns precise behavior and acceptance.

## Components and interfaces

| ID / component | Owns and provides | Requires / excludes | Verification seam |
| --- | --- | --- | --- |
| C-01 Piece geometry | Seven piece definitions, orientation transforms and occupied local cells. | No board state or random source; ordered both-direction transforms. | Enumerate cells/orientations, including O invariance. |
| C-02 Board rules | Placement checks, downward/horizontal transitions, ordered kicks, canonical landing, lock and simultaneous full-row removal. | C-01 and explicit board/piece values; no scheduler or scoring UI. | Small board fixtures and immutable input comparisons. |
| C-03 Progression | Score, total lines, level and gravity interval calculations. | Lock/clear results and soft-/hard-drop distance; no wall time or renderer. | Table-driven score and level boundaries. |
| C-04 Session | Current board, active piece, status, progression, bag/next/hold/options/copied active rules, gravity remainder, interval-policy lock countdown and detached snapshots; semantic command and elapsed-time entry points. | C-01 through C-03 and C-07 typed validation; injected random callback. Never imports host/UI. | Seeded random inputs, exact durations and command sequences. |
| C-05 Shared game view | DOM board, score/level/lines/status, single-next/hold miniatures, ghost, explicit selected-context binding/latest snapshot, six native settings, current/pending summary, control legend and native game buttons. Produces semantic action callbacks. | Detached session snapshot, selected context, mount element, action callback; no global scheduler or window-level input handling. | Browser assertions on cell state, text, focus and action dispatch. |
| C-06 Browser host | Application composition, keyboard translation, one page-selected context/rule projection at Start/Restart, frame lifecycle, focus/visibility auto-pause, teardown and asset entry. | C-04/C-05/C-07 and browser APIs; never duplicates piece or scoring rules. | Playwright keyboard, visibility/lifecycle and remount scenarios. |
| C-07 Selected configuration | Detached six-field memory, atomic partial updates, typed defaults and pure four-rule projection. | Explicit values only; no DOM, RNG, scheduler, storage or broadcast. |96 selected combinations, invalid/rollback and copy/context tests. |

## Collaboration and data ownership

The host creates one selected context and the session with its random callback, binds the view to that context/action callback and subscribes to state changes. Start/Restart project selected rules; display changes rerender directly without session dispatch. Keyboard and button actions reach the same session command boundary. Each accepted command or gravity transition produces a fresh snapshot for the view. Only the host supplies elapsed durations.

The session asks geometry and board rules for legal transitions. A lock deadline or selected immediate hard drop resolves lock, clear, progression update and spawn as one synchronous transition. Under interval locking, blocked downward attempts preserve the independent countdown. Under failed-downward locking, a blocked gravity/soft-drop attempt settles atomically; contact alone does not lock. Progression does not generate pieces; the session invokes the random source in six-value bag refills when look-ahead requires it. The view does not infer locking or clear lines itself.

Board values contain settled cells only; active cells remain separate until lock. Snapshots contain copied board, active, ghost, options and active rules data so a subscriber cannot mutate session state. The controller owns status and timing; the UI merely projects them.

## Lifecycle and failure boundaries

Construction yields a ready session. Start/restart initializes a running game. Pause preserves state and both timing clocks; resume continues that session. Game over preserves the settled board and statistics until restart. The specification defines exact input eligibility and timing rules.

Host teardown cancels its frame, detaches listeners and releases its view/subscription. View teardown removes only its owned nodes/listeners. It does not dispose another host's mount or global state.

Invalid placement commands return unchanged gameplay state. Invalid integration values fail before mutation. The specification defines input ranges and errors so tests can distinguish player rejection from integration misuse.

## Design assessment

Core components can be tested without a DOM, and session time can be advanced without browser frames. C-05 can be reused by a future Electron renderer while C-06 remains replaceable. No component depends on a consumer; no duplicate rule state is owned by the UI. Physical paths are assigned by layout rather than by this logical model.

C-05 owns a pure occupied-cell visibility helper plus selector change cleanup. Both cell flags and described-by projection text use that predicate. Changing display mode rerenders the last detached snapshot without an action callback; start/restart/pause keep the selected context, and explicit same-context remount retains it. Fresh/omitted contexts reset defaults. C-04 accepts exact legacy/complete-rule inputs and C-05/C-06 retain legacy arguments with optional context/refresh extensions. [Ghost contracts](spec/ghost-visibility.md) and [configuration contracts](spec/session-configuration.md) define observable behavior.
