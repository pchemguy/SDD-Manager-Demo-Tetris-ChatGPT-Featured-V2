# Portable game snapshots

## JSON version 1

The JSON file has exactly `formatVersion: 1`, `results` and `settings`. The published structural schema is `schemas/game-save.schema.json`. Results contain zero through ten descending-score records, each with a unique lowercase UUIDv4 `id`, exact non-negative safe-integer `score` and canonical UTC completion `timestamp` such as `2026-10-30T01:02:03.004Z`. Equal-score records retain array order; saving/restoring never regenerates identity or time. All six canonical setting keys and their actual boolean/enum values are required.

The app validates the complete schema and semantic domains, including real dates, unique IDs, sorted scores and duplicate JSON member names, before applying any data. UTF-8 without a byte-order mark is required. Files are limited to 1 MiB. Unknown versions or missing/extra/invalid fields are rejected without partial loading. Original game progress is not included. Versioning of this file format is independent of the application version.

Restore also checks cookie/URL effects before publishing selected settings/history, and compensates recoverable failures. Browser/process failure which prevents compensation is explicitly reported as incomplete persistence rollback, never success. Ordinary setting edits retain their best-effort behavior.

SQLite support and its exact metadata/table details are added in the subsequent feature milestone; the current JSON workflow does not claim that capability.
