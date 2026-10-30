# Architecture

## System arrangement

The [project brief](PROJECT.md) requires a browser game with modern rules and reuse of TypeScript logic and UI across future hosts. The application has a deterministic rules core, selected page configuration, a session controller, a shared DOM UI and a small browser host. It produces static HTML, CSS and JavaScript; Node.js is development tooling, not a player runtime dependency. No backend service is required.

## Blocks and dependencies

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Rules core | Piece geometry, legal placements, movement, rotation, locking, row removal and score/level progression. | TypeScript language and explicit inputs; no DOM, wall clock or global random source. |
| Selected configuration | Detached six-setting page memory, atomic validation and pure rule projection. | Explicit typed values; no DOM, clock, RNG, storage or broadcast. |
| Session controller | Own the current game state; order commands, gravity advances and state notifications. | Rules core, configuration value types/validation and injected random-number callback. |
| Shared UI | Render board/status/controls and emit semantic actions. | Read-only session snapshots, explicit selected context, action callbacks and an injected DOM mount element. |
| Browser host | Mount/unmount the app; translate keyboard, frame timing, focus and visibility events. | Session, selected configuration and shared UI; browser APIs. |

The host composes the application. The session depends on the core, and the UI consumes the session boundary. No dependency points back from the core or session into the UI or browser host. There is no generic platform-plugin framework.

## State and time ownership

The session owns the sole mutable game state, transaction-cloned bag/next/held/options/rules, gravity remainder and the interval-policy grounding countdown. The UI renders detached snapshots and never mutates rules state. Commands are processed synchronously so input and gravity cannot interleave within a transition.

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

Pure core helpers own six-draw bag shuffling, ordered both-direction kick candidates and canonical landing. The session owns bag consumption, hold eligibility, option validation and atomic lock/clear/spawn. Ghost is derived from detached active/board values by the same landing helper used for hard drop. The shared view renders one next miniature, held type, patterned ghost and semantic controls. C-07 owns the selected page configuration; the host projects its four gameplay fields only on Start/Restart. Active rules never change mid-session, and there is no competing pending-options copy. All state-changing operations commit before notifications; refill or validation failure rolls back the candidate, including clocks and bag cursor. See [modern contracts](spec/modern-rules.md).

## Conditional ghost display

C-07 owns the page-selected ghost/preview values; C-05 binds that explicit context and the latest delivered detached snapshot. A pure presentation predicate uses canonical occupied ghost cells; it never duplicates landing/collision rules. Selection immediately rerenders cells and description with the same decision, without dispatching gameplay, requesting RNG or changing clocks. Canonical Snapshot.ghost/next remain unchanged by display edits; Snapshot.options keeps its exact legacy boolean shape while Snapshot.rules exposes the detached active four-rule value. Existing C-06 native-control focus/shortcut and external-pause resource ownership is retained. A context owns no DOM/listeners/frames and may outlive its mount. Explicit same-context remount retains selections; omitted context/fresh page creates defaults. No storage or cross-tab singleton exists.

## Configuration flow and compatibility

C-07 supplies createConfiguration/getSnapshot/update and toRuleOptions. C-04 validates exact legacy or complete-rule Start/Restart inputs and copies active rules; it enforces both locking policies and disabled actions. C-05 uses active snapshots for gameplay eligibility and selected values for the six native controls. Display edits explicitly rerender the latest snapshot without dispatch or observer notification; external context updates use refreshConfiguration. C-06 owns the page context and all browser resources. Legacy view/mount arguments and the boolean option callback remain usable. [S-01–S-08](spec/session-configuration.md) own exact timing, errors and lifetime.
