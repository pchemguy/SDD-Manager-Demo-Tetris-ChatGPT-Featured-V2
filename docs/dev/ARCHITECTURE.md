# Architecture

## System arrangement

The [project brief](PROJECT.md) requires a browser game with modern rules and reuse of TypeScript logic and UI across future hosts. The application has a deterministic rules core, selected page configuration, a session controller, a shared DOM UI and a small browser host. It produces static HTML, CSS and JavaScript; Node.js is development tooling, not a player runtime dependency. No backend service is required.

## Blocks and dependencies

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Rules core | Piece geometry, legal placements, movement, rotation, locking, row removal and score/level progression. | TypeScript language and explicit inputs; no DOM, wall clock or global random source. |
| Selected configuration | Detached six-setting page memory, atomic validation and pure rule projection. | Explicit typed values; no DOM, clock, RNG, storage or broadcast. |
| Session controller | Own the current game state; order commands, gravity advances and state notifications. | Rules core, configuration value types/validation and injected random-number and completion-metadata callbacks. |
| Shared UI | Render five panels/status/controls/leaderboard, own per-view visibility and emit semantic game actions. | Read-only session snapshots, explicit selected context, action callbacks and an injected DOM mount element. |
| Browser persistence | Restore/save six selected fields through pure formats, independent best-effort native-edit effects and a separate checked Restore batch. | C-07 and explicit URL/cookie/history callbacks; no game state, DOM globals or scheduler. |
| Portable contract | C-10 complete detached version/results/settings values, JSON/schema and semantic validation. | C-09 and C-07 domain predicates; no host effects. |
| Manual file workflow | C-11 capture, byte codecs, bounded workers, native transfer resources and staged checked restore. | Application boundaries, C-08 effects and explicit browser capabilities. |
| Browser host | Mount/unmount the app; translate keyboard, frame timing, focus and visibility events. | Session, selected configuration/persistence and shared UI; browser APIs. |

The host composes the application. The session depends on the core, and the UI consumes the session boundary. No dependency points back from the core or session into the UI or browser host. There is no generic platform-plugin framework.

## State and time ownership

The session owns controller-lifetime completed history alongside the sole mutable game state, transaction-cloned bag/next/held/options/rules, penetrator bank/mode/appearance, gravity remainder and the interval-policy grounding countdown. The UI renders detached snapshots and never mutates rules state. Commands are processed synchronously so input and gravity cannot interleave within a transition.

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

C-07 owns the page-selected ghost/preview values; C-05 binds that explicit context and the latest delivered detached snapshot. A pure presentation predicate uses canonical occupied ghost cells; it never duplicates landing/collision rules. Selection immediately rerenders cells and description with the same decision, without dispatching gameplay, requesting RNG or changing clocks. Canonical Snapshot.ghost/next remain unchanged by display edits; Snapshot.options keeps its exact legacy boolean shape while Snapshot.rules exposes the detached active four-rule value. Existing C-06 native-control focus/shortcut and external-pause resource ownership is retained. A context owns no DOM/listeners/frames and may outlive its mount. Explicit same-context remount retains selections; omitted pure contexts create defaults. The page entry restores through C-08 before mounting; no cross-tab singleton or autonomous broadcast exists.

## Configuration flow and compatibility

C-07 supplies createConfiguration/getSnapshot/update/prepare, canonical isConfigurationValue and toRuleOptions. C-04 validates exact legacy or complete-rule Start/Restart inputs and copies active rules; it enforces both locking policies and disabled actions. C-05 uses active snapshots for gameplay eligibility and selected values for the six native controls. Display edits explicitly rerender the latest snapshot without dispatch or observer notification; external context updates use refreshConfiguration. C-06 owns the page context and all browser resources. Legacy view/mount arguments and the boolean option callback remain usable. [S-01–S-08](spec/session-configuration.md) own exact timing, errors and lifetime.

## Penetrator rule state and appearance


Keep logical shapes and Board occupancy as I/J/L/O/S/T/Z or null. Represent active penetration as a session boolean, separate from piece geometry. Represent white settled cells as a detached board-sized boolean appearance mask owned transactionally alongside the board. True entries require occupied board cells; ordinary cells remain false. This preserves existing board consumers and seven-bag/held/Next identities without inventing an eighth tetromino or changing collision occupancy.

The board-rule boundary owns validated locking and one shared row-compaction decision for occupancy and appearance. Both grids use the same removed/retained row identities. Legacy board APIs retain their existing default behavior and return shapes; an additional appearance-aware boundary may share their internal compaction. The view must not infer historical penetration from shape, color or current mode.

## Penetrating placement and projection

Core rules provide a pure penetrating landing search that checks every downward candidate, including beyond obstructions, for the greatest legal final origin. Temporary placement may overlap occupied cells but all occupied coordinates stay in bounds and a valid landing must exist at or below that candidate. One predicate gates movement and ordered rotation candidates. Preserve ordinary landing, ordered SRS offsets and strict visible-board bounds.

The session uses that same penetrating result for grounding, hard drop and canonical ghost. It alone chooses ordinary versus penetrating rules. No UI collision approximation, independent ghost search or board mutation during passage is permitted. A penetrator at its lowest valid landing is grounded; every overlapping transit state has a reachable valid final position.

## Transactions, bonuses and clocks

C-04 owns bank0–3, active penetration, settled appearance, existing piece/bag/hold state and clocks. Activation spends once, suppresses Hold and reevaluates grounding without resetting supported delay. A lock atomically writes valid cells/appearance, compacts both grids, updates classic scores and the capped four-line award, draws/spawns an ordinary piece and establishes its clocks. Refill/validation failure rolls back the entire candidate, including the new fields; external RNG callback effects remain outside rollback.

Both selected general policies and hard-drop overrides remain in force. Clocks consume semantic time only; pause freezes all game state. Start/Restart clears the inventory, active mode and appearance. Existing error/observer/reentry contracts apply, with unchanged commands producing no notification.

## Presentation and host

C-05 renders snapshots: active white piece over unchanged settled cells, white ghost outline/pattern when visible, white mask on settled cells and one bolt per available bonus with an accessible count. Regular-piece fill/borders contain no white; existing seven nonwhite shape colors remain. Color is supplemented by an accessible active-mode description and bonus count. The occupied-cell midline predicate still decides ghost visibility from the canonical projection.

C-06 adds one nonrepeating board-focused B binding to a semantic activation action. It retains frame ownership, native settings shortcut exclusion, external auto-pause and teardown. No extra action button or persisted game/ability field is present; C-08 persists only selected configuration.

## Verification seams

Pure fixtures isolate separated legal landing pockets, bounds, candidate reachability, kick ordering and coupled row compaction. Session fixtures cover earned/spent/capped bonuses, overlapping transit, both clock/drop policy paths, Hold inhibition, reset/top-out/rollback and detached snapshots. Shared-view fixtures verify all appearance/visibility combinations; actual source/built/extracted managed browsers must earn bonuses through gameplay and activate via B without debug hooks in production. Exact contracts belong to spec/penetrator.md; physical ownership and delivery belong to PLAN/layout.

## Browser persistence flow and failure isolation

C-06 creates C-08 once at page entry and passes its compatible configuration controller through the existing mount/view arguments. C-08 wraps one C-07 selected authority; its pure codec resolves each valid explicit URL value before cookie before default. It restores before initial UI projection and saves only valid explicit URL fields at initialization, including defaults. Omitted/invalid keys retain cookies and never fill the URL.

Successful later updates validate/commit in memory before changed-key cookie writes and one current-URL replacement. Preserve history.state and unrelated query/fragment data. Each source/effect failure is contained independently; valid memory selection and play remain usable. Cookie scope is immutable page-directory metadata, while edit URL reads use the current URL. Same-context remount does not restore again. Pure createConfiguration and omitted mount contexts retain defaults without storage.

C-08 has no game snapshot, competing settings state, scheduler, listener or backend. It never serializes board/score/queue/Hold/timers/penetrator inventory, changes active rules or calls RNG. Platform effects stay outside application/shared UI; source tests enforce the dependency direction. Browser cookie/query contracts and exact lifetime/attributes belong to [U-01–U-08](spec/configuration-persistence.md); C-07 remains pure selected memory under S-01.

## Leaderboard completion and lifetime

C-04 owns bounded history in the same transaction as the current game. Pure application helper C-09 validates and ranks explicit results with no mutable authority, clock, RNG, DOM or storage. A successful running-to-game-over transition captures the final candidate score with injected stable ID/UTC metadata through that helper before the combined candidate commits and subscribers run. Both ordinary lock/spawn and Hold/spawn endings use this seam. Precommit failure preserves game/history; listener failure cannot lose or duplicate completion.

Start/Restart constructs fresh gameplay fields while copying retained history. Fresh controllers begin empty. C-05 projects the detached Snapshot.leaderboard through its normal render path; it never submits or ranks scores. C-06 supports sequential explicit-controller remount through optional fourth mountGame argument; default mounts and fresh page entry create independent controllers. An explicit controller retains its RNG/reporter and has one live mount at a time. Teardown releases host resources without submitting or mutating a retained controller.

Controller ownership avoids a UI-observer race and a second store. C-08 still persists only six selected values; settings may restore while a new page has empty score history. Shared core/application/UI never import platform code. Exact L-01–L-08 contracts belong to [leaderboard specification](spec/leaderboard.md), with logical responsibilities in [DECOMPOSITION](DECOMPOSITION.md).

## Manual file integration

C-04 requires explicit completion callbacks and exposes staged history replacement. C-07 prepares complete selected values without effects; C-08 stages checked browser effects. C-05 projects one externally controlled Settings panel, one bottom Save/Restore pair and transfer state through semantic callbacks. C-06 supplies cryptographic UUIDv4/UTC time, browser capabilities and disposal. No second history/configuration authority is introduced.

## Metadata and ordering

A real completion obtains a stable UUID and UTC timestamp once, inside the candidate transaction before publication. The browser injects those external inputs; deterministic tests inject literal sources. All controller consumers are updated coherently rather than synthesizing a completion time during Save. A metadata-source failure leaves the candidate uncommitted, as a failed random draw does; external source invocation itself cannot be rewound.

Rank by descending score with existing entries winning ties. Transfer arrays retain that order. SQLite uses an ordinary rowid table with a textual unique result ID: insert rows in array order and read using explicit `ORDER BY rowid`. This preserves tie order without adding a column to `high_scores(id, score, timestamp)` or treating the ID as a rank. Timestamp remains completion metadata, not a replacement tie breaker. No implicit SQL query ordering is relied upon.

## Validation and restore transaction

Decode into detached data; validate complete structure, version, bounded cardinalities, IDs, safe integer scores, real canonical UTC timestamps and all setting values. Both codecs produce the same C-10 domain value. The shipped JSON Schema is the structural source; generated standalone validation avoids a divergent handwritten schema interpreter. Semantic checks supplement it for unique IDs, actual date validity, duplicate text keys and ranking.

The browser coordinator stages the entire import while gameplay remains governed by its ordinary lifecycle. At commit it captures current history, selected values, owned cookies and URL/history state. Commit is synchronous with session/configuration publication withheld until the joint state is coherent. Restore is not a game action and creates no completed result. File parsing completion is never a rollback checkpoint for intervening legitimate gameplay.

Validate first; then attempt checked cookie/URL effects with compensation on failure before exposing changed memory to observers. Native cookie APIs provide no multi-cookie transaction. Keep parsing/validation failures strictly mutation-free, and contain/reverse recoverable persistence failures with verified readback. Do not claim a platform-atomic cookie transaction or silently report Restore success when required effects fail. The detailed contract must state the environmental boundary for irrecoverable external interference; no code can guarantee rollback if the browser itself refuses every compensating write or is terminated. Ordinary manual setting edits retain their independent best-effort behavior.

## Browser formats and resource isolation

Use a packaged SQLite WebAssembly runtime (sql.js) in a dedicated transient Worker for SQLite decoding/encoding; use the same bounded worker pipeline for JSON parsing/validation. Fixed queries inspect an allowlisted schema and rows; never execute SQL taken from the file. Each worker receives bytes or a detached export snapshot, returns a validated value or bytes, and has a finite host deadline. The worker has no session, document, cookies, URL/history or authority to apply data. Terminate it and dispose object URLs/listeners on completion, failure or teardown. One transfer operation per mount prevents stale imports overwriting later manual work.

Package pinned trusted runtime/worker/WASM/schema/license assets locally with relative URLs. Gameplay and JSON exports must not require fetching a CDN or initializing SQLite. Use Vite's supported worker and asset construction from the module URL; avoid linked-worker routing assumptions. In-memory SQLite does not use OPFS, IndexedDB or persistent browser files.

## Chosen approach and alternatives

Use one normalized contract with two boundary codecs and a browser coordinator. Separate independent JSON and SQL restore implementations would duplicate validation and weaken equivalence/atomicity. Moving the leaderboard to a browser database would add automatic persistence and conflict with manual session lifetime. A server-backed converter would violate static delivery. Native SQLite APIs requiring filesystem isolation headers add deployment constraints unnecessary for small downloaded snapshots; packaged in-memory sql.js meets this use case.

The upstream [sql.js documentation](https://sql.js.org/) documents in-memory database import/export from byte arrays. [Ajv standalone validation](https://ajv.js.org/standalone) supports generating isolated validation code at build time. These establish candidate capability, not observed integration or packaged compatibility; exact stable dependency pins, licensing, worker/WASM resolution and CSP-compatible generation require implementation verification.

## Verification seams

Use literal metadata sources and complete records in pure/controller tests; faults before publication test retained state and observers. Codec tests compare normalized datasets across JSON/SQLite and independent Python sqlite3 reads. Browser tests use actual downloads/uploads, real gameplay completions, malformed files, checked-persistence faults, cancellation/teardown and actual extracted-prefix deployment. No production board/bonus setter or automatic import shortcut is introduced. The [component decomposition](DECOMPOSITION.md) owns detailed collaborations; [file contracts](spec/file-persistence.md) owns exact formats and failures.

## UI layout and view-local state

C05 reuses persistent DOM for five panels with an equal-track layout around the Board and CSS responsive stacking. Three native disclosure buttons target Leaderboard, Settings and Controls/help by unique per-view IDs. Their hidden state belongs only to the mounted view, not C04/C07 or browser persistence. Rendering and game actions do not recreate or reset those panels. New views default to all shown, including retained-controller/configuration remounts.

Game info and Board remain present. Two lifecycle buttons translate status to the existing start/restart/pause/resume actions; host command validation, active-rule copying and Board-only shortcuts remain unchanged. The view keeps concise Board instructions independent of visual help, transfers focus before concealing a focused descendant and removes each toggle listener on destruction. The external Settings button is its one disclosure authority; native settings/transfer DOM and pending operations remain intact while hidden. [UL contracts](spec/ui-layout.md) define exact positions, states, responsive boundary and acceptance.
