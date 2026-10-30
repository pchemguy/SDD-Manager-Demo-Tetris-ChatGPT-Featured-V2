# Session-only configuration components

## Relationship to accepted architecture

[FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md) adds an application-layer selected-configuration owner while retaining [DECOMPOSITION](DECOMPOSITION.md)'s C-01–C-06 boundaries. Geometry, landing, bag and score modules are unchanged; C-04 enforces the chosen rules, C-05 renders controlled settings and C-06 composes page memory and platform events.

## C-07 selected configuration

A small DOM-free factory owns a flat GameConfiguration value with ghostVisibility, nextPreviewEnabled, hardDropEnabled, holdEnabled, generalLockPolicy and hardDropLockPolicy. It supplies getSnapshot(), update(patch) and a pure rule projection. Defaults preserve current play. Each read/update result is detached; updates validate the whole candidate before replacing it. No RNG, session dispatch, clock, storage, autonomous notification or cross-tab broadcast is involved. The composition/view synchronously renders the returned change. A retained context may outlive a view, but owns no DOM/listeners/frames.

Reuse the existing ghost values always/lower-half and extend with never; centralize their type in the shared value module, re-exporting it at the current helper boundary for source compatibility. RuleOptions contains only the four gameplay fields. The ghost helper remains a pure presentation predicate over occupied canonical cells.

## C-04 active rules and compatibility

The session copies complete RuleOptions at eligible Start/Restart and exposes a detached Snapshot.rules. Preserve all existing fields, especially Snapshot.options as the exact legacy immediateHardDropLock boolean mirror. dispatch(action, options?) accepts either the existing one-field legacy form or the complete four-field rule form; mixing/partial forms are invalid. Legacy input maps to modern defaults plus its immediate flag. Omitted input retains active rules; the browser composition explicitly supplies current pending rules on Start/Restart. Unknown/invalid inputs retain validation-before-effects and rollback guarantees.

General-policy timing and disabled actions are enforced inside the session, not inferred in the UI. Hold eligibility combines enabled state with once-per-lock status. Canonical next/ghost data remain available when concealed. No live configuration reference enters a transaction; failed start/refill leaves session state unchanged without discarding the independently selected page preferences.

## C-05 controlled shared view

Replace the separate settings with one labeled nonmodal panel. Render selected values from C-07, active gameplay availability from Snapshot.rules and hold eligibility from canHold. Display/preview edits synchronously rerender the latest detached snapshot without a gameplay notification. Pending gameplay edits do not disable currently enabled game actions until the next game actually starts.

Keep board/render/destroy and the existing two-/three-argument construction shape usable; add an optional configuration-context argument for upgraded composition. The browser always supplies the shared page context. A standalone legacy view without one owns a fresh default context; its existing immediate-option callback continues receiving a boolean projection when that policy changes. Full six-setting game application belongs to upgraded composition, not an implicit session mutation from render. Expose a settings refresh entry for explicit non-UI context updates; there is no autonomous broadcast guarantee.

## C-06 composition and lifetime

mountGame retains its existing mount/random arguments and gains an optional configuration context. The page entry creates one context and passes it to the composed app. Start/Restart project pending rules; native view callbacks update that context and render. A view/app remount with that same context retains selections while creating a fresh game; omitted context starts an independent application with defaults. Fresh page/reload creates a new context; no storage or module-global singleton shared across applications.

Retain board-only shortcuts, frame baseline/clamping, internal-focus eligibility, external auto-pause and owned cleanup. Settings changes never restart/resume/pause implicitly. Tests isolate C-07 values, C-04 semantic time/actions, shared-view snapshots and actual native/browser/reload/remount behavior.
