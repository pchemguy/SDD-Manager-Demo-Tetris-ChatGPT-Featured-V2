> Historical accepted campaign008 snapshot. Current main documents/TASKS own behavior and executable work.

# UI layout

## Purpose

Give browser-game players a stable centered playfield with nearby game information and controls, while allowing supporting panels to be hidden independently. Replace the current combined side column and below-board Settings arrangement with five distinct panels.

## Panel arrangement and visibility

On screens wide enough for the full layout, arrange panels left to right:

| Panel | Position | Visibility |
| --- | --- | --- |
| Leaderboard | Left of Game info and controls | Independently show/hide |
| Game info and controls | Immediately left of Board | Always shown |
| Board | Center of the screen | Always shown |
| Settings | Immediately right of Board | Independently show/hide |
| Controls/help | Right of Settings | Independently show/hide |

The Board's horizontal center stays at the viewport's horizontal center for every combination of the three optional panels, including asymmetric combinations. Centering the visible panel group alone is insufficient. Panels must not overlap the Board or one another.

Place three individual show/hide toggle buttons for Leaderboard, Settings and Controls/help in Game info and controls, above the Start/Restart and Pause/Start buttons. Each toggle affects only its named panel, remains available when that panel is hidden, exposes its current state accessibly and works with keyboard input. Neither Board nor Game info and controls has a hide toggle.

Game info and controls retains score, level, lines, Next/Hold information, penetrator information and existing gameplay action controls. Controls/help holds the existing keyboard/action reference. The requested Pause/Start action pauses or continues the same game; continuing must not reset it. The separate Start/Restart action retains fresh-game semantics. Exact state-dependent captions and button consolidation belong to the interaction contract.

## Proposed responsive and lifetime policy

Initially show all three optional panels, matching their current available content. Keep visibility state within the mounted view; ordinary rendering and Start/Restart retain the player's visibility choices. A fresh mount starts with all panels shown. Visibility adds no game setting, cookie, URL parameter or save-file field.

At widths where five readable panels cannot fit, use a responsive arrangement with the Board still horizontally centered and Game info and controls always present. Permit stacking with normal page scrolling; optional panels remain independently accessible through the same toggles. The full left-to-right arrangement applies where it fits. This is a proposed narrow-screen exception requiring confirmation; do not compress controls or overlap panels to force five columns into320px.

## Retained behavior and compatibility

Retain all gameplay, pause/focus, input, scoring and session-leaderboard behavior defined by [SPEC](../../SPEC.md) and its children. A visibility toggle must not restart or pause a game, change rules/settings, mutate history, submit a score or perform file operations. Preserve the existing focus-loss pause policy when actual focus leaves the game.

Settings retains all six settings, current/pending rule presentation and manual JSON/SQLite Save/Restore, including accessible success/error feedback. Save and Restore remain at the bottom of Settings and are hidden with that panel. Showing a panel again retains its underlying selected values, leaderboard and operation state; hiding it neither creates nor cancels a file operation.

Retain existing JSON/SQLite contracts, cookie/URL semantics, static browser delivery and Chromium/Firefox support. Panel controls must remain readable, keyboard reachable and correctly labelled. Preserve useful Board instructions even when the visual help panel is hidden.

## Scope boundary

This capability changes panel structure, responsive placement and view visibility controls. It adds no game rule, seventh game configuration setting, automatic persistence, unfinished-game save, backend, new application platform or visual-theme redesign. Existing [architecture](../../ARCHITECTURE.md), [component ownership](../../DECOMPOSITION.md) and [repository allocation](../../layout.md) provide the baseline; assess only the necessary UI and verification changes.
