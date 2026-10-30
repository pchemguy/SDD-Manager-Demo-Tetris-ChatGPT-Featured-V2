# SPEC review report

## Current gate

Ready for current browser-persistence SPEC conformance. Revision6 below records the exact current roots/children and governing states; earlier observations/source identities remain historical. This technical gate is separate from pending T046 phase completion/integration/release.

Prior gate snapshot retained:

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

## Revision 6 — Browser persistence incorporation

2026-10-30, scoped spec owner assessment during T046 accepted incorporation.

| Current source | Blob |
| --- | --- |
| PROJECT.md | 9a949fdbd1ce006ff42c1cbd86190d63f55a6f19 |
| ARCHITECTURE.md | 34a96554ed75dcd17d1e6d419fd1c4d5ab773499 |
| DECOMPOSITION.md | f82aca90c934997eef958cd667b08bd6f776be30 |
| SPEC.md | 42b8dfcf0fe953b8f296ae610f8d2d7340cdff3d |
| PLAN.md | bc64f810c2111977fab8700abf9da9bafd9d0f04 |
| layout.md | 0c36df5acc407d3014cf5a1dd9765c0533c45326 |
| TASKS.md | ba31674e112f68cdc0099d5994806119702f38a1 |
| spec/session-configuration.md | aac39edc636a1b2dad1242ebe6bdb8802dce32b0 |
| spec/ghost-visibility.md | 75500e057435e0bb55594589a333299f7c7cddd6 |
| spec/modern-rules.md | b7abdf998767aa1702bcf906ad5123095bb315fe |
| spec/penetrator.md | 5e376fa0ff98c80d71f332f702498da5ea3212fd |
| spec/configuration-persistence.md | 45accd130c0ce197d46aa6c252199b0994a2b9a3 |

Checked coherent current PROJECT/architecture/C01–C08 ownership and R/F/G/S/P/U contracts. U01–08 exactly preserve accepted six fields/formats, independent precedence, explicit-default saves, omitted/invalid retention, cookie scope/lifetime, independent failures, unchanged controller APIs/history semantics and no game restore. R09/S01/S07/G02/F07 no longer make a contradictory universal browser reload-default/no-URL claim; pure contexts stay storage-free. Canonical U child owns browser persistence, while S owns selected values/active timing and other children preserve gameplay. Existing default values are defaults when no source supplies a value, not mandatory reload values. No new gameplay setting/platform/API scope was invented. All contract groups have objective model/injected/native/package evidence routes.

Cross-document checks compare accepted archived005 sources with current owners, literal source/domain/default interfaces, actual code/tests, declared build/package and prior-range preservation. Confirmed conformance findings: None. Gate Ready; no deferred contract issue or new human decision. Runtime/package results remain separately owned by6.1/6.2 and final phase evidence; archive status does not certify a new run. Native headed OS focus/actual HTTPS engine and future Electron limits remain explicit. Task046 is not marked complete by this document QC.

## Revision 7 — Session leaderboard current owners (T052)

Current gate: Ready for the scoped current document contracts and decomposition. L01–08 and R06/R08 links match C04/C05/C06/C09 final ownership; atomic final score, stable ranking, errors/detachment, restart/page lifetime, semantic projection, no score storage and unchanged gameplay/settings all have objective acceptance. No confirmed unresolved conformance finding; phase implementation review/verification and actual integration/release outcomes are separately owned. Routine completion/status evidence does not change task decomposition.

| Current source | Git blob |
| --- | --- |
| PROJECT.md | `6a9e857d81763dcf9fb073a07bc4f5e39b27547c` |
| ARCHITECTURE.md | `0bfe9ce7dc414ab631f04aa546b2b079f92f1bff` |
| DECOMPOSITION.md | `12d64dcf7f94c20deb3429a8d064cf16aee011aa` |
| SPEC.md | `0a6c2e5d75b841741ac097d9e9b2505ee5d6b9be` |
| PLAN.md | `4f6ad5ae7560aa2829901f615959bb217b77dade` |
| layout.md | `378816622a1a7801f9aa1efd707e8188b20dfee9` |
| TASKS.md | `fbdfbd34f7b82abfbb70aa25e21cb2ee195c66cb` |
| spec/leaderboard.md | `e699e3f6687d541a53a42c5c83c8645166cbd322` |

## Revision 8 — Manual file current owners (T061)

Owner assessment: Ready for the scoped current contracts, hierarchy and allocation; independent incorporation recheck Ready. File F01–12 in the current child implement the accepted complete records, exact formats, all-six checked restoration, retained gameplay, failure/resource limits and static distribution. Modern F IDs remain separately document-scoped. Current R09 admits local worker/WASM and explicit metadata inputs; L02–L05 use complete results and manual replacement while L07 isolates ordinary completion effects. C01–C11 dependency direction and canonical six setting domains remain coherent. All affected groups retain objective model/native/independent/package acceptance; no product decision or seventh setting is introduced.

No owner-confirmed unresolved conformance finding. Runtime verification and provider completion remain separately attributed to the phase report; pending task status is not a product decomposition change. Final source identities below include only status/evidence completion updates after review; hierarchy and contracts remain unchanged.

Independent DOC-T061-00/01/02 recheck Ready: universal no-worker claim, conflicting dependency restrictions and inaccurate duplicate-key parser ordering are corrected. No unresolved finding. Status-only initial061 completion and semantic transfer preserve the reviewed hierarchy; implementation/provider effects are separately reported.

| Current source | SHA-256 |
| --- | --- |
| PROJECT.md | `1fae763366b8b9f2f285eba7c1a2f37713a65398599b2a814d0ff9165c717f13` |
| ARCHITECTURE.md | `f9c5f5a73f21755c0abc863eb6407313d81d1eebdfe694cfd068c344a1a870f7` |
| DECOMPOSITION.md | `9f0c98024095b5289fafd31eba52bb4134b7aa18195cc20bec588f69cd492967` |
| SPEC.md | `0c375f850fb40379d10ed539ffd5e267ce5cdc70ba2a3360b265a4c17e933761` |
| PLAN.md | `52951a55b83cd537926a072df2c217a403244b77f4f8c2c7e67dc0cdf79ba90a` |
| layout.md | `0d3ebd2bae492c3b494ddf499c6409c5c0bc545c8bf7227d29b69afeac888c88` |
| TASKS.md | `637b6e69c9edc8618e4de492d0c8c5164669f4fbe7916c4352d7fdfb25291381` |
| spec/leaderboard.md | `9d685067c2c2ee642721c0ac27aed27d213b8b52e8790d5b8a6e9effeaee3cba` |
| spec/file-persistence.md | `87063e4d40f72ca1be7e4988eb8ff85ee9a3f4fded6ee536e1eb3c2c58ad4208` |
