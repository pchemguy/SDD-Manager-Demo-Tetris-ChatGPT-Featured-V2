# Install Classic Tetris

## Windows portable app

Download classic-tetris-windows-x64.zip and its .sha256 from the same release. The target is Windows10/11x64. Verify the checksum, extract the complete directory to a writable user location, then double-click ClassicTetris.exe. Keep its DLLs, resources/ and locales/ beside it. No admin installation, separate Node.js/Python, development server or internet connection is required to play. This is an unsigned portable distribution; no installer, signing identity, store package or automatic updater is supplied.

The application keeps its own ClassicTetris profile under the current user's application-data directory; it does not reuse browser cookies or write settings beside the executable. Normal close flushes the six selected settings. Reopening starts Ready with an empty leaderboard and all supporting panels shown. A second launch of the same profile focuses the existing game. Manual Save/Restore is the way to transfer results/settings between browser and desktop. Native file dialogs select the input or output; canceling changes no results/settings. Save status means the file was handed to the destination flow, not that a canceled destination wrote a file.

README-WINDOWS.txt and DESKTOP-MANIFEST.json identify the portable package; the bundled renderer also retains the browser BUILD-MANIFEST.json. Root LICENSE and LICENSES.chromium.html are the Electron vendor notices; application/license/format guides remain with the renderer. Native packaged acceptance is verified on Windows Server2025 CI; manual installation on Windows10/11 is unverified.

## Browser deployment

Extract the static browser ZIP and copy its contents, including assets/ and schemas/, to a static HTTP/HTTPS host. Open index.html through that host. Hosting below a prefix such as /games/tetris/ is supported. Direct file:// loading is not a supported deployment mode.

For a local development preview, run `python -m http.server 8080 --bind 127.0.0.1` in the extracted directory, then open http://127.0.0.1:8080/. Python is only one optional way to serve static files; the player's browser needs no Python, Node.js, account or backend service.

See [controls](CONTROLS.md). Keep the included LICENSE, third-party notices and BUILD-MANIFEST.json with the deployment. The adjacent .sha256 file verifies the exact downloaded ZIP bytes; embedded metadata identifies version 1.9.0.

## Verify the download

Compare the downloaded ZIP SHA-256 with the adjacent checksum file before extracting. GitHub assets use the stable name classic-tetris-browser.zip; BUILD-MANIFEST.json inside records the version and per-file digests. The release page supplies the source tag and performed checks. The Windows pair is a separate unsigned portable application; the browser ZIP remains strictly static and contains no desktop host/runtime. On Windows, the built-in command `certutil -hashfile classic-tetris-windows-x64.zip SHA256` prints the ZIP digest for comparison; use the browser filename for that pair.

Settings restore per field from an explicit URL query value, then a saved cookie, then the default. Defaults are Ghost Always show, Next preview/Hard drop/Hold On, full-gravity-interval general locking and hard drop following the general policy. Valid explicit URL values save to cookies even when equal to defaults; an omitted parameter preserves its saved value. Every native setting edit saves its cookie and updates its URL parameter without reloading or adding history. Display settings act immediately; gameplay selections apply on Start/Restart.

Penetrator inventory starts at zero: earn a bonus with a four-line clear (maximum three), then use B on the focused board. Penetration and bonuses are game-local and reset on Start/Restart/reload; no extra setting or saved bank is provided. See controls for Hold inhibition, white cells and selected locking behavior.

Cookies last 365 days from each save, use SameSite=Lax and HTTPS Secure when applicable, and are limited to the host and application directory. Open the deployed directory URL with its trailing slash, or index.html, so directory scope matches the deployment. A root deployment uses root scope; sibling non-root deployments have distinct paths. Browser cookie policy or history restrictions may prevent a save without preventing in-memory play. No account, backend, localStorage/sessionStorage or live cross-tab synchronization is used. Explicit URL parameters keep priority on every reload; remove a parameter to use its saved cookie instead. See the exact names/values in controls.

Leaderboard history is memory-only for the current page. Game Over records one final score, including a blocked Hold spawn; Restart preserves completed results while abandoning an unfinished game. Reload or a new page clears the panel even when saved settings restore. No additional installation, storage permission or service is required.

Manual **Save** offers JSON or SQLite; **Restore** accepts either file and replaces the session leaderboard and all six selected settings. Files do not include unfinished games. Keep the local worker/runtime/WASM assets together; SQLite requires no server-side database, CDN or browser storage. The canonical [JSON Schema and SQLite contracts](FILE-FORMAT.md) ship with the deployment.

Panel layout adapts automatically: five columns at 1440 CSS pixels and above, stacked content below. Use the three independent Show/Hide buttons above Start/Restart and Pause/Start to control supporting panels; the Board remains horizontally centered. Visibility is local to the current view and does not require a cookie, permission or extra installation. The Board and Game info remain present, with normal vertical scrolling on short/narrow screens.
