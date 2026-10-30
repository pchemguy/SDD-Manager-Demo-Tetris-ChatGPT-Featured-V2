> Historical accepted campaign008 snapshot. Current main documents/TASKS own behavior and executable work.

# UI layout specification

## Scope and governing contracts

UL-01–UL-10 define the UI layout delta to [SPEC](../../SPEC.md) under the accepted [FEATURE](FEATURE.md). The existing [architecture](../../ARCHITECTURE.md) and [component decomposition](../../DECOMPOSITION.md) remain sufficient: C05 owns view-local presentation; C06 owns input/focus/time and browser resources; application and persistence owners remain unchanged.

| Affected baseline | Explicit delta |
| --- | --- |
| R-07/R-10 and modern F-06 presentation | Five panels, independent visibility and two consolidated lifecycle buttons; the visual keyboard-reference panel can be hidden. Board instructions and native keyboard semantics remain accessible. |
| Leaderboard L-06 panel location | Separate optional panel left of Game info in wide mode, rather than inside it. Ranking, records, completion and page lifetime stay unchanged. |
| S-07 and File F-05/F-10 Settings presentation | The external Settings toggle controls the whole panel. Replace the separate native details/summary disclosure with this single accessible disclosure control. Keep the six native inputs, one bottom Save/Restore pair, formats and status inside it. |
| C05 presentation descriptions in main design | Update affected location/disclosure descriptions at incorporation; no new component, controller or storage boundary. |

All other main/child contracts remain in force, including six-setting URL/cookie effects and version1 JSON/SQLite formats. These document-scoped UL IDs do not replace any existing requirement IDs.

## UL-01 — Panel content and wide arrangement

Provide exactly one panel of each kind: Leaderboard; Game info and controls; Board; Settings; Controls/help. At viewport widths of1440 CSS pixels or more, use one horizontal arrangement in that order, aligned at the top of their main content. A visible Leaderboard is immediately outside Game info on the left; Game info is immediately left of Board; visible Settings is immediately right of Board; visible Controls/help is outside Settings on the right. If Settings is hidden, Controls/help remains on the Board's right; if Leaderboard is hidden, Game info remains on its left. Hidden optional panels do not occupy visible content, and remaining panels never cross the Board to fill the other side.

Board includes the existing200-cell playfield, game status and ghost description. Game info includes score/level/lines, penetrator information, Next/Hold, the panel toggles, lifecycle and existing rotate/hold/hard-drop action buttons. Controls/help contains the existing keyboard/action reference. Settings contains the six settings and related rule help/summary/file controls. Leaderboard retains its current semantic rank/score rows and empty state.

The1440px threshold is the specified responsive boundary, chosen to leave room for two readable side regions and the existing280px Board. Do not widen or shrink the Board to recenter the entire panel group. Typography/colors/game graphics retain the existing theme.

## UL-02 — Board centering and responsive layout

At every supported width, the playfield's horizontal center equals half the viewport's layout width, within1 CSS pixel. Measure the Board border box, not the whole application or visible-panel group. Use the layout viewport width excluding any vertical scrollbar. Showing/hiding optional panels must not change that center. Do not overlay panels or introduce horizontal page scrolling, including with long Settings errors or ten large leaderboard scores.

Below1440 CSS pixels use a single-column arrangement: Board, Game info and controls, then the optional Leaderboard, Settings and Controls/help in that order. Each visible panel fits available width. Preserve a readable Board at320px (at least240 CSS pixels wide), the10:20 cell aspect ratio and all200 cells. Normal vertical document scrolling is allowed; “always shown” means never hidden/collapsed by these controls, not sticky positioning or forcing all content into a short viewport.

Crossing the responsive boundary rearranges the same view without resetting visibility, focus, settings, transfer state or game state. At1440px the wide arrangement applies; at1439px the narrow arrangement applies. Wide and narrow layout must remain usable at320,375,768,1000,1439,1440,1600 and1920 CSS pixels.

## UL-03 — Independent visibility controls

In Game info, above both lifecycle buttons, provide exactly three native buttons controlling Leaderboard, Settings and Controls/help separately. Initially all three optional panels are shown. Visible button text names the operation and target: Hide Leaderboard / Show Leaderboard, Hide Settings / Show Settings, Hide Controls/help / Show Controls/help. Use a stable unique target ID per mounted panel and matching aria-controls; aria-expanded equals the actual visible state.

Click, Enter or Space activation changes only that target's visibility, once per native activation. All eight visibility combinations are supported in every game status. Toggles remain visible/enabled while panels are hidden and while a file operation is busy. Hidden panel content is neither rendered visually nor keyboard reachable and is not exposed as a visible region to assistive technology. Do not hide or disable Board/Game info as a side effect.

These buttons are presentation commands, never Session actions or game configuration updates. Board-focused gameplay keys retain their existing mappings; focus on toggles or other native controls must not also dispatch a Board action.

## UL-04 — Two lifecycle buttons

Place the lifecycle controls immediately after the toggle group, before the remaining gameplay action buttons. Use one Start/Restart button and one Pause/Start button with state-dependent presentation:

| Status | First button | First action | Second button | Second action |
| --- | --- | --- | --- | --- |
| ready | Start game, enabled | start using selected rules | Pause, disabled | None |
| running | Restart, enabled | restart using selected rules | Pause, enabled | pause current game |
| paused | Restart, enabled | restart using selected rules | Start, enabled | resume current game |
| game-over | Restart, enabled | restart using selected rules | Pause, disabled | None |

For paused “Start”, provide the accessible name “Start (resume game)” and concise visible explanatory text indicating that it continues the paused game. Start/Restart retains history/settings and resets gameplay normally; resume preserves the paused game and its copied active rules/clocks. No additional separate Start or Restart button appears. Board keyboard Enter/R/P/Escape semantics stay unchanged; the consolidation does not make Enter restart a running game. Gameplay button activation retains normal focus return to Board; panel toggles retain their own focus.

## UL-05 — Visibility lifetime and ownership

Maintain visibility only within the mounted C05 view. It survives ordinary snapshot/configuration refresh, real completion, Start/Restart, pause/resume, Restore and responsive resize. Each new view starts all panels shown, including remount with retained Session/configuration. Two mounted views have independent visibility and unique disclosure IDs.

Do not add visibility fields to Snapshot, RuleOptions, GameConfiguration, URLs, cookies, JSON/SQLite, storage or worker messages. No RNG, score submission, action dispatch, implicit Save/Restore or listener notification occurs merely because a panel toggles. A running game continues under its existing timing while focus remains inside the app; external blur/visibility pause and explicit resume rules remain unchanged.

## UL-06 — Settings and manual file compatibility

Use the one external Settings toggle as the Settings disclosure; do not leave a second collapse summary or competing visibility state. Its panel is nonmodal. The six native inputs, order/domains, live versus next-game timing, current/pending summary and native keyboard editing remain unchanged.

Keep exactly one Save and one Restore at the bottom of Settings after its configuration controls/help/summary; related format selector, download/cancel and status/error content remain with that pair inside the same panel. Hiding Settings hides all of them. Showing it again retains input values, chosen open format and current operation/status state. Hiding is neither cancellation nor a second operation; a pending valid Restore may complete while Settings is hidden, with updated history/settings available when shown. Save and Restore retain their existing busy/validation/resource/error contracts.

Restoring replaces leaderboard/settings without revealing hidden panels or changing visibility. Save exports only the current top ten results and exact six selected values, regardless of panel visibility. All File F-01–F-12 and U-01–U-08 validation/effect/atomicity guarantees remain; only their Settings disclosure presentation changes as declared above.

## UL-07 — Accessibility, focus and help

Use labelled regions/headings, native buttons, visible keyboard focus and semantic leaderboard/settings content. Toggle activation preserves focus on the activating button; ordinary rerenders and resizing preserve focus on still-present controls and never rebuild the Board unnecessarily. If a programmatic hide would conceal the current focused descendant, focus the corresponding visible toggle before concealment so focus cannot escape to the page and trigger a spurious pause. Do not forcibly focus any panel when showing it.

The visual Controls/help panel contains the full existing key reference; when hidden, the Board still has concise accessible instructions through always-available descriptive text. Do not expose stale IDs or inaccessible dependencies when panels move/hide. Help visibility does not remap any key or disable the existing gameplay buttons.

File errors remain safe text with their existing status/alert semantics, and showing a previously hidden error must make its text discoverable without starting another transfer. Do not clear errors to implement visibility. Preserve real window-focus/visibility behavior; simulated DOM checks do not establish native headed-window behavior.

## UL-08 — View interface and teardown

Retain existing createGameView arguments, board/render/refreshConfiguration/destroy interface, mountGame first four arguments, optional transfer binding and default composition. Keep all visibility callbacks/listeners local to the mounted view and remove them on destroy. Destroyed or detached toggles cannot affect a retained controller or a later mount. No new window scheduler, global singleton, resize listener leak or platform import enters shared UI. Layout can use CSS/media queries without a second game loop.

Invalid data/file failures continue to report through existing contracts. Showing/hiding panels is available after file failure and cannot clear a failure by mutating imported data or browser effects. Scope introduces no new persistent-format error or migration.

## UL-09 — Verification acceptance

| Area | Required evidence |
| --- | --- |
| Order and centering | Real bounding boxes for all8 combinations at1440/1600/1920 and representative narrow widths; assert absolute midpoint and unchanged Board midpoint, not screenshots alone. Check1439↔1440 resize with state/focus retained. |
| Narrow layout | Board, always-present Game info, visible optional content, no overlap/horizontal page overflow at320/375/768/1000; inspect320 and1440 in both browsers, including long error text and ten large scores. |
| Toggles | Real pointer plus keyboard Enter/Space; exact count/order/text, aria-controls/expanded, hidden keyboard exclusion, each state retained through ordinary rerenders and lifecycle operations. |
| Lifecycle | All four statuses against the two-button table; paused Start resumes without reset; Restart captures pending rules and retains history; no double-dispatch. Existing Board shortcuts unchanged. |
| Independence | Controlled game trace proves toggling preserves active game, score/queue/Hold/penetrator/clocks/settings/history except normal elapsed running time; no cookies/URL or download/upload effect caused by toggles. |
| Files and settings | Native JSON and SQLite Save/Restore with panels shown/hidden, restored history/settings while hidden, busy/error state hide/show, six native editing controls and unchanged portable file fields. |
| Lifetime and accessibility | New mount defaults, two-view independence/unique IDs, teardown, retained-controller remount, internal focus without pause, existing external pause, help description and focus retention. |
| Distribution | Managed Chromium/Firefox on source, built and actual ZIP-extracted relative-prefix deployment. Source-only fixtures supplement but cannot replace real shipped entry acceptance. |

Retain existing gameplay/persistence/leaderboard/file suites, meaningful type/boundary/package checks and strict distribution exclusions. Adapt obsolete location/disclosure/lifecycle selectors to the explicitly changed contracts; do not remove their preserved behavioral assertions. Native headed-window/actual HTTPS checks remain separately identified when unavailable.

## UL-10 — Delivery and exclusions

Deliver the existing static browser application with accurate layout/toggle/lifecycle/help and responsive guidance, reproducible browser ZIP/checksum, local assets and unchanged stable public asset names. Preserve earlier tags/releases and completed task ranges. No new platform, backend, dependency framework, visibility persistence or gameplay capability is included. Package schema/file-format guides still describe only the six canonical game settings and existing version1 formats.
