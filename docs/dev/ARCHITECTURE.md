# Architecture

## System arrangement

The [project brief](PROJECT.md) requires a browser game with modern rules and reuse of TypeScript logic and UI across future hosts. The application has a deterministic rules core, a session controller, a shared DOM UI and a small browser host. It produces static HTML, CSS and JavaScript; Node.js is development tooling, not a player runtime dependency. No backend service is required.

## Blocks and dependencies

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Rules core | Piece geometry, legal placements, movement, rotation, locking, row removal and score/level progression. | TypeScript language and explicit inputs; no DOM, wall clock or global random source. |
| Session controller | Own the current game state; order commands, gravity advances and state notifications. | Rules core and injected random-number callback. |
| Shared UI | Render board/status/controls and emit semantic actions. | Read-only session snapshots, action callbacks and an injected DOM mount element. |
| Browser host | Mount/unmount the app; translate keyboard, frame timing, focus and visibility events. | Session and shared UI; browser APIs. |

The host composes the application. The session depends on the core, and the UI consumes the session boundary. No dependency points back from the core or session into the UI or browser host. There is no generic platform-plugin framework.

## State and time ownership

The session owns the sole mutable game state, transaction-cloned bag/next/held/options, gravity remainder and independent grounding countdown. The UI renders detached snapshots and never mutates rules state. Commands are processed synchronously so input and gravity cannot interleave within a transition.

The host supplies elapsed durations rather than allowing rules to read wall time. Randomness enters through a supplied callback, enabling deterministic rule tests. The core has no scheduler; the host owns the animation-frame subscription and event listeners. Pausing and host lifecycle changes do not recreate the rules engine.

## Rendering choice

Use a CSS grid of DOM cells with text status and native buttons. It supports a small fixed board, keyboard focus, inspectable browser tests and reuse in a future Electron renderer without requiring a graphics engine or a UI framework. Canvas would make cell drawing compact but would require separate semantic status and inspection support. A component framework would add dependency and lifecycle machinery without a current scope need.

DOM reuse means reuse within hosts that provide a web document, including an Electron renderer; it does not claim a native-widget UI. Shared UI uses its injected mount's document and semantic actions. Access to window-level keyboard, visibility and scheduling facilities stays in the browser host.

## Boundaries and failures

- Illegal player placements are ordinary rejected actions; they do not alter settled cells or corrupt the session.
- Game over is a rules/session state rendered by the UI, not an exception.
- Invalid integration inputs are rejected before state mutation under the specification's error contract.
- Host teardown cancels scheduling and removes owned listeners; repeated mount/unmount does not retain active sessions.
- Static assets are local to the built app. No account, network service, database or worker is required for gameplay.

## Verification seams

Core tests use explicit board fixtures and controlled random values. Controller tests provide elapsed durations without a real clock. UI integration tests inspect snapshots and semantic actions through a browser. End-to-end tests exercise the assembled browser app in isolated Chromium and Firefox environments under the repository's browser policy.

Dependency checks ensure core/session code imports no UI or browser-host module. Build and archive checks verify that the browser delivery contains its required local assets. Runtime behavior and acceptance belong to [SPEC](SPEC.md); logical responsibilities belong to [DECOMPOSITION](DECOMPOSITION.md).

## Modern rule ownership

Pure core helpers own six-draw bag shuffling, ordered both-direction kick candidates and canonical landing. The session owns bag consumption, hold eligibility, option validation and atomic lock/clear/spawn. Ghost is derived from detached active/board values by the same landing helper used for hard drop. The shared view renders one next miniature, held type, patterned ghost and semantic controls. The host retains a separate pending next-game option and copies it only on start/restart; active options never change mid-session. All state-changing operations commit before notifications; refill or validation failure rolls back the candidate, including clocks and bag cursor. See [modern contracts](spec/modern-rules.md).
