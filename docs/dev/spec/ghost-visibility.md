# Conditional ghost visibility contracts

This focused child of [SPEC](../SPEC.md) owns G-01–G-05, extending R-07/R-10/R-12 and [modern F-06](modern-rules.md) presentation. The canonical projection, model API, hard-drop/grounding clocks and other modern gameplay contracts remain unchanged.

## G-01 Occupied-cell visibility predicate

GhostVisibilityMode is the UI-owned union always | lower-half. For a non-null canonical ghost, always permits display. For lower-half, let bottomY be the maximum y of its four occupied cells computed by existing geometry, in zero-based coordinates. Display exactly when bottomY >= 10; hide when bottomY < 10. Null ghost is never displayed. The board remains10×20 with midline between indices9 and10. A projection with bottomY9 hides; bottomY10 shows, including any projection straddling that boundary. Matrix origin/empty padding, active-piece height, ghost overlap and score/level do not alter the predicate. This helper receives valid typed canonical inputs and introduces no new integration-error API.

When hidden, every playfield cell has data-ghost=false; remove previous projection flags, never retain stale cells or clip a subset. When visible, use existing patterned ghost styling; active and settled cells take precedence exactly as before. Ghost visibility never changes settled/active data, landing coordinates, hard-drop distance/scoring or gravity/grounding clocks. Keep Snapshot.ghost detached and available even when hidden.

Acceptance: pure independently calculated fixtures cover all seven types/four orientations at bottomY9 and10, padded matrices, null and always cases, plus immutable inputs. Compare occupied coordinates, not helper-derived expected values. Verify active piece high with lower landing visible, and high stack with upper landing hidden.

## G-02 Dynamic selection and lifetime

Render one labeled native select named Ghost visibility, with visible Always and Lower half only options (values always and lower-half). Initial selection is Always for each createGameView/mount. Selection changes immediately rerender the latest delivered snapshot; they require no gameplay dispatch, frame advance or new snapshot notification. Changing to the already-selected mode has no gameplay effect. A mode edit does not consume RNG, change session status/options/stats or notify session observers.

Recompute on each render after horizontal/vertical movement, either rotation/kick, hold, hard drop and lock/spawn. Hidden→visible and visible→hidden are symmetric; no delay, hysteresis, fade or visibility latch. Switching to Always restores any non-null suppressed ghost immediately. The current mode survives Start/Restart, Pause/Resume and game over within the same mounted view. Ready/game-over null ghost has no projection. Paused retains the frozen canonical projection; its mode may still change and affect display immediately. Reload/destroy/remount creates Always. Do not write localStorage, cookies or another persistent preference. Keep pending/active immediate-hard-drop option behavior independent.

Acceptance: transitions across the midline in both directions, lateral move off/onto a high stack, both-direction rotation/hold/replacement changes, frozen paused selection edits, restart retaining mode and reload/remount resetting it. Render another snapshot without changing selection. Two simultaneous mounted views do not share preferences/listeners.

## G-03 Accessible description and native interaction

Keep the selector enabled in ready/running/paused/game-over and labeled without relying on hover. For a hidden non-null ghost, the existing described-by projection text says Ghost hidden above the midline and includes no type-specific landing row. For visible non-null ghost, preserve the current Ghost [type] lands on row [one-based bottom row] description. For null ghost retain No active piece. Cell projection flags and description use the same decision; avoid a second live-region announcement for each movement.

Native select keyboard/pointer changes retain select focus. Only the board handles gameplay shortcuts: arrow, Space, Enter, R, X/Z/C/Shift on select must not dispatch game actions. Internal focus changes do not auto-pause; external blur/hidden handling still pauses. Do not add a shortcut or change board mappings. Selector and all existing controls fit320 CSS pixels without horizontal page overflow and retain visible focus. Destroy detaches its listener and only owned nodes; repeated mounts have one control/handler each.

Acceptance: actual native keyboard selection in Chromium/Firefox, no duplicate drop/rotation/restart/pause dispatch, focus persistence, external auto-pause and explicit resume, narrow/ordinary screenshots, accurate description and remount disposal with console/runtime guards through teardown.

## G-04 Rule and API compatibility

All v1.1.0 movement, hold, preview, bag, kicks, ghost landing, hard-drop scoring, both locking policies, pause/frame baseline and observer/validation/rollback contracts remain. UI preference changes must not mutate the supplied snapshot or make its canonical ghost null. Lower-half mode affects only display. Verify hard drop to the same canonical location while projection is hidden, and use full rule/session regression to protect independent grounding timing. Keep DOM/global access out of core/session; no duplication of landing/collision logic.

## G-05 Distribution and acceptance

Source, built and extracted-prefix apps expose the selector and actual conditional behavior in managed Chromium/Firefox. Source-only view/model fixtures may supply boundary snapshots; they never ship. Built/extracted acceptance must also exercise actual gameplay that produces upper and lower projected landings, rather than rely only on injected view snapshots. Preserve relative local assets, strict package allowlisting, checksum/manifests, no runtime backend/Node and secret exclusions. Version/docs/release notes describe the boundary/default/lifetime and retained hard-drop rules. Reproduce the final v1.2.0 archive, verify/extract and test it after shipped documentation is finalized.

Exact geometry/session time is established by deterministic tests; real browser cases establish assembled behavior. Native headed OS-window focus remains an explicitly reported verification limit when unavailable; synthetic events do not certify it. Electron remains outside delivery. No product choice remains unresolved.
