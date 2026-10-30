# Leaderboard component delta

Historical accepted campaign006 source/evidence. Current main documents own product contracts and executable tasks; this snapshot is not an active implementation owner.

The [accepted feature](FEATURE.md) and [architecture delta](FEATURE_ARCHITECTURE.md) extend the [main component model](../../DECOMPOSITION.md). C-01–C-03 and C-07–C-08 retain their responsibilities.

| Component | Responsibility and boundary | Verification seam |
| --- | --- | --- |
| C-09 pure ranking | Given detached existing results and a final score, return at most ten results sorted descending; equal-score insertion follows earlier entries. Own no mutable state or side effects. | Literal input/output, capacity, tie, zero, immutability and validation fixtures. |
| C-04 session/controller | Own history beside current-game state; clone it at transaction/snapshot boundaries. On committed running-to-game-over transition append final score through C-09 before notification. Preserve history on Start/Restart; fresh controller starts empty. | dispatch/advance traces for ordinary and Hold top-out, rollback, listener/reentry, restart, detachment and clocks/RNG. |
| C-05 shared view | Render rank/score and empty state from Snapshot.leaderboard. Never submit, rank or own results. Retain injected DOM ownership and existing control focus behavior. | Real-view fixture for zero/one/ten results, fresh/retained snapshots, narrow layout and no duplicated rows. |
| C-06 host | Own a controller per page mount by default; optionally accept a retained explicit Session as a fourth mountGame argument, preserving the existing first three arguments and cleanup return. Teardown removes resources without submitting or clearing an externally retained controller. | Explicit same-controller remount, fresh default mount isolation, reload/new-page isolation and one live resource set. |

## Data and collaboration

Add a detached ordered result list to public Snapshot; one result contains only its numeric score. Rank derives from array position, with no timestamp, name, ID or configuration metadata. Equal-score results remain separate even though their displayed scores match. C-04 internal state owns this list; C-09 is a pure calculation rather than a second store. Existing snapshot fixtures acquire an empty list or their intended result list.

C-04 computes candidate game state first. If the old state is running and the candidate is game-over, it computes candidate history from the final candidate score. Both become committed state before any subscriber sees them. Listener failures are isolated by the existing controller boundary; observer reentry remains rejected. Any operation failure before commit leaves game/history unchanged. Unchanged/repeated game-over calls neither append nor notify.

Start/Restart constructs fresh gameplay fields while copying history; failed new-game initialization preserves the entire prior committed state. An explicitly reused Session retains both its state and history, while a normal fresh page has a fresh controller. The browser host is responsible for not scheduling one explicit controller through multiple simultaneous mounts; sequential remount is supported. No global registry or new configuration context is needed.

C-05 renders the additional Snapshot field with the same normal render path, so score/status and leaderboard cannot disagree because of observer ordering. The display is noninteractive; completion adds no focus movement. C-06 supplies actual page lifetime without consulting browser storage. C-08 continues to persist only its established six selected fields.

Exact validation, transaction, rendering and lifetime acceptance belongs to the feature specification. Physical module placement belongs to layout; delivery and task ownership remain downstream.
