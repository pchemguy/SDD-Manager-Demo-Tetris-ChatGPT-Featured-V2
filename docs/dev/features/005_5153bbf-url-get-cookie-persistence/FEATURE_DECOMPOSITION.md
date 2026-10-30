# Configuration persistence components

Historical accepted campaign005 source/evidence. Current product contracts and executable task ownership are in the main development documents; this snapshot is not an active implementation owner.

## Scope

This delta refines [FEATURE_ARCHITECTURE](FEATURE_ARCHITECTURE.md). Main [DECOMPOSITION](../../DECOMPOSITION.md) retains C-01–C-07 responsibilities, with the following affected boundaries. Exact externally observable contracts belong to FEATURE-SPEC; paths belong to the scoped layout in FEATURE-PLAN.

## C-07 selected configuration

Keep createConfiguration/getSnapshot/update/toRuleOptions and six-setting validation as the canonical domain authority. Expose its existing per-field validation as a pure typed predicate for C-08's format decoder, including rejection of unknown runtime keys. Defaults remain available by constructing an ordinary controller; there is no second defaults table or browser-specific field inside GameConfiguration. The public controller shape stays structurally compatible.

C-07 owns only detached selected values and atomic patch validation. It does not subscribe, persist, parse URL/cookie syntax, notify game observers or access browser globals. Codec tests and existing configuration tests establish domain/format consistency for all valid values and invalid runtime inputs.

## C-08 browser configuration persistence

One cohesive adapter has a pure format/resolution part and an effect part. The pure part consumes search text, a cookie string and explicit defaults, returning detached complete values plus the valid explicitly URL-supplied subset. It uses the six canonical fields and C-07's validator; it owns textual boolean conversion, cookie names/attributes, duplicate precedence and changed-key URL construction. Unknown parameters/cookies do not become configuration keys. Formatting and source resolution never mutate a supplied snapshot.

The effect part consumes explicit read-URL, read-cookies, write-cookie and replace-URL callbacks. Its factory creates one C-07 controller, restores through that controller before consumers can observe it, and writes only valid explicit URL fields to cookies at initialization. Its returned controller delegates getSnapshot and update to C-07; after a successful update it compares detached before/after values and attempts persistence only for changed fields. Validation failures and equal/empty updates have no persistence effects. A multi-field patch remains one atomic in-memory update with independent cookie writes and one combined URL replacement.

The adapter retains immutable page scope metadata and callback references, never a second selected-state authority or game snapshot. Capture the page's supported origin/path/protocol at construction for cookie scope; read the current URL on each edit so unrelated intervening query/fragment changes are retained. If initial URL access fails, cookie restoration still works; cookie writes lacking a known valid scope are skipped. Later URL effects may succeed independently. Runtime persistence failures are contained and do not change the successful update's detached result.

No event listener, frame, cookie poll, session timer or unsubscribe API is needed. An explicit persisted context can outlive a view and be reused without rereading browser sources. A second factory call creates an independent context; other pages do not receive autonomous broadcasts.

## C-06 browser composition

The actual page entry creates C-08's persisted controller using callbacks bound to the mount's document/window, then passes it through existing mountGame and createGameView arguments. Preserve history.state when replacing the URL; never navigate or push an entry. Ordinary mountGame omission still constructs its own pure default context, preserving callers and source lifecycle fixtures. Browser resources/disposal remain owned by the existing host lifecycle.

## Unchanged consumers and verification

C-05 reads selected values and calls update through the unchanged controller shape. Its explicit refresh and native settings/focus behavior remain. C-04 captures toRuleOptions only at Start/Restart and never imports C-08; pure core and C-01–C-03 remain untouched. No settings persistence can draw RNG, consume gravity time, restore penetrator inventory or cause game observer notifications.

Verify pure resolution/encoding against canonical domain values, injected source/effect faults and atomic patches against a real C-07 controller, and actual native settings/reload/reopen/path isolation against shipped browser entry. Dependency checks must prohibit imports from core, application or shared UI into browser platform modules; browser composition may import reusable application/UI modules.
