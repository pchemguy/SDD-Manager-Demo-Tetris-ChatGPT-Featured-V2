# Install the browser game

Extract the static browser ZIP and copy its contents, including assets/, to a static HTTP host. Open index.html through that host. Hosting below a prefix such as /games/tetris/ is supported. Direct file:// loading is not a supported deployment mode.

For a local development preview, run `python -m http.server 8080 --bind 127.0.0.1` in the extracted directory, then open http://127.0.0.1:8080/. Python is only one optional way to serve static files; the player's browser needs no Python, Node.js, account or backend service.

See [controls](CONTROLS.md). Keep the included LICENSE, third-party notices and BUILD-MANIFEST.json with the deployment. The adjacent .sha256 file verifies the exact downloaded ZIP bytes; embedded metadata identifies version 1.4.0.

## Verify the download

Compare the downloaded ZIP SHA-256 with the adjacent checksum file before extracting. GitHub assets use the stable name classic-tetris-browser.zip; BUILD-MANIFEST.json inside records the version and per-file digests. The release page supplies the source tag and performed checks. No signed desktop application or browser extension is included.

Settings are kept only for the loaded page session. Reload restores Ghost Always show, Next preview/Hard drop/Hold On, full-gravity-interval general locking and hard drop following the general policy. No browser storage or account is needed. Display settings act immediately; gameplay selections apply on Start/Restart.

Penetrator inventory starts at zero: earn a bonus with a four-line clear (maximum three), then use B on the focused board. Penetration and bonuses are game-local and reset on Start/Restart/reload; no extra setting or saved bank is provided. See controls for Hold inhibition, white cells and selected locking behavior.
