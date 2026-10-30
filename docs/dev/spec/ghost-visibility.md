# Conditional ghost visibility contracts

This focused child of [SPEC](../SPEC.md) owns G-01–G-05, extending R-07/R-10/R-12 and [modern F-06](modern-rules.md) presentation. [S-01–S-08](session-configuration.md) owns the shared selected context, three modes, live preview and active gameplay choices. [P-04/P-06](penetrator.md) select penetrating canonical landing and white styling while active. Ghost display never changes canonical projection, piece order or gameplay clocks.

## G-01 Occupied-cell visibility predicate

GhostVisibilityMode is defined in C-07 and re-exported at the existing UI helper boundary: never | lower-half | always. never suppresses every non-null ghost. For a non-null canonical ghost, always permits display. For lower-half, let bottomY be the maximum y of its four occupied cells computed by existing geometry, in zero-based coordinates. Display exactly when bottomY >= 10; hide when bottomY < 10. Null ghost is never displayed. The board remains10×20 with midline between indices9 and10. A projection with bottomY9 hides; bottomY10 shows, including any projection straddling that boundary. Matrix origin/empty padding, active-piece height, ghost overlap and score/level do not alter the predicate. This helper receives valid typed canonical inputs and introduces no new integration-error API.

When hidden, every playfield cell has data-ghost=false; remove previous projection flags, never retain stale cells or clip a subset. When visible, use existing patterned ghost styling; active and settled cells take precedence exactly as before. Ghost visibility never changes settled/active data, landing coordinates, hard-drop distance/scoring or gravity/grounding clocks. Keep Snapshot.ghost detached and available even when hidden.

Acceptance: pure independently calculated fixtures cover all seven types/four orientations at bottomY9 and10, padded matrices, null, never and always cases, plus immutable inputs. Compare occupied coordinates, not helper-derived expected values. Verify active piece high with lower landing visible, and high stack with upper landing hidden.

## G-02 Dynamic selection and lifetime

Render one labeled native select named Ghost visibility, inside the single Settings panel, with Always hide / Hide above midline / Always show (never/lower-half/always). A fresh context defaults to Always show; an explicit retained context supplies its existing value. Selection changes immediately rerender the latest delivered snapshot; they require no gameplay dispatch, frame advance or new snapshot notification. Changing to the already-selected mode has no gameplay effect. A mode edit does not consume RNG, change session status/options/stats or notify session observers.

Recompute on each render after activation, horizontal/vertical movement, either rotation/kick, hold, hard drop and lock/spawn. Hidden→visible and visible→hidden are symmetric; no delay, hysteresis, fade or visibility latch. Switching to Always show restores any non-null suppressed ghost immediately. The current mode survives Start/Restart, Pause/Resume and game over within the same mounted view. Ready/game-over null ghost has no projection. Paused retains the frozen canonical projection; its mode may still change and affect display immediately. A fresh pure/omitted context creates Always show; browser reload restores the selected mode under [U-01–U-06](configuration-persistence.md), and explicit same-context remount retains selection. Destroy removes owned listeners/DOM without erasing the context. C-08 owns browser cookie/URL restoration; there is no localStorage/sessionStorage/backend or live cross-tab synchronization. Gameplay choices remain independent under S-02/S-07.

Acceptance: transitions across the midline in both directions, lateral move off/onto a high stack, both-direction rotation/hold/replacement changes, frozen paused selection edits, restart retaining mode and browser reload restoring it and pure fresh-context defaulting and explicit same-context remount retaining it. Render another snapshot without changing selection. Independent contexts do not share preferences/listeners; an explicit shared context requires refreshConfiguration on each view after external updates, with no autonomous broadcast.

## G-03 Accessible description and native interaction

Keep the selector enabled in ready/running/paused/game-over and labeled without relying on hover. For a hidden non-null ghost, described-by text says Ghost hidden in never mode and Ghost hidden above the midline under conditional suppression, revealing no type or landing row. For visible non-null ghost, preserve the current Ghost [type] lands on row [one-based bottom row] description. For null ghost retain No active piece. Cell projection flags and description use the same decision; avoid a second live-region announcement for each movement.

Native select keyboard/pointer changes retain select focus. Only the board handles gameplay shortcuts: arrow, Space, Enter, R, B, X/Z/C/Shift on select must not dispatch game actions. Internal focus changes do not auto-pause; external blur/hidden handling still pauses. Ghost selection adds no shortcut; the independent B activation binding belongs to P-06. Selector and all existing controls fit320 CSS pixels without horizontal page overflow and retain visible focus. Destroy detaches its listener and only owned nodes; repeated mounts have one control/handler each.

Acceptance: actual native keyboard selection in Chromium/Firefox, no duplicate drop/rotation/restart/pause dispatch, focus persistence, external auto-pause and explicit resume, narrow/ordinary screenshots, accurate description and remount disposal with console/runtime guards through teardown.

## G-04 Rule and API compatibility

Ordinary geometry/bag/landing/scoring and frame baseline and observer/validation/rollback guarantees remain; S-02–S-05 owns configurable hold/drop availability and both general/hard-drop policy semantics. UI preference changes must not mutate the supplied snapshot or make its canonical ghost null. Lower-half mode affects only display. Verify hard drop to the same canonical location while projection is hidden, and use full rule/session regression to protect independent grounding timing. Keep DOM/global access out of core/session; no duplication of landing/collision logic.

## G-05 Distribution and acceptance

Source, built and extracted-prefix apps expose the selector and actual conditional behavior in managed Chromium/Firefox. Source-only view/model fixtures may supply boundary snapshots; they never ship. Built/extracted acceptance must also exercise actual gameplay that produces upper and lower projected landings, rather than rely only on injected view snapshots. Preserve relative local assets, strict package allowlisting, checksum/manifests, no runtime backend/Node and secret exclusions. Version/docs/release notes describe the boundary/default/lifetime and retained hard-drop rules. Reproduce the final v1.5.0 archive, verify/extract and test it after shipped documentation is finalized.

Exact geometry/session time is established by deterministic tests; real browser cases establish assembled behavior. Native headed OS-window focus remains an explicitly reported verification limit when unavailable; synthetic events do not certify it. Electron remains outside delivery. No product choice remains unresolved.
