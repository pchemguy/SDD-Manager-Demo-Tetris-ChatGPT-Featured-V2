# Conditional ghost-piece visibility

## Intended outcome

Give players a ghost visibility mode that suppresses the projection when its landing is in the upper half of the board and restores it automatically when the landing returns to the lower half. The test uses the projected landing, not the active piece's current height.

The existing [game](PROJECT.md) and [modern contracts](spec/modern-rules.md) already provide a canonical ghost shared with hard drop. This feature changes presentation, preserving landing geometry and all gameplay rules.

## Proposed mode and boundary

Provide a labeled, keyboard-operable Ghost visibility selector with Always and Lower half only. Always is the initial default, preserving current visibility. Lower half only applies the condition immediately to the current projection.

Measure landing height by the lowest occupied cell of the projected piece, excluding empty padding in its rotation matrix. On the20-row board, rows1–10 are the upper half and rows11–20 the lower half: hide the whole ghost if its lowest cell is in rows1–10; otherwise show it. A projection straddling the midline remains visible. There is no partial clipping, fade, delay or hysteresis. Moves, rotations, hold and replacement recompute visibility from the resulting canonical projection, so crossing either direction takes effect immediately.

The selection is a display preference for the mounted app: edits apply during running or paused play, survive Start/Restart and Pause/Resume, and reset to Always on reload. Pausing freezes the projection but does not prevent changing its display preference. Ready/game-over have no ghost, as today. This selector is independent of the next-game immediate-hard-drop option.

When suppressed, render no ghost cells and do not announce its landing row through accessible text. Describe that conditional mode has hidden the ghost. Active and settled cells remain unchanged; active still wins any visible overlap. Keep the canonical detached projection available internally/API-wise for hard drop and existing consumers.

## Retained guarantees and exclusions

Preserve hold, exactly one next preview, seven-bag, both-direction kicks, scoring, hard-drop landing, both locking policies, grounding countdown/reset rules and lifecycle/input ownership. No change to board dimensions, collision, randomness, option validation or snapshot isolation. Reuse shared TypeScript/session/UI and separate browser-host resources for future platforms.

No Never mode, threshold customization, persisted preferences, new shortcuts, animations, hidden rows or Electron delivery is included. Existing controls retain their bindings. Controls remain usable at320 CSS pixels with visible focus and native keyboard behavior.

## Scope decisions for review

The requested dynamic upper/lower-half behavior is supplied by the user. Selector choices, retained Always default, lowest-occupied-cell boundary, straddling visibility and preference lifetime above are proposed choices awaiting brief acceptance; they are not assumed approved. A threshold based on matrix origin would depend on padding, and one based on the highest occupied cell would hide straddling projections. The lowest-cell rule provides a consistent occupied landing edge across shapes/orientations.

Target an additive browser v1.2.0 release after complete verified integration, retaining published v1.1.0. Acceptance must cover every piece/orientation near the midline, both crossing directions, immediate mode changes, pause/restart/reload, accessible suppression, keyboard/native focus, and unchanged hard drop/timing in isolated Chromium/Firefox source/built/extracted delivery. Detailed contracts and delivery tasks follow accepted scope.
