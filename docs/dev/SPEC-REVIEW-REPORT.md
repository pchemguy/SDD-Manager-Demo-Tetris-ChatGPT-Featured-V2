# SPEC review report

## Current gate

State: Ready for PLAN. Review scope is SPEC/design conformance, not implementation or whole-package QC. No unresolved finding blocks planning.

## Reviewed identities

| Document | Git blob |
| --- | --- |
| [PROJECT.md](PROJECT.md) | `c321b57d5b4033f67170b13f8fb3b9b920cde0e7` |
| [ARCHITECTURE.md](ARCHITECTURE.md) | `9f25f4b30b84e2b9d95eeb920ffa0b399a657bce` |
| [DECOMPOSITION.md](DECOMPOSITION.md) | `7ee0b9887853edaf73e78053d5abadb7ded5d94e` |
| [SPEC.md](SPEC.md) | `6f3bcf0d11f9446e9ca894aa5ba2bef69e996d38` |

## Initial review

Reviewed on 2026-10-29 by the author acting as sdd-specify. Compared the complete SPEC with the accepted brief and design, traced each contract to its responsible components, and walked success, rejection, time, lifecycle and error cases. No software or browser test has run during this document review.

| Coverage | Assessment |
| --- | --- |
| PROJECT scope and exclusions | R-01 through R-07 provide the classic loop; R-09/R-11 preserve reuse and browser delivery. Excluded modern features and Electron are not introduced. |
| C-01/C-02 geometry and board ownership | R-01/R-02/R-03/R-04 settle coordinate, spawn, no-kick rotation, lock, compaction and top-out boundaries without UI ownership. |
| C-03 progression | R-04/R-05 give precise score/level/interval ordering and timing boundaries. |
| C-04 orchestration | R-05/R-06/R-08 specify atomic transitions, snapshot isolation, statuses, notification and error behavior. |
| C-05/C-06 UI and host | R-07/R-09/R-10 separate semantic UI from global input/time and cover native-button conflicts, focus, teardown and browser evidence limits. |
| Distribution and objective acceptance | R-11/R-12 give static hosting, archive exclusion, release ordering and inspectable success/failure scenarios. |

Scope/count assessment: one cohesive root is sufficient for this small system; there are no focused children and no delivery-count diagnostic at the SPEC stage. Exact scoring, piece tables, controls and timing precision instantiate the accepted classic scope rather than add a new gameplay capability.

No confirmed conformance defect was found. Reviewed specifically that successful soft drop does not create a lock delay, failed soft drop can lock immediately, pause preserves only the gravity remainder, and browser stalls cannot cascade locks. An advance call's model behavior is distinct from the browser delta clamp. Listener-error handling preserves the single authoritative state owner.

Checks performed: manual contract/design coverage and boundary walkthrough; local Markdown heading/whitespace checks; Git content identities. Provisioning, build, runtime, native window focus and screenshot behavior remain implementation verification work. Ready here does not certify those behaviors.

## Revision 1

Finding S-01: R-08 described an injected listener-error callback without including its optional parameter in the constructor signature, and left immediate subscription delivery unspecified. The sdd-specify owner clarified createSession(random, onListenerError?) and specified that subscribe does not synchronously deliver an initial snapshot. This makes the existing orchestration contract directly implementable without adding product scope.

Revised SPEC blob: `87368c5c720058b401f6ef3bc3b3cfceb06fcc26`. Rechecked notification count, observer failure containment, constructor defaults and snapshot acquisition against C-04/C-06. S-01 is resolved. The initial identity table retains the original reviewed state; this revision identifies the current state. Gate remains Ready for PLAN. No runtime evidence is claimed.

## Revision — Modern phase incorporation (T-023)

Current gate: Ready. Author acting as the owning SDD document reviewer reassessed the complete affected current roots/children after incorporation, separately from implementation checks. Original review cycles above remain historical.

F-01–F-08 precisely own ordered kick tables, bag/hold/preview, countdown resets and event priority, drop/options, key eligibility, rollback and objective delivery acceptance. No superseded immediate-lock/no-kick/independent-draw claim remains in current contracts. Geometry, scoring, lifecycle, observer and portability constraints remain coherent. No unresolved conformance finding. Markdown/link and unique ownership checks accompany this revision.

| Current document | Git blob |
| --- | --- |
| PROJECT.md | `bc2925077d83e9ccdf1e694958c7ba4c4bca1464` |
| ARCHITECTURE.md | `ae79154070ca1f3f1aaea9c3457caa331c5f3022` |
| DECOMPOSITION.md | `1d2a442a33d09b93ec0356b5edb73d854de3812c` |
| SPEC.md | `7e100f019cb27252f2d05da6256b9acf4465efcc` |
| spec/modern-rules.md | `94c48da6aa62b9df364f7ba91d94e4323b394fdd` |

## Revision 2 — Conditional ghost incorporation

Current gate: Ready. Acting as the owning SDD document reviewer, reassessed the complete affected roots/children after accepted incorporation. Original review cycles remain historical.

G-01–G-05 precisely preserve the approved predicate/default/lifetime, immediate common cell/text suppression, canonical ghost/model APIs, native focus and distribution acceptance. R-07/modernF-06 route to this child without conflicting unconditional-visibility claims. Design places preference/snapshot state only in C-05; no unaccepted gameplay behavior or persistent format introduced. Local links/Markdown, current identities and unique ownership checks accompany this review; no unresolved conformance finding.

| Source | Git blob |
| --- | --- |
| PROJECT.md | `bc855e160202edf9f018f7a71bfdcd7788d48eec` |
| ARCHITECTURE.md | `9e10f8aa686ed91059b22740ce20daed49041804` |
| DECOMPOSITION.md | `be45188ac12ad4844782d880ba6c69ba16890fb0` |
| SPEC.md | `696c4916aa7bdd79413da3ec98cf85841d98875f` |
| spec/modern-rules.md | `f1ccc4c59596278d5bd2098d171bfee559626508` |
| spec/ghost-visibility.md | `e0cb0f3ea461678564aefae36ea0138666ab69be` |

## Revision 3 — CG-DOC2 portability clarification

Post-integration recheck found R-09 still said only the nonpersistent next-game option was supported, despite R-07/G-02 adding the display preference. Clarified R-09 to name both independently owned nonpersistent settings and their reload defaults. This removes an inherited scope contradiction; it adds no requirement or application/session API change. Existing G-01–G-05 tests, package and release source remain valid/byte-identical. Current conformance Ready after focused recheck; prior cycles and release tag remain unchanged.

| Source | Git blob |
| --- | --- |
| SPEC.md | `e9bc52b633badcbcadfce8356739fcc331e19b70` |
| spec/ghost-visibility.md | `e0cb0f3ea461678564aefae36ea0138666ab69be` |
| spec/modern-rules.md | `f1ccc4c59596278d5bd2098d171bfee559626508` |

## Revision 4 — Session-only configuration incorporation

Current gate: Ready. Acting as the owning document reviewer, assessed the complete affected current owners after accepted incorporation; earlier cycles remain historical.

All current roots/children form one coherent supported contract. S-01–S-08 is represented in C-07 selected memory/C-04 copied rules/C-05 controlled displays/C-06 projection, exact errors/rollback, both general/drop policy paths and disabled actions. Root R-03/R-05/R-07/R-08/R-09/R-12 and F-03–F-08/G-01–G-05 remove obsolete universal claims. Geometry/bag/scoring and legacy compatibility retained; explicit page lifetime/no storage, native accessibility and feasible delivery acceptance are objective. Independent phase reviewer inspected the incorporated set without findings. No unresolved conformance finding. Links/unique ownership and actual task-closing diffs are checked separately before publication.

| Source | Git blob |
| --- | --- |
| PROJECT.md | `5a41f3eecc2745ca30db3d7cab7bfecce28bfa83` |
| ARCHITECTURE.md | `ed0dc550d8b893470ccf136c4ff4c48ec7305eec` |
| DECOMPOSITION.md | `30735a797553929a9b19687ad87122bc4b204e38` |
| SPEC.md | `facd16e90723a22483edb03285d8e30a68fcb70f` |
| spec/modern-rules.md | `4a039e03f16f61d4b6a3c5afa41df4f0d3f64284` |
| spec/ghost-visibility.md | `a0b38cad3632effb29e483c403444a0bb7fbe44d` |
| spec/session-configuration.md | `ce2ce1e65a3df7da08c087d867bdaad5c7cab53d` |

## Revision 5 — Penetrator incorporation

Current gate: Ready. Reassessed complete affected current roots/children against accepted004 scope and independent phase review. Earlier cycles remain historical.

P01–08 incorporated without changing accepted bodies; ordinary/final non-overlap, mode-sensitive support/projection, guarded kicks, coupled mask, inventory/Hold/timing/API/error/native/display contracts agree with current boundaries. Six selected values unchanged; no unresolved ambiguity or unaccepted behavior. Current link/Markdown/unique-owner checks pass; no unresolved conformance finding. Runtime/release outcomes remain separate report evidence.

| Source | Git blob |
| --- | --- |
| PROJECT.md | `0920f5be81ec3b05403ed7482332753d755189a0` |
| ARCHITECTURE.md | `36b58d4da6d85a2445c455af7dfcb60bd6d166ec` |
| DECOMPOSITION.md | `290e8dc38f4b7bd4d7ca66b14b7e5516a95086b6` |
| SPEC.md | `a9b70229397f273950194eed5ca0f524699f5995` |
| spec/penetrator.md | `dccdca409889b3e2cbd49b2a40635b9807d5dcc8` |
| spec/modern-rules.md | `f60c8678b864c28ec6a6c3385d4a4ab309558a3c` |
| spec/ghost-visibility.md | `4e1e4ca01e35098f2209af8952841666ddab83bb` |
| spec/session-configuration.md | `e4038eb6eb7606dd283c81bb9877d4645d5cc832` |
