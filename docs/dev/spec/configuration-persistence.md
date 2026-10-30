# Browser configuration persistence contracts

This child of [SPEC](../SPEC.md) owns U-01–U-08 for six-setting browser URL/cookie persistence. [Selected configuration](session-configuration.md) owns S-01–S-08 application values, active rules and presentation. C-08 uses C-07 without introducing browser globals into reusable code. Game state is not persisted.

## U-01 fields, values and format

Exactly the six GameConfiguration fields are persisted; no other state is eligible. Parameter names and cookie suffixes are case-sensitive field names.

| Field | Text values | Default | Domain value |
| --- | --- | --- | --- |
| ghostVisibility | never / lower-half / always | always | Corresponding string |
| hardDropEnabled | true / false | true | Boolean |
| nextPreviewEnabled | true / false | true | Boolean |
| hardDropLockPolicy | general / immediate | general | Corresponding string |
| generalLockPolicy | failed-downward / gravity-interval | gravity-interval | Corresponding string |
| holdEnabled | true / false | true | Boolean |

Use C-07 as the domain/default authority. Export `isConfigurationValue<K extends keyof GameConfiguration>(key: K, value: unknown): value is GameConfiguration[K]`; it rejects unknown runtime keys and invalid values without mutation, randomness or browser access. Existing controller methods and errors stay unchanged. Formatting maps booleans to exact true/false and string enums to themselves; no truthy conversion, aliases, trimming of values or case folding.

Use standard URLSearchParams decoding for query names/values. A bare key, empty text, wrong case, whitespace, numerical boolean, malformed/unknown enum or decoded replacement character cannot become a valid selection. Cookie names are exactly `tetris_config_<field>` and cookie values use the table's canonical text directly; quoted or percent-escaped variants are not canonical saved values. Ignore unrelated names. Parse cookie pairs at the first equals sign with surrounding cookie-name delimiter whitespace removed; preserve value text for exact validation. When the same recognized cookie name appears more than once, the first pair in the returned cookie string is authoritative, including when invalid.

Acceptance: every valid value round-trips; all96 complete configurations retain exact types. Invalid/mixed/unknown inputs cannot introduce a seventh key or mutate input/default objects. Canonical validation and configuration.update agree for each field.

## U-02 independent load-time resolution

At page entry, resolve each field independently from the first matching URL parameter when valid, otherwise its first matching cookie when valid, otherwise its default. Invalid first duplicates fall back; never search later duplicates for a convenient valid value. A valid URL value wins even when equal to the default or false. One invalid field cannot discard another valid field.

Commit complete resolved selections before the first rendered control/preview/ghost projection and before any Start input. Save every valid explicit URL field to its corresponding cookie at initialization, even when unchanged/default. Do not rewrite an omitted/invalid URL field's cookie, refresh its expiry, materialize fallback fields into the URL, or normalize the initial URL automatically. Missing/invalid cookie values choose defaults without automatically writing them. Cookie reads may be unavailable without losing valid URL values, and URL reads/parsing may be unavailable without losing valid cookies. Source errors act as absence only for that source.

Acceptance: conflicting URL/cookie/default values for each of six fields; mixed sources across one complete selection; explicit false/default overriding saved nondefault; omitted/invalid URL retaining cookies with zero writes for those fields; invalid cookie fallback; repeated/encoded URL keys; unreadable source getters independently. Initialization consumes no game RNG/time or session action.

## U-03 cookie writes and app scope

For each saved field write one cookie with its canonical name/value, `Max-Age=31536000`, `Path=<application-directory>`, `SameSite=Lax`, and `Secure` exactly on HTTPS. Omit Domain for host-only scope and omit HttpOnly because the browser application reads these values. Do not write unrelated cookies or all six fields when only one changes. Saving a field refreshes only that field's lifetime; expiration/deletion falls back normally on the next load.

Capture the initial supported HTTP/HTTPS URL's origin, protocol and directory pathname. Directory means pathname through its last slash, inclusive: `/` yields `/`, `/nested/game/` and `/nested/game/index.html` yield `/nested/game/`. Use the URL pathname spelling without percent-decoding. Ordinary static directory routing must use its actual trailing-slash/index URL; no server redirect or extensionless-route inference is delivered. A path containing a literal semicolon or control character cannot be safely represented as a cookie Path and skips cookie writes without broadening scope. If initial URL access/parsing is unavailable, cookie restoration can still work but writes lacking known scope are skipped. File/other schemes have no persistence guarantee; memory-only play remains usable.

Each cookie write is independently best-effort. A throwing or silently denied cookie write must not undo the selected value, suppress URL updates or prevent another field's write. No retry loop, readback verification requirement, error dialog or persistence-status control is introduced. Later source availability can be used on a subsequent actual edit or reload; no background work is scheduled.

Acceptance: callback output attributes for HTTP and HTTPS, exact one-year seconds, root/prefix/index paths, semicolon-path rejection, one-key writes and unrelated cookie preservation; actual HTTP browser cookie values/path/expiry/SameSite and sibling-prefix isolation. Test denied/throwing writes independently; report actual HTTPS runtime coverage separately if HTTPS hosting is unavailable.

## U-04 edit effects and URL preservation

The persisted controller has the existing `ConfigurationController` getSnapshot/update shape. update validates and commits through C-07 first. Invalid patches retain the same TypeError/atomic rollback as S-01 with zero cookie/history effects. Empty/equal patches cause zero source reads/writes/history changes. Returned values and all snapshots are detached.

After a valid patch actually changes fields, attempt one cookie write per changed field in U-01 table order and one combined URL replacement. Read the current URL once for that operation so unrelated intervening query/hash edits are retained. Set every changed key to its canonical selected text, including defaults; collapse occurrences of each changed key to one using URLSearchParams.set. Retain all other query names, values, multiplicities and relative order semantically, including unchanged recognized parameters and unrelated duplicates. Standard query percent-encoding normalization is allowed; the path, origin and fragment are retained. Do not fill omitted keys from the full selected snapshot.

Use history.replaceState with the existing history.state and an unchanged document title argument. Do not push a history entry, assign location, reload, navigate, start/restart a game or steal focus. Read/serialization/replacement errors are contained independently of cookie writes; a failed URL write does not undo committed selection or cookies. Both effects may fail while update still returns its valid in-memory result. Never retry a completed edit automatically.

Acceptance: each native control edited away from and back to its default; unrelated duplicate parameters, encoded values, fragment and preexisting history.state; no added history length or page load; repeated changed key collapses, unchanged duplicate key retained; multi-field patches atomic in memory with partial cookie failures and a single combined URL update. Equal/invalid patches produce zero effects. Test URL-read/replacement faults independently and together with cookie faults.

## U-05 browser composition and lifetime

The actual page entry creates the persisted controller once before mountGame. C-06 injects document/window-bound callbacks; C-08 imports no session/view and accesses no ambient browser globals. createConfiguration() and omitted mountGame configuration remain independent pure defaults. Explicit context reuse retains selected values and does not re-run restoration; teardown/remount removes existing native resources without a persistence poll/listener/frame leak.

Ghost visibility/Next preview retain immediate display behavior, including while paused. Hard drop/Hold/general locking/hard-drop locking remain selected next-game values captured only on Start/Restart. Persistence of pending selections cannot change active rules, eligibility, board, score, clocks, RNG, Hold slot or penetrator state. Reload/reopen constructs a fresh Ready game and restores only selected settings; bonuses and game progress reset. Another page's cookie edit has no live broadcast effect; its saved value is consumed on a later reload when the receiving URL omits that field. A still-explicit URL continues to take precedence on reload.

Acceptance: actual UI shows restored settings before play; selected-to-active Restart transitions stay correct; live display edits while paused; Hold/hard-drop disabled-policy retention; same-context source remount versus independent pure contexts; reload/new page/new browser context preloaded with saved cookies; two-page no-live-sync behavior and later cookie restoration with parameters omitted; game/penetrator state never restored.

## U-06 adapter interfaces and failure boundary

C-08 exposes pure `resolveConfiguration(search: string, cookies: string, defaults: GameConfiguration): ConfigurationResolution`, returning `{values: GameConfiguration, urlValues: Partial<GameConfiguration>}` as fresh objects. Helpers inside that module may own cookie assignment and URL construction; do not export a second domain/default table.

Its effect factory is `createBrowserConfiguration(access: BrowserConfigurationAccess): ConfigurationController`, where access provides `readUrl(): string`, `readCookies(): string`, `writeCookie(assignment: string): void`, and `replaceUrl(url: string): void`. The real replaceUrl callback retains history.state. Factory initialization is synchronous and uses a real pure C-07 controller; getter/parse/write errors are contained by source/effect boundaries. Public malformed configuration patches still throw; persistence errors are not misreported as validation failures.

No new mount/view argument, storage subscription, destroy method, async readiness state, singleton or runtime dependency is required. Test callbacks may emulate browser denial/faults without production debug flags, setters or test-only imports in the shipped app.

## U-07 regression and documentation

Preserve existing six controls, native keyboard/focus ownership, relative static hosting, pure domain/session APIs, ordinary/penetrator gameplay, exactly one preview, ghost projection and all current locking policies. Current PROJECT/design/SPEC children/PLAN/layout/AGENTS and guides describe browser persistence while keeping pure contexts distinct. Browser reload restores selections under U-01–U-06; pure-context/no-browser-global tests and unchanged gameplay assertions remain. Preserve closed feature archives, prior phase/task ranges and published tags/releases.

Player documentation lists all six names/text values/defaults, precedence, explicit URL cookie writes, omitted-key retention, expiry/path scope, same-session versus next-game behavior and graceful failure/no game restore. No localStorage/sessionStorage, backend/account, seventh control, sharing/reset button, live popstate/cross-tab synchronization, or extra delivery platform is included.

## U-08 delivery acceptance

Deliver the current browser release after the full authorized phase is implemented, independently reviewed, verified and integrated. Run current type, boundary, unit, package and source/built/extracted browser checks using dedicated managed Chromium and Firefox. Add direct persistence coverage to each shipped target and update measured finite test budgets only with execution evidence; do not hide new tests behind a source-only fixture exclusion.

Keep reproducible relative-path static ZIP/checksum, strict manifest/CRC/member/content verification, allowlisted shipped docs/assets only, and no credentials/source fixtures/dev caches. Versioned local artifacts use the current application version; public stable asset names stay unchanged. Verify extracted prefix-hosted persistence and actual public downloads/CI during release. Native headed OS focus and future Electron delivery remain outside verified browser delivery; distinguish injected HTTPS attribute checks from actual native HTTPS behavior.

## Browser API references

The required browser mechanisms are documented by [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie), [History.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) and [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). These references inform API use; U-01–U-08 own product behavior.
