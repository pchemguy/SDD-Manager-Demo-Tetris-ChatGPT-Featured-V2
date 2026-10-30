# File persistence component delta

## Context

Apply [FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) to C-04–C-09 in [DECOMPOSITION](DECOMPOSITION.md), adding C-10/C-11. Core C-01–C-03 gameplay helpers remain unchanged. Exact accepted behavior belongs to FEATURE-SPEC.

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

Retain prior owned values/absence, URL and history state for compensation if an operation fails. Restore owned cookie values or delete newly created owned cookies with the original scope; restore the prior URL/state if changed. Never touch unrelated cookies/query values. The coordinator commits memory only when effects succeed. Reading current values or URL failure aborts before writes; silent rejection of a cookie write is a failure, not success. Failure semantics and the external refusal/termination limit belong to FEATURE-SPEC. No ordinary native edit is routed through strict restore logic.

## C-10 portable snapshot contract and JSON

Own the versioned `{formatVersion, results, settings}` value and pure complete validation, leveraging C-09 and C-07 domains. Expose validation/copy, JSON decode and JSON encode. Validate JSON structure through a validator generated from the published JSON Schema; run bounded semantic checks afterward. Reject duplicate JSON member names before lossy native object decoding; do not coerce settings, sort files into validity or retain unknown data. The normalized value is format-independent and detached.

Schema compilation belongs to development tooling; generated standalone code and the schema travel with the distribution. Generation/check commands must prove the generated validator corresponds to the shipped schema, without relying on runtime eval/new Function. No DOM, Worker, SQLite runtime, file picker or access to session state enters C-10.

## C-11 browser transfer workflow and codec boundary

Compose capture, worker request and download for Save; select/read, worker validation and synchronous staged commit for Restore. The worker handles only bytes/data and codecs, never live state or browser persistence. SQLite encode/decode uses the same normalized C-10 value, fixed SQL/schema metadata and explicit row order. Close databases in every path and terminate per-operation workers. Native file extension/MIME are hints; bytes select supported content and invalid files are rejected.

At commit time, re-read current session/settings/browser state; failure rollback targets that moment, preserving legitimate changes since the picker opened. Serialize one transfer per mount, fence late responses by operation/disposal identity and disable conflicting transfer/settings controls during the final short commit. Save captures one coherent snapshot at format confirmation. Restore does not lock gameplay for lengthy file parsing; existing focus/visibility pause remains responsible for ordinary pauses.

Own deadlines, input-size checks, structured safe error messages, cancellation, Blob/download URL lifecycle and worker teardown. Errors are displayed, not swallowed or reported as successful restoration. Retained-controller remounts reuse history; an old mount's late worker cannot mutate it after teardown.

## C-05 and C-06 collaboration

C-05 adds a labelled native Settings disclosure, initially open, containing the existing fieldset and one bottom Save/Restore pair with their format/status controls. Collapsing it hides the entire content, including transfer controls, without changing values or introducing a persisted seventh setting. C-05 accepts semantic transfer callbacks/status; it cannot import platform codecs. Board-only gameplay shortcuts remain excluded while any native settings/format/file control is focused. No extra visible metadata columns are required.

C-06 supplies the real completion source, existing explicit session/configuration, document/window/browser-effect callbacks and C-11 lifecycle to the view. Preserve existing first four mount arguments and teardown behavior by appending an optional transfer/access seam where needed; injected sessions own their metadata/RNG/reporting. Default mounts construct fully supplied independent controllers. A new page starts empty until a manual restore; ordinary cookie/URL configuration initialization remains unchanged.

## Verification boundaries

Pure fixtures verify exact records, schema/semantic rejection, stable ties, copies and rollback. Session fixtures prove true Game Over metadata, source failure, once-only submission and active-game-preserving replacement. Browser-effect fixtures inject read/write failures, silent rejection and compensation; no production corruption API is added. Worker codec tests and independent sqlite3 reads verify ordinary database structure, storage classes, version and row ordering. Native download/upload tests, dispose/remount races and built/extracted-prefix tests verify the real composed path and resources in managed Chromium and Firefox.
