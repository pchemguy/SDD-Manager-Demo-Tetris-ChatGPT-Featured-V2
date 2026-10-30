# UI layout specification review

## Current gate

Ready for dependent delivery planning. Human direction "Use autodoc" supplies subsequent-document preapproval; exact specification content and governing sources are unchanged. This assessment alone does not authorize task projection or implementation. No unresolved conformance findings.

## Exact reviewed state

- FEATURE-SPEC SHA-256: `87480ea0bec70277d83a628fc08c45488dcecf95e411a898b527c1a771a5860a`.
- Accepted FEATURE proposal: `93622d99e8b8753e2f547309f8e9f38f4824ef56`; human reply "k", recorded/published in `e41d2d97a3440377e363507e995adeaced34c04b`.
- Main governing sources remain at baseline `b7c98134963d5dde5fd9bb743b8117c485f3ef24`. Architecture reuse `1ddd8500e01fee9d7e6870f4e3bd903e111168fd`; decomposition reuse `b9f82f2d5d453adb6e6fad35f5b962dc25be0893`; both published with issue closures/readbacks.

| Governing source | SHA-256 |
| --- | --- |
| [FEATURE.md](FEATURE.md) | `4cbf0ac46c7b1897db4aa7e1736a48af34cfe0ab128c92e5eeb675e8189f1ff9` |
| [PROJECT.md](PROJECT.md) | `1fae763366b8b9f2f285eba7c1a2f37713a65398599b2a814d0ff9165c717f13` |
| [ARCHITECTURE.md](ARCHITECTURE.md) | `f9c5f5a73f21755c0abc863eb6407313d81d1eebdfe694cfd068c344a1a870f7` |
| [DECOMPOSITION.md](DECOMPOSITION.md) | `9f0c98024095b5289fafd31eba52bb4134b7aa18195cc20bec588f69cd492967` |
| [SPEC.md](SPEC.md) | `0c375f850fb40379d10ed539ffd5e267ce5cdc70ba2a3360b265a4c17e933761` |
| [spec/modern-rules.md](spec/modern-rules.md) | `45c9c66fa781cbd384a14471bca6a1044a8e02c24747569252c6029438a3d86a` |
| [spec/session-configuration.md](spec/session-configuration.md) | `9d34de79bc7669f84c40f99ff4f33580189945044c48d55e5f86faeebaa9090e` |
| [spec/leaderboard.md](spec/leaderboard.md) | `9d685067c2c2ee642721c0ac27aed27d213b8b52e8790d5b8a6e9effeaee3cba` |
| [spec/configuration-persistence.md](spec/configuration-persistence.md) | `f26fea76686970f9b5cb9767d2329a3bb71f610c3ba553348f5d959050295ed0` |
| [spec/file-persistence.md](spec/file-persistence.md) | `87063e4d40f72ca1be7e4988eb8ff85ee9a3f4fded6ee536e1eb3c2c58ad4208` |

## Conformance and coverage

| Concern | Assessment |
| --- | --- |
| Accepted feature coverage | UL01–03 establish five panels, absolute Board centering, permanently present essential panels and three independent controls in the required location. UL04 resolves exact lifecycle captions/actions. |
| Design ownership | UL05/08 retain C05 local UI state and C06 host lifecycle, unchanged C04/C07–C11 application/persistence boundaries. No new component or design overlay needed. |
| Explicit baseline deltas | Opening table names L06 position, modern F06/R07/R10 visual help and lifecycle controls, S07/File F05/F10 disclosure presentation and affected C05 descriptions. Main docs are retained until accepted incorporation. |
| Responsive refinement | UL02 fixes the accepted fallback at1440px with exact boundary tests, readable320px Board, no horizontal overflow and normal scrolling. All8 visibility combinations require viewport midpoint measurement, including asymmetric states. |
| State/format compatibility | UL05/06 prohibit visibility serialization or configuration fields, preserve gameplay/selected settings/history and permit legitimate asynchronous file completion while hidden. |
| Accessibility/resources | UL03/07/08 cover native keyboard isolation, disclosure state/IDs, hidden descendants, Board help, focus restoration, teardown and remount independence. |
| End-to-end evidence | UL09 requires actual source/built/extracted Chromium/Firefox acceptance plus independent absolute geometry and preserved existing suites. UL10 keeps static packaging/exclusions. |
| Scope/content boundary | Requirements describe product behavior, not preparation cursor/approval mechanics. No implementation tasks, new platform, new rule, dependency requirement or automatic persistence introduced. |

The1440px boundary, narrow content order and two-button caption table are bounded specification proposals refining the accepted brief, presented for human acceptance. They are not retrospectively attributed to a separate human choice. Existing theme and280px wide Board remain; no CSS algorithm is mandated.

## Checks and limits

Owner review compared accepted FEATURE, main design/behavior and observed `src/ui/game-view.ts`, `src/ui/styles.css`, `src/platform/browser/main.ts` for affected contracts and retained interfaces. Verified UL01–10 unique coverage, all affected conflicts explicitly declared, local links, Markdown separation and unchanged product/main-task scope. No source/runtime tests executed for documentation-only authoring; geometry/browser tests are required implementation acceptance, not claimed results. Counts are inapplicable to this specification review; no PLAN/TASKS authored.

## Findings

None. No correction/recheck cycle was needed. Human acceptance and whole-package QC/integration remain independent gates.

## Mode transition

The human selected autodoc after publication of specification `9d79248a07efbb9ad0a42e3f476f32d6cd84f37e`. Its content hash, source review and findings remain unchanged; no correction/recheck cycle is needed for this approval-policy change. FEATURE_PREPARATION retains actual preapproval and the FDOCS-008 stop before package QC. No separate interactive specification acceptance is claimed.
