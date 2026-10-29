# Modern rules component delta

Historical accepted campaign snapshot. Non-executable; current product authority is [SPEC](../../SPEC.md) and task ownership is [TASKS](../../TASKS.md). Original reviews/checkoffs describe their recorded source identities.

[FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) retains C-01–C-06 from [DECOMPOSITION](../../DECOMPOSITION.md). This overlay changes their responsibilities without adding a host abstraction.

| Component | Changed responsibility and interface seam |
| --- | --- |
| C-01 Geometry | Preserve spawn/cells; support both rotation directions. Rotation labels 0/R/2/L map to 0/1/2/3; O remains geometrically invariant. |
| C-02 Board rules | Add pure ordered kick trials and straight-down landing. `tryRotate(board, piece, direction)` returns a legal piece or null; `landing(board, piece)` returns a detached landing piece. Reuse existing `canPlace` for all candidates. |
| C-03 Progression | Retain line/soft-drop scores and speed; hard-drop distance contributes two points per cell through the session transaction. |
| C-04 Session | Own remaining shuffled bag, next/held type, hold availability, both clocks and active options. Preserve synchronous `dispatch`, `advance`, `getSnapshot`, `subscribe` and injected error/random callbacks. Extend actions with rotateCCW, hold, hardDrop; rotate remains clockwise. |
| C-05 Shared view | Render snapshot next/held miniatures and ghost plus board/stats. Emit semantic gameplay actions and next-session option changes; never own bag or lock clocks. Native buttons/checkbox and non-color occupancy cues remain available. |
| C-06 Browser host | Map both rotation directions, hold and hard drop. Retain board-focused eligibility/repeat rules and lifecycle resources. Copy pending option input into start/restart dispatch; no duplicate rules engine. |

## Internal flow and value boundaries

Add a pure bag helper with a fixed six-draw Fisher–Yates shuffle of seven kinds. It receives the callback explicitly; the session owns the resulting array/cursor and refills lazily. No singleton generator or closure-owned mutable bag escapes the transaction clone.

`Snapshot` retains existing fields and adds `next: Kind | null`, `held: Kind | null`, `canHold: boolean`, `ghost: Piece | null`, `options: SessionOptions`. `SessionOptions` contains exactly the supported boolean `immediateHardDropLock`. Snapshot copies cover all added object values. Internal remaining-bag data, gravity remainder and lock countdown do not become UI-mutatable state.

`dispatch(action, options?)` accepts an optional copied option value only for start/restart; omission uses the current selected session value (false initially). Validate supported options before any transaction effects; reject a supplied options argument on other commands. Session construction and random/error callbacks remain compatible. `advance(elapsed)` remains explicit-duration input; no timer object or Date usage enters C-04. Exact validation and deadlines belong to [FEATURE-SPEC](FEATURE-SPEC.md).

The view exposes a detached pending option value and an option-change callback to the host; the host passes that value on the existing start/restart path. Changing it has no immediate game effect. Pending input can be edited for the next game while the current session continues. Label that distinction clearly. Restart applies the current pending value; reload reinitializes it false.

## Collaborations and failure ownership

Hold, locking/clearing/spawning and bag refill execute inside the same candidate session transaction. If a required random draw or validation fails, neither the board nor queue/hold/statistics/timers commit. Listener failures remain isolated after commit. Blocked spawn/hold replacement is ordinary game over, not an exception. A held type always respawns at default orientation/position.

Derive ghost from the canonical landing helper after a valid active-state change. The view renders it as a separate projection, with active cells dominant on overlap. No cell in the settled board is changed for a preview, hold icon or ghost.

## Verification ownership

Core fixtures cover geometry, eight transition tables per kick family, first-legal ordering, ceiling/stack/floor rejection and landing identity. Session fixtures cover bag consumption, hold eligibility, fresh/reused deadlines, options, scoring, atomic errors and detachment. Browser fixtures cover input/settings/minis/ghost, rendering at 320px, lifecycle and built/extracted delivery. Use source-only composition fixtures when deterministic state is needed; do not ship debug state setters.
