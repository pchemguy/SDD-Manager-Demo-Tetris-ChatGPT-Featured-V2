# Classic Tetris

## Purpose and intended users

Deliver a browser-based single-player falling-block game with modern planning and control aids, predictable timing and clear status. Keep TypeScript application logic and DOM UI reusable by future delivery platforms.

## Scope

The current game includes movement, both-direction SRS wall kicks, soft and hard drop, line clearing, scoring, increasing levels, pause/restart, seven-bag randomization, hold, exactly one next preview and ghost projection with selectable conditional visibility. Modern rules are the default; there is no classic-mode selector.

Grounding starts one full current gravity interval of lock delay, independently of gravity remainder. Continuously grounded moves and rotations do not reset it; leaving support cancels it and relanding starts a fresh interval. Hard drop uses that policy by default. The next-game checkbox can select immediate hard-drop locking, fixed for the started session.

Ghost visibility defaults to Always. Lower half only hides the whole projection when its lowest occupied cell lands in rows1–10, and shows it in rows11–20 including straddling pieces. The display preference applies immediately, persists through restart/pause in the mount and resets on reload; canonical landing and hard drop remain unchanged.

## Goals and delivery constraints

Provide a complete playable browser app, deterministic independently testable rules, and shared logic/UI with platform-specific integration kept separate. Verify the assembled game in managed Chromium and Firefox. Static HTML/CSS/JavaScript require no player-side Node.js, account or backend. Completed phases are verified and integrated before version tags and GitHub releases. The initial release is v1.0.0; modern extensions target v1.1.0.

## Non-goals

Windows Electron remains a future host; no desktop executable, installer or native-widget UI is delivered. There are no hidden rows, 180-degree rotations, five-piece preview, classic selector, extra scoring bonuses, persisted settings, network play, touch/gamepad controls or full Tetris Guideline compliance claim.

## Specification responsibilities

[SPEC](SPEC.md) and its [modern rules child](spec/modern-rules.md) define exact geometry, generation, timing, hold/drop/options, scoring, controls, errors, lifecycle and objective acceptance. [ARCHITECTURE](ARCHITECTURE.md) separates reusable modules from the browser host.
