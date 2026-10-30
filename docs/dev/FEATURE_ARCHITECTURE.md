# Penetrator architecture

## Scope and retained boundaries

[FEATURE](FEATURE.md) adds penetrator passage, bonus inventory and white piece appearance to the [current architecture](ARCHITECTURE.md). Retain the deterministic core → session → shared view/browser composition direction. No scheduler, storage, RNG or DOM enters the core/configuration boundary. C-07 selected settings remain unchanged; penetration is current-game state, not a seventh setting.

## Rule state and appearance

Keep logical shapes and Board occupancy as I/J/L/O/S/T/Z or null. Represent active penetration as a session boolean, separate from piece geometry. Represent white settled cells as a detached board-sized boolean appearance mask owned transactionally alongside the board. True entries require occupied board cells; ordinary cells remain false. This preserves existing board consumers and seven-bag/held/Next identities without inventing an eighth tetromino or changing collision occupancy.

The board-rule boundary owns validated locking and one shared row-compaction decision for occupancy and appearance. Both grids use the same removed/retained row identities. Legacy board APIs retain their existing default behavior and return shapes; an additional appearance-aware boundary may share their internal compaction. The view must not infer historical penetration from shape, color or current mode.

## Penetrating placement and projection

Core rules provide a pure penetrating landing search that checks every downward candidate, including beyond obstructions, for the greatest legal final origin. Temporary placement may overlap occupied cells but all occupied coordinates stay in bounds and a valid landing must exist at or below that candidate. One predicate gates movement and ordered rotation candidates. Preserve ordinary landing, ordered SRS offsets and strict visible-board bounds.

The session uses that same penetrating result for grounding, hard drop and canonical ghost. It alone chooses ordinary versus penetrating rules. No UI collision approximation, independent ghost search or board mutation during passage is permitted. A penetrator at its lowest valid landing is grounded; every overlapping transit state has a reachable valid final position.

## Transactions, bonuses and clocks

C-04 owns bank0–3, active penetration, settled appearance, existing piece/bag/hold state and clocks. Activation spends once, suppresses Hold and reevaluates grounding without resetting supported delay. A lock atomically writes valid cells/appearance, compacts both grids, updates classic scores and the capped four-line award, draws/spawns an ordinary piece and establishes its clocks. Refill/validation failure rolls back the entire candidate, including the new fields; external RNG callback effects remain outside rollback.

Both selected general policies and hard-drop overrides remain in force. Clocks consume semantic time only; pause freezes all game state. Start/Restart clears the inventory, active mode and appearance. Existing error/observer/reentry contracts apply, with unchanged commands producing no notification.

## Presentation and host

C-05 renders snapshots: active white piece over unchanged settled cells, white ghost outline/pattern when visible, white mask on settled cells and one bolt per available bonus with an accessible count. Regular-piece fill/borders contain no white; existing seven nonwhite shape colors remain. Color is supplemented by an accessible active-mode description and bonus count. The occupied-cell midline predicate still decides ghost visibility from the canonical projection.

C-06 adds one nonrepeating board-focused B binding to a semantic activation action. It retains frame ownership, native settings shortcut exclusion, external auto-pause and teardown. No extra action button, persisted field, host adapter or delivery platform is added.

## Verification seams

Pure fixtures isolate separated legal landing pockets, bounds, candidate reachability, kick ordering and coupled row compaction. Session fixtures cover earned/spent/capped bonuses, overlapping transit, both clock/drop policy paths, Hold inhibition, reset/top-out/rollback and detached snapshots. Shared-view fixtures verify all appearance/visibility combinations; actual source/built/extracted managed browsers must earn bonuses through gameplay and activate via B without debug hooks in production. Exact contracts belong to FEATURE-SPEC; physical ownership and delivery belong to FEATURE-PLAN.
