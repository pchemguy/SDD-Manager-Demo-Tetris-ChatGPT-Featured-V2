# Penetrator mode

## Intended outcome

Add a bonus-funded penetrator ability to the existing [browser Tetris game](PROJECT.md). Activating it converts the current falling piece for the remainder of that piece's fall. It may pass through occupied cells without destroying or recoloring them; its locked placement must have all four occupied cells inside the visible board and overlap no settled cell.

A penetrating hard drop passes through intervening obstructions to the lowest valid straight-down placement for the current position/orientation. The visible ghost previews exactly that placement. Ordinary pieces keep their existing landing and collision behavior.

## Bonuses and presentation

Clearing exactly four lines in one lock awards one penetrator bonus. Each activation spends one bonus; at most three accumulate, with excess awards discarded. A four-line clear by either an ordinary or penetrator piece qualifies. Passing through cells never clears lines; normal lock/clear/scoring remains atomic.

Show one lightning-bolt symbol per available bonus in the existing game info and controls panel, plus an accessible count including zero. Update the indicator immediately when a bonus is earned or spent. Penetrator pieces use white exclusively; regular pieces use no white fill or border. Preserve the logical seven-shape identity and existing bag, Next preview and classic scoring.

## Gameplay interactions

The following interactions define the capability:

- Use **B** while the playfield has focus to activate once during running play with an active ordinary piece and an available bonus. Key repeat, a second activation of the same piece, no bonus, paused/game-over/ready status or focus on native settings never spends a bonus or activates. Activation has no score cost or free initial grant.
- **Disable Hold while the penetrator is active**, including its keyboard commands, so the ability cannot transfer to another piece or create an implicit cancellation/refund. Lock ends the ability; the next piece is ordinary. Existing once-per-lock Hold rules otherwise remain.
- Allow falling, lateral movement and both rotations to overlap occupied cells temporarily, with existing board bounds and ordered rotation kicks. Accept a candidate only if at least one completely valid placement remains at or below it in the same column/orientation. This prevents an overlapping piece from becoming trapped without a legal lock; rejected moves leave state unchanged. No upward rescue, cell destruction or out-of-board passage is introduced.
- Treat the penetrator as grounded only at its lowest valid landing. Follow the selected general locking policy and hard-drop locking policy, including hard drop Off. Activation cancels a grounding countdown only when penetration opens a lower landing; otherwise it preserves the existing countdown. Repeated inputs never reset supported lock delay. Soft/hard-drop distance scoring remains unchanged.
- Start with **zero bonuses**. Start/Restart/reload reset the bank and ability; pause/resume freezes and retains them. Game over retains the final displayed bank but permits no activation. Ordinary blocked spawning still ends the game; there is no automatic activation to rescue a spawn.
- Render the active penetrator entirely white, its visible ghost with a white outline/pattern, and **retain white on its locked cells until those cells clear**. These settled cells behave as ordinary solid obstacles. During passage, underlying cells keep their original content/color and reappear unchanged when the active piece leaves. White is reserved for penetrator cells, not a global change to interface text.

## Retained scope and delivery

Respect all six [session-only settings](spec/session-configuration.md): ghost visibility remains live and uses the penetrating projected landing for its midline decision; Next preview remains independent; active hard-drop/Hold availability and both locking policies still govern. Keep existing geometry, seven-bag, clear scores, controls, pause/focus lifecycle and reusable logic/UI/browser separation except for the explicit penetrator changes above. No new setting, activation button, shape, scoring multiplier, persisted bonus bank, platform or multiplayer behavior is included.

Target a browser **v1.4.0** feature release after implementation, verification and integration, with the static ZIP/checksum and updated instructions. Windows Electron remains future scope.
