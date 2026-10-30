# Session-only configuration architecture

Historical accepted campaign snapshot. Non-executable; current product authority is [SPEC](../../SPEC.md), [configuration](../../spec/session-configuration.md) and sole task owner [TASKS](../../TASKS.md). Recorded source identities/reviews are historical.

## Delta against existing blocks

Keep [ARCHITECTURE](../../ARCHITECTURE.md)'s pure rules/session, shared DOM view and browser host. Add a small DOM-free configuration owner within the shared application layer. It holds the six selected values for a loaded page application and produces detached settings and next-game rule values. It has no browser storage, scheduler, global singleton or random source.

Selected configuration and active gameplay rules have separate ownership: the configuration owner retains current display preferences and pending next-game rules; the session copies only the four gameplay rules at Start/Restart. The session alone enforces hard-drop/hold availability, locking chronology, scoring and atomic gameplay. Display changes do not enter session operations. Current rules are exposed read-only so the view can distinguish active from pending values.

## State and dependency direction

The composition owner creates a configuration context and passes it to the view and session-start integration. The view renders selected values and emits validated setting changes through that context, immediately rerendering its latest detached snapshot for display changes. Repeated renders and game replacement never recreate the context. A view remount with the same explicitly retained context sees the current values; a fresh page creates a fresh default context. Different page/application contexts are independent. No preferences survive reload.

The configuration module depends only on language/value definitions. The session imports shared rule types/normalization; the view imports configuration and geometry; the browser host composes instances and maps events/time. No application module imports DOM/UI/platform code. Ghost visibility types move to the shared value owner and are re-exported at the existing helper boundary where needed. Canonical ghost/next values remain model data even when concealed.

## Compatibility and lifecycle

Preserve the existing constructor, actions, detached snapshot fields and legacy immediateHardDropLock input behavior. Add the complete typed rule input and detached active-rules snapshot without silently treating incomplete/invalid objects as valid. The detailed specification owns exact validation/normalization. Host legacy mount callers still work with fresh defaults; explicit shared context permits page-lifetime view remounts. No new generic plugin/event framework is needed.

The host retains frame, external-focus/visibility pause and owned teardown. Native settings focus remains inside the application and never dispatches board shortcuts. Configuration retention does not retain old game observers, frames or DOM nodes after teardown. The settings owner has explicit synchronous get/update operations; composition/view renders the returned update, with no autonomous cross-tab broadcast or session observer notification.
