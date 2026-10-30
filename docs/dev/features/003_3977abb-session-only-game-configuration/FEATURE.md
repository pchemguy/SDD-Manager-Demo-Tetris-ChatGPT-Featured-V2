# Session-only game configuration

Historical accepted campaign snapshot. Non-executable; current product authority is [SPEC](../../SPEC.md), [configuration](../../spec/session-configuration.md) and sole task owner [TASKS](../../TASKS.md). Recorded source identities/reviews are historical.

## Intended outcome

Give players one settings panel for display preferences and gameplay options in the current loaded browser page. Values remain in page-session memory and reset to sensible initial defaults on reload. Replace the existing separate ghost selector and immediate-hard-drop checkbox with the unified controls, retaining their useful behavior within the expanded configuration.

Build on the current [game](../../PROJECT.md), [system contracts](../../SPEC.md), [modern rules](../../spec/modern-rules.md) and [conditional ghost](../../spec/ghost-visibility.md). This feature intentionally extends the supported ghost modes and settings, adds hard-drop/hold/preview enablement, and makes the general locking policy selectable. Other game rules remain unchanged.

## Controls and initial defaults

| Control | Supported choices | Initial default |
| --- | --- | --- |
| Ghost-piece visibility | Always hide; Hide above midline; Always show | Always show |
| Hard drop | Off; On | On |
| Next-piece preview | Off; On | On |
| Hard-drop locking policy | Follow general locking policy; Lock immediately | Follow general locking policy |
| General locking policy | Lock on failed downward attempt; Full gravity interval after grounding | Full gravity interval after grounding |
| Hold piece | Off; On | On |

These defaults preserve v1.2.0 play. Conditional ghost visibility retains the occupied-cell boundary: hide the entire projection when its lowest occupied landing cell is in rows 1–10; show it in rows 11–20, including projections straddling the midline. Empty rotation-matrix padding and the active piece's current height do not change that boundary. Always hide suppresses projection cells and landing-row description at every height. Canonical landing remains available independently of visibility and hard-drop enablement.

## Application timing

Ghost visibility and next-preview visibility are display preferences and apply immediately, including while paused. Hard-drop enablement, hold enablement and both locking policies are gameplay rules: edit them for the next game and copy them on Start/Restart. Clearly distinguish pending selections from the rules of the active game. Pending edits do not change the current piece, held piece, enablement or lock countdown mid-game.

Keep all selected values through ordinary panel interaction, Start/Restart, pause/resume and game over in the current loaded page. Reload creates defaults; pages/tabs are independent. Do not use localStorage, sessionStorage, cookies, URL state or a backend to restore preferences across reloads. This campaign includes no persisted profiles, presets, import/export or cross-tab synchronization.

Use one nonmodal panel with labeled native controls, visible focus and usable layout from 320 CSS pixels. Internal panel focus/interaction must not dispatch gameplay keys, restart, auto-pause or auto-resume; existing manual Pause/Resume and external-focus/visibility auto-pause remain. The panel may be configured in ready, running, paused and game-over states. Existing movement, rotation and lifecycle key bindings remain.

## Locking and feature interactions

Under failed-downward locking, ground contact alone does not lock. A blocked gravity or soft-drop attempt locks atomically; horizontal moves and rotations do not. Under full-interval locking, preserve the existing independent countdown: one complete current gravity interval from becoming grounded, continuous-support actions preserve it, leaving support cancels it, relanding starts a full interval, and pause freezes it.

Hard-drop interpretation: Follow general moves to the canonical landing. With full-interval general locking, retain the existing landing countdown behavior. With failed-downward general locking, placement itself is not a synthetic failed attempt: the piece remains adjustable until the next failed gravity or soft-drop attempt. Lock immediately overrides either general policy and locks after placement, including zero-distance hard drops.

When hard drop is Off for the active game, its button is disabled and its command/Space shortcut is a no-op: no movement, score, lock, randomness or fallback action. Disable the pending hard-drop locking control while pending hard drop is Off, retaining its selected policy so re-enabling restores the choice. Ghost visibility remains independent of hard-drop availability.

When hold is Off for the active game, disable its button/command/shortcuts and mark the hold slot Off. It cannot consume a piece or change the bag/queue. When On, retain once-per-lock eligibility and existing empty/occupied swap and blocked-spawn rules. Start/Restart resets the held slot as usual.

Preview Off immediately conceals the next type and miniature, including accessible descriptions. It does not alter the canonical next value, seven-bag order, hold consumption, spawn or random draws. Re-enabling displays the actual current next piece. Display changes do not mutate the session snapshot or notify gameplay observers.

## Retained scope and compatibility

Preserve the 10×20 visible board, strict ceiling, seven-bag, both-direction kicks, canonical landing, classic score/level/gravity formulas, atomic lock/clear/spawn, one-lock-per-advance behavior, snapshot isolation, listener/validation/error guarantees and owned browser teardown. Disabling a gameplay feature must be enforced in application logic as well as reflected by the UI. Keep configuration/rules and shared UI reusable, with browser-specific integration separate. Define configuration API evolution and validation explicitly in the downstream specification, preserving unaffected callers and guarantees.

Target an additive browser v1.3.0 release after complete verified phase integration. Retain prior release tags/assets. Verification must exercise all supported setting interactions, especially both general policies with each hard-drop policy, disabled command invariants, live display versus next-game rule timing, restart/reload and native-control focus; use deterministic model tests and actual source/built/extracted Chromium/Firefox delivery checks. Retain static-package integrity/exclusion requirements and truthful native-environment limits. Electron delivery, additional rule/scoring features and persistence across reloads are outside this campaign.
