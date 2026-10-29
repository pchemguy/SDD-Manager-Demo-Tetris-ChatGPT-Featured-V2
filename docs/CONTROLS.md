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

Native rotation, Hold, Hard drop, Start, Pause/Resume and Restart controls are keyboard operable. Single-action keys ignore repeat; movement/soft drop use native repeat. Buttons and the checkbox retain their ordinary keyboard behavior. Focus leaving the game, window blur or hiding the page pauses play; return does not resume automatically. Resume explicitly. Restart discards game state; reload returns to ready. There is no saved game.

## Pieces and planning

Each shuffled bag contains all seven shapes once; matching types may touch across bag boundaries. Next shows exactly one upcoming piece. Hold stores a type once per locked piece: an empty slot consumes Next, while an occupied slot swaps without consuming Next. Replacements use spawn orientation/position and fresh timers. A blocked spawn, including a held replacement, ends the game.

The patterned, dashed ghost shows the active piece's straight-down landing. Movement, rotation and hold update it; it never settles cells and yields visually when the active piece overlaps it. Rotation uses both-direction SRS kick tables inside the ten-by-twenty visible board. There are no hidden rows or 180-degree rotation.

## Landing and hard drop

A grounded piece locks after one full current gravity interval from landing. A nearly due gravity tick cannot shorten that interval. Grounded movement, rotation and blocked drops do not reset it. Leaving support cancels it; landing again grants a fresh full interval. Pause freezes the countdown.

Hard drop moves immediately to the ghost landing and awards two points per descended row. It uses the same landing delay by default, leaving adjustment or eligible hold available before lock. Repeated zero-distance delayed drops neither score nor extend the countdown.

Immediate hard-drop lock (next game) defaults off. When selected for Start/Restart, every hard drop locks immediately after placement, even at zero distance. Changing the checkbox during play affects only the next game; it does not alter current rules. Pause retains the selection; reload resets it off. Ordinary gravity and soft drop always retain the landing-delay policy.

## Scoring

Clear one/two/three/four rows for 40/100/300/1200 points multiplied by the level before the clear. Soft drop adds one point per moved row; hard drop adds two. Level increases every ten total lines; gravity accelerates to a 100ms minimum. There are no T-spin, combo, back-to-back or perfect-clear bonuses. These are the specified browser-game rules, not a full Tetris Guideline-compliance claim.
