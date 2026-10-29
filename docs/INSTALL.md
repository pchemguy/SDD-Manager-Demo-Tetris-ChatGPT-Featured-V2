# Install the browser game

Extract the static browser ZIP and copy its contents, including assets/, to a static HTTP host. Open index.html through that host. Hosting below a prefix such as /games/tetris/ is supported. Direct file:// loading is not a supported deployment mode.

For a local development preview, run `python -m http.server 8080 --bind 127.0.0.1` in the extracted directory, then open http://127.0.0.1:8080/. Python is only one optional way to serve static files; the player's browser needs no Python, Node.js, account or backend service.

See [controls](CONTROLS.md). Keep the included LICENSE, third-party notices and BUILD-MANIFEST.json with the deployment. The adjacent .sha256 file verifies the exact downloaded ZIP bytes; embedded metadata identifies version 1.0.0.

## Verify the download

Compare the downloaded ZIP SHA-256 with the adjacent checksum file before extracting. GitHub assets use the stable name classic-tetris-browser.zip; BUILD-MANIFEST.json inside records the version and per-file digests. The release page supplies the source tag and performed checks. No signed desktop application or browser extension is included.
