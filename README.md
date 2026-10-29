# Classic Tetris

A browser falling-block game with hold, one next-piece preview, ghost projection, seven-bag generation, both-direction SRS kicks and hard drop. Score, levels, pause/resume and restart complete the single-player game.

Pieces lock after one full gravity interval from landing. Grounded moves/rotations and blocked drops preserve the countdown; leaving support and landing again grants a new interval. Hard drop follows that delay by default. A next-game checkbox selects immediate hard-drop locking when starting or restarting.

## Play

Download the browser ZIP and checksum from [Releases](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/latest), extract and serve the contents using any static HTTP host. Hosting below a URL prefix is supported. The player needs no Node.js, account or backend service.

Use arrows to move/soft drop; Up/X rotates clockwise, Z counterclockwise, C/Shift holds and Space hard-drops. See [controls and scoring](docs/CONTROLS.md) and [installation](docs/INSTALL.md). Space is hard drop in v1.1.0; it was a clockwise alias in v1.0.0.

Assets use stable names classic-tetris-browser.zip and classic-tetris-browser.zip.sha256. The tag and embedded BUILD-MANIFEST.json identify the version. This is a static browser deployment, not an Electron installer or store package. The game retains classic line scores and a strict visible-board ceiling; no separate classic-mode selector, hidden rows, 180-degree rotation or extra scoring bonuses are included.

## Develop and verify

Use Node.js 24+, npm and Python 3.11+. [DEVELOPMENT](docs/DEVELOPMENT.md) describes repeatable setup, model/package/browser checks and isolated browser provisioning/recovery. Pure TypeScript rules/session and shared DOM UI are separate from browser input/timing for future host reuse.

Chromium headless shell and managed Firefox are used for actual source, built and extracted-prefix acceptance. Native headed OS-window focus remains unverified; Windows Electron delivery is future scope.

Current development authorities are [PROJECT](docs/dev/PROJECT.md), [SPEC](docs/dev/SPEC.md), [TASKS](docs/dev/TASKS.md) and [HANDOFF](docs/dev/HANDOFF.md). Development uses [SDD Manager](SDD-MANAGER.md); see the [AI-assisted development disclosure](AI_DISCLOSURE.md). License: [MIT](LICENSE), with [third-party notices](THIRD-PARTY-NOTICES.txt).
