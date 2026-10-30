# Component decomposition

## Relationship to architecture

The [architecture](ARCHITECTURE.md) separates rules, session orchestration, shared UI and browser integration. The following logical components keep rules and UI reusable without introducing a platform abstraction framework. [SPEC](SPEC.md) owns precise behavior and acceptance.

## Components and interfaces

| ID / component | Owns and provides | Requires / excludes | Verification seam |
| --- | --- | --- | --- |
| C-01 Piece geometry | Seven piece definitions, orientation transforms and occupied local cells. | No board state or random source; ordered both-direction transforms. | Enumerate cells/orientations, including O invariance. |
| C-02 Board rules | Placement checks, downward/horizontal transitions, ordered kicks, ordinary/penetrating landing, guarded transit, coupled appearance lock and simultaneous full-row removal. | C-01 and explicit board/piece values; no scheduler or scoring UI. | Small board fixtures and immutable input comparisons. |
| C-03 Progression | Score, total lines, level and gravity interval calculations. | Lock/clear results and soft-/hard-drop distance; no wall time or renderer. | Table-driven score and level boundaries. |
| C-04 Session | Controller-lifetime leaderboard history, current board, active piece, status, progression, bag/next/hold/options/copied active rules, penetrator bank/mode/appearance, gravity remainder, interval-policy lock countdown and detached snapshots; semantic command and elapsed-time entry points. | C-01 through C-03, C-09 pure ranking and C-07 typed validation; injected random/completion metadata callbacks. Never imports host/UI. | Seeded random inputs, exact durations and command sequences. |
| C-05 Shared game view | DOM board, semantic leaderboard rank/score panel, score/level/lines/status, single-next/hold miniatures, ghost, explicit selected-context binding/latest snapshot, six native settings, current/pending summary, control legend, per-view independent visibility and consolidated native lifecycle/game buttons. Produces semantic game action callbacks. | Detached session snapshot, selected context, mount element, action callback; no global scheduler or window-level input handling. | Browser assertions on cell state, text, focus and action dispatch. |
| C-06 Browser host | Application composition, keyboard translation, one page-selected context/rule projection at Start/Restart, frame lifecycle, focus/visibility auto-pause, teardown and asset entry. | C-04/C-05/C-07/C-08/C-11 and browser APIs; never duplicates piece or scoring rules. | Playwright keyboard, visibility/lifecycle and remount scenarios. |
| C-07 Selected configuration | Detached six-field memory, atomic partial updates, typed defaults, canonical field validation and pure four-rule projection. | Explicit values only; no DOM, RNG, scheduler, storage or broadcast. |96 selected combinations, invalid/rollback and copy/context tests. |
| C-09 Complete ranking | Validated detached {id, score, timestamp} results and stable capped insertion. | Explicit values only; no metadata generation or storage. | Literal ordering/domain/copy fixtures. |
| C-10 Portable snapshot | Versioned complete DTO, schema-backed JSON and shared semantic validation. | C-09/C-07; no browser state or SQL runtime. | Raw JSON/schema/domain and equivalence fixtures. |
| C-11 Manual transfer | Browser composition, checked restore, transient byte worker/SQLite runtime, file/download resources. | C-10/C-08 and injected browser capabilities. | Native downloads/uploads, effect/lifecycle faults, real deployed runtime. |
| C-08 Browser persistence | Pure text resolution/serialization and callback-based selected-controller wrapper; initial explicit saves, changed-key edit effects and checked complete Restore effects. | C-07 and explicit readUrl/readCookies/writeCookie/replaceUrl callbacks; no session/UI/global DOM or scheduler. | Literal formats, real-controller fault/atomicity tests and actual browser reload/cookie/history cases. |

## Collaboration and data ownership

The page entry creates one persisted selected context through C-08; explicit pure contexts remain usable. The host creates the session with its random callback, binds the view to that context/action callback and subscribes to state changes. Start/Restart project selected rules; display changes rerender directly without session dispatch. Keyboard and button actions reach the same session command boundary. Each accepted command or gravity transition produces a fresh snapshot for the view. Only the host supplies elapsed durations.

The session asks geometry and board rules for legal transitions. A lock deadline or selected immediate hard drop resolves lock, clear, progression update and spawn as one synchronous transition. Under interval locking, blocked downward attempts preserve the independent countdown. Under failed-downward locking, a blocked gravity/soft-drop attempt settles atomically; contact alone does not lock. Progression does not generate pieces; the session invokes the random source in six-value bag refills when look-ahead requires it. The view does not infer locking or clear lines itself.

Board values contain settled cells only; active cells remain separate until lock. Snapshots contain copied board, active, ghost, options/active rules, penetrator inventory/mode and independent appearance rows so a subscriber cannot mutate session state. The controller owns status and timing; the UI merely projects them.

## Lifecycle and failure boundaries

Construction yields a ready session. Start/restart initializes a running game. Pause preserves state and both timing clocks; resume continues that session. Game over preserves the settled board and statistics until restart. The specification defines exact input eligibility and timing rules.

Host teardown cancels its frame, detaches listeners and releases its view/subscription. View teardown removes only its owned nodes/listeners. It does not dispose another host's mount or global state.

Invalid placement commands return unchanged gameplay state. Invalid integration values fail before mutation. The specification defines input ranges and errors so tests can distinguish player rejection from integration misuse.

## Design assessment

Core components can be tested without a DOM, and session time can be advanced without browser frames. C-05 can be reused by a future Electron renderer while C-06 remains replaceable. No component depends on a consumer; no duplicate rule state is owned by the UI. Physical paths are assigned by layout rather than by this logical model.

C-05 owns a pure occupied-cell visibility helper plus selector change cleanup. Both cell flags and described-by projection text use that predicate. Changing display mode rerenders the last detached snapshot without an action callback; start/restart/pause keep the selected context, and explicit same-context remount retains it. Fresh/omitted contexts reset defaults. C-04 accepts exact legacy/complete-rule inputs and C-05/C-06 retain legacy arguments with optional context/refresh extensions. [Ghost contracts](spec/ghost-visibility.md) and [configuration contracts](spec/session-configuration.md) define observable behavior.

## Penetrator component collaboration

### C-02 placement, landing and coupled compaction

A pure penetrating-placement unit provides penetratingLanding(board,piece): Piece|null and canTraverse(board,piece):boolean over typed canonical inputs. It preserves x/orientation, requires all occupied cells in bounds, searches downward including beyond blocked rows, and returns the deepest non-overlapping placement or null. canTraverse accepts exactly the in-bounds candidates with such a landing. Ordinary canPlace/move/landing remain unchanged.

The existing ordered kick operation gains an optional candidate predicate, defaulting to ordinary canPlace. Session penetration uses canTraverse for each ordered offset, avoiding duplicate kick tables. Direction validation and O no-op remain. C-01 geometry and seven shapes are unchanged.

Board locking exposes an additional appearance-aware operation, lockWithAppearance(board,piece,penetratorCells,penetratorActive). It validates final ordinary placement and returns board/cleared/penetratorCells using one shared compaction calculation. Ordinary lock retains exactly its existing board/cleared result. A board-sized boolean Appearance type and empty factory support detached snapshots. Do not add a new logical board-cell kind; white metadata is independent of occupancy and follows the same row permutation.

### C-04 ability, bank and transaction

Add activatePenetrator to Action. State and detached Snapshot add penetratorActive:boolean, penetratorBonuses:integer0–3 and penetratorCells:Appearance. Keep existing Board/Piece/next/held/options/rules shapes; session construction receives explicit completion metadata sources. Snapshot copying includes independent mask rows; getSnapshot chooses the canonical ordinary or penetrating ghost from current mode.

The controller selects traversal/rotation/downward/landing/grounding semantics and applies existing active-rule availability. Activation atomically spends one bonus, sets mode and canHold=false, and reevaluates support. Lock invokes C-02 once, updates classic progression plus min(3,bank+one-if-four-cleared), resets active mode for the ordinary next piece and initializes its timers/Hold eligibility. No random draw on activation. No subscriber sees partial overlay, award, board compaction or replacement state.

All candidate cloning/validation, refill rollback, listener-error isolation and reentry behavior encompass the new fields. Start/Restart resets mask/mode/bank; pause and game-over preserve final inventory/settled appearance. No current-game ability enters C-07 selected configuration.

### C-05 controlled rendering

Render original shape colors for ordinary occupied cells and white for active penetration/true settled-mask entries. Active cells overlay settled cells during transit without modifying their board or mask data. Shared ghost cells/text use the canonical projection and existing selected visibility predicate; white ghost appearance derives from active mode. Render an accessible active-mode description and bonus count, with exactly one visible bolt per available bonus in game information. Hold eligibility follows canHold; mode-specific unavailable text explains inhibition without hiding the ordinary held type.

C-05 owns no movement, reward, timer or cell-clear rule. Existing board/render/destroy/configuration refresh and legacy callback construction remain usable; no duplicate settings owner or extra action button.

### C-06 browser input and lifetime

B on the board maps to activatePenetrator with the existing single-action repeat suppression. Native settings B input does not activate; paused/ready/game-over commands remain model-gated. Preserve focus return, frame baseline/clamp, external pause and owned listener cleanup. Page reload constructs a fresh ready session and zero inventory.

### Verification interfaces

Core fixtures compute independent legal-pocket, boundary/kick and row-mask examples. Session tests use deterministic gameplay that actually earns a four-line award before activation; pure core/view fixtures supplement difficult boundaries. Do not expose a production bonus/board injection API or test hotkey. Actual built/extracted browsers must demonstrate earned bonuses, B activation, Hold inhibition, white transit/settled cells, matching ghost/drop and unchanged settings. Exact input/clock/appearance/error acceptance belongs to spec/penetrator.md.

## C-08 configuration formats and effects

configuration-codec resolves explicit search/cookie strings against caller-supplied defaults and returns detached complete values plus the valid explicit URL subset. It owns the stable six-field external order, canonical text conversion, cookie names/scope/assignment and current-URL updates; C-07 is the only domain/default authority.

createBrowserConfiguration accepts readUrl/readCookies/writeCookie/replaceUrl callbacks and returns the compatible ConfigurationController shape backed by one ordinary C-07 controller. Restore before return, then save valid explicit URL values only. update delegates atomically, compares detached before/after values and saves actual changed keys. Empty/equal/invalid patches have no browser effects; multiple changed fields share one URL replacement and independent cookie attempts. Return detached committed values even if either persistence effect fails.

C-06 binds callbacks to the mount document/window and preserves history.state. Capture initial cookie directory/protocol, read current URL per edit, and contain each source/effect error independently. No context remount reinitialization, listener, polling, second state cache or disposal resource is introduced. C-04 captures selected RuleOptions only on Start/Restart; C-05 consumes the same explicit controller without a platform import. [U-01–U-08](spec/configuration-persistence.md) own exact syntax, source priority, error semantics and acceptance.

## C-09 ranking and completed-score collaboration

C-09 exports GameResult and recordResult(history,finalResult): pure validation and stable detached top-ten insertion. It owns no store or subscription. C-04 owns copied entries, qualifying final-score transition, atomic publication and reset preservation. Snapshot.leaderboard is detached; the view replaces rows/empty state from it rather than tracking completion itself.

C-04 computes candidate gameplay first, derives history once for running-to-game-over, then publishes both before isolated observers. A failed candidate or new-game draw rolls back both. Start/Restart copies history while rebuilding gameplay fields; ordinary and Hold top-out use the same completion seam. C-05 renders only rank and score, with semantic headers and stable focus. C-06 accepts an optional retained Session in its fourth mount argument; first three arguments/cleanup remain compatible, and the injected controller owns its own random/error/completion metadata callbacks. Default mounts remain independent; sequential retained-controller remount preserves history without restoring browser data or creating a singleton. One controller must not be scheduled by multiple simultaneous mounts.

Literal pure fixtures verify errors/ranking/capacity/ties/detachment. Actual session traces verify score/notification/rollback and both top-out paths. Browser view/page/remount and deployed-prefix tests verify rendering/focus, new-game retention, fresh page isolation and unchanged settings persistence. [L-01–L-08](spec/leaderboard.md) own exact behavior.

## Manual file component collaboration

## C-09 complete result values

Own `GameResult {id, score, timestamp}`, detached result/history validation and stable top-ten insertion from a complete newly completed result. Reject malformed records, duplicate IDs, unsafe scores and invalid canonical UTC timestamps; do not regenerate, normalize or discard metadata. Equal scores retain input order. Pure timestamp/ID predicates are reused by the transfer contract; ranking performs no generation, persistence or clock reads.

## C-04 transactional session history

Require an explicit metadata-source capability when constructing a session, alongside existing RNG and listener-error inputs. Update all actual callers/fixtures in the same coherent change. The browser supplies cryptographically generated UUIDv4 strings and canonical UTC times; tests inject controlled sources. Read metadata once for a qualifying completion after candidate gameplay succeeds, before state publication; validate it against retained history. Source exceptions/invalid data roll back game/history and emit no successful-change notification. A discarded below-top-ten result does not alter capacity/order but still represents one qualifying completion event.

Provide a production `replaceLeaderboard` operation for a completely validated detached result array. It revalidates/copies domain values and replaces only history: no game action, draw, clock advance, mode/bonus change, synthetic completion or active-rule update. An explicit synchronous prepublication collaborator lets the composing transfer operation commit already-staged settings/effects before session observers receive the new history. Reject reentrant session operations; a collaborator failure leaves session state uncommitted. Do not expose board/score/bonus setters or generic gameplay mutation callbacks.

The collaborator must not notify, dispatch gameplay or mutate the controller. It uses prepared configuration assignment and checked browser persistence only. No throw-prone parsing/validation remains after its successful return. All ordinary listeners retain postcommit isolation; a bad listener cannot cause rollback of an already successful restore. Snapshots, restart copies and subscriptions retain the complete metadata without aliases.

## C-07 staged selected configuration

Retain canonical `isConfigurationValue`, defaults and `toRuleOptions`. Add a narrow complete-selection preparation capability producing detached validated values and a synchronous internal commit with no browser effects or observers. Native `update` behavior remains compatible. Do not create a second pending settings cache; game rules are still copied only at Start/Restart. The transfer model imports canonical domains rather than replicating setting validation.

## C-08 checked restore effects

Keep existing six-field external naming, directory scope, cookie attributes and URL/history preservation. Native edits remain independent best effort. Expose a distinct batch restore capability: stage the complete six-field target/current browser values; write and read back all target cookies; replace the URL once with all six explicit values while preserving current history.state; verify before reporting success. Equal/default target values still receive explicit writes.

Retain prior owned values/absence, URL and history state for compensation if an operation fails. Restore owned cookie values or delete newly created owned cookies with the original scope; restore the prior URL/state if changed. Never touch unrelated cookies/query values. The coordinator commits memory only when effects succeed. Reading current values or URL failure aborts before writes; silent rejection of a cookie write is a failure, not success. Failure semantics and the external refusal/termination limit belong to [file contracts](spec/file-persistence.md). No ordinary native edit is routed through strict restore logic.

## C-10 portable snapshot contract and JSON

Own the versioned `{formatVersion, results, settings}` value and pure complete validation, leveraging C-09 and C-07 domains. Expose validation/copy, JSON decode and JSON encode. Validate JSON structure through a validator generated from the published JSON Schema; run bounded semantic checks afterward. Reject duplicate JSON member names from the retained original text before accepting decoded data; do not coerce settings, sort files into validity or retain unknown data. The normalized value is format-independent and detached.

Schema compilation belongs to development tooling; generated standalone code and the schema travel with the distribution. Generation/check commands must prove the generated validator corresponds to the shipped schema, without relying on runtime eval/new Function. No DOM, Worker, SQLite runtime, file picker or access to session state enters C-10.

## C-11 browser transfer workflow and codec boundary

Compose capture, worker request and download for Save; select/read, worker validation and synchronous staged commit for Restore. The worker handles only bytes/data and codecs, never live state or browser persistence. SQLite encode/decode uses the same normalized C-10 value, fixed SQL/schema metadata and explicit row order. Close databases in every path and terminate per-operation workers. Native file extension/MIME are hints; bytes select supported content and invalid files are rejected.

At commit time, re-read current session/settings/browser state; failure rollback targets that moment, preserving legitimate changes since the picker opened. Serialize one transfer per mount, fence late responses by operation/disposal identity and disable conflicting transfer/settings controls during the final short commit. Save captures one coherent snapshot at format confirmation. Restore does not lock gameplay for lengthy file parsing; existing focus/visibility pause remains responsible for ordinary pauses.

Own deadlines, input-size checks, structured safe error messages, cancellation, Blob/download URL lifecycle and worker teardown. Errors are displayed, not swallowed or reported as successful restoration. Retained-controller remounts reuse history; an old mount's late worker cannot mutate it after teardown.

## C-05 and C-06 collaboration

C-05 provides three native Show/Hide disclosure buttons for Leaderboard, Settings and Controls/help, all initially shown. The external Settings button is its sole visibility authority, with the existing fieldset and one bottom Save/Restore pair and their format/status controls inside. Hiding conceals that content without resetting values, canceling transfers or introducing a persisted seventh setting. C-05 accepts semantic transfer callbacks/status; it cannot import platform codecs. Board-only gameplay shortcuts remain excluded while any native settings/format/file control is focused. No extra visible metadata columns are required.

C-06 supplies the real completion source, existing explicit session/configuration, document/window/browser-effect callbacks and C-11 lifecycle to the view. Preserve existing first four mount arguments and teardown behavior by appending an optional transfer/access seam where needed; injected sessions own their metadata/RNG/reporting. Default mounts construct fully supplied independent controllers. A new page starts empty until a manual restore; ordinary cookie/URL configuration initialization remains unchanged.

## Verification boundaries

Pure fixtures verify exact records, schema/semantic rejection, stable ties, copies and rollback. Session fixtures prove true Game Over metadata, source failure, once-only submission and active-game-preserving replacement. Browser-effect fixtures inject read/write failures, silent rejection and compensation; no production corruption API is added. Worker codec tests and independent sqlite3 reads verify ordinary database structure, storage classes, version and row ordering. Native download/upload tests, dispose/remount races and built/extracted-prefix tests verify the real composed path and resources in managed Chromium and Firefox.

## C-05 panel and host collaboration

C05 owns target IDs, DOM-local visibility, native hidden semantics, accessible disclosure state and owned listener cleanup. Equal side tracks keep the playfield centered; media queries rearrange stable DOM without a resize state owner. Its existing board/render/refreshConfiguration/destroy interface and construction arguments remain compatible. C06 continues translating Board keys and supplying time/focus/file lifecycle; no visibility callback or state enters C04/C07/C08/C09/C10/C11. Session actions remain start/restart/pause/resume despite two-button presentation. [UL01–10](spec/ui-layout.md) owns exact behavior; source-only fixtures supplement real source/built/extracted entry acceptance.
