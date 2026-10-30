> Historical campaign007 source; current authorities are [PROJECT](../../PROJECT.md), [SPEC](../../SPEC.md), [PLAN](../../PLAN.md), [layout](../../layout.md) and [TASKS](../../TASKS.md). This archived source is not an executable owner.

# Manual file persistence specification

## Scope and governing inputs

F-01–F-12 define the delta under [FEATURE](FEATURE.md), [FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) and [FEATURE_DECOMPOSITION](FEATURE_DECOMPOSITION.md). They extend main [SPEC](../../SPEC.md), [leaderboard L-01–L-08](../../spec/leaderboard.md), [configuration](../../spec/session-configuration.md) and [browser persistence U-01–U-08](../../spec/configuration-persistence.md).

L-02/L-03's score-only shape becomes the complete result below; L-04 retains atomic completion with injected metadata; L-05 gains manual history replacement without automatic persistence; L-06 gains no visible metadata columns. U-03/U-04 native edits retain best-effort persistence; F-07 defines a separate checked restore path. Scope exclusions concerning import/export and metadata in main PROJECT/design/SPEC are superseded only for this capability; all other gameplay, six-setting domains, lifecycle and static delivery guarantees remain.

## F-01 — Result identity, score and completion time

Each result has exactly `id`, `score`, `timestamp`. `id` is a canonical lowercase UUIDv4 (`xxxxxxxx-xxxx-4xxx-[89ab]xxx-xxxxxxxxxxxx`); IDs are unique within a snapshot. `score` is a JSON number/JavaScript safe integer from 0 through 9007199254740991, not a numeric string, fractional value, NaN or infinity. This shared bound preserves exact SQLite/JSON/JavaScript interchange. `timestamp` is a real Gregorian UTC instant with exactly the 24-character form `YYYY-MM-DDTHH:mm:ss.sssZ`, years0000–9999, seconds00–59. Require exact canonical round-trip through UTC date serialization as well as structural validation: reject impossible dates, offsets, missing/flexible fractional precision, leap-second text and normalized-overflow dates.

A successful running-to-game-over transition obtains one ID and timestamp from explicit injected sources after candidate scoring/draws succeed and before observers. Include ordinary lock/spawn and both blocked Hold paths, zero scores and completions below the current top ten. Read each metadata input once per qualifying attempted completion; invalid/duplicate metadata or a source exception preserves pre-action game/history and produces no successful-change notification. Retrying a failed game transaction may read new external source values, as RNG callbacks are not reversible. No timestamp or ID is generated at Save/Restore, rendering, restart or notification.

Rank scores descending, inserting a new tied result after existing ties. Imported array order is the tie priority; never infer it from UUID or timestamp. Preserve complete records through copies, ranking, snapshots, Start/Restart and repeated cross-format export/import. Snapshots and transfers expose no retained mutable aliases.

Acceptance: literal metadata sources and records test valid extrema/calendar edges, all rejection domains, exact once-only completion/rollback, stable ties and capacity, both top-out families, observer isolation/reentry and detached copies. Existing final-score and no-extra-draw assertions remain.

## F-02 — Complete portable snapshot

Version1's normalized transfer object has exactly these three required properties:

| Property | Required content |
| --- | --- |
| `formatVersion` | Integer1; reject all other versions/types. |
| `results` | Ordered array of zero through ten F-01 records, descending by score; unique IDs. |
| `settings` | Object with exactly the six keys/value domains below; no omissions or additions. |

| Setting key | JSON/domain value | SQLite TEXT value |
| --- | --- | --- |
| `ghostVisibility` | `never`, `lower-half`, `always` | Same exact token |
| `hardDropEnabled` | Boolean | `true` or `false` |
| `nextPreviewEnabled` | Boolean | `true` or `false` |
| `hardDropLockPolicy` | `general`, `immediate` | Same exact token |
| `generalLockPolicy` | `failed-downward`, `gravity-interval` | Same exact token |
| `holdEnabled` | Boolean | `true` or `false` |

Use the canonical application predicates; no case folding, trimming, number/string coercion, source-default fallback, unknown-key removal, sorting or truncation to repair an invalid file. JSON negative zero normalizes to numeric zero; no distinct negative-zero result identity exists. A valid empty results array still requires all settings.

Acceptance: valid empty/one/ten records and every domain value; literal malformed/extra/missing properties; duplicate IDs; unordered scores; eleven results; values valid as URL text but invalid as JSON types. Both formats yield identical detached normalized values.

## F-03 — JSON and published JSON Schema

Save UTF-8 JSON without a BOM, with `application/json` and filename `classic-tetris-save.json`. It contains only the F-02 envelope and F-01 records. Restore decodes UTF-8 strictly, rejects duplicate member names at every object level before information is lost, and requires exactly one complete JSON value with no trailing non-whitespace data.

Provide `schemas/game-save.schema.json` using JSON Schema draft2020-12. Require the three envelope fields, `additionalProperties:false` on every object, `formatVersion: {const:1}`, maximum ten results, F-01 ID/score/timestamp constraints and all six required exact setting keys/domains. Use `format:date-time` plus the canonical UTC pattern for timestamps and UUIDv4 pattern for IDs. Schema-driven structural validation must actually run before loading; generating/shipping a schema without using its validator is insufficient. Compile a standalone validator at development/build time, with format validation enabled, and check that generation is current. No runtime code generation is necessary.

Supplement schema validation with real canonical-calendar checks, unique result IDs, descending scores and duplicate-member rejection. Do not claim JSON Schema alone enforces cross-entry ID uniqueness or full semantic acceptance. Deliver the schema in the static package at its stable relative path and document how to use it.

Acceptance: independent schema validation of exported files; generated-validator freshness; invalid calendar dates that match the pattern; non-UTC instants, duplicates, truncation/trailing data, malformed UTF-8, excess nesting/size and corrupt versions reject with no effects. Re-export preserves every ID, timestamp, score, setting and tie order.

## F-04 — SQLite format and metadata

Save one ordinary SQLite3 database file with filename `classic-tetris-save.sqlite` and MIME `application/vnd.sqlite3`. The database has `PRAGMA application_id = 0x54455452` (TETR) and `PRAGMA user_version = 1`. Those header metadata fields identify the format/version; formatVersion is not a seventh settings row.

The only application tables are ordinary rowid tables with these columns in this order:

| Table | Columns and storage contract |
| --- | --- |
| `high_scores` | `id TEXT NOT NULL PRIMARY KEY`, `score INTEGER NOT NULL`, `timestamp TEXT NOT NULL`; exact F-01 values, zero to ten rows. |
| `settings` | `key TEXT NOT NULL PRIMARY KEY`, `value TEXT NOT NULL`; exactly six uniquely keyed F-02 rows. |

Use named columns and bound parameter insertion; score constraints in created databases enforce the shared safe-integer domain. Reject wrong declared columns/types/keys/nullability, missing/extra application tables, WITHOUT ROWID/virtual tables, views, triggers, extra user indexes, foreign keys, wrong application/version metadata, corrupt databases and mismatched actual storage classes. Internal SQLite autoindexes for primary keys are permitted. Require INTEGER storage for score, TEXT for IDs/timestamps/settings, never coercing REAL or numeric text into acceptance. Read SQLite integer text or exact integer values before converting to JavaScript so an out-of-range int64 cannot be rounded into validity.

Insert high_scores in normalized array order and restore by explicit ascending `rowid`; require descending scores in that order. Gaps in rowid are valid; rowid is transport ordering, not the stable result ID. This supports faithful equal-score order without adding a fourth named column. Settings row order is irrelevant; key uniqueness/completeness is mandatory. Restore validates actual values even when SQL constraints are missing or weak; declared constraints alone are not validation. Accept equivalent constraint spelling when all required structural/domain checks pass.

Open an isolated in-memory database, perform bounded integrity/schema/data checks with fixed read-only queries, and never execute SQL supplied as content, attach a file, load extensions or write browser storage. Close all DB/statements on success/error. Both encode and decode pass through F-02 validation.

Acceptance: Python sqlite3 independently opens downloaded exports and checks exact columns, row values/order, metadata and integrity. SQL-produced fixtures cover duplicate/missing settings, illegal storage classes, unsafe int64, ID/timestamp failures, wrong metadata, corrupt bytes and unexpected schema objects. JSON→SQLite→JSON and reverse preserve the dataset exactly.

## F-05 — Manual controls and Save

Provide a keyboard-operable Settings disclosure initially open. Inside its content, after the existing controls/help/current-versus-pending summary, place exactly one Save button and one Restore button. Collapsing Settings hides both and their related format/status controls. Disclosure state is page-local, is not a seventh setting and does not write cookies/URL.

Save opens a labelled format choice offering JSON and SQLite; canceling creates no file or data change. At format confirmation, capture one coherent detached copy of the current top-ten history and all six selected values, including pending next-game rule values. Later gameplay while encoding does not change that captured export. Download exactly one file in the selected format; do not add a sidecar schema/checksum/database file to each user download. The schema ships with the application separately. Save changes no results, game progress, selected/active settings, cookies or URL. On encoding/download failure show an error and release resources.

Acceptance: real browser downloads for both choices, selected-vs-active settings, empty history, exact payload metadata and one-download count; cancel produces no download; collapse hides the single pair at320/1000px and preserves values. No new board shortcut is added.

## F-06 — Read, stage and commit Restore

Restore opens one local file picker accepting JSON/SQLite hints. Inspect bytes, not the extension/MIME alone: SQLite starts with its16-byte `SQLite format 3\0` signature; other candidates must decode as F-03 JSON. Reject empty, unsupported or invalid files. Never invoke both codecs speculatively with live state. Parsing, full structural/domain/semantic validation and detached preparation must finish before any mutation of results, settings, cookies or URL.

One mount owns one transfer operation. Disable concurrent Save/Restore during a pending operation; ignore stale responses. Settings/gameplay need not be frozen while reading. Immediately before commit, capture current results/settings/persistence, so rejection preserves current legitimate state rather than rewinding to the picker-open snapshot.

For a valid staged file, synchronously replace the entire leaderboard and complete selected settings as one observable application transition. A successful restore writes all six cookie values and all six URL parameters, including selected-equal and default values; do not reuse changed-key-only native update logic. Preserve unrelated cookies, query entries, fragment and history.state; use one successful history replacement with no added history entry. Cookie path, lifetime, SameSite and conditional Secure follow U-03; URL/history preservation follows U-04.

Use checked persistence effects and F-07 before publishing memory. Then commit prepared selected values and history before notifying/rendering; observers see both coherent values. Listener exceptions remain postcommit isolated failures, not a failed restore. Duplicate result values already in history do not cause a merge; the file replaces history, including an empty list. Success refreshes rows, selected controls, live display and current/pending rule description without moving focus to the board.

Acceptance: actual uploads replace nonempty/empty lists and all six settings; equal/default settings are explicitly persisted. A subscriber sees coherent replacement without partial notifications. No state setter/test-only import path substitutes for the native flow. Test invalid data in the final result and final setting to prove full validation, not prefix application.

## F-07 — Failure and browser-effect boundary

File selection cancellation, read/decode/validation error, worker error/timeout, or teardown before commit changes no results, selected values, cookies or URL. Return a clear accessible error naming the operation and useful cause/category; do not expose raw file contents or pretend partial acceptance. Cancel is neutral rather than a validation error.

Before checked effects, validate the full file and prepare all in-memory replacements. Abort without writes if prior cookie/URL reads cannot be captured. Write all target cookies and verify their visible owned values; detect silent browser rejection. If a write or URL replacement/readback fails, restore prior owned cookie values or absence and prior URL/history state, verify compensation, leave memory unchanged and show failure. Do not rewrite unrelated cookie/query entries. For rollback, restore cookie values under the application's existing path/attributes; JavaScript cannot read original cookie expiration metadata. Successful Restore refreshes the normal one-year lifetime.

The unchanged-on-failure guarantee covers every rejected file and controlled application/read/write failure with functioning compensating browser operations. Cookies and history provide no joint native transaction: process termination, concurrent external cookie mutation or a browser refusing the rollback writes themselves cannot be made atomic by application code. If compensation cannot be verified, retain uncommitted results/settings, show an explicit incomplete-persistence-rollback error and never announce success. This environmental limit is reported honestly; it must not be used to accept a malformed file or omit normal rollback tests. Original native setting edits keep their independent best-effort contract.

Acceptance: fault injection at every cookie position and URL replacement, silent write rejection, failed prior reads, successful compensation of values/absence/history and a separately classified failed compensation. Assert exact precommit history/settings/URL and owned cookie values for recoverable failures. Assert malformed files cause zero persistence calls. Keep external-termination/irreversible-browser limits distinct from observed passing checks.

## F-08 — Gameplay, rules and session lifetime

Restore changes only completed history and selected settings. Preserve board, active piece, score/lines/level, queue/bag, Hold, penetrator mode/bank/mask, gravity remainder, lock countdown and current game status, except ordinary existing focus/visibility pause. No automatic restart/resume and no completion record is generated. Ghost visibility and preview update immediately; Hard drop/Hold/general/hard-drop policies apply on next Start/Restart. A later Game Over contributes a genuine newly identified/timestamped result to the restored list under F-01.

Start/Restart retains imported results while abandoning unfinished gameplay normally. Reload/new pages clear history; restore only URL/cookie settings automatically. No leaderboard localStorage/sessionStorage/IndexedDB/OPFS/backend, implicit download/upload or cross-page synchronization is added. Retained-session remounts keep completed results as before; destroyed mounts cannot commit late work.

Acceptance: ready/running/paused/game-over restore, unchanged game snapshot fields and private timing proven through subsequent controlled advances, pending-vs-active timing, real post-restore completion, restart retention, reload/new-page reset with settings retained, sequential remount and late-worker fencing. Existing game/persistence/penetrator/browser suites remain required.

## F-09 — Bounded file operations and teardown

Accept files of at most1048576 bytes; reject oversized/empty files before reading/parsing. Use a dedicated transient Worker for operation parsing/validation and SQLite work, with a15000ms host deadline after dispatch. Terminate on deadline/error/completion/disposal; no unbounded parser/SQL work on the UI thread. An expired/canceled operation cannot later trigger a download or commit. Reset hidden file-input selection after completion so the same file can be selected again. Revoke created download URLs after initiation and on teardown, without revoking before the browser can consume them. Own every event listener, timer, worker and DB handle.

SQLite initializes lazily from packaged trusted assets. Ordinary gameplay and JSON operations must work when SQLite initialization fails; failure affects only the chosen SQLite operation. No CDN or network service is required after local static assets load. File-size/deadline controls bound input/work duration; they are not a claim of a global browser memory cap.

Acceptance: boundary sizes, worker startup/runtime failure, timeout, same-file retry, overlapping attempts, disposal during read/worker response and resource cleanup; actual Worker/WASM loading from built/extracted prefix. Native file-dialog focus and external OS download behavior are reported separately when unavailable.

## F-10 — Accessibility and layout

Use semantic labelled disclosure/buttons/format choices, visible busy state, normal keyboard activation and an accessible success/error region updated only on relevant changes. Transfer errors do not close Settings, discard selections or steal focus. Hidden settings content is neither visible nor keyboard-focusable. Settings/format controls do not dispatch board shortcuts. Keep the one Save/Restore pair and errors usable at320/1000px without horizontal overflow or board overlap. Render user-facing errors as text, not imported HTML.

Acceptance: native keyboard and accessible-name/focus checks; one pair and disclosure hide/show; all existing settings/lifecycle tests; inspect actual exported-game layouts in both browsers at both widths, including long error text.

## F-11 — Interfaces and compatibility

C-09 accepts complete result records and returns detached complete histories. C-04 construction requires explicit metadata inputs; update all source/test consumers coherently. Public mount first four arguments, defaults and teardown remain compatible; default browser mounts inject real metadata, and supplied sessions retain their own sources. C-04 replacement validates the entire history and offers a narrow prepublication settings/effects collaborator; reentrant operations fail without corruption. C-07 prepared complete assignment is separate from native changed-key edits; C-08 exposes strict restore effects without changing native edits.

Invalid object/field types cause TypeError at pure integration boundaries; valid types outside allowed domains, version/capacity/order constraints cause RangeError. Browser UI converts those to clear operation errors. Invalid codecs/persistence may fail asynchronously, but no rejected pending work publishes live changes. The schema/portable version is1 independently of app version1.7.0. No existing user file version needs migration; reject unsupported versions rather than guessing.

Acceptance: type/boundary checks, all consumer updates, malformed/reentrant collaborator behavior, copied inputs, default and injected mount behavior, and current native-edit regression. No browser runtime/types are imported by shared application/core modules.

## F-12 — Distribution and release acceptance

The static ZIP includes worker JavaScript, SQLite WASM, the stable JSON Schema, accurate install/controls/format documentation and required upstream licenses/notices. Extend strict packaging only for owned runtime/schema assets; retain manifest hashes, deterministic archives and credential/fixture/source exclusions. All URLs resolve relative to the deployed application, including `/nested/game/`; no separate Node/Python runtime or server API is needed by players. SQLite save files are user data, not required deployment artifacts.

Verify clean install, type/boundary checks, unit/package/browser-environment checks, full managed Chromium/Firefox source/built/extracted suites, actual downloads/uploads, independent SQLite/schema inspection, repeated package bytes and actual extracted-game layout. Measure expanded suite runtime before selecting finite updated deadlines. Release only after phase review/integration; v1.7.0 uses the existing stable `classic-tetris-browser.zip` and filename-specific checksum, complete notes and default-branch commit/tag/body/assets/download/CI checks. Refresh and independently check stable local upload aliases against the actual candidate; do not infer them from versioned ZIP creation. Report native-headed/actual HTTPS limits separately. Electron remains future scope.
