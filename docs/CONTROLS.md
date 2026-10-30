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
| P / Escape | Pause or resume |
| Enter | Start a ready game |
| R | Restart |

Native rotation, Hold, Hard drop, Start, Pause/Resume and Restart controls are keyboard operable. Single-action keys ignore repeat; movement/soft drop use native repeat. Buttons and settings controls retain their ordinary keyboard behavior. Focus leaving the game, window blur or hiding the page pauses play; return does not resume automatically. Resume explicitly. Restart discards game state; reload returns to ready. There is no saved game.

## Pieces and planning

Each shuffled bag contains all seven shapes once; matching types may touch across bag boundaries. Next shows exactly one upcoming piece while Next-piece preview is On (the default). Switch it Off to conceal the name and miniature immediately, including while paused; the next piece is still generated and consumed normally. Hold stores a type once per locked piece: an empty slot consumes Next, while an occupied slot swaps without consuming Next. Replacements use spawn orientation/position and fresh timers. A blocked spawn, including a held replacement, ends the game.

The patterned, dashed ghost shows the active piece's straight-down landing. Movement, rotation and hold update it; it never settles cells and yields visually when the active piece overlaps it. Rotation uses both-direction SRS kick tables inside the ten-by-twenty visible board. There are no hidden rows or 180-degree rotation.

## Landing and hard drop

A grounded piece locks after one full current gravity interval from landing. A nearly due gravity tick cannot shorten that interval. Grounded movement, rotation and blocked drops do not reset it. Leaving support cancels it; landing again grants a fresh full interval. Pause freezes the countdown.

Hard drop moves immediately to the ghost landing and awards two points per descended row. It uses the same landing delay by default, leaving adjustment or eligible hold available before lock. Repeated zero-distance delayed drops neither score nor extend the countdown.

Immediate hard-drop lock (next game) defaults off. When selected for Start/Restart, every hard drop locks immediately after placement, even at zero distance. Changing the checkbox during play affects only the next game; it does not alter current rules. Pause retains the selection; reload resets it off. The selected general locking policy controls ordinary gravity and soft drop.

## Next-game rules

The Settings panel shows current rules and pending changes. Hard drop and Hold piece default On; switching either Off takes effect at Start/Restart and disables its action then. The Hold slot reads Off while disabled. Changing selections never pauses, resumes or restarts the current game.

General locking policy defaults to a full gravity interval after grounding, as described above. Failed downward movement instead locks when a gravity or soft-drop attempt is blocked. Contact alone does not lock, and gravity remainder is preserved. Under this policy, a hard drop following the general policy places the piece and waits for the next actual blocked downward attempt. Immediate hard-drop lock overrides either general policy. Turning pending hard drop Off disables its policy control while retaining its value.

Selections survive game lifecycle changes and an explicit same-context remount; reload restores defaults. They are held only in memory, with no browser storage.

## Scoring

Clear one/two/three/four rows for 40/100/300/1200 points multiplied by the level before the clear. Soft drop adds one point per moved row; hard drop adds two. Level increases every ten total lines; gravity accelerates to a 100ms minimum. There are no T-spin, combo, back-to-back or perfect-clear bonuses. These are the specified browser-game rules, not a full Tetris Guideline-compliance claim.

## Ghost visibility

Ghost visibility defaults to Always show. Choose Hide above midline to hide the whole ghost when its lowest occupied landing cell is in rows1–10; it reappears in rows11–20, including when it straddles the midline. The selector acts immediately, including while paused. It survives start/restart and pause/resume in the current app, and resets to Always show on reload. Hidden ghosts do not announce a landing row. The canonical landing and hard-drop score/locking remain unchanged.

Choose Always hide to conceal the ghost at every height; the description reads Ghost hidden. All three modes act immediately and never change the canonical hard-drop landing. Ghost visibility and Next-piece preview are independent live display settings. All six settings use the same nonmodal panel and reset to sensible defaults on reload.
