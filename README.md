# Classic Tetris

A falling-block game for browsers and Windows with configurable hold, one next-piece preview, ghost visibility, seven-bag generation, both-direction SRS kicks, hard drop and an earned penetrator ability. Score, levels, pause/resume, restart and a session leaderboard complete the single-player game.

The Settings panel offers six remembered choices. Ghost visibility (Always hide / Hide above midline / Always show) and Next-piece preview apply immediately, including while paused. Hard drop, Hold piece, general locking policy and hard-drop locking policy apply on Start/Restart. Current rules and pending differences are shown separately. On reload or a later visit, each selection resolves independently from its explicit URL query value, then its saved cookie, then its default. Valid URL values, including defaults, save to cookies; omitted parameters retain saved values. Native edits update the corresponding cookie and URL. Game progress is not saved.

Defaults preserve modern play: ghost Always show, preview/Hard drop/Hold On, one full gravity interval after becoming grounded, and hard drop following that general policy. Failed downward movement is the alternative: contact alone does not lock; a blocked gravity or soft-drop attempt locks. Hard drop following that policy places the piece and waits for the next actual blocked downward attempt. Immediate hard-drop lock overrides either general policy. Turning pending hard drop Off disables its policy control while retaining its selection.

Hide above midline hides the whole ghost when its lowest occupied landing cell is in rows1–10 and restores it in rows11–20, including straddling pieces. Display choices never alter landing geometry, piece order or scoring.

Clearing four rows at once earns one penetrator bonus, capped at three. With the board focused, B spends one to turn the current piece white. It passes through occupied cells without destroying them; ghost and hard drop target the deepest valid non-overlapping landing. Hold is inhibited until lock. Locked cells stay white until cleared; normal pieces remain nonwhite. The selected locking policies still apply. Restart/reload reset bonuses and ability.

The Leaderboard panel shows the ten best completed-game scores for this page, highest first. Zero scores qualify; earlier completions rank first on ties. Start/Restart retains completed results but abandons an unfinished game. Reload or a new page clears history; leaderboard results are never saved in cookies, URLs or web storage. Saved settings keep their existing independent persistence.

Save and Restore at the bottom of Settings manually transfer the current top ten results and all six selected settings in one JSON or SQLite file. Hiding Settings hides both buttons and their format/status controls; showing it again preserves values and any operation state. Restore validates the entire file before replacing history and selected settings, including explicit cookie/URL updates for all six values. IDs and UTC completion timestamps remain stable. Current gameplay is retained; restored history lasts for the page session. See the [portable file format](docs/FILE-FORMAT.md).

## Panels and game controls

At 1440 CSS pixels and wider, panels run left to right: Leaderboard, Game info and controls, centered Board, Settings, Controls/help. The Board stays centered when supporting panels are hidden. Below 1440px, panels stack with the Board first and normal vertical scrolling; no horizontal scrolling is needed at 320px.

Three Show/Hide buttons in Game info independently control Leaderboard, Settings and Controls/help. Board and Game info remain shown. All supporting panels start shown; choices survive rendering, resizing, Restart and Restore within the view, and reset on a fresh mount/page. They are not game settings or saved-file fields.

The first lifecycle button is Start game when ready and Restart thereafter. The second is Pause while playing and Start while paused; paused Start continues the same game, with a visible explanation and accessible resume name. Board shortcuts retain Enter to start a ready game, R to restart and P/Escape to pause/resume. Hiding Settings neither cancels nor starts a file operation; a valid pending operation may finish while hidden.

## Play

Download a platform ZIP and its matching checksum from [Releases](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/latest). For Windows10/11x64, extract the complete Windows ZIP and double-click ClassicTetris.exe. The unsigned portable application bundles its runtime and works offline, with no separate Node.js installation or development server. Keep all extracted files together. For browsers, extract the browser ZIP and serve it using any static HTTP/HTTPS host; URL-prefix hosting is supported. Neither platform needs an account or backend service.

Use arrows to move/soft drop; Up/X rotates clockwise, Z counterclockwise, C/Shift holds, Space hard-drops and B activates a funded penetrator. See [controls and scoring](docs/CONTROLS.md) and [installation](docs/INSTALL.md). Space has meant hard drop since v1.1.0; it was a clockwise alias in v1.0.0.

Release1.9.0 supplies classic-tetris-browser.zip and classic-tetris-windows-x64.zip, each with its matching .sha256. The tag and embedded manifests identify the version. Windows delivery is a portable ZIP, with no installer, store package or updater. Desktop settings use a separate per-user profile; closing and reopening starts a fresh game/session leaderboard. Manually restore a saved file to recover results. The game retains classic line scores and a strict visible-board ceiling; no separate classic-mode selector, hidden rows, 180-degree rotation or extra scoring bonuses are included.

## Develop and verify

Use Node.js 24+, npm and Python 3.11+. [DEVELOPMENT](docs/DEVELOPMENT.md) describes repeatable setup, model/package/browser checks and isolated browser provisioning/recovery. Pure TypeScript rules/session and shared DOM UI are separate from browser input/timing and cookie/URL persistence shared by browser and desktop hosts.

Chromium headless shell and managed Firefox are used for actual source, built and extracted-prefix acceptance. Packaged Electron45.2.0 native acceptance runs on Windows Server2025 CI, including external-focus pause and single-instance behavior. Manual Windows10/11 installation and native headed browser focus remain unverified.

Current development authorities are [PROJECT](docs/dev/PROJECT.md), [SPEC](docs/dev/SPEC.md), [TASKS](docs/dev/TASKS.md) and [HANDOFF](docs/dev/HANDOFF.md). Development uses [SDD Manager](SDD-MANAGER.md); see the [AI-assisted development disclosure](AI_DISCLOSURE.md). License: [MIT](LICENSE), with [third-party notices](THIRD-PARTY-NOTICES.txt).
