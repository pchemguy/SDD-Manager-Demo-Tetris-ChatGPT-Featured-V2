# Session leaderboard

## Purpose

Show the player the ten best completed-game results from the current page session, ranked by final score. Update a visible Leaderboard panel as soon as a game finishes so successive games can be compared.

## Included capability

- A completed game is one that reaches Game Over, including top-out from an ordinary next-piece spawn or a blocked Hold spawn. Capture its final score once, after the ending action is committed. Zero-score games qualify.
- Show up to ten individual results in descending score order. Equal scores retain completion order, earliest first. Keep distinct equal-score games as distinct results; when full, retain the first ten under that ordering.
- Show rank and score in a compact panel beside the existing game information and controls, adapting to narrow screens without obstructing play. An empty panel clearly states that no games have been completed yet.
- Keep previous results when Start/Restart begins a new game. Restarting an unfinished game abandons it and adds no result. Pausing, resuming, repeated Game Over renders or other post-game actions must not duplicate an entry.
- Retain history in memory for the current page lifetime only. Page reload and a newly opened page start with an empty leaderboard. Do not save results in cookies, URL parameters, localStorage, sessionStorage or any backend.

## Retained behavior and constraints

Use the existing score unchanged, including ordinary and penetrator play under selected rules. All completed games compete in the same list; no configuration-specific boards or score normalization are added. Existing remembered six-setting URL/cookie behavior and selected-versus-active timing remain unchanged. History is independent of the board, Hold and penetrator inventory reset performed by a new game.

Keep application state and DOM presentation reusable for future platforms, with browser-specific lifetime resources isolated. The leaderboard must not consume random draws, change gameplay timing, intercept established controls or steal focus after completion. Continue dedicated managed Chromium/Firefox verification and distributable-package checks when this feature is implemented, following existing project delivery constraints.

## Non-goals

Player names, accounts, timestamps, persistent scores, live cross-tab synchronization, online/global ranking, additional settings, manual history editing, replay and score submission for abandoned games are outside this capability. Windows Electron delivery remains future scope.

## Existing contract context

[PROJECT](PROJECT.md), [SPEC](SPEC.md), [session configuration](spec/session-configuration.md) and [browser persistence](spec/configuration-persistence.md) own retained behavior. [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md) own reusable boundaries. Exact event/state contracts, physical placement and executable tasks are to be derived from this scope.
