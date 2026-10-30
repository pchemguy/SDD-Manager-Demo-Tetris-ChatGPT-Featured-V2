# URL GET and cookie persistence

Historical accepted campaign005 source/evidence. Current product contracts and executable task ownership are in the main development documents; this snapshot is not an active implementation owner.

## Purpose

Remember the player's six existing game-configuration selections across page reloads and later visits, and let a game URL supply any subset of those selections. Resolve every setting independently: a valid explicitly supplied URL query value overrides its saved cookie value, which overrides the existing default.

## Scope

Support ghost visibility, hard-drop availability, next-piece preview, hard-drop locking policy, general locking policy and Hold availability. Retain the current values and defaults from [session configuration](../../spec/session-configuration.md). A value equal to its default is still an explicit selection.

| URL parameter | Accepted text values | Default |
| --- | --- | --- |
| ghostVisibility | never / lower-half / always | always |
| hardDropEnabled | true / false | true |
| nextPreviewEnabled | true / false | true |
| hardDropLockPolicy | general / immediate | general |
| generalLockPolicy | failed-downward / gravity-interval | gravity-interval |
| holdEnabled | true / false | true |

At page initialization, validate sources separately for each setting. Apply valid URL values and save each in its corresponding cookie, including explicit defaults. For an omitted URL parameter, retain and use a valid saved cookie value; never overwrite it with a default merely because the parameter is absent. Missing or invalid cookie values use the existing default. Empty, unrecognized or incorrectly cased URL values are invalid and fall back to the cookie/default for that setting without affecting other settings or overwriting that cookie. The first occurrence of a repeated recognized URL parameter is authoritative; if invalid, use fallback rather than searching later occurrences.

Whenever the player actually changes a selected setting, save that setting to its cookie and update that parameter in the current URL. This includes returning to a default. Collapse duplicate occurrences of that changed parameter to one canonical value, preserve unrelated parameters and the URL fragment, and replace the current history entry without reload, navigation or an added history step. Do not inject omitted settings into the URL just because cookies/defaults supplied them. Retain a disabled hard-drop locking selection and persist it when edited; disabling hard drop does not delete its selected policy.

Use one host-only cookie per setting, named `tetris_config_<field>` using the table's field name, with a one-year (365-day) lifetime refreshed when that setting is saved, SameSite=Lax, and Secure on HTTPS. Scope cookies to the served application's directory, including a hosting prefix, so sibling deployments do not share configuration. Support normal HTTP/HTTPS static hosting. Cookie denial, unreadable cookies or failed browser writes must not prevent the game from starting or accepting in-memory settings; source failures degrade independently, and successful URL or cookie updates do not depend on the other write succeeding. Do not promise recovery from a blocked source or unsupported file-URL cookie behavior.

## Retained interactions

Restoration establishes selected configuration before the initial settings/UI projection. Ghost and next-preview selections remain live display choices. The four gameplay selections still become active only at Start/Restart; persistence never changes rules already captured by a running game. Settings remain selected through pause, game over and remount according to the existing explicit-context lifetime. Reload/new visit restores selections into a fresh ready game, not the old game session.

Keep browser URL/cookie access in the browser platform boundary. Reusable configuration, rules, session logic and shared UI retain explicit inputs without browser storage globals, allowing future hosts to choose their own persistence. Explicitly created standalone configuration contexts remain independent defaults unless supplied values by their caller. No new game setting is introduced.

## Approach

A small browser persistence adapter composes the existing selected-configuration owner with validated URL/cookie values and receives actual player selection changes. This keeps one selected configuration authority and isolates browser effects. Direct cookie/URL access inside the shared configuration or view would couple reusable code to browser persistence; a backend settings service would add accounts and infrastructure unnecessary for this static application. Both alternatives are outside this approach.

## Non-goals and compatibility

Do not persist the board, score, piece sequence, Hold slot, penetrator bonuses/mode, timers or paused/game-over status. Do not add localStorage/sessionStorage fallback, accounts, presets, sharing buttons, cookie banners, a reset-settings control, cross-tab/live external-cookie synchronization or live back/forward reconfiguration. URL resolution occurs on page load; player edits replace the current URL. Existing gameplay, six-control panel, focus/keyboard ownership, penetrator behavior and delivery-platform scope remain.

This feature deliberately replaces the current browser reload-to-default/no-cookie/no-URL-restoration guarantee. Existing pure configuration APIs, same-context remount behavior and selected-versus-active timing must stay compatible. Update affected current documents and browser tests during implementation; retain closed historical campaign records unchanged. Deliver the verified browser change as the next minor version, v1.5.0, with a release after complete phase integration.
