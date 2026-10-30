> Historical campaign007 source; current authorities are [PROJECT](../../PROJECT.md), [SPEC](../../SPEC.md), [PLAN](../../PLAN.md), [layout](../../layout.md) and [TASKS](../../TASKS.md). This archived source is not an executable owner.

# File persistence task conformance review

## Current gate

State: Ready for the subsequent whole-package QC stage, not execution authorization. FEATURE-TASKS preserves Phase8/milestones8.1–8.3 and covers F01–12 using Ready scoped SPEC and combined PLAN/layout inputs published through38c731059832c4db4b1f2a98528e532af3b3d874. Exact reviewed states:

- `FEATURE-TASKS.md` SHA-256 `6c38d62d72e38319145067e0b0d8832ed901c68f5ad7f6796f5d70f2ae6ec997`.
- `FEATURE-PLAN.md` SHA-256 `b3ca7735a46c16823dc1f41bcf4edcd6dd01527fff1aa2087ad35145e8213da4`.
- `FEATURE-PLAN-REVIEW-REPORT.md` SHA-256 `4cffebad4fc1c7d1a7d4568e2ca972c6bbbe50ec4ad675da25e59bd8a5db32e6`.
- `FEATURE-SPEC.md` SHA-256 `88eaa1c9270a47f1071c72d705015b055d92a9f5649e21c03b731a8a45f59848`.
- `FEATURE-SPEC-REVIEW-REPORT.md` SHA-256 `3cefb9b934741d6cc7e7294e9a9cc5f04d37eb106444055d96274e5f29b1838c`.
- `FEATURE_ARCHITECTURE.md` SHA-256 `bf4ab38d8dd7fa3bb4c8f87976272c2230771752772642672a18bdbb02adefb3`.
- `FEATURE_DECOMPOSITION.md` SHA-256 `6089cd932cbac4a1f5793699a214a5ec0494b607d9f48567a79d4c2046f41b8f`.

## Initial review

Reviewer: coordinating agent,2026-10-30. Manual task-to-contract/plan/allocation conformance, semantic size/dependency review, literal checklist/ID-count inspection, current main-task upper-bound check and `git diff --check`. No implementation, independent review or whole-package QC performed.

| Milestone | Delivery tasks | Excluded review tasks | Count and semantic assessment |
| --- | --- | --- | --- |
| 8.1 | 4:T053–056 | T057 | Metadata/consumer coherence, schema+JSON, checked apply, then native JSON integration are bounded collaborating units. Four deliveries across two delivery milestones require dedicated whole8.1 review, assigned to057. |
| 8.2 | 3:T058–060 | None | SQLite codec, native lifecycle/interoperability and reproducible distribution are distinct outcomes.060 owns folded whole8.2 review/report/HANDOFF and counts once. |
| 8.3 | None | T061 | Exactly one mandatory phase review/test/report/integration task, dependent on both delivery milestone closures. Excluded from delivery-count diagnostic. |

Main TASKS max52 and feature IDs53–61 are unique with one executable owner. Four-space Phase→Milestone→Task checklists, ordered prerequisites and threshold-based review placement conform. Metadata constructor updates stay atomic in053; no production timestamp fallback or board setter. Schema/generator/compiler inclusion is explicit in054.055 isolates strict apply from native changed-key persistence;056 integrates JSON before SQL.058 has independent SQLite inspection,059 real native/lifetime/built checks,060 full extracted distribution and local alias verification.061 owns final current-contract/task integration, release/provider verification and TODO aggregation. No unrelated phase scope or old task mutation is introduced.

Coverage: F01/11→053; F02/03→054; F06–08/11→055; F05/09/10→056; whole JSON acceptance→057; F04/09→058; cross-format/native/lifetime F01–11→059; F12 and full deployed acceptance→060; whole-phase/code/docs/integration→061. Physical files match allocation; all failures/docs/packaging exits have owners. Native unavailable checks are explicit limits, not unchecked native-only tasks. No confirmed conformance finding; earlier frozen packages and main task text are unchanged.

## Revision 1 — Native-persistence cross-references

Independent package reviewer located nonblocking P-R01: FEATURE-SPEC referenced U05/U06 for cookie attributes instead of owning U03/U04. Corrected those two pointers against actual current configuration-persistence headings; behavioral contracts and task scope/acceptance are unchanged. Revised FEATURE-SPEC SHA-256 `10ec54443ee1482bfc626a6718b626839711ee574737a82fd38e0527da49a645`. Focused reference/affected-conformance recheck Ready; prior initial source hashes remain historical reviewed identities. No runtime checks required by a reference-only correction.
