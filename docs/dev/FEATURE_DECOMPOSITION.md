# Conditional ghost visibility components

## Existing boundaries

Reuse [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md). C-01/C-02 geometry/landing, C-03 progression and C-04 session remain unchanged. Canonical Snapshot.ghost is independent of whether it is displayed. No display option is added to SessionOptions, Action or Snapshot.

## C-05 shared-view delta

The shared view owns one GhostVisibilityMode value, initially always, and the latest rendered detached snapshot. A small pure presentation helper accepts the canonical ghost and mode and decides whole-ghost visibility using occupied cells. It depends only on shared piece types/geometry, never browser globals or a second collision model.

The native selector edits view-local state and rerenders the latest snapshot immediately, even without a session notification. Both ghost-cell flags and descriptive text derive from the same predicate. It neither dispatches gameplay nor advances time/randomness. Render updates never overwrite the selected mode. Start/restart and pause/resume keep this mounted view; teardown/remount starts a new always preference. Destroy removes the owned change listener and nodes.

Keep createGameView(mount,onAction,onOptionsChange?) and its returned board/render/destroy interface compatible. The existing next-game options callback remains solely for hard-drop locking. No new host callback, global setting, session mutation or public preference setter is needed.

## C-06 retained integration

Reuse board-target-only shortcut handling and mount-internal focus handling. The native select retains focus and ordinary navigation; changing it must not focus the board, pause/resume, drop, rotate or restart. External focus/visibility still pauses and requires explicit resume. Browser-specific resources remain in the host.

## Verification seams

Pure fixtures establish occupied-cell boundaries for all shapes/orientations without a DOM. A mounted view with detached snapshots proves upper/lower transitions and accessible suppression without changing the snapshot. Real browser gameplay proves mode changes, paused preference changes, restart/reload, native-key eligibility, focus and teardown. Existing model regressions prove canonical hard drop/lock clocks remain unaffected.
