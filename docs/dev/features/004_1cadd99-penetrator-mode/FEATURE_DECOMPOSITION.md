# Penetrator components and collaboration

Historical accepted campaign source. Non-executable; current authority [SPEC](../../SPEC.md)/[penetrator contracts](../../spec/penetrator.md), sole task owner [TASKS](../../TASKS.md). Recorded review identities are historical.

[FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) defines the delta to [C-01–C-07](../../DECOMPOSITION.md). Preserve unchanged component identities and direction; no new platform/configuration component is needed.

## C-02 placement, landing and coupled compaction

A pure penetrating-placement unit provides penetratingLanding(board,piece): Piece|null and canTraverse(board,piece):boolean over typed canonical inputs. It preserves x/orientation, requires all occupied cells in bounds, searches downward including beyond blocked rows, and returns the deepest non-overlapping placement or null. canTraverse accepts exactly the in-bounds candidates with such a landing. Ordinary canPlace/move/landing remain unchanged.

The existing ordered kick operation gains an optional candidate predicate, defaulting to ordinary canPlace. Session penetration uses canTraverse for each ordered offset, avoiding duplicate kick tables. Direction validation and O no-op remain. C-01 geometry and seven shapes are unchanged.

Board locking exposes an additional appearance-aware operation, lockWithAppearance(board,piece,penetratorCells,penetratorActive). It validates final ordinary placement and returns board/cleared/penetratorCells using one shared compaction calculation. Ordinary lock retains exactly its existing board/cleared result. A board-sized boolean Appearance type and empty factory support detached snapshots. Do not add a new logical board-cell kind; white metadata is independent of occupancy and follows the same row permutation.

## C-04 ability, bank and transaction

Add activatePenetrator to Action. State and detached Snapshot add penetratorActive:boolean, penetratorBonuses:integer0–3 and penetratorCells:Appearance. Keep existing Board/Piece/next/held/options/rules shapes and session construction methods. Snapshot copying includes independent mask rows; getSnapshot chooses the canonical ordinary or penetrating ghost from current mode.

The controller selects traversal/rotation/downward/landing/grounding semantics and applies existing active-rule availability. Activation atomically spends one bonus, sets mode and canHold=false, and reevaluates support. Lock invokes C-02 once, updates classic progression plus min(3,bank+one-if-four-cleared), resets active mode for the ordinary next piece and initializes its timers/Hold eligibility. No random draw on activation. No subscriber sees partial overlay, award, board compaction or replacement state.

All candidate cloning/validation, refill rollback, listener-error isolation and reentry behavior encompass the new fields. Start/Restart resets mask/mode/bank; pause and game-over preserve final inventory/settled appearance. No current-game ability enters C-07 selected configuration.

## C-05 controlled rendering

Render original shape colors for ordinary occupied cells and white for active penetration/true settled-mask entries. Active cells overlay settled cells during transit without modifying their board or mask data. Shared ghost cells/text use the canonical projection and existing selected visibility predicate; white ghost appearance derives from active mode. Render an accessible active-mode description and bonus count, with exactly one visible bolt per available bonus in game information. Hold eligibility follows canHold; mode-specific unavailable text explains inhibition without hiding the ordinary held type.

C-05 owns no movement, reward, timer or cell-clear rule. Existing board/render/destroy/configuration refresh and legacy callback construction remain usable; no duplicate settings owner or extra action button.

## C-06 browser input and lifetime

B on the board maps to activatePenetrator with the existing single-action repeat suppression. Native settings B input does not activate; paused/ready/game-over commands remain model-gated. Preserve focus return, frame baseline/clamp, external pause and owned listener cleanup. Page reload constructs a fresh ready session and zero inventory.

## Verification interfaces

Core fixtures compute independent legal-pocket, boundary/kick and row-mask examples. Session tests use deterministic gameplay that actually earns a four-line award before activation; pure core/view fixtures supplement difficult boundaries. Do not expose a production bonus/board injection API or test hotkey. Actual built/extracted browsers must demonstrate earned bonuses, B activation, Hold inhibition, white transit/settled cells, matching ghost/drop and unchanged settings. Exact input/clock/appearance/error acceptance belongs to FEATURE-SPEC.
