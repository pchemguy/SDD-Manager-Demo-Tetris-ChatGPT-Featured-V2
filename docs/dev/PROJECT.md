# Classic Tetris

## Purpose and intended users

Develop a browser-based, single-player classic Tetris game for people who want a straightforward falling-block game. Deliver a playable browser application with consistent rules and clear game status, while preserving the ability to reuse most application code in future delivery platforms.

## Scope

The game supports piece movement, rotation, soft drop, line clearing, scoring, increasing levels, pause and restart. It communicates the active playfield, score, level and game-over state so the player can understand and control the session.

Pieces lock when a gravity or soft-drop attempt cannot move them downward. There is no separate lock-delay timer and no timer reset on movement or rotation. Ground contact alone does not lock a piece; a failed downward attempt does. This same rule applies whether a piece is blocked by the floor or by settled blocks.

## Goals

- Provide a complete, playable classic browser game with predictable interactions and recoverable session controls.
- Keep game rules testable independently of browser timing, input and rendering integration.
- Reuse TypeScript game logic and UI across future delivery platforms, keeping platform-specific integration separate.
- Verify browser behavior under the repository's browser development policy, with Chromium prioritized and Firefox included.

## Delivery constraints

The delivered platform is the browser. Windows Electron is a future delivery platform whose reuse needs inform code boundaries; an Electron application is outside the current delivery scope.

Each completed implementation phase must be verified and integrated before its corresponding version tag, release notes and GitHub release are published. Versions reflect delivered changes.

## Non-goals

Hold, next-piece preview, ghost piece, 7-bag piece randomization, wall kicks, hard drop and a separate lock-delay timer are outside the current scope. Future delivery platforms are not implemented as part of this browser project.

## Specification responsibilities

The specification must define exact movement and rotation behavior, piece generation, scoring and level progression, controls, pause/resume timing, spawn and game-over boundaries, and restart behavior consistently with this scope. These details must preserve the confirmed locking rule and must not introduce excluded modern rule extensions.
