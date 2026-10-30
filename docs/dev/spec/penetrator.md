# Penetrator mode contracts

This focused child of [SPEC](../SPEC.md) owns P-01–P-08, extending ordinary R/F contracts and the unchanged six [configuration values](session-configuration.md). [Modern](modern-rules.md) and [ghost](ghost-visibility.md) guarantees remain except the explicit active-penetration/appearance/inventory changes below.

## P-01 placement and appearance values

Keep Board as the20×10 matrix of original Kind|null, Piece with existing type/rotation/x/y, and ordinary canPlace/move/landing/lock behavior. Snapshot adds penetratorActive:boolean, penetratorBonuses:integer0–3 and penetratorCells:Appearance, where Appearance is a20×10 boolean grid; true denotes a white settled cell and implies occupied Board at that coordinate. Ready has false/0/all-false mask, null active/ghost. Every snapshot/mask row is detached from retained state and other snapshots.

For typed canonical inputs penetratingLanding(board,piece) first requires all occupied cells of the candidate within x0–9/y0–19. It examines every integral origin y at or below candidate.y while occupied cells remain in bounds, without stopping at occupied barriers. Return a detached Piece at the greatest y for which ordinary canPlace is true, preserving x/type/rotation. Return null when the initial candidate is out of bounds or no valid position exists at/below it. Empty matrix padding is irrelevant. No input mutates. canTraverse(board,piece) is true exactly when this result is non-null. A valid starting placement is itself a possible landing; an overlapping candidate can be traversable.

Acceptance: independent fixtures for barriers with multiple disconnected legal pockets, no lower pocket, overlapping start with lower pocket, padded matrices/all seven shapes/four orientations, bounds and immutability. Contrast ordinary landing stopping at the first obstruction with penetrating landing choosing the deepest pocket.

## P-02 activation, inventory and lifetime

Add activatePenetrator to existing Action. Activation succeeds exactly in running status with an active ordinary piece and bank>0. Subtract one, set penetratorActive=true, set canHold=false and reevaluate grounding per P-03/P-04. Do not change shape/placement/score/board/mask/held/next/bag/gravity remainder or draw randomness. While already active, without a bonus or outside running/active eligibility, activation is an unchanged no-op with no notification or timer effect; there is no refund/cancellation action.

B/b on the board invokes this action once per nonrepeated keydown. Suppress handled board defaults; native editable controls never activate. Hold is unchanged/no-op throughout penetration, even if enabled or previously eligible; its button is disabled and existing held type retained. Existing Hold behavior applies outside penetration. Lock ends the mode; the replacement is ordinary, with canHold equal to legal-spawn-and-active-holdEnabled. Start/Restart reset bank/mode/mask; selected page settings remain. Reload/fresh session starts zero; pause/resume retains inventory/mode and freezes clocks. Game over retains final bank/mask but has false active mode, null active/ghost and no activation. Blocked ordinary spawning still ends the game without automatic bonus use.

Acceptance: actual earned bonus followed by first activation, repeated/ineligible/no-bonus cases, activation after ordinary Hold, held-slot preservation and keyboard/button inhibition, all statuses and reset/remount/reload. No free test bonus or production injection interface.

## P-03 traversal, rotation and grounding

An active penetrator's left/right/soft-drop/gravity candidate must satisfy canTraverse. Such a candidate may overlap settled cells; the Board/mask never change during passage. A rejected lateral/rotation candidate retains placement, gravity remainder and supported lock deadline. Blocked downward attempts follow the active locking policy in P-04. Downward movement is one origin row per attempt, with ordinary soft-drop1/gravity0 points. There is no upward translation command or automatic upward rescue. The existing rotation kicks may include their specified upward offsets; every candidate still obeys bounds and reachable-landing checks. No out-of-board occupied cell is allowed.

tryRotate(board,piece,direction,acceptsCandidate?) retains the default three-argument behavior and exact ordered F-01 kick offsets. Optional pure predicate signature is (board:Board,candidate:Piece)=>boolean, default canPlace. Penetrator rotation supplies canTraverse and chooses the first accepted offset relative to the original origin. O remains an unchanged copy/no-op; invalid direction retains RangeError-before-effects. Do not duplicate tables or use a later candidate when an earlier one is accepted.

A penetrator is grounded exactly when penetratingLanding is at its current y. It is then an ordinary legal final placement. Any overlapping transit state has a strictly lower valid landing and is airborne. Thus a failed penetrating down attempt happens only at a legal grounded placement. Movement/rotation rejection cannot lock, spend bonuses or reset clocks. Support escape/relanding uses penetrating grounding rather than immediate occupied-cell collision.

Acceptance: legal passage without destruction, rejected sealed-pocket moves/rotations, wall/floor/ceiling and ordered I/standard kicks, O, both directions, occupied transit versus valid grounding and changed ghost after actual movement/rotation. Underlying ordinary/white settled content remains identical until lock.

## P-04 timing, hard drop and canonical ghost

Use the active game's general/hard-drop rules. Interval policy starts a full current gravity interval when penetration becomes grounded, preserves it during continuous support/rejections/O/zero-distance general drops, cancels on support escape and grants a fresh full interval on relanding. Failed-downward policy has no lock countdown; a blocked actual gravity/soft-drop attempt settles. Gravity remainder is preserved by activation/movement/rotation/nonlocking drop. Pause freezes clocks; interval lock wins tied deadlines, and advance still stops/discards excess at the first lock/game-over.

Activation itself does not move down or reset time. If it opens a lower landing, the current piece becomes airborne and its old grounding countdown is canceled. If the landing remains current, preserve the countdown exactly. No full-interval reset is granted solely by spending a bonus.

Enabled hard drop uses penetratingLanding directly and awards2*(landing.y-current.y), counting all descended rows including occupied transit. Immediate policy settles after placement even at zero distance. General+interval starts/preserves the grounding countdown; general+failed-downward only places/scores and waits for a subsequent actual failed downward attempt. Repeated zero-distance general drops do not lock/score/reset. Disabled hard drop remains an unchanged consumed-Space/no-op under S-04. Hold remains inhibited until lock even during delayed adjustment.

Snapshot.ghost always uses the same canonical penetrating landing while active, including when ghost visibility is never or hard drop is Off. Render visibility uses its lowest occupied landing cell under existing always/lower-half/never semantics and paused live refresh; conditional threshold remains bottomY>=10. Display edits consume neither time, bonus nor RNG and never change landing. Actual hard-drop coordinates and visible ghost coordinates must agree.

Acceptance: both general×hard-drop policy pairs at positive/zero distance, disabled hard drop, late gravity remainder, activation with/without a lower landing, continuous support/escape/reland, pause, equality/ties/one-lock excess and hidden drop. Independently calculate positions/times rather than using the helper as its own oracle.

## P-05 valid lock, white metadata and awards

Lock only a final ordinary-legal placement. lockWithAppearance(board,piece,penetratorCells,penetratorActive) accepts valid canonical board/mask values and returns detached board/cleared/penetratorCells. Illegal final placement throws RangeError before mutation, matching ordinary lock. Mark the four newly locked cells with the active mode; retain existing mask entries. Compact occupancy and mask using the same full-row decision after placement. Retained rows keep order and corresponding flags, newly inserted top rows are empty/all-false, removed cells lose flags. Legacy lock returns exactly board/cleared and shares the compaction rule; existing input/output defaults do not change.

If and only if exactly four rows clear in one lock, bank becomes min(3,bank+1); otherwise unchanged. Ordinary and penetrator locks both qualify. No award for cumulative separate clears, soft/hard-drop distance or merely passing through occupied rows; no other scoring change. A bonus spent at an earlier activation remains spent; a four-line penetrator lock may earn one replacement bonus. Four-line awards at cap discard overflow.

Placement/appearance/compaction/classic score+level/award/bag draw/spawn/status/clocks form one transaction. Failed refill leaves every field, including mask, bank, mode and pre-action score/clocks, unchanged and emits no notification. A successful final lock retains its earned award/white cells even if the ordinary replacement spawn is blocked and game over follows. White settled cells are ordinary obstacles for unactivated pieces, not permanent tunnels.

Acceptance: zero through four clears, bank0→1/2→3/3→3, spend then earn, ordinary/penetrator awards, retained-white/nonwhite mixed rows and row shifts, no flag on empty cells, blocked replacement and failures at every relevant refill boundary. Keep geometry/score independently asserted.

## P-06 presentation and native interaction

Render all occupied pixels of the active penetrator white, visible ghost with white outline/pattern, and settled true-mask cells white until clear. Keep original logical shape values. Ordinary active/settled cells and miniature fills/borders have no white; replace the existing white-tinted ordinary-cell border. Interface text may remain its current light color. Active cells take display precedence over settled data during overlap; moving away reveals the unchanged original settled color/flag. Clear stale white/ghost flags on every render, including reset/mode end, and retain the common visibility decision for ghost cells/description. Hidden descriptions reveal no landing row/type under S-06.

In the existing Game information/controls panel render exactly one visible bolt per available bonus, with an accessible numeric count0–3 even at zero. Update from each committed snapshot, including earned/spent/capped/paused/game-over/reset states. Expose an accessible active-mode indication independent of color. Hold-unavailable text distinguishes active penetration while preserving held type. Avoid repeating mode/count announcements on unchanged gravity frames. No activation button or seventh setting.

Only board focus handles B. Native settings input must not spend a bonus, pause/resume/restart or move a piece. Preserve existing controls, single-action repeat handling, external auto-pause, explicit resume, internal focus, teardown, context/remount isolation and320px no-horizontal-overflow layout. Screen-reader count and mode labels supplement the visual symbols/white styling.

Acceptance: pure shared-view mixed normal/white/transit/null/paused snapshots and immutability, stale attribute clearing, active/settled/ghost precedence, bonus0–3 exact symbols/accessible count and live updates, held type, real native B/repeat/focus in Chromium/Firefox,320px/ordinary screenshots and no runtime/console errors through teardown.

## P-07 API compatibility and failures

Keep createSession/random/onListenerError/getSnapshot/dispatch/advance/subscribe contracts, existing Snapshot fields and exact options/rules forms. Add only the action and three P-01 snapshot fields; clone new rows in transactions and reads. Display uses no live retained references. Core functions are deterministic over valid typed canonical inputs; no new public arbitrary-board/mask import format or validation API is promised.

Unknown actions retain RangeError precedence; options on activatePenetrator are rejected with TypeError before eligibility/effects, following S-02. Keep malformed options/durations/random errors, throwing refill, reentry rejection, idempotent unsubscribe and listener-error isolation. Changed operations notify once after full commit, unchanged/no-bonus/repeated activation/Hold inhibition notify zero times. No callback failure can leave a partial board, mask, inventory or mode.

Acceptance: detached new fields, complete old input/error/observer regression, once/zero notification cases, invalid activate options in ready/paused/running, random consumption unchanged by activation/display edits and atomic lock/refill rollback. Preserve DOM-free imports/compiler checks and no persistence.

## P-08 assembled delivery acceptance

Deliver browser1.4.0 with updated controls/install/developer notes, strict static ZIP/manifest/checksum, relative prefix hosting, reproducible bytes and credential/fixture/development exclusions. Current C-07 values/defaults and all16 active-rule/6 display combinations remain supported; select representative penetrating cases across these rather than redundant Cartesian clock tests.

Managed Chromium/Firefox source, built and extracted-prefix apps must earn at least one bonus through an actual four-line clear, activate via B and demonstrate shared ghost/drop geometry, white transit/settled rendering, indicator spending/earning/cap, Hold inhibition, selected-policy behavior, reset and settings/focus/repeat isolation. Use a deterministic legal gameplay trace, with no production bonus/board setter or debug activation. Source-only fixtures supplement exact geometry/presentation boundaries but never replace shipped-app acceptance or ship.

Keep classic/modern/configuration suites and package checks, independent milestone/phase code reviews separate from tests, current-document incorporation/QC/task ownership/archive and exact-source release/readback gates. Native headed OS focus remains a reported verification limit; Windows Electron is future scope. No unresolved product decision blocks these contracts.
