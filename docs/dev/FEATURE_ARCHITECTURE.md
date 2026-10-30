# Leaderboard architecture

## Scope and retained boundaries

The accepted [feature](FEATURE.md) adds page-lifetime top-ten completed scores to the [existing architecture](ARCHITECTURE.md). Core gameplay, C-07 selected configuration, C-08 browser persistence and their dependencies retain their current responsibilities. There is no score backend or storage adapter.

## State and dependency direction

C-04 owns both current game state and bounded completed-game history in the same transactional controller. History belongs to the controller lifetime, while Start/Restart resets only current-game fields. A pure ranking helper, C-09, calculates a detached capped history from explicit scores. It has no mutable store, DOM, clock, RNG or platform dependency.

The transaction boundary detects a successful running-to-Game Over transition, records the final candidate score once and commits game/history together before notifying observers. It covers both lock/spawn and Hold/spawn endings. Invalid input or random-source failure must not leave partial history. Observer exceptions cannot prevent completion recording or duplicate the result.

C-05 renders history from the same detached Snapshot as score/status; it has no submission observer or second history authority. Browser C-06 mounts a fresh controller for a fresh page. An optional explicit controller may be reused across intentional remounts; default mounts stay independent. Teardown releases resources without submitting an abandoned game or mutating a retained controller.

## Rationale and invariants

Putting history in C-04 avoids a UI observer race and makes rollback/once-only recording testable without browsers. A separate mutable score store would add cross-authority commit ordering without a persistence requirement. DOM-only history would lose portability and make rerenders responsible for gameplay completion. A pure C-09 helper isolates ranking/capacity rules without another lifecycle.

History never participates in collision, RNG, scoring, active rules or frame duration. UI remains a snapshot consumer. The host imports shared application code; application/core/UI must not import platform modules. No generic event bus, global singleton or seventh setting is introduced. Default API arguments remain compatible; snapshot consumers gain one detached history field. Existing literal snapshot fixtures must supply the field.

Component collaboration and exact contracts remain with the downstream decomposition and specification owners.
