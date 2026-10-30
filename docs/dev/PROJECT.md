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

Static HTML/CSS/JavaScript require no player-side Node.js, account or backend. Keep browser input/timing/lifecycle separate from shared logic/UI. Verify the assembled game in dedicated managed Chromium and Firefox. Each completed phase is verified and integrated before its version tag and GitHub release. Current browser metadata and static package use1.6.0.

## Non-goals

Windows Electron is a future host; no desktop executable, installer or native-widget UI is delivered. There are no hidden rows,180-degree rotations, five-piece preview, classic selector, extra score bonuses, profiles/presets/import-export, saved game state, network play, touch/gamepad controls or full Tetris Guideline compliance claim.

## Contract owners

[SPEC](SPEC.md), [modern rules](spec/modern-rules.md), [ghost visibility](spec/ghost-visibility.md) and [configuration](spec/session-configuration.md) and [penetrator contracts](spec/penetrator.md) and [browser persistence](spec/configuration-persistence.md) and [session leaderboard](spec/leaderboard.md) define precise behavior/acceptance. [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md) define reusable boundaries; [PLAN](PLAN.md) defines delivery.

## Session leaderboard

Show the ten best completed-game scores for the current page, highest first, with earlier completions first on ties. Zero scores and blocked Hold-spawn endings qualify. Capture each final Game Over score once. Start/Restart preserves completed results while abandoning an unfinished game; reload and fresh pages clear history. Render a labelled rank/score panel without moving focus. No names, dates, configuration-specific boards or score normalization are added. History is memory-only, independent of remembered settings and fresh-game state; no score cookie, URL parameter, web storage or backend exists.
