# Portable game snapshots

## JSON version 1

The JSON file has exactly `formatVersion: 1`, `results` and `settings`. The published structural schema is `schemas/game-save.schema.json`. Results contain zero through ten descending-score records, each with a unique lowercase UUIDv4 `id`, exact non-negative safe-integer `score` and canonical UTC completion `timestamp` such as `2026-10-30T01:02:03.004Z`. Equal-score records retain array order; saving/restoring never regenerates identity or time. All six canonical setting keys and their actual boolean/enum values are required.

The app validates the complete schema and semantic domains, including real dates, unique IDs, sorted scores and duplicate JSON member names, before applying any data. UTF-8 without a byte-order mark is required. Files are limited to 1 MiB. Unknown versions or missing/extra/invalid fields are rejected without partial loading. Original game progress is not included. Versioning of this file format is independent of the application version.

Restore also checks cookie/URL effects before publishing selected settings/history, and compensates recoverable failures. Browser/process failure which prevents compensation is explicitly reported as incomplete persistence rollback, never success. Ordinary setting edits retain their best-effort behavior.

Both formats carry the same validated dataset; Restore detects content independently of the filename. Saving and restoring are manual actions.

## SQLite codec version 1

The SQLite database has `PRAGMA application_id=0x54455452` (TETR) and `PRAGMA user_version=1`, with ordinary rowid tables `high_scores(id TEXT NOT NULL PRIMARY KEY, score INTEGER NOT NULL, timestamp TEXT NOT NULL)` and `settings(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL)`. Exported score constraints enforce the exact safe-integer domain. The six settings are stored as canonical text, including lowercase `true`/`false` for booleans. No extra format-version settings row is added.

High-score rows are inserted and read in explicit ascending rowid order, preserving JSON array order for ties without changing stable IDs or timestamps. Unexpected schema objects, defaults/generated columns, foreign dependencies, metadata, storage classes or invalid values are rejected. SQLite constraints are not trusted as proof of valid row values. The worker does not execute SQL supplied in the file or use persistent browser storage. The native Save choice offers both formats. SQLite is initialized lazily inside a temporary worker, with local WASM and no network service. Initialization failure reports an error and leaves JSON and gameplay usable.
