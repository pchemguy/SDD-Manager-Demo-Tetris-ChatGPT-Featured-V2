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

- Retained autodoc/onepass from the established project workflow. One pass: manual JSON/SQLite export/import of top-ten results and all six selected settings. First FEATURE approval remains active. After acceptance, subsequent necessary document checkpoints through FDOCS-008 are preapproved; stop before whole-package QC and implementation.
- Current authority: open campaign, establish preparation tracking, publish FEATURE proposal, then stop for first approval. Prior full-implementation authority ended with campaign006.
- Tracking enabled by AGENTS and retained project choice. Campaign-native milestone and nine exact FDOCS identities/markers/associations verified before target-repository writes; no product phase/task projection.
- Standard concise updates. Actual host Linux/bash, clean eligible Git main baseline. Existing ignored/untracked protected repository credential reused; no credential value in artifacts or command text. Current API is slow but successful readback controls progression.
- Preserve existing gameplay and six-setting domains; no new setting, platform, automatic saving, automatic file loading, backend or unfinished-game serialization.

## Observations and proposed decisions

The current leaderboard stores score-only records. This feature therefore introduces stable unique IDs and real UTC completion timestamps at the original Game Over event, retaining them through ranking, snapshots, exports and imports. Do not manufacture timestamps when exporting. Existing cookies/URL persistence is best effort for native edits, so Restore requires a distinct validated batch operation rather than six calls to the current edit handler.

Proposals awaiting brief acceptance: a single bottom-of-settings button pair; a format choice inside Save, not duplicate button sets. Save captures selected settings, including pending next-game values. Restore preserves a running/paused game and its progress, applies display settings immediately and rule settings on Start/Restart, and replaces completed history without submitting the unfinished game. Restored records retain IDs/timestamps and saved tie order; later completed games enter the same top-ten list. Reload still clears results unless a file is manually restored. Empty history is valid. Reject missing/extra settings, invalid values/timestamps, duplicate IDs, unsupported versions and more than ten results rather than partially loading or silently truncating. UTC timestamp syntax, exact ID representation, numeric interoperability limits, SQLite metadata representation, resource limits and browser dependency selection belong to dependent design/specification, bounded by the brief.

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

FDOCS-002: proposal pending publication and human acceptance; checkbox/issue remain open until accepted. FDOCS-003–008 pending; FDOCS-009 not selected. No product code, version, release, test run, implementation or package-QC readiness is claimed.
