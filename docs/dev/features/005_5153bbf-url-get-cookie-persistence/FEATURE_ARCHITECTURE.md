# Browser configuration persistence architecture

Historical accepted campaign005 source/evidence. Current product contracts and executable task ownership are in the main development documents; this snapshot is not an active implementation owner.

## Scope and arrangement

The [feature brief](FEATURE.md) adds restoration and persistence to the existing browser host. [Main ARCHITECTURE](../../ARCHITECTURE.md) remains authoritative for core rules, session transactions, shared DOM presentation and selected-versus-active timing. Its no-storage browser-entry/reload-default statements are altered for this feature; pure selected configuration and game state remain unchanged.

The browser host composes a persistence adapter around one ordinary configuration controller. Before mounting the view, the adapter resolves the six selections from URL/cookies/defaults and commits a complete validated selection into that controller. It presents the same getSnapshot/update interface to existing consumers. Successful later selection updates persist only changed fields, after the in-memory transaction succeeds. The view needs no browser storage dependency or separate pending-settings copy.

| Owner | Responsibility | Dependencies |
| --- | --- | --- |
| Pure selected configuration C-07 | Six-setting domain validation, defaults, atomic updates and detached reads. | Explicit values only; no URL/cookie/history globals. |
| Browser persistence C-08 | Decode browser representations, resolve precedence, restore selected values and perform independent best-effort cookie/history writes. | C-07 and explicit browser-access callbacks; no session, scoring, clock or RNG dependency. |
| Browser host C-06 | Create the persisted context once for the page entry, mount the existing game with it and own native resources. | C-08, C-04, C-05 and browser APIs. |
| Shared view C-05 / session C-04 | Existing controlled settings projection and Start/Restart rule capture. | Same configuration interface / copied RuleOptions; no persistence imports. |

Dependencies point from the browser composition toward reusable application code. Browser persistence is a small platform adapter, not a service, backend, application singleton or new general platform framework. Its pure format/resolution helpers are separately testable using explicit strings and detached values.

## State, effects and lifetime

The underlying C-07 controller is the sole selected-configuration authority. A wrapper delegates validation and mutation before scheduling synchronous best-effort persistence for actual changed keys; it owns no competing configuration snapshot. Restoring into the underlying context bypasses edit effects, then only valid explicitly URL-supplied fields are written to cookies. Cookie/default fallback never fills the URL or overwrites omitted fields.

Persist only selected configuration. Session state, active rules, board, RNG, timers and penetrator inventory never enter serialization. Neither source access nor a failed persistence write may prevent the game from starting or selected values from changing in memory. Cookie and URL effects are independent; no cross-source transaction, rollback of a valid selection or retry loop is implied.

A persisted page context may survive an explicit same-context remount. App mounting alone does not restore from browser sources or clear selected values; a new page entry creates a new persisted context. Independent createConfiguration/mountGame defaults retain their existing pure behavior. No cookie polling, popstate subscription, storage event, extra scheduler or teardown resource is introduced.

## Approach and verification seams

Wrapping the existing structural controller contract avoids modifying shared UI callbacks and preserves legacy mount/view arguments. Putting browser persistence inside C-07 or C-05 would violate their reusable boundaries; a backend would add infrastructure without an account or server requirement.

Test format/precedence using explicit URL/cookie inputs, effect behavior using injected callbacks and the real configuration controller, and actual reload/reopen/native edits with isolated Chromium and Firefox. Actual page tests must cover source, built and extracted prefix hosting, not only mocked source fixtures. Keep browser globals at the page entry/callback boundary; prevent new imports from core, application or shared UI into platform code. Exact formats, API contracts and acceptance belong in FEATURE-SPEC.
