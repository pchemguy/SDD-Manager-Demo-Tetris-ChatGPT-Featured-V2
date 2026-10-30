# Electron desktop architecture delta

The existing core, Session/configuration/leaderboard/file validation and shared DOM view remain authoritative. Add one desktop host around the exact static renderer build used by browser delivery. Electron supplies Chromium and Node within the distribution; players install neither. No second game implementation, frontend framework, generic platform registry or runtime server is introduced.

## Desktop boundary

The desktop main process creates one isolated BrowserWindow, owns application/window teardown, session/profile, local content access and native download behavior. The renderer uses the existing C06 web lifecycle and all C07–C11 interfaces. Node integration is disabled in renderer/workers/subframes, context isolation and sandboxing enabled, and no preload/IPC bridge is needed. Renderer/browser code never imports Electron or Node. Closing the window exits the app; normal blur/visibility pause still comes from shared host behavior.

Serve the bundled renderer at a fixed private HTTPS origin through Electron's in-process protocol handler. The handler maps only approved renderer assets to bundled files; it never opens a listening socket, resolves DNS or forwards remote requests. This retains the existing HTTP(S) cookie/URL/checked-Restore semantics without adding a custom-scheme branch to shared persistence. A dedicated desktop profile keeps six remembered values separate from browser state. A cold launch loads the fixed entry and creates a new game/session; a second process for the same active profile focuses the existing window without resetting it; no leaderboard or unfinished game is automatically restored.

Only known local assets and blob downloads are permitted. Reject unsupported methods/origins/paths, remote navigation/new windows, webviews and permission requests. Apply a restrictive content policy allowing bundled scripts/styles/worker and required WASM compilation; do not disable web security or bypass CSP. Resources include actual built worker/WASM/schema. Main-process host policies are testable independently of Electron; packaged runtime acceptance covers their composed behavior.

## Packaging and delivery

One deterministic desktop packager consumes the verified browser distribution and exact official Electron Windows x64 runtime with pinned version/checksum. Preserve vendor binaries/resources/licenses, add the app host/metadata and the shared renderer, and generate a manifest/checksum with strict exclusion and independent verification. Stable Windows ZIP/checksum assets supplement unchanged browser asset names in the same release. Vendor downloads are build-time only. Installation is extraction and executable launch; no Node/development server/network bootstrap is required.

Manual vendor-runtime packaging is selected over installer tooling because the requested artifact is portable and existing Python packaging can retain explicit allowlists/reproducibility. A new custom app scheme would require cookie/URL adapters; fixed intercepted HTTPS preserves the established web contracts. An embedded HTTP server adds port/process behavior without user benefit. The desktop origin is internal and not an internet service.

## Compatibility and sources

Retain current architecture's dependency direction and all UL/File/U/L/game contracts. Add only desktop host/package responsibilities; adapt player/developer/release guidance and current supported-platform statements after delivery. Native execution claims require actual available facilities; missing target-native facilities alone do not block cross-built artifact delivery.

Official references: [manual prebuilt runtime packaging](https://www.electronjs.org/docs/latest/tutorial/application-distribution), [protocol handlers](https://www.electronjs.org/docs/latest/api/protocol), [net/custom protocol behavior](https://www.electronjs.org/docs/latest/api/net), [security guidance](https://www.electronjs.org/docs/latest/tutorial/security), [stable release metadata](https://releases.electronjs.org/?channel=stable). Exact vendor bytes/version are pinned during implementation from verified release assets, not a moving latest URL.
