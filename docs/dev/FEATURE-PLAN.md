# File persistence delivery plan

## Objective and scope

Deliver [FEATURE-SPEC F-01–F-12](FEATURE-SPEC.md) as Phase8, extending the usable v1.6.0 browser game with one manual portable-snapshot workflow in JSON and SQLite. Use [FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) and [FEATURE_DECOMPOSITION](FEATURE_DECOMPOSITION.md); retain main [PLAN](PLAN.md) Phases1–7 and completed tasks1–52 unchanged. No other platform, automatic storage or unfinished-game save is included.

The first integrated milestone delivers real JSON Save/Restore, including metadata and failure-safe application. The second adds equivalent SQLite and verifies the full static distribution. Both formats are part of the one bounded file-persistence capability, sharing the data/validation/commit path. A separate release for internal codec groundwork is unnecessary; release v1.7.0 only after the complete phase is verified and integrated.

## Phase 8 — Manual file persistence

Prerequisite: completed/integrated Phase7 browser leaderboard at v1.6.0, accepted feature package with whole-package QC and published preparation integration before implementation. Hosted implementation objects must be activated/read back before task execution. Existing document-preparation tracking is separate.

| Milestone | Working outcome, scope and dependencies | Exit and decision evidence |
| --- | --- | --- |
| 8.1 — JSON snapshots and checked restore | Add complete stable result metadata and strict shared snapshot/JSON Schema validation, then stage/commit restoration with checked browser effects. Integrate one native Settings disclosure and Save/Restore pair with working JSON download/upload. SQLite is visibly unavailable until the next milestone rather than pretending a missing codec succeeds. | Demonstrate a real completed game saved and restored with metadata, all six selected fields, pending/live timing, invalid-file rejection and effect rollback; source browser regressions, controller/pure tests and accessible narrow/wide controls. Independent whole-milestone code review, focused verification, blocker repairs, report and HANDOFF. Evidence lets the human continue, amend or stop at the integrated JSON capability; routine progression needs no additional checkpoint once full implementation is authorized. |
| 8.2 — Equivalent SQLite and deployable distribution | Depends on8.1 completion/closure. Add packaged lazy SQLite worker/WASM with exact metadata/tables/row order, format choice and cross-format equivalence. Complete failure/resource/session lifecycle coverage, independent file inspection, user guides/schema/licenses and v1.7.0 reproducible package. | Native downloads/uploads in both formats, JSON↔SQLite round trips, independent sqlite3/schema validation, source/built/extracted managed-browser suites and inspected320/1000px layouts. Strict package/manifest/exclusion checks, repeated build bytes and verified stable aliases/checksum; independent whole-milestone review, repairs, report/HANDOFF. This demonstrates full portable interoperability without automatic history persistence. |
| 8.3 — Phase review | Depends on completion/closure of8.1 and8.2. One final whole-phase code review/testing/report outcome, current-document incorporation and task ownership reconciliation, final integration and release verification. | Independent phase assessment, fresh scoped checks and verified merged state; sole executable main task ownership, closed tracking, reproducible same candidate bytes, Git/release/public-download/CI readback and final implementation report/TODO aggregation. |

Two delivery milestones are intentionally retained. They expose useful JSON interoperability early, then SQLite/platform packaging risks, without fragmenting shared schema/application work into extra administrative groups. The final single review milestone is excluded from delivery counts. Each implementation milestone has its own whole-scope review; TASKS assigns a dedicated review task only if the lifecycle threshold is met, otherwise the final delivery task owns review/testing/report/HANDOFF.

## Dependencies and risk reduction

Establish metadata and update every controller consumer coherently before codecs/UI depend on complete records. Establish one normalized schema/semantic validator before either import codec. Implement checked restore before connecting file selection; never temporarily load unvalidated data or use ordinary changed-key updates as strict Restore. Integrate the JSON path before adding the more complex SQL runtime; preserve ordinary game behavior throughout.

Use a maintained pinned sql.js release and build-time standalone schema validation with pinned generator/format dependencies. Verify trusted sources, package resolution, license obligations, runtime worker/WASM paths and schema-generator reproducibility before accepting dependency changes. No library installation is part of preparation. Avoid runtime eval and external CDN dependencies. A targeted technical feasibility probe during implementation may establish local worker/WASM behavior; it does not replace the actual native-flow acceptance tests.

The existing archive allowlist excludes `.wasm` and a schema JSON path. Distribution work must extend that narrow policy for the actual owned assets and update verifier/tests/manifests/notices coherently. Do not broadly permit arbitrary JSON/binary/source files. Keep fixture/user snapshot files out of production archives. Check stable local ZIP aliases against the final versioned bytes; prior release preparation showed they can remain stale.

Checked cookie/history effects use compensating writes and readback, not a fictitious native multi-cookie transaction. Test recoverable failures and distinguish irreversible external browser/process failure under F-07. No malformed import may reach effects. Worker deadlines and file limits protect responsiveness; teardown fences stale results. Measure runtime before adjusting finite suite/wrapper budgets; never replace missing checks with skipped tests or an unbounded run.

## Coverage and verification strategy

| Contract group | Delivery route and evidence |
| --- | --- |
| F01–02, F11 | Complete pure result/transfer values and controller metadata/replace transactions in8.1; literal expected ordering, real completion and rollback, detached copies, consumer/type/boundary checks. |
| F03 | Published schema, standalone-validator freshness, duplicate-key/semantic JSON rejection and real JSON downloads/uploads in8.1; independent validation and shipped schema in8.2. |
| F04 | Worker SQLite codec/metadata/schema/storage checks in8.2; Python sqlite3 independent inspection, corrupt/unexpected-schema cases and bidirectional dataset equivalence. |
| F05–08, F10 | Integrated JSON controls/strict apply in8.1; both-format lifecycle/failure/resource/focus/disclosure acceptance completed in8.2. Source-only seams supplement rather than replace actual built/extracted page flows. |
| F09, F12 | Transient worker lifecycle established with JSON and extended lazily for SQLite; static package includes relative runtime/schema/license assets, finite budgets and real source/built/extracted deployment checks in8.2. |
| Whole capability | Phase8.3 independently reviews the full code/coverage/docs, incorporates accepted contracts and task ownership, verifies final integration and publication. |

Use the project's pinned TypeScript/Node unit runner, Python standard-library package tests and managed Playwright Chromium/Firefox. Clean installation, type/boundary/unit/package/build/environment checks accompany the appropriate source/built/extracted browser suites. New failure tests reproduce missing/incorrect behavior where applicable; tests asserting preserved behavior may start green and must report that accurately. Deterministic source fixtures and injected metadata/access seams must not ship or become production cheats. Real earned/completed gameplay and native upload/download are mandatory for packaged acceptance.

At distribution exit, validate schema/runtime bytes and notices, deterministic ZIP/manifest/checksum, extracted-prefix static hosting and actual narrow/wide game layouts. Version1 portable files are independent from app1.7.0. Existing stable ZIP/checksum release names remain. No native Windows/Electron run is required for this static-browser feature; unavailable headed OS-dialog/focus and actual HTTPS cookie-engine checks are reported honestly.

## Integration and release

Keep feature task/implementation evidence under the campaign identity. After all delivery exits and final review, incorporate accepted feature contracts into current PROJECT/design/SPEC/PLAN/layout, make main TASKS the sole executable owner and archive eligible feature documents during the same authorized boundary. Preserve frozen campaigns001–006 and completed original ranges.

Merge the verified feature into its recorded main parent and verify/publish merged state before creating the release source. Publish v1.7.0 with complete notes, annotated tag and matching release body/commit body, deployable stable ZIP and filename-specific checksum. Verify public bytes, latest status and both release-source CI runs; record final provider outcomes in the owning report/HANDOFF without moving the verified tag.

## Physical allocation

The affected physical allocation is established before task derivation; main layout supplies unchanged owners. No separate FEATURE-LAYOUT artifact is introduced.
