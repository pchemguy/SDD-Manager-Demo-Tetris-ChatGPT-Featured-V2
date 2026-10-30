# File persistence architecture

## Scope and retained arrangement

Implement [FEATURE](FEATURE.md) as a scoped extension to [ARCHITECTURE](ARCHITECTURE.md). Retain the deterministic rules core, pure selected configuration and ranking, transactional session, shared DOM view and composing browser host. No rule, game-progress serialization, backend, automatic file storage or additional platform is introduced.

The portable snapshot is an explicit data-transfer value containing version, ranked completed results and all six selected settings. It is not the session's gameplay Snapshot. Parsing, complete validation and staging precede any state or browser-persistence mutation.

## Ownership and dependency direction

| Area | Intended responsibility and dependencies |
| --- | --- |
| Session / C-04 | Own result metadata and history. Accept an explicit ID/UTC-time source for qualifying completions and validated staged history replacement. Preserve active gameplay and transaction/observer guarantees. No browser or SQLite imports. |
| Ranking / C-09 | Validate/copy complete result records, stable descending insertion and top-ten history. Own no clock, ID generator, file access or retained history. |
| Portable snapshot / C-10 | Own pure complete transfer validation and JSON Schema-derived validation, normalized data and JSON serialization. Depend on canonical result/setting domains, not hosts. |
| Browser transfer / C-11 | Own manual operation lifecycle, local file bytes/downloads, isolated SQLite codec, staged restore orchestration and cleanup. Depend on C-10 and explicit session/configuration/persistence capabilities. |
| Configuration / C-07 and C-08 | C-07 owns one detached selected-value authority and staged replacement. C-08 retains native-edit best-effort effects, with a separate checked batch persistence capability for Restore, including explicit default/equal values. |
| UI / C-05 | Project one bottom-of-settings Save/Restore pair, format choice, busy/error/success state. Emit semantic callbacks; no file decoding, browser persistence, globals or SQL. |
| Browser composition / C-06 | Bind document/window, metadata source, transfer resources and the existing lifecycle. Preserve native-control shortcut exclusion, pause policy, current URL/history state and directory-scoped cookie ownership. |

The core remains unchanged. C-10 consumes C-09/C-07 domain contracts; neither imports C-10. C-11 and the host consume application contracts; application/UI never import platform modules. There is no global transfer singleton, second leaderboard store or second selected-settings authority.

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

Use literal metadata sources and complete records in pure/controller tests; faults before publication test retained state and observers. Codec tests compare normalized datasets across JSON/SQLite and independent Python sqlite3 reads. Browser tests use actual downloads/uploads, real gameplay completions, malformed files, checked-persistence faults, cancellation/teardown and actual extracted-prefix deployment. No production board/bonus setter or automatic import shortcut is introduced. The [component delta](FEATURE_DECOMPOSITION.md) owns detailed collaborations; FEATURE-SPEC owns exact formats and failures.
