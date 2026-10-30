# Classic Tetris

A browser falling-block game with configurable hold, one next-piece preview, ghost visibility, seven-bag generation, both-direction SRS kicks, hard drop and an earned penetrator ability. Score, levels, pause/resume, restart and a session leaderboard complete the single-player game.

The Settings panel offers six remembered choices. Ghost visibility (Always hide / Hide above midline / Always show) and Next-piece preview apply immediately, including while paused. Hard drop, Hold piece, general locking policy and hard-drop locking policy apply on Start/Restart. Current rules and pending differences are shown separately. On reload or a later visit, each selection resolves independently from its explicit URL query value, then its saved cookie, then its default. Valid URL values, including defaults, save to cookies; omitted parameters retain saved values. Native edits update the corresponding cookie and URL. Game progress is not saved.

Defaults preserve modern play: ghost Always show, preview/Hard drop/Hold On, one full gravity interval after becoming grounded, and hard drop following that general policy. Failed downward movement is the alternative: contact alone does not lock; a blocked gravity or soft-drop attempt locks. Hard drop following that policy places the piece and waits for the next actual blocked downward attempt. Immediate hard-drop lock overrides either general policy. Turning pending hard drop Off disables its policy control while retaining its selection.

Hide above midline hides the whole ghost when its lowest occupied landing cell is in rows1–10 and restores it in rows11–20, including straddling pieces. Display choices never alter landing geometry, piece order or scoring.

Clearing four rows at once earns one penetrator bonus, capped at three. With the board focused, B spends one to turn the current piece white. It passes through occupied cells without destroying them; ghost and hard drop target the deepest valid non-overlapping landing. Hold is inhibited until lock. Locked cells stay white until cleared; normal pieces remain nonwhite. The selected locking policies still apply. Restart/reload reset bonuses and ability.

The Leaderboard panel shows the ten best completed-game scores for this page, highest first. Zero scores qualify; earlier completions rank first on ties. Start/Restart retains completed results but abandons an unfinished game. Reload or a new page clears history; leaderboard results are never saved in cookies, URLs or web storage. Saved settings keep their existing independent persistence.

## Play

Download the browser ZIP and checksum from [Releases](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/latest), extract and serve the contents using any static HTTP host. Hosting below a URL prefix is supported. The player needs no Node.js, account or backend service.

Use arrows to move/soft drop; Up/X rotates clockwise, Z counterclockwise, C/Shift holds, Space hard-drops and B activates a funded penetrator. See [controls and scoring](docs/CONTROLS.md) and [installation](docs/INSTALL.md). Space has meant hard drop since v1.1.0; it was a clockwise alias in v1.0.0.

Assets use stable names classic-tetris-browser.zip and classic-tetris-browser.zip.sha256. The tag and embedded BUILD-MANIFEST.json identify the version. This is a static browser deployment, not an Electron installer or store package. The game retains classic line scores and a strict visible-board ceiling; no separate classic-mode selector, hidden rows, 180-degree rotation or extra scoring bonuses are included.

## Develop and verify

Use Node.js 24+, npm and Python 3.11+. [DEVELOPMENT](docs/DEVELOPMENT.md) describes repeatable setup, model/package/browser checks and isolated browser provisioning/recovery. Pure TypeScript rules/session and shared DOM UI are separate from browser input/timing and cookie/URL persistence for future host reuse.

Chromium headless shell and managed Firefox are used for actual source, built and extracted-prefix acceptance. Native headed OS-window focus remains unverified; Windows Electron delivery is future scope.

Current development authorities are [PROJECT](docs/dev/PROJECT.md), [SPEC](docs/dev/SPEC.md), [TASKS](docs/dev/TASKS.md) and [HANDOFF](docs/dev/HANDOFF.md). Development uses [SDD Manager](SDD-MANAGER.md); see the [AI-assisted development disclosure](AI_DISCLOSURE.md). License: [MIT](LICENSE), with [third-party notices](THIRD-PARTY-NOTICES.txt).
