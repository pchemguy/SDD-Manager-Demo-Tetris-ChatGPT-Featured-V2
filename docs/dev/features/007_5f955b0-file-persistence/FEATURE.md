> Historical campaign007 source; current authorities are [PROJECT](../../PROJECT.md), [SPEC](../../SPEC.md), [PLAN](../../PLAN.md), [layout](../../layout.md) and [TASKS](../../TASKS.md). This archived source is not an executable owner.

# File persistence

## Purpose and scope

Let players manually download and restore a portable snapshot of the current session's top-ten completed-game results and all six selected game-configuration settings. Support equivalent JSON and SQLite files in the existing static browser application, without a server or player-side runtime installation.

## Save and Restore controls

Place one **Save** button and one **Restore** button together at the bottom of the Settings panel. Hiding that panel hides both buttons and their related controls. Save offers a JSON/SQLite format choice and downloads exactly one file in the chosen format. Restore accepts either format through a file picker. A canceled operation leaves data unchanged.

Save captures the currently selected settings, including values pending the next Start/Restart, together with the current leaderboard of zero to ten results. Exporting does not change game state, settings, cookies or URL parameters.

## Portable content and validation

Each completed-game result has a stable unique ID, a non-negative integer score and a valid UTC game-completion timestamp. Assign identity and completion time when the game ends; preserve them through ranking, copying, export and restore. Re-saving a restored result must not generate a new ID or substitute the save/restore time for its completion time.

JSON contains a format version, a results array and a settings object. Provide a published JSON Schema and validate the complete document against its structural and semantic contracts, including real timestamp validity and every setting's allowed values; a superficial date-pattern check is insufficient.

SQLite contains `high_scores(id, score, timestamp)` and `settings(key, value)`, with exactly one uniquely keyed row for each of the six game settings and format versioning in database metadata. Validate database structure, version, row identities, types and values as well as cross-format semantics before loading.

Both formats preserve the same dataset and ordering information. Reject unsupported versions, malformed or incomplete content, invalid timestamps/scores/settings, duplicate result IDs, missing/duplicate/extra setting keys and more than ten results. Never partially import, silently invent missing values or truncate an invalid file to make it valid. An empty leaderboard with all six valid settings is a valid snapshot. Exact portable encoding and bounded input/resource handling belong to the detailed contracts.

## Restore behavior and retained gameplay

Validate and stage the entire selected file before changing leaderboard results, selected settings, cookies or URL parameters. A failure presents a clear accessible error and leaves those values unchanged. A successful Restore replaces the session leaderboard and applies every saved setting, explicitly updating all six corresponding cookies and URL parameters, even for default-valued or already-selected settings. Preserve unrelated URL parameters, fragment and existing history state; avoid adding a navigation-history entry.

Retain existing configuration timing: Ghost visibility and Next-piece preview apply immediately; Hard drop, Hold, general locking policy and hard-drop locking policy apply on the next Start/Restart. Restoring does not restart, resume or abandon the current game, change its active rules or submit it as a completed result. Existing pause/focus handling remains in force.

Continue ranking results by descending score. Preserve saved relative order for tied scores, preserving the current earlier-entry priority without reordering ties by ID or import time. Later genuine completions enter the restored leaderboard under existing top-ten rules, including ordinary and Hold top-out, zero scores and once-only recording. Start/Restart retains restored completed results.

## Lifetime and compatibility

Saving and restoring are manual. Restored results become the session leaderboard; they are not automatically restored after reload. Reload/new pages still start with an empty leaderboard while existing URL/cookie settings restoration continues. No automatic export, browser score storage, backend, cloud synchronization, player accounts, names, gameplay replay or unfinished-game serialization is added. Existing scoring, controls, penetrator bonuses and six setting domains are retained.

The current score-only result model must gain identity and completion metadata. The existing best-effort setting-edit adapter is not by itself sufficient for validated batch Restore; the design must provide the required staging and failure behavior and address browser persistence failures explicitly. Preserve browser-independent gameplay and ranking, keeping file/browser effects in host integration. SQLite support and its runtime assets must work from the delivered static distribution, including directory-prefix hosting, under the existing browser and dependency policies.

The visible leaderboard remains Rank/Score; exporting timestamps and IDs does not require extra visible columns. Save/Restore and errors must remain keyboard accessible and usable at the supported narrow widths.

## Governing context

Retained behavior is defined by [PROJECT](../../PROJECT.md), [session leaderboard](../../spec/leaderboard.md), [configuration](../../spec/session-configuration.md) and [browser persistence](../../spec/configuration-persistence.md). This feature adds manual portable files and result metadata to those guarantees.
