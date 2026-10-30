# Feature preparation record

## Identity and governing inputs

Campaign `007_5f955b0`, slug `007_5f955b0-file-persistence`. Original baseline and branch-off `5f955b0eec0d871d37d256b8bb7927d29dffbb0f` (published v1.6.0); creation parent and preparation integration target `main`. Working preparation branch `design-docs/007_5f955b0-file-persistence`; reserved implementation branch `feature/007_5f955b0-file-persistence`; reserved historical package `docs/dev/features/007_5f955b0-file-persistence/`. No historical directory is created at opening.

Current [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), [DECOMPOSITION](DECOMPOSITION.md), [SPEC](SPEC.md), [leaderboard](spec/leaderboard.md), [configuration](spec/session-configuration.md), [browser persistence](spec/configuration-persistence.md), [PLAN](PLAN.md), [layout](layout.md) and [TASKS](TASKS.md) govern retained behavior. Main TASKS owns completed T-001–T-052. Frozen campaigns001–006, completed ranges and releases remain unchanged. Existing manual AI-log scaffold is reused; recording remains manual. No previous workflow is resumed.

## Original human request

Open a feature campaign to implement "file persistence" capability:

Place **Save** and **Restore** buttons at the bottom of the settings panel. Hiding the settings panel also hides these buttons.

Save offers JSON or SQLite and downloads one file containing the current top 10 results and all six game configuration settings. Restore accepts either format, replaces the leaderboard and applies the saved settings, updating their cookies and URL parameters.

Preserve each result's stable ID, non-negative integer score and UTC game-completion timestamp in both formats. JSON includes a format version, results array and settings object; provide a JSON Schema and validate the complete content before loading, including timestamps and setting values. SQLite includes `high_scores(id, score, timestamp)` and `settings(key, value)`, with one uniquely keyed row per game setting and format versioning in database metadata.

Validate the entire file before changing results, settings, cookies or URL parameters. On failure, show a clear error and leave them unchanged. Saving and restoring are manual; restored results become the session leaderboard.

## Mode, scope and authority

- Retained autodoc/onepass from the established project workflow. One pass: manual JSON/SQLite export/import of top-ten results and all six selected settings. FEATURE accepted by the human reply `k` to the published proposal9c64fac491567938d1efc20d45da33c119f69664. After acceptance, subsequent necessary document checkpoints through FDOCS-008 are preapproved; stop before whole-package QC and implementation.
- Current authority: accepted brief and autodoc preparation through FDOCS-008, then stop before whole-package QC and implementation. Prior full-implementation authority ended with campaign006.
- Tracking enabled by AGENTS and retained project choice. Campaign-native milestone and nine exact FDOCS identities/markers/associations verified before target-repository writes; no product phase/task projection.
- Standard concise updates. Actual host Linux/bash, clean eligible Git main baseline. Existing ignored/untracked protected repository credential reused; no credential value in artifacts or command text. Current API is slow but successful readback controls progression.
- Preserve existing gameplay and six-setting domains; no new setting, platform, automatic saving, automatic file loading, backend or unfinished-game serialization.

## Observations and proposed decisions

The current leaderboard stores score-only records. This feature therefore introduces stable unique IDs and real UTC completion timestamps at the original Game Over event, retaining them through ranking, snapshots, exports and imports. Do not manufacture timestamps when exporting. Existing cookies/URL persistence is best effort for native edits, so Restore requires a distinct validated batch operation rather than six calls to the current edit handler.

Accepted brief interactions: a single bottom-of-settings button pair; a format choice inside Save, not duplicate button sets. Save captures selected settings, including pending next-game values. Restore preserves a running/paused game and its progress, applies display settings immediately and rule settings on Start/Restart, and replaces completed history without submitting the unfinished game. Restored records retain IDs/timestamps and saved tie order; later completed games enter the same top-ten list. Reload still clears results unless a file is manually restored. Empty history is valid. Reject missing/extra settings, invalid values/timestamps, duplicate IDs, unsupported versions and more than ten results rather than partially loading or silently truncating. UTC timestamp syntax, exact ID representation, numeric interoperability limits, SQLite metadata representation, resource limits and browser dependency selection belong to dependent design/specification, bounded by the brief.

Both formats must express the same validated dataset. Restore validates structure and semantics before any mutation, including persistence effects. Failure handling must preserve results/settings/cookies/URL and give a clear error; dependent design must assess the current best-effort adapter and browser write/rollback limitations rather than claim existing behavior satisfies this requirement. Canceled dialogs do not change data. Save does not alter live data or remembered settings. No names or timestamp columns are required in the visible leaderboard.

## Tracking

Preparation milestone [30](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/milestone/30) named `sdd-docs-007_5f955b0`.

| Stage | GitHub issue |
| --- | --- |
| FDOCS-001 | [#116](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/116) |
| FDOCS-002 | [#117](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/117) |
| FDOCS-003 | [#118](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/118) |
| FDOCS-004 | [#119](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/119) |
| FDOCS-005 | [#120](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/120) |
| FDOCS-006 | [#121](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/121) |
| FDOCS-007 | [#122](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/122) |
| FDOCS-008 | [#123](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/123) |
| FDOCS-009 | [#124](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/124) |

## Stage evidence and pending transitions

FDOCS-001: clean main baseline, adopted guidance/discovery from SDD Manager0.15.4 and Technical Writing Assistant retained; no unfinished workflow branch; campaign allocation007 follows repository maximum006. Hosted preparation gate verified before branch/record writes. Context, task-only records and HANDOFF co-close at initialization. Publish/read back and close/read back only FDOCS-001 before proceeding.

FDOCS-001 initialization published and exact remote ref verified at d1efdbe79d59b3d1fb186b5ee805d1e127ec5f0e; issue116 closed/read back with milestone30 association.

FDOCS-002: [FEATURE](FEATURE.md) proposal prepared against the supplied request and current code/contracts. Scoped brief assessment: every seed requirement represented; existing score-only metadata and best-effort persistence conflicts identified; gameplay/selected-setting timing retained by proposal; no dependent design or implementation. Proposal source identity is its Git blob (recorded below); first human acceptance pending, so checkbox/issue117 remain open. FDOCS-003–008 pending; FDOCS-009 not selected. No product code, version, release, test run, implementation or package-QC readiness is claimed.

FEATURE proposal blob: `2cef5ec4a9387ef6cb5c3d1e1d6e64be5dc18523`. Publish/read back this proposal, then await first acceptance. No package QC or dependent feature design selected.

## Brief acceptance

Human reply `k` accepts FEATURE at commit `9c64fac491567938d1efc20d45da33c119f69664`, blob `2cef5ec4a9387ef6cb5c3d1e1d6e64be5dc18523`, including selected-setting capture, active-game retention, saved tie order, strict complete-file validation and manual session lifetime. FDOCS-002 closes with this record and initial checkoff; publish/read back, then close/read back issue117. Earlier proposal-pending entries describe their opening checkpoint only. Next eligible stage FDOCS-003; necessary later document checkpoints are preapproved by retained autodoc/onepass. No implementation authorized.

## FDOCS-003 architecture assessment

Added FEATURE_ARCHITECTURE: pure transfer model/C10 and browser transfer/C11, injected real metadata, schema-generated validation, isolated packaged SQLite worker, explicit tie-order storage and staged publication. Main architecture is reused elsewhere. Native six-cookie atomicity is unavailable; design requires mutation-free file rejection and checked compensating effects, with the irrecoverable external-interference boundary made explicit in SPEC rather than hidden. Candidate capability checked against official sql.js and Ajv documentation; no dependency installed or runtime feasibility claim made. Autodoc acceptance applies; scoped ownership/dependency review finds no design blocker. Source blob recorded below. Publish/read back and close/read back issue118 before decomposition.

Architecture source blob `9c81831db4be0d00171d662e9e74a27b2e1a4f8b`, publication a71c5ba82886fc94fc9e62a573d6037629ed94ea; issue118 closure/readback verified.

## FDOCS-004 decomposition assessment

FEATURE_DECOMPOSITION assigns C09 result validation, C04 completion/staged history and prepublication collaboration, C07 prepared assignment, C08 checked effects/compensation, C10 schema-driven JSON and C11 browser/worker lifecycle. C05/C06 expose a native Settings disclosure because current UI has no hide control; initially open, session-only visibility. Required metadata injection updates all session consumers coherently; no fake epoch/default timestamp. Domain/presentation/host dependency review passes, with current game preserved and no production board setter. Autodoc acceptance applies. Publish/read back and close/read back119 before SPEC.

## FDOCS-005 specification and scoped QC

FEATURE-SPEC F01–12 and adjacent FEATURE-SPEC-REVIEW-REPORT are Ready under autodoc preapproval. Decisions: portable version1, canonical lowercase UUIDv4, exact UTC millisecond timestamps, safe integer scores, JSON Schema2020-12 with generated structural and supplemental semantic checks, exactly two SQLite tables with header application_id/user_version and rowid ordering,1MiB input/15s worker deadline. Native Settings disclosure initially open. Complete file rejection is mutation-free; recoverable effect failures require checked compensation, with irreversible external browser failure explicitly distinguished and never reported as success. Controls capture selected settings; restore preserves active game and metadata. Initial manual conformance review found no blocker; exact content hashes in adjacent report. No schema/runtime implementation or tests performed. Publish/read back and close/read back120 before planning.

## FDOCS-006 delivery strategy

FEATURE-PLAN defines Phase8 with two delivery milestones (working JSON snapshots/checked restore, then equivalent SQLite/distribution) and one final phase-review milestone. Intentional small delivery count is assessed in adjacent PLAN report; whole capability is bounded and integrated JSON evidence is early. Strategy QC Ready, combined PLAN/layout gate pending FDOCS-007 allocation. App release planned1.7.0 only after verified full phase/integration; portable version remains1. No previous phase/task range changes or implementation projection. Autodoc preapproval applies; publish/read back and close/read back121 before layout.

## FDOCS-007 physical allocation and combined QC

FEATURE-PLAN Physical allocation extends main layout with exact pure/generated/schema/host/worker/SQLite/UI/testing/packaging/documentation owners; no separate FEATURE-LAYOUT or speculative implementation record. Inspected NodeNext/test inclusions and current package verifier confirm required consumer/generator/schema/WASM updates are planned. Adjacent PLAN report Revision1 records exact revised hash, preserved upstreams/count rationale and combined Ready gate. Autodoc preapproval applies. Publish/read back and close/read back122 before deriving tasks.

## FDOCS-008 executable derivation and autodoc stop

FEATURE-TASKS T053–T061 derives Phase8 exactly: four8.1 deliveries plus dedicated T057 review; three8.2 deliveries with review/report folded into T060; single final8.3/T061 phase review/integration/release task. Adjacent FEATURE-TASKS-REVIEW-REPORT Ready records exact hashes, coverage, counts, dependencies, single ownership and preserved main max52. Autodoc preapproval applies; product tasks remain unchecked. Source/docs-only checks pass; no product code/version/dependency change or runtime tests. Publish/read back and close/read back only123.

FDOCS-001–008 complete under accepted brief/autodoc scope, contingent only on this final publication/issue closure. FDOCS-009/issue124 and preparation milestone30 remain open. Exact next boundary: stop before whole-feature package QC; no preparation integration, product phase activation or implementation is authorized by document completion. Future implementation uses reserved feature branch only after accepted package QC and explicit verified/published main preparation integration. No reset or further scope pass selected.

## FDOCS-009 whole-package QC and execution grant

Human request `Do QC and full implement` authorizes whole-package QC, full T053–061, repairs/reviews/reports, incorporation/unique task ownership, integration and app1.7.0 release with verified artifacts/provider outcomes. Prior autodoc stop is advanced prospectively. Whole-package review at0f5690d and independent file_package_qc assessment Ready, no substantive blocker; FEATURE-QC-REPORT owns exact sources/limits. Co-close009 with report/control/HANDOFF; publish/read back, close/read back124, explicitly merge/verify/publish preparation into main, then close milestone30. Only after verified phase tracking create/publish feature implementation branch and start053. Native/irreversible-browser limits retained.
