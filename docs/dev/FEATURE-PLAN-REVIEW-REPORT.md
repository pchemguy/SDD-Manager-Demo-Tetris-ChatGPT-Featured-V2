# File persistence plan and layout review

## Current gate

Strategy: Ready. Combined PLAN/layout gate for TASKS: Blocked pending the scheduled FDOCS-007 physical allocation. This is a staging dependency, not a known strategy defect. Reviewed FEATURE-PLAN against Ready FEATURE-SPEC/design at published841f621003c90eb0d4fc8d5f0de68dd29cfecc91. Exact states:

- `FEATURE-PLAN.md` SHA-256 `70de723586e9800727a0026eaf57f83742f9aac73a626587ec7f2afeffdaa09a`.
- `FEATURE-SPEC.md` SHA-256 `88eaa1c9270a47f1071c72d705015b055d92a9f5649e21c03b731a8a45f59848`.
- `FEATURE-SPEC-REVIEW-REPORT.md` SHA-256 `3cefb9b934741d6cc7e7294e9a9cc5f04d37eb106444055d96274e5f29b1838c`.
- `FEATURE_ARCHITECTURE.md` SHA-256 `bf4ab38d8dd7fa3bb4c8f87976272c2230771752772642672a18bdbb02adefb3`.
- `FEATURE_DECOMPOSITION.md` SHA-256 `6089cd932cbac4a1f5793699a214a5ec0494b607d9f48567a79d4c2046f41b8f`.

## Initial strategy review

Reviewer: coordinating agent,2026-10-30. Manual contract-to-milestone mapping and dependency/scope/lifecycle assessment, current package allowlist inspection, exact source hashes and `git diff --check`; no independent review or runtime execution claimed.

| Phase | Delivery milestones | Excluded review units | Scope/count assessment |
| --- | --- | --- | --- |
| 8 | 2:8.1 and8.2 | One:8.3 | Retain the small count: useful JSON transfer first, equivalent SQLite/static delivery second. Shared metadata/validation/commit work is cohesive; splitting extra purely technical milestones delays integrated evidence without useful independent scope. |

F01–12 all map to staged outcomes and objective exits. Full two-format delivery is bounded; no unrelated persistence/platform scope.8.1 integrates JSON early with failures,8.2 covers lazy runtime and exact package,8.3 is a single final phase review. Both delivery milestones require reviews/reports/HANDOFF; TASKS derives the threshold-based dedicated/folded review allocation. Current package policy needs explicit schema/WASM extensions; strategy includes them rather than claiming existing packaging supports them. Earlier completed ranges and frozen records are preserved. No confirmed strategy finding; physical allocation remains the known prerequisite before executable tasks.
