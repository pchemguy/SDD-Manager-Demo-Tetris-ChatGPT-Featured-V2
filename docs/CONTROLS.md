# Controls and rules

Click Start game. The playfield receives keyboard focus; click it to regain focus when needed. Modern extensions are the default rules.

| Key | Action |
| --- | --- |
| Left / Right | Move one column |
| Down | Soft drop |
| Up / X | Rotate clockwise |
| Z | Rotate counterclockwise |
| C / Shift | Hold piece |
| Space | Hard drop |
| B | Activate penetrator (costs one bonus) |
| P / Escape | Pause or resume |
| Enter | Start a ready game |
| R | Restart |

Native rotation, Hold and Hard drop controls are keyboard operable. The first lifecycle button reads Start game when ready and Restart otherwise. The second reads Pause while running and Start while paused; paused Start resumes the existing game without resetting it, as its adjacent explanation states. It is disabled in Ready/Game Over. Single-action keys ignore repeat; movement/soft drop use native repeat. Buttons and settings controls retain their ordinary keyboard behavior. Focus leaving the game, window blur or hiding the page pauses play; return does not resume automatically. Resume explicitly. Restart discards game state; reload returns to ready. There is no saved game.

## Pieces and planning

Each shuffled bag contains all seven shapes once; matching types may touch across bag boundaries. Next shows exactly one upcoming piece while Next-piece preview is On (the default). Switch it Off to conceal the name and miniature immediately, including while paused; the next piece is still generated and consumed normally. Hold stores a type once per locked piece: an empty slot consumes Next, while an occupied slot swaps without consuming Next. Replacements use spawn orientation/position and fresh timers. A blocked spawn, including a held replacement, ends the game.

The patterned, dashed ghost shows the active piece's straight-down landing. Movement, rotation and hold update it; it never settles cells and yields visually when the active piece overlaps it. Rotation uses both-direction SRS kick tables inside the ten-by-twenty visible board. There are no hidden rows or 180-degree rotation.

## Landing and hard drop

By default, a grounded piece locks after one full current gravity interval from landing. A nearly due gravity tick cannot shorten that interval. Grounded movement, rotation and blocked drops do not reset it. Leaving support cancels it; landing again grants a fresh full interval. Pause freezes the countdown.

Hard drop moves immediately to the ghost landing and awards two points per descended row. It uses the same landing delay by default, leaving adjustment or eligible hold available before lock. Repeated zero-distance delayed drops neither score nor extend the countdown.

Immediate hard-drop lock (next game) defaults off. When selected for Start/Restart, every hard drop locks immediately after placement, even at zero distance. Changing the checkbox during play affects only the next game; it does not alter current rules. Pause retains the selection; reload restores it from the URL or its cookie. The selected general locking policy controls ordinary gravity and soft drop.

## Next-game rules

The Settings panel shows current rules and pending changes. Hard drop and Hold piece default On; switching either Off takes effect at Start/Restart and disables its action then. The Hold slot reads Off while disabled. Changing selections never pauses, resumes or restarts the current game.

General locking policy defaults to a full gravity interval after grounding, as described above. Failed downward movement instead locks when a gravity or soft-drop attempt is blocked. Contact alone does not lock, and gravity remainder is preserved. Under this policy, a hard drop following the general policy places the piece and waits for the next actual blocked downward attempt. Immediate hard-drop lock overrides either general policy. Turning pending hard drop Off disables its policy control while retaining its value.

Selections survive game lifecycle changes and an explicit same-context remount. The browser entry restores them from URL parameters or cookies on reload; independent explicitly created reusable contexts start with defaults.

## Scoring

Clear one/two/three/four rows for 40/100/300/1200 points multiplied by the level before the clear. Soft drop adds one point per moved row; hard drop adds two. Level increases every ten total lines; gravity accelerates to a 100ms minimum. There are no T-spin, combo, back-to-back or perfect-clear bonuses. These are the specified browser-game rules, not a full Tetris Guideline-compliance claim.

## Ghost visibility

Ghost visibility defaults to Always show. Choose Hide above midline to hide the whole ghost when its lowest occupied landing cell is in rows1–10; it reappears in rows11–20, including when it straddles the midline. The selector acts immediately, including while paused. It survives start/restart and pause/resume in the current app, and is restored from the URL or its cookie on reload. Hidden ghosts do not announce a landing row. The canonical landing and hard-drop score/locking remain unchanged.

Choose Always hide to conceal the ghost at every height; the description reads Ghost hidden. All three modes act immediately and never change the canonical hard-drop landing. Ghost visibility and Next-piece preview are independent live display settings. All six settings use the same nonmodal panel and resolve independently from URL, cookie and default on reload.

## Settings defaults and timing

| Control | Default | Applies |
| --- | --- | --- |
| Ghost visibility | Always show | Immediately; Always hide and Hide above midline also available |
| Hard drop | On | Next Start/Restart |
| Next-piece preview | On | Immediately |
| Immediate hard-drop lock | Off, following general policy | Next Start/Restart |
| General locking policy | Full gravity interval after grounding | Next Start/Restart; Failed downward movement also available |
| Hold piece | On | Next Start/Restart |

The panel stays editable in ready, playing, paused and game-over states. Native settings keys remain settings input; return focus to the playfield for game shortcuts. Current play buttons follow the active game, not pending choices. Disabled hard drop consumes Space without another action; disabled Hold consumes C/Shift without changing pieces. Each selected setting saves to its own cookie and current URL parameter. There is no localStorage/sessionStorage or live cross-tab synchronization.

## Penetrator bonuses

Clear four rows at once to earn one penetrator bonus; up to three accumulate. The game panel shows one ⚡ per available bonus, an accessible numeric count including zero, and an active/inactive mode description. Mode/count announcements update only when those values change. With the board focused, B spends one and turns the current piece white until it locks. Hold is unavailable during penetration; the held type is retained. Repeated B does not spend again.

A penetrator passes through occupied cells without changing them. Its movement and rotations must retain a valid in-board, non-overlapping landing at or below the candidate. Hard drop and the visible ghost use the deepest valid landing beyond obstacles. The selected general/hard-drop policies still apply; activation preserves a supported deadline, canceling it only if a lower landing opens. Locked penetrator cells stay white until cleared and act as ordinary obstacles. Regular pieces keep their nonwhite colors.

Pause retains the ability and bank. Start/Restart/reload reset both to zero/inactive. There is no free bonus, saved bank, extra setting or activation button.

## Remembered browser settings

On HTTP/HTTPS hosting, each setting loads independently from its explicit URL query value, then its saved cookie, then the default. Names and values are case-sensitive; booleans use true/false.

Valid explicit URL selections, including defaults, save to their own cookies. An omitted parameter retains its saved value. Native edits save that field and replace its current URL parameter without adding a history entry or reloading. Cookies last 365 days and are scoped to the app directory. Blocked browser persistence leaves in-memory play available. Reload restores selections into a fresh Ready game; scores, board and penetrator bonuses are not saved. The four gameplay selections still take effect only on Start/Restart; ghost/preview remain live.

| URL parameter / cookie suffix | Accepted query/cookie text | Default |
| --- | --- | --- |
| ghostVisibility | never / lower-half / always | always |
| hardDropEnabled | true / false | true |
| nextPreviewEnabled | true / false | true |
| hardDropLockPolicy | general / immediate | general |
| generalLockPolicy | failed-downward / gravity-interval | gravity-interval |
| holdEnabled | true / false | true |

For example, append ?ghostVisibility=never&holdEnabled=false to the deployed game URL. Each cookie is named tetris_config_ followed by its parameter name. Empty/invalid values fall back per setting without overwriting that cookie. The first occurrence of a repeated recognized query parameter wins; if invalid, use cookie/default fallback. Returning a setting to its default still saves that explicit value.

Edits preserve unrelated query values and the URL fragment while replacing the current history entry. Other already-open pages do not change automatically. On reload, a still-explicit URL value wins over a newer cookie; omit that parameter to use the cookie. Cookies are host-only, SameSite=Lax and Secure on HTTPS. Browser restrictions can prevent saving; no failure dialog or automatic retry is added. No board, score, piece sequence, timers, Hold slot or penetrator inventory is persisted.

## Session leaderboard

Leaderboard shows the ten best final Game Over scores for the current page, highest first. Zero scores qualify; earlier completions rank first when scores tie. Each completed game appears once, including a blocked Hold spawn. Restarting an unfinished game abandons it and submits no result.

Start/Restart preserves completed results while resetting the new game's score and gameplay state. Reloading or opening a fresh page clears the leaderboard. Scores are not saved in cookies, URL parameters or browser storage; remembered settings continue to restore independently. The panel needs no extra button or shortcut and does not move keyboard focus.

## Manual file snapshots

Use **Show Settings** when needed to reach the single **Save** and **Restore** buttons at its bottom. **Hide Settings** conceals them and related format/status controls, preserving their state; hiding never cancels an operation. Save offers a format choice; choose JSON or SQLite and Download to obtain one file containing the current top ten completed results and all six selected settings, including changes pending the next game. Cancel closes the choice without saving.

Restore opens a local file picker. A valid JSON or SQLite file replaces completed history and selected settings, updating their cookies and URL parameters. Display choices apply immediately; gameplay choices apply on Start/Restart. The current game is retained, with the normal pause-on-external-focus policy still active. Invalid files produce a clear error and do not change results or settings. History remains session-only: reload clears it until manually restored.

## Panel layout and visibility

At 1440 CSS pixels or wider, Leaderboard and Game info/controls sit left of the horizontally centered Board; Settings and Controls/help sit on its right. Below 1440px they stack: Board, Game info, Leaderboard, Settings, Controls/help. Normal vertical scrolling is allowed. The three independent Show/Hide buttons appear in Game info above both lifecycle buttons. They retain keyboard focus and expose whether their target is expanded; hidden content cannot be tabbed into. Board and Game info cannot be hidden.

All panels start shown. Visibility choices survive game actions, render/resize and manual Restore in the current view; a fresh mount or reload shows all panels. Visibility never changes cookies, URL parameters, portable settings or the current game. Hiding visual help keeps concise Board instructions available to assistive technology. Showing Settings after an operation reveals its retained success/error state; a pending operation can finish while it is hidden.

## Windows desktop behavior

The portable app uses the same controls, panels, six settings and file formats. Resize the window normally; native focus loss pauses and returning focus never resumes automatically. Close exits; reopen starts a fresh game/leaderboard and panel visibility while retaining selected settings in the separate desktop profile. A second launch focuses the existing game without resetting it. Manual JSON/SQLite Save/Restore transfers the session leaderboard and settings between browser and desktop. Native destination cancellation changes no application data; the export status reports browser handoff rather than a completed filesystem write.
