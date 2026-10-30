# Session-only configuration contracts

This child of [SPEC](../SPEC.md) owns S-01–S-08. It defines selected page values, active rules, policy selection, display concealment and native lifetime. [Modern rules](modern-rules.md) retain geometry/bag/progression; [ghost contracts](ghost-visibility.md) retain occupied-cell visibility. No storage or new platform is delivered.

## S-01 configuration values and memory contract

GameConfiguration has exactly these own fields:

| Field | Values | Initial default |
| --- | --- | --- |
| ghostVisibility | never / lower-half / always | always |
| nextPreviewEnabled | boolean | true |
| hardDropEnabled | boolean | true |
| holdEnabled | boolean | true |
| generalLockPolicy | failed-downward / gravity-interval | gravity-interval |
| hardDropLockPolicy | general / immediate | general |

C-07 createConfiguration() constructs defaults with no randomness/storage. getSnapshot() returns a detached flat copy. update(patch) accepts a non-null non-array object with any subset of these own fields, including an empty object. Unknown own string/symbol keys, invalid enum/boolean types, missing patch or other malformed input throw TypeError before mutation. Valid patches merge atomically, retain other fields and return a detached complete snapshot; an empty/equal patch is a no-op. Explicit refresh by composition/view projects the returned value; there are no game-observer notifications or autonomous settings broadcasts.

RuleOptions is the complete four-field projection hardDropEnabled/holdEnabled/generalLockPolicy/hardDropLockPolicy, copied without display fields. Selected values survive Start/Restart, pause/resume and game over. A retained context survives view/app remount; a new explicitly created context is independent. The page entry owns one context for that loaded app; reload constructs defaults. No localStorage/sessionStorage/cookie/URL/backend restoration, presets or cross-tab synchronization. Store updates cannot retain old views/listeners/frames.

Acceptance: detached reads/update results, partial/empty updates, complete-candidate rollback for mixed valid/invalid patches, all96 valid selected combinations, no RNG or storage access, same-context remount retention and independent contexts/reloaded page defaults.

## S-02 fixed active game rules and legacy API

Keep createSession callbacks/getSnapshot/advance/subscribe and actions. dispatch(action, options?) accepts options only on Start/Restart. Validate before status eligibility/effects, after unknown-action RangeError precedence. Accept exactly either (a) legacy {immediateHardDropLock:boolean}, or (b) complete RuleOptions with exactly its four correctly typed own fields. Reject arrays/null, unknown/symbol keys, mixed forms, partial/mistyped fields and options on other actions with TypeError. The legacy form selects hardDropEnabled=true,holdEnabled=true,generalLockPolicy=gravity-interval and its flag mapped to immediate/general. Omission preserves current active rules, initially S-01 defaults. Valid ineligible Start is unchanged.

Eligible Start/Restart copies selected rules into fresh game state. Snapshot.rules is a detached complete active-rule copy; Snapshot.options remains exactly {immediateHardDropLock: rules.hardDropLockPolicy===immediate}, including when hard drop is disabled and its retained policy is ignored. Other snapshot fields remain detached/compatible. A later config/caller/snapshot mutation cannot change active rules. The browser always passes the current selected rule projection on Start/Restart; omitted-options model calls do not read pending page configuration.

Pending rule edits cannot alter current status/piece/held state/stats/timers/eligibility or notify game observers. A failed new-game/refill transaction leaves all session fields/rules/queue/clocks unchanged; independent selected settings remain available for retry. Retain reentry, listener-failure isolation, unknown-action/duration/random errors and once-per-changed-operation notifications.

## S-03 general locking policies

For gravity-interval retain F-04 exactly: grounding starts one full current gravity interval independently of remainder; continuous support and blocked/O/rejected actions preserve it, leaving support cancels, relanding starts fresh. Blocked gravity/soft drop does not lock early. Pause freezes clocks; lock wins coincident deadlines; stop at first lock/game-over and discard excess elapsed.

For failed-downward keep no grounding countdown. Legal downward gravity/soft drop moves one row; soft drop scores1, gravity0. Ground contact itself does not lock. A blocked gravity or soft-drop attempt immediately performs the existing atomic lock/clear/progression/spawn; failed lateral/rotation/O actions do not lock. Gravity remainder advances modulo its interval and is not reset by moves/rotations/drop placement. Thus a landed piece may lock on the next gravity tick, even sooner than a full interval after landing. Pause freezes remainder; replacement/restart resets it. One advance still stops/discards excess at its first lock/game-over, with no cascading pieces. A new game captures its policy; there is no live timer conversion.

Acceptance: exact equality/sub-interval and late-remainder grounding under both policies, blocked soft drop, support escape, pause/resume, pre-clear level/gravity progression, one-lock excess-time rule and rollback on the resulting spawn/refill.

## S-04 hard-drop availability and policy

When active hardDropEnabled=false, hardDrop is an unchanged no-op: no move/score/lock/draw/timer/hold-eligibility/notification change. UI disables the button; board Space stays consumed without fallback or rotation. Ghost display is independent.

When enabled, use canonical landing and2 points per descended cell. immediate always atomically settles after placement, even zero distance, under either general policy. general plus gravity-interval retains the F-05 grounding/preserved-countdown behavior. general plus failed-downward only places and scores; it does not synthesize a failed downward attempt. The piece remains adjustable until a subsequent failed gravity/soft-drop attempt. Zero-distance general drops neither lock nor score nor reset gravity remainder; once-per-lock hold eligibility is unaffected. Lock/refill failures roll back drop score/board/queue/rules/timers.

Acceptance: all four general×hard-drop policy pairs at positive/zero distance, disabled mode invariants, exact additive clear score, existing grounded deadlines and remainder, hold after nonlocking drop, and atomic random failure.

## S-05 hold and preview availability

Active holdEnabled=false makes hold unchanged/no-op, canHold=false and the slot display Off; no draw/queue/score/board/timer changes. Enabled hold retains F-03 once-per-lock exchange, ordinary spawn reset/fresh clocks, occupied-swap next preservation, empty-slot next consumption and blocked replacement game-over. Start/restart resets held=null; canHold becomes enabled-and-legal, including after each lock. A pending Off edit cannot discard or disable the active game's held piece. Ready has no held piece and unavailable action; pending controls communicate the next game's rule.

nextPreviewEnabled is live display only. Off renders the Next slot Off with no type/miniature or accessible upcoming-type description; clear stale occupied miniature cells/type-bearing display attributes. On shows exactly the current canonical next or None before start. It never changes the bag/look-ahead, RNG consumption, actual spawn/hold order or Snapshot.next. No second public preview is added.

Acceptance: enabled/disabled hold before/after lock/pause and both lock policies, pending versus active eligibility, both hold exchanges/blocked spawn/refill failure, preview conceal/reveal while paused and across next consumption, and unchanged bag order/draw count under display edits.

## S-06 ghost display

Extend GhostVisibilityMode with never while retaining always/lower-half and re-exporting the type at its existing helper boundary. Null ghost never renders. always displays non-null canonical ghost; never hides it; lower-half displays exactly when max occupied projected y>=10. Bottom index9 hides,10 shows; straddling visible and empty matrix padding ignored. Retain one predicate for cells/described text, active/settled precedence and frozen paused canonical projection. always-hidden description is Ghost hidden; conditional suppression remains Ghost hidden above the midline; neither reveals landing row/type. Visible/null descriptions retain G-03 behavior. Snapshot.ghost and hard-drop landing remain canonical even with never/hard drop Off.

Ghost and preview changes apply immediately from panel edits or explicit settings refresh without session dispatch/notification, consuming neither time nor random values. Test all6 display combinations, all28 shape/orientation boundaries, always-hidden at both halves/null, actual movement/kick/hold/replacement crossings and snapshot immutability.

## S-07 panel, pending state and native lifecycle

One nonmodal Settings panel supplies the six labeled native controls in the order ghost visibility, hard drop, next preview, hard-drop locking, general locking, hold. Visible ghost labels Always hide / Hide above midline / Always show map to never/lower-half/always. Rule controls are clearly labeled for next game; show current active rule values and whether selected next-game rules differ. Play-button enablement/hold slot use active rules, not pending values; status eligibility remains. Changing pending hardDropEnabled=false disables its pending hard-drop policy selector but retains its value for reenablement. This cannot disable current game actions prematurely. All other settings remain editable in every status; display controls always live.

Use one selected-context owner and one unified panel. Retain semantic native game buttons, legends and board bindings; only board focus dispatches shortcuts. Native settings arrows/Space/Enter/letters/modifiers never cause gameplay, restart or double-dispatch. Internal focus does not pause/resume; external focus/visibility still pauses and needs explicit resume. Edits do not steal focus. Full panel/status/actions usable at320 CSS pixels without horizontal page overflow; vertical scrolling allowed, focus visible. Destroy removes all owned listeners/DOM; remount with the same context retains values and a fresh game, while omitted context creates an independent fresh app.

Retain the current view board/render/destroy and legacy construction arguments; new optional configuration binding/refresh supports upgraded composition. Legacy immediate-policy callback remains a boolean projection for old consumers; new page composition uses only one shared selected-context source, never a competing pending-options copy.

Acceptance: visible current/pending distinction before/after Restart, disabled pending-policy retention, live display while paused, native key/pointer/focus cases, context retention/new-context/reload/two-page isolation, no storage writes and repeated teardown with runtime guards. Native OS-window focus unavailable on the host remains separately unverified, not inferred from synthetic handlers.

## S-08 delivery and compatibility acceptance

Preserve default v1.2.0 gameplay, canonical geometry/bag/score, pure application boundaries and legacy input forms; configurable availability and general locking are defined by S-02–S-07. Test the16 active rule combinations at model level and representative assembled combinations across both general policies, hard-drop overrides, disabled actions and all6 display combinations; do not multiply every visual choice into redundant clock tests. Verify invalid input and rollback separately from normal command rejection.

Deliver browser1.3.0 static assets/docs/manifest/checksum with relative prefix hosting, strict allowlisting, credential/fixture/development exclusion and reproducible bytes. Source/built/extracted apps in isolated managed Chromium/Firefox exercise the actual six-control UI, selected-to-active transition, both locking policies, disabled key/button behavior and live hidden/revealed displays. Source-only fixtures supplement exact boundaries but never ship or replace shipped-app acceptance. Preserve prior tags/releases and explicit native/Electron limits. No settings persistence, new scoring/control mappings, presets or extra delivery platform is included.
