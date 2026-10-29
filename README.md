# Classic Tetris

A keyboard-playable classic Tetris browser game with score, levels, soft drop, pause/resume and restart. Pieces lock after one full gravity interval from landing. Grounded moves and blocked drops do not reset the countdown; leaving support and landing again grants a new interval.

## Play

Download the browser ZIP and checksum from [Releases](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/releases/latest). Extract and serve the contents using any static HTTP host, then open its index.html. Hosting below a URL prefix is supported. The player needs a browser; no Node.js installation, account or backend service is required.

See [installation](docs/INSTALL.md) and [controls and scoring](docs/CONTROLS.md). The release assets use stable names classic-tetris-browser.zip and classic-tetris-browser.zip.sha256; the tag and embedded BUILD-MANIFEST.json identify the version. These are static deployment assets, not an Electron installer or store package.

## Develop and verify

Use Node.js 24+, npm and Python 3.11+. See [DEVELOPMENT](docs/DEVELOPMENT.md) for repeatable setup, unit/package/browser checks, isolated browser provisioning and the observed restricted-host recovery. Game logic and UI use shared TypeScript with browser integration kept separate for future host reuse.

Chromium headless shell and managed Firefox were exercised against source, built and extracted applications. Native headed OS-window focus behavior is unverified. Both-direction kick rotation, landing-only lock delay, seven-bag generation, next-only preview and hold are implemented on the active feature branch; ghost and hard drop remain subsequent feature tasks.

Development scope and delivery records are in [PROJECT](docs/dev/PROJECT.md), [TASKS](docs/dev/TASKS.md) and [HANDOFF](docs/dev/HANDOFF.md). Development uses [SDD Manager](SDD-MANAGER.md); see the [AI-assisted development disclosure](AI_DISCLOSURE.md). License: [MIT](LICENSE), with [third-party notices](THIRD-PARTY-NOTICES.txt).
