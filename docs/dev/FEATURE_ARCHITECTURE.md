# Modern rules architecture delta

## Context and retained arrangement

[FEATURE](FEATURE.md) extends the released game through the four blocks in [ARCHITECTURE](ARCHITECTURE.md): pure rules, transactional session, shared DOM view and browser host. Preserve the current dependency direction, language/toolchain, static deployment and DOM-free rules/session compilation. No engine replacement, platform framework, worker or backend is introduced.

## Changed responsibilities

The rules block adds deterministic kick-assisted rotation and landing projection. A pure bag transformation consumes explicit random values and returns owned bag state; it never reads global randomness. Existing placement/lock/clear/progression primitives remain reusable. The ghost and hard drop share the same landing rule so they cannot disagree.

The session is the sole authority for active/settled pieces, held type, hold eligibility, upcoming bag sequence, gravity remainder, landing countdown and active session options. Clone every mutable collection before a transaction; publish one coherent detached snapshot only after all validation and random draws succeed. An injected random callback's external side effects cannot be rolled back; internal bag/queue state must still be atomic on failure.

The session consumes elapsed durations and orders gravity and lock deadlines explicitly. Lock timing is separate from gravity accumulation. Landing establishes a full interval; continuous support preserves it, leaving support cancels it, and a new landing establishes a new deadline. No DOM or real scheduler is needed to test those rules. Pause retains both clocks and all piece-flow state.

The shared view renders snapshots, emits semantic gameplay actions and captures the next-session immediate-hard-drop option. Configuration changes are pending input, not live rules-state mutation. The browser host supplies those options only with start/restart, maps new keys to actions and retains its frame/focus/visibility/disposal ownership. A session restart reuses the same composed session/view; it does not leak listeners or frames.

## Invariants and compatibility

Maintain one canonical placement rule, one bag cursor and one landing calculation. Do not duplicate collision rules in the view, preview UI or input handlers. Snapshot extension is additive for consumers, while changed actions and timing intentionally supersede the corresponding classic behavior under the feature specification. The active session's option is copied at start/restart and is fixed for that session; pending UI choices cannot alter it mid-piece.

Retain the strict visible-board ceiling and blocked-spawn game over, including hold replacements. Presentation exposes exactly one upcoming type; remaining bag state is internal. No selectable classic mode or full Guideline-compliance claim is added. Existing completed reports/releases are historical and unchanged.

## Verification seams

Pure fixtures exercise every kick transition, rejected placements, bag permutations and landing equivalence. Session tests exercise exact clocks, command eligibility, hold/queue state, random failure and snapshot isolation. Browser tests exercise real semantic controls/keys, settings, board/ghost/miniatures, narrow layout and lifecycle teardown. Archive checks and actual extracted-prefix tests preserve delivery integrity. Detailed components belong to [FEATURE_DECOMPOSITION](FEATURE_DECOMPOSITION.md), contracts to FEATURE-SPEC and physical ownership to FEATURE-PLAN/layout.
