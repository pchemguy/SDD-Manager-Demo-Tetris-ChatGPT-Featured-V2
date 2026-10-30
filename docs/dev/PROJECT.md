# Classic Tetris

## Purpose and users

Deliver a browser-based single-player falling-block game with modern planning/control aids, predictable timing and clear status. Keep TypeScript logic and DOM UI reusable by future hosts.

## Scope

The game includes movement, both-direction SRS kicks, soft/hard drop, line clearing, classic scoring, increasing levels, pause/restart, seven-bag randomization, hold, exactly one next preview and canonical ghost projection and earned penetrator mode. Modern rules are the default; there is no classic-mode selector.

One native Settings panel supplies remembered browser configuration. Ghost visibility (Always hide / Hide above midline / Always show) and Next-piece preview apply immediately, including while paused. Hard drop, Hold piece, general locking policy and hard-drop locking policy are copied at Start/Restart. Show current rules and pending differences separately. Each selection restores independently from an explicit URL value, then its saved cookie, then its default. Explicit URL values save to cookies, including defaults; native edits save the changed field and update its URL parameter. Omitted parameters retain saved values. Independent pages have no live synchronization.

Defaults preserve modern play: ghost Always show, preview/Hard drop/Hold On, full gravity interval after grounding and hard drop following the general policy. The alternative general policy locks on a blocked downward attempt; following it, hard drop places the piece and waits for the next actual blocked gravity/soft-drop attempt. Immediate hard-drop locking overrides either policy. Continuous support never resets the interval-policy deadline; support escape/relanding grants a fresh interval.

Conditional visibility uses the projected lowest occupied cell: rows1–10 hide, rows11–20 show, including straddling pieces. Always hide conceals the projection at every height. Display settings never change canonical landing or piece order. Explicit retained configuration supports same-context remount; fresh pure contexts start defaults while browser reload restores selected settings.

Clear four rows at once to earn one penetrator bonus, capped at three. Board-focused B spends one on the current piece; it passes through occupied cells without destroying them and must retain a valid final landing. Ghost/hard drop use the deepest valid position. Hold is inhibited until lock; active/visible ghost/locked penetrator cells are white, ordinary pieces nonwhite. Pause retains mode/bank; Start/Restart/reload reset them. No seventh setting or saved game state is added.

## Delivery constraints

Static HTML/CSS/JavaScript require no player-side Node.js, account or backend. Keep browser input/timing/lifecycle separate from shared logic/UI. Verify the assembled game in dedicated managed Chromium and Firefox. Each completed phase is verified and integrated before its version tag and GitHub release. Current browser metadata and static package use 1.8.0.

## Non-goals

Windows Electron is a future host; no desktop executable, installer or native-widget UI is delivered. There are no hidden rows,180-degree rotations, five-piece preview, classic selector, extra score bonuses, profiles/presets, unfinished-game saves, network play, touch/gamepad controls or full Tetris Guideline compliance claim.

## Contract owners

[SPEC](SPEC.md), [modern rules](spec/modern-rules.md), [ghost visibility](spec/ghost-visibility.md) and [configuration](spec/session-configuration.md) and [penetrator contracts](spec/penetrator.md) and [browser persistence](spec/configuration-persistence.md) and [session leaderboard](spec/leaderboard.md) and [manual files](spec/file-persistence.md) and [UI layout](spec/ui-layout.md) define precise behavior/acceptance. [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md) define reusable boundaries; [PLAN](PLAN.md) defines delivery.

## Session leaderboard

Show the ten best completed-game scores for the current page, highest first, with earlier completions first on ties. Zero scores and blocked Hold-spawn endings qualify. Capture each final Game Over score once. Start/Restart preserves completed results while abandoning an unfinished game; reload and fresh pages clear history. Render a labelled rank/score panel without moving focus. No names, visible metadata columns, configuration-specific boards or score normalization are added. History remains in page memory until manual Save and can be replaced by manual Restore, independently of remembered settings and fresh-game state; no score cookie, URL parameter, web storage or backend exists.

## Manual portable files

A single Save/Restore pair at the bottom of Settings transfers the current top ten complete results and all six selected values in one JSON or SQLite file. Hiding Settings hides the pair and its related controls. Results preserve stable UUIDv4 IDs, non-negative safe-integer scores, UTC completion timestamps and saved tie order. The canonical JSON Schema and exact SQLite metadata/table contract travel with the static distribution.

Restore validates the entire file before replacing history and applying all six selections, explicitly updating their cookies and URL parameters, including equal/default values. Invalid content leaves those values unchanged and shows an accessible error. Checked effect failures compensate recoverable browser writes; irreversible browser refusal is explicitly reported. The current game, active rules and normal focus/pause policy remain. Display selections apply immediately and gameplay selections on Start/Restart. Later completions join restored history; reload/new pages start empty until manually restored. Saving and restoring remain manual, with no automatic history storage or backend.

## Centered panels and local visibility

Arrange Leaderboard, Game info and controls, Board, Settings and Controls/help left to right on wide screens, with the Board horizontally centered independently of shown side content. Narrow screens stack the same content with normal scrolling. Board and Game info remain shown. Three independent Show/Hide buttons above the two lifecycle buttons control supporting panels; all start shown and retain choices within the view, including through render/resize/Restart/Restore, while a fresh view starts shown.

Start game becomes Restart after play starts; paused Start continues the same game. Native Board shortcuts, focus/pause behavior and six-setting timing remain. Hiding Settings conceals its Save/Restore pair and operation/status controls without cancellation or lost values; pending operations may finish while hidden. Visibility adds no setting, cookie, URL parameter, saved-file field or platform.
