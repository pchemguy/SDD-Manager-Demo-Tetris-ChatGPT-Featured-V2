# Phase9 UI layout review

## Scope and authority

The accepted UI brief and autodoc/full-implementation authorization cover T062–068 through verified integration and1.8.0 release. Campaign baseline b7c98134963d5dde5fd9bb743b8117c485f3ef24; preparation84ab776db3911b8a2dd47466a2ca21c5c13f6e67 integrated through explicit main56f459d35d40600b2fc29ebc37dc5f2aaca9bc36. Feature execution creation parent/branch-off and return target are that actual main commit, not the older campaign baseline.

## Delivered behavior and review

Five persistent panels use viewport-centered Board/equal side tracks at1440px and responsive Board-first stacking below. Game info/Board always remain present; three independent native Show/Hide controls preserve view-local state/accessibility/focus through render/resize/Restart/Restore. Two lifecycle buttons implement the accepted four-status table; paused Start resumes the same game. Hidden Settings retains all six fields, native JSON/SQLite operations/errors and bottom Save/Restore. No serialized field, application action/interface or dependency changed. UL01–10 are incorporated into current authorities and sole main TASKS1–68.

Independent whole-phase implementation review Ready at ec13316d0b7222edfff29370e4e4a680648e1300 against56f459d, following separate whole9.1/9.2 reviews and repaired/rechecked coverage/readability findings. [9.1](9.1.md) and [9.2](9.2.md) retain individual observations. Current-document QC checks all affected roots/children/ownership/archive/navigation; its final result belongs to current adjacent review reports.

## Verification

Fresh clean install and complete pre-incorporation acceptance:457 unit tests,18 package-safety checks,2 environment cases and216 source/178 built/178 actual ZIP-extracted browser cases pass in managed Chromium and Firefox (572 formal browser cases; zero failure/skip/flaky). Four additional extracted320/1440 stress contexts with10near-MAX_SAFE_INTEGER scores and a genuine long Restore error pass geometry/overflow/clipping checks; screenshots inspected. Fresh final T068 type/schema/boundary/build/package verification,457 unit/18 package checks and28 actual extracted Chromium/Firefox UI/native hidden-file/schema cases pass (49.3s). Runtime/test/build/package inputs are byte-identical to this full-suite baseline.

Final browser1.8.0 ZIP:396114bytes, SHA256 `1df9b1335f59eae0ed752bfcedaca1608d17af7fc7132d68757cce436ee3b023`,15members/14content digests. Repeat actual build/package reproduces bytes; strict allowlist, manifest,CRC,member digests, schema/runtime/notices, aliases and filename-specific checksums pass. Source-only fixtures never ship. Finite600s/660s/25min limits remain.

## Task persistence and hosted tracking

Single-task initial closures:06283e0306;063cbba22f;064bace29a;065975b8b3;0664c8de53;067ec13316. Each result/evidence/checkoff was committed and published before dependent work. Native tasks143–148 and milestones35/36 are closed/read back. T068 transfers the exact completed hierarchy into sole main ownership and initially completes only068 with reports/current-doc reconciliation. Main1–61 byte prefix and frozen001–007 remain unchanged. Its publication and149/37 closures follow this task commit; integration/release outcomes belong to the final report and are not asserted in advance.

## Findings and limitations

UI-T063 coverage, UI-T064 obsolete selectors, UI-T065 help wrapping and UI-DOC-067 numeric guide spacing were repaired and rechecked. DOC-UI-068-01 stale current child/layout delivery metadata was normalized to current-version guidance without changing frozen reports or portable format1. All unresolved/deferred TODO:None.

Managed headless Linux browser checks do not establish native headed-window focus or actual HTTPS cookie-engine behavior. These retained environment limits do not imply skipped mandatory feature cases. Windows Electron is preapproved subsequent campaign scope; it is not delivered by this release.
