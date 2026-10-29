# Controls and classic rules

Click Start game. The playfield receives keyboard focus; click it to regain focus when needed.

| Key | Action |
| --- | --- |
| Left / Right | Move one column |
| Down | Soft drop |
| Up / X | Rotate clockwise |
| Space | Hard drop |
| Z | Rotate counterclockwise |
| C / Shift | Hold piece |
| P / Escape | Pause or resume |
| Enter | Start a ready game |
| R | Restart |

Native rotation, Start, Pause/Resume and Restart buttons are keyboard operable. Focus leaving the game, window blur or hiding the page pauses play; return does not resume automatically. Resume explicitly. Restart and reload discard the session; there is no saved game.

A grounded piece locks after one full current gravity interval from landing. Blocked soft drops and grounded moves/rotations do not shorten or reset that countdown. Leaving support cancels it; landing again grants a full interval. Pause freezes it. Rotation uses both-direction SRS kicks within the visible board. Hard drop moves to the ghost landing and awards two points per descended row. It uses the same countdown by default; repeated zero-distance drops neither score nor extend time. Each bag contains all seven shapes once, with possible repeats across bag boundaries. The Next panel shows only the single next piece, including across refills. Hold exchanges the active type once per lock. An empty slot consumes Next; an occupied slot swaps without consuming it. Replacements use spawn orientation and fresh timers; holding awards no points. The dashed, patterned ghost marks the active piece's straight-down landing. It changes with movement, rotation and hold, never settles cells, and yields to the active piece when they overlap. Select Immediate hard-drop lock (next game) to lock immediately after a hard drop, including zero-distance drops. The checkbox affects only the next Start/Restart, stays separate from current rules and resets off on reload. The current line-clear and soft-drop scores/speed are unchanged.

Clear one/two/three/four rows for 40/100/300/1200 points multiplied by the pre-clear level. Soft drop adds one point per row. Level increases every ten total lines; gravity accelerates to a 100 ms minimum. A blocked spawn ends the game. Use Restart for another try.
