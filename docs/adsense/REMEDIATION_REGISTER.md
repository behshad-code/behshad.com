# Behshad.com AdSense remediation register

**Source baseline:** Phase 1 audit, November 15, 2026 (20 findings, ADS-01–ADS-20).  
**Update:** November 21, 2026 Pacific time. Continued existing PR #90; authenticated evidence review and expanded isolated branch QA completed. Decisions and public-page edits below remain approval-gated.  
**Production:** No approved Phase 2 changes have been merged or deployed. The statuses below describe the development-branch candidate only.

| ID | Priority | Scope | Phase 2 development status | Release dependency |
| --- | --- | --- | --- | --- |
| ADS-01 | P1 | Three short executive bridge pages | Decision prepared; approval pending | Keep all three bridges indexable; restore production robots directives and original sitemap entries. Do not commit indexing changes before owner approval. |
| ADS-02 | P1 | M&A integration Home navigation | Implemented and branch browser verified | Home link label passed desktop/tablet/mobile; production awaits approved merge. |
| ADS-03 | P1 | M&A internal pre-publication instruction | Partially implemented; final editorial approval pending | Public sources and internal reports checked. Proposed qualitative scorecard removes internal numeric data from both HTML and JS; exact publication copy below. |
| ADS-04 | P1 | Health publication About and Privacy affiliate statements | Implemented and branch browser verified | Present-tense Amazon disclosure verified. Additional analytics-specific notice correction proposed under ADS-05; production pending. |
| ADS-05 | P1 | Product-specific GoatCounter event semantics | Investigation completed with runtime limitation; privacy approval pending | 15 product-level hooks confirmed in live DOM plus loaded script reference. Official GoatCounter documentation defines automatic event binding. Direct script inspection blocked by browser client; analytics dashboard requires login. No event transmission capture or visitor-profile claim. Recommend removing product hooks. |
| ADS-06 | P1 | Ballot Compass 2026 results sitemap omission | Implemented and technically verified in branch | Results URL is in candidate sitemap; live Google fetch succeeds with correct canonical. Recorded URL remains unknown without sitemap association; release/index request separately gated. |
| ADS-07 | P1 | Root hash-based navigation | No confirmed defect; preserve existing routing | All five root fragments pass rendered branch checks at three viewports. Fragment architecture is not established as an AdSense violation. |
| ADS-08 | P1 | Live deployment/accessibility verification | Branch technical gate passed; post-release gate pending | 67 targeted acceptance groups passed, plus existing 5 workflows. Current production is unchanged; repeat affected live checks after approved Pages release. |
| ADS-09 | P1 | Search Console indexing/coverage baseline | Authenticated read-only inspection completed | Performance comparison, six executive URL checks/comparisons, three live-fetch investigations, sitemap and separate manual/security reports reviewed. Private query/performance data retained outside public repository. No indexing request submitted. |
| ADS-10 | P2 | Public review sandbox indexability | Source verification passed; no cleanup needed | All 59 retained sandbox index.html pages carry noindex. No sandbox deleted or newly published; this is not proof of Google's entire live index. |
| ADS-11 | P2 | Health publication hub depth and discovery | Optional enhancement; proposed deferral | Existing publication/topic hierarchy and substantive prostate library verified; no confirmed defect warrants hub rewrite for this release. |
| ADS-12 | P2 | Ballot app performance and accessibility | Targeted branch runtime checks passed | Ballot landing/results layout, entry into workspace and results navigation pass desktop/tablet/mobile. No real Safari or complete assistive-technology certification claimed. |
| ADS-13 | P2 | Dated election results maintenance | Explicitly dated historical snapshot; proposed deferral | Public results page labels its November 10 review / November 9 data and unofficial status. No current-result rewrite or fresh factual certification performed. |
| ADS-14 | P2 | Medical editorial validation | Ongoing editorial control; proposed deferral | No new specific clinical error established. Preserve sourced educational prose, evidence limits and no-clinician-review disclosure. This release is not an independent full medical review. |
| ADS-15 | P2 | Recovery PDF accessibility | PDF delivery passed; accessibility limitation confirmed | Valid four-page letter-size, unencrypted PDF with no JavaScript; browser delivery passed. PDF is untagged; full reading order/screen-reader certification remains open. Existing HTML guide remains the accessible reading route; do not replace medical content. |
| ADS-16 | P2 | ads.txt / advertising setup | Exact ads.txt proposal prepared; approval pending | Verified publisher account ID and official Google format. No ads.txt or advertising-script change committed. |
| ADS-17 | P2 | Advertising privacy and consent | Required before ad activation; proposed deferred gate | No display-ad activation in this release. Update ad privacy notices and consent handling before serving ads; certified CMP/TCF for personalized EEA/UK/Swiss ads; non-personalized cookies can still require consent. |
| ADS-18 | P2 | Cross-publication governance | Optional governance enhancement; proposed deferral | Keep current separate publications and existing trust/navigation pages; no evidence requires a sitewide structural change. |
| ADS-19 | P3 | Documentation maintenance | Optional internal documentation maintenance; proposed deferral | Six/seven-category historical documentation drift is not a visitor-facing AdSense defect. Maintain this consolidated register. |
| ADS-20 | P2 | Regression and QA coverage | Expanded current-branch CI passed | New isolated release QA workflow: 18 routes x 3 viewports plus interaction/metadata/link/PDF groups, 67 passed, zero failures/browser errors. Final reviewed head must pass again after approved changes. |
| ADS-21 | P1 | M&A production footer “Private mockup” | Implemented and branch browser verified | Copyright retains normal identity without Private mockup; pending production release. |


## Current closeout state (November 21, 2026)

This table is the current consolidated disposition of all 21 findings. Sections headed Phase 2B below are historical evidence, not current open-work instructions. Proposed deferrals require owner acceptance as part of release review. No finding is closed merely to improve a count.

- Production main remains `a88ecd6bc686546b52cd8af32b8106a0eb21b811`.
- PR #90 remains draft and unmerged. Code QA head: `85bacf8d03f45c847917f566964e7cfa0435c607`. Subsequent register-only commits do not change website behavior.
- Added `scripts/qa-adsense-release.mjs` and `.github/workflows/adsense-release.yml` to test the isolated PR checkout. External network requests are blocked by this test; it sends no analytics or ad events.
- [Expanded browser run 44940209089](https://github.com/behshad-code/behshad.com/actions/runs/44940209089): **67 checks passed**, zero failures, zero uncaught browser errors. Desktop 1440x900, tablet 820x1180, mobile 390x844. Covers 18 routes, canonical/indexability, internal targets, visible image alternatives, document overflow, M&A keyboard/control behavior, home fragments, affiliate disclosures and link rel, Ballot results/workspace navigation, and PDF delivery.
- Existing workflows also passed at that code head: hierarchy [44940209083](https://github.com/behshad-code/behshad.com/actions/runs/44940209083), v2 [44940209091](https://github.com/behshad-code/behshad.com/actions/runs/44940209091), health browser [44940209084](https://github.com/behshad-code/behshad.com/actions/runs/44940209084), pre-existing hosted review [44940209062](https://github.com/behshad-code/behshad.com/actions/runs/44940209062), discovery/privacy [44940209092](https://github.com/behshad-code/behshad.com/actions/runs/44940209092).
- Initial new-test failures were test assumptions, corrected without Ballot changes: missing robots meta uses default index/follow; an unused hidden avatar is not a rendered image. These were not established site defects.
- Interactive local-server access was blocked in this environment; branch tests ran on GitHub-hosted Chromium instead. Screenshot artifacts were generated; full manual visual review and real Safari/screen-reader validation are not claimed.
- All 59 sandbox index.html sources have noindex. Candidate sitemap has 58 unique existing targets (three bridges removed by earlier proposal, results added). Approval to restore bridges would yield 61 targets.
- Authenticated Search Console: all three bridges remain indexed. The requested three-month comparison has a short available history; it does not support a material reason to remove established entries. M&A and Ballot root are discovered but unindexed; results remains unknown. All three important URLs pass live Google smartphone fetch, crawl/index permissions and self-canonical checks. No confirmed robots/canonical defect, no manual action and no security issue found. Sitemap is successful. No indexing request submitted.
- AdSense still reports Needs attention / Low value content and ads.txt Not found. Publisher account ID matched the site ownership metadata. Ownership verification configuration was not changed; no review requested.
- Recovery product event semantics are confirmed in configuration/documentation, **not by a captured server request**. Direct script inspection was blocked by the browser client and the GoatCounter dashboard is signed out. Do not bypass the blocker or report an observed event stream.
- PDF structure: 4 pages, US Letter, unencrypted, no JavaScript, **untagged**. Delivery passes. All four pages rendered and were visually inspected; no material unreadable or missing content found. The renderer reported fallback font warnings; assistive-technology reading order remains a documented limitation with HTML guide available.

## Exact decisions prepared for owner approval

### ADS-01: preserve indexed bridges

Restore `index,follow,max-image-preview:large` in the three bridge files and reinsert their three original production sitemap entries with original dates. Keep visible copy, links, self-canonicals and URLs. No redirects, deletions or padding. **Not committed** pending final indexing approval.

### ADS-03: publication-safe M&A scorecard and source note

The internal March report substantiates the existing numbers as workplan reporting, not acquisition integration completion or realized savings. Its internal source does not itself establish permission to republish precise figures. Recommended default: withhold numeric task counts/percentages and remove the underlying `scoreData` numeric payload, rather than only changing the preview badge.

| Existing | Proposed |
| --- | --- |
| Historical progress snapshot / Execution tracking, March 3, 2016 | Execution discipline / How workstreams were governed |
| Select a workstream to see reported tasks started and due-date performance. | Select a workstream to explore its priorities and execution controls. |
| Internal scorecard · Preview use only | Governance approach |
| Numeric started/on-time values and progress bars | Same five workstream buttons and two-column panel, labeled Workstream priorities and Execution controls |
| Reported workplan-measure notice | These workstream summaries describe delivery priorities and controls, not a quantified measure of acquisition integration or realized savings. |
| Projected combined annual revenue | 2014 pro forma revenue at announcement |

Proposed workstream content (no achieved-outcome claim):

| Workstream | Workstream priorities | Execution controls |
| --- | --- | --- |
| Technology | Applications, master data, interfaces and the shared operating platform. | Conversion planning, integration testing, business readiness and controlled cutover preparation. |
| Finance | Financial mappings, reporting, legal entities and common control requirements. | Reconciliation, functional approvals and dependencies across finance and systems workstreams. |
| Supply chain & operations | Planning, sourcing, manufacturing, logistics and product data. | Data readiness, process testing and coordinated handoffs across operations and technology. |
| Human resources | Employee access, records, communication and training readiness. | Readiness checklists, exception follow-up and coordination with business and technology owners. |
| Order to cash | Customer orders, credit, fulfillment, invoicing and commercial continuity. | Common workflow decisions, interface dependencies, functional approvals and business readiness. |

Replace the closing preview/research/publication instruction with:

> Sources and scope: This account combines contemporaneous program materials, public corporate disclosures, and my firsthand leadership experience. Corporate synergy figures are management targets for the periods shown, not savings attributed to my technology organization. The company’s 2016 integration statement does not establish a specific ERP cutover date or independently measured technology savings.

Add four links in the existing source-note styling: [April 2015 announcement](https://www.sec.gov/Archives/edgar/data/1141107/000119312515142179/d913832dex991.htm), [January 2016 close](https://www.sec.gov/Archives/edgar/data/1141107/000119312516420003/d112940d8k.htm), [March 2016 targets](https://www.sec.gov/Archives/edgar/data/1645494/000119312516505875/d156909dex991.htm), [2016 corporate integration statement](https://www.sec.gov/Archives/edgar/data/1645494/000119312517065796/d289156d10k.htm).

Supported substance retained: announced $2.1B; January 4 legal close versus internally documented January 5 operational Day 1; approximately $8B **2014 pro forma** baseline; announcement workforce; March management synergy targets with their different time bases; company's reported substantial 2016 operational integration; internal ERP date described only as a target. The separately labeled Business 2.0 opportunity is supported as a historical **forecast**, not achieved acquisition synergies. No claim of verified actual ERP cutover, IT savings or quantitative customer outcome is added.

Other deep executive pages were checked for visible internal publication instructions. Asset filenames containing preview and genuine evidence qualifications are not publication defects. No unrelated executive copy is proposed for change. **All material copy/component changes remain uncommitted.**

### ADS-05/04: remove granular recovery product clicks and align notices

Proposed: remove the 15 `data-goatcounter-click` and 15 associated `data-goatcounter-title` attributes from Recovery Essentials. Preserve all five products, images, affiliate URLs/tags, disclosure, `sponsored noopener noreferrer`, and existing aggregate page-view analytics. Do not introduce replacement tracking.

Add to health privacy's analytics paragraph:

> Page paths and titles can reveal the public health topics being read. We do not send recovery-product click events to GoatCounter.

Add to the sitewide health section:

> Some recovery resources contain disclosed Amazon affiliate links. Retailers receive ordinary browser request information when you follow their links and operate under their own privacy practices. We do not send product-specific recovery link clicks to GoatCounter.

Date actual notice/page changes when implemented and update relevant sitemap lastmod entries. **Privacy/analytics changes not committed** pending approval.

### ADS-16/17: ads.txt now; display advertising separately gated

Proposed root `ads.txt`, based on verified account ID and [Google's official guide](https://support.google.com/adsense/answer/12171612):

```text
google.com, pub-4294942200921720, DIRECT, f08c47fec0942fa0
```

ads.txt authorizes inventory; it does not activate ads or prove the low-value-content issue is fixed. No ad script, auto-ad setting, ownership change or account configuration is proposed in this release.

Before **serving ads**, separately approve accurate Google/third-party cookie and data-sharing notices, user choices and consent handling for the actual configuration/audience. A public global site can receive EEA/UK/Swiss visitors: [Google-certified CMP/TCF requirements](https://support.google.com/adsense/answer/13554116) apply to personalized ads there. [Non-personalized ads](https://support.google.com/adsense/answer/9007336) can still use cookies requiring consent. [Required privacy disclosures](https://support.google.com/adsense/answer/1348695) and [sensitive health/political audience restrictions](https://support.google.com/adsense/answer/10502938) remain pre-activation gates. No health/political audience lists or profiles.

## Remaining release sequence

1. Obtain decisions above and acceptance of documented optional deferrals; implement only approved changes on PR #90.
2. Rerun targeted and existing CI for the exact revised head; review final changed-file scope and wording.
3. Request separate explicit approval to merge that exact reviewed head. Do not merge automatically.
4. Verify successful GitHub Pages deployment and affected production behavior/directives/disclosures/sitemap/ads.txt.
5. Recheck AdSense account requirements and obtain separate explicit approval to submit review.
6. Record submitted status and actual Google response. Neither deployment nor Google approval has occurred in this work.


## Historical approved first-batch scope and rollback

- `transformation/business-2-0/index.html`: robots meta only.
- `ma/pace-arris-integration/index.html`: robots meta only.
- `ma/private-equity-diligence/index.html`: robots meta only.
- `ma/integration/index.html`: one nav label, one internal instruction, one copyright line.
- `health/about/index.html` and `health/privacy/index.html`: affiliate transparency and modification metadata, without changing clinical claims, affiliate destinations or analytics.
- `sitemap.xml`: remove three noindexed bridge loc entries, add existing Ballot results loc entry, update dates only for the two actually modified health pages.
- This file records branch-only statuses and the ADS-21 addition. The historical Phase 1 register remains the complete evidence/priority source until a reviewed release.

Rollback: abandon/close the draft PR to preserve `main`; if a future merge is separately approved, revert the specific approved PR commit(s) through a new scoped PR. Do not rewrite history or delete branches.

## Important risks and unresolved editorial remnants

1. **ADS-01 SEO tradeoff:** noindex can remove existing search entry points. `follow` is a crawl directive, not a guarantee that Google will always follow links on noindexed pages. Review the three URLs and their substantive destination pages in Search Console **before merging**.
2. **ADS-03/21 adjacent M&A remnants outside approved copy:** the published M&A case study also contains “Internal scorecard · Preview use only” and a final “Research and publication note” describing a preview, unresolved post-close chronology and finance savings, and approval before publication. These were intentionally **not rewritten** without further editorial authorization. Any historical statements about realized benefits must remain distinguishable from projected opportunities.
3. **ADS-04 privacy:** product-level GoatCounter click hooks remain unchanged by explicit instruction. Actual event collection and privacy implications are pending ADS-05 verification.
4. **Browser gate:** source inspection and GitHub Actions are not a substitute for rendered desktop/mobile link, metadata, accessibility and affiliate tests.
5. **AdSense causation:** these are independently worthwhile quality/technical corrections, not a guarantee of Google approval.

## Review and release gates

- Verify scope-only diff and preserve PRs #67 and #68 and other branches.
- Review source and automated CI results for the exact proposed head SHA, including health generation consistency.
- Independently verify the rendered pages on desktop and mobile before approval; no public hosted sandbox is authorized in this phase.
- Collect Search Console evidence for ADS-01 before merging; document owner decision in the PR.
- Never merge, deploy, enable ads or submit an AdSense review without separately explicit authorization.


## Phase 2B technical release gate (November 15, 2026 PT)

**PR #90:** `fix/adsense-phase2-batch1-20261115`, draft and unmerged. Production `main` baseline at preparation: `a88ecd6bc686546b52cd8af32b8106a0eb21b811`.

### Exact additional scoped CI changes

| Path | Modification | Commit |
| --- | --- | --- |
| `.github/workflows/health-v21-browser.yml` | `runs-on: ubuntu-latest` → `runs-on: ubuntu-24.04`, nothing else | `917a482252f608441d6210eb9d0575f1d4979814` |
| `.github/workflows/health-v21-hosted.yml` | `runs-on: ubuntu-latest` → `runs-on: ubuntu-24.04`, nothing else | `37145e0feb34790a19acb9198458ba80a8799e6f` |

Both changes preserve Playwright 1.56.1, permissions, tests and script commands. The previous Ubuntu 26.04 installation failures are resolved.

### Actions verified after repair, pre-register-documentation head `37145e0`

| Existing workflow | Run | Result |
| --- | --- | --- |
| Real-browser QA | [43789991373](https://github.com/behshad-code/behshad.com/actions/runs/43789991373) | PASS: 24 health routes x 2 viewports, 144 checks; external sources 31 accessible, 5 publisher-restricted out of 36 |
| First-party hosted sandbox review | [43789991256](https://github.com/behshad-code/behshad.com/actions/runs/43789991256) | PASS: 48 checks over 20 sandbox routes and two viewports; **pre-existing public sandbox only**, not branch-specific executive acceptance |
| Health hierarchy | [43789991573](https://github.com/behshad-code/behshad.com/actions/runs/43789991573) | PASS |
| Health discovery and privacy | [43789991277](https://github.com/behshad-code/behshad.com/actions/runs/43789991277) | PASS |
| Health v2 review | [43789991273](https://github.com/behshad-code/behshad.com/actions/runs/43789991273) | PASS: hierarchy, article links, recovery PDF and generated-page diff |

### Outstanding release blockers

1. **ADS-01 risk decision:** Noindex would remove three existing potential organic landing pages; the final treatment remains undecided. Private Search Console URL performance and query/landing comparisons are required; owner must explicitly choose. Do not merge even though static/CI checks pass. No redirects/deletions planned.
2. **ADS-03 editorial follow-up:** M&A article still includes an internal scorecard tag `Internal scorecard · Preview use only` and a closing research/publication note referencing preview status, role chronology, ERP cutover and functional savings. Prepare revised publication-safe language and obtain owner copy approval; no historical claims changed in Phase 2B.
3. **ADS-06 discovery:** Canonical Ballot pages and static cross-links exist; the new 2026 results sitemap entry is an unmerged proposal. Site-level indexing conclusions require private Search Console inspection, live HTTP headers and crawler-render verification.
4. **Branch-specific acceptance:** The health browser tests do not exercise the edited M&A executive pages or About/Privacy affiliate copy specifically. Complete targeted QA of those changes on a secure unpublished branch checkout, or separately authorize a review method. Do not publish a new sandbox as a workaround.
5. **ADS-05 privacy:** Do not modify or add product-specific health click analytics, advertising scripts or account settings. Actual GoatCounter event behavior and privacy implications remain independently gated.

### Historical evidence classification

- Public SEC exhibits substantiate ARRIS/Pace legal close on January 4, 2016, an approximately $2.1 billion acquisition, original approximately $8 billion **2014 pro-forma** revenue and approximately 8,500 employees (2015 announcement), March 2016 management synergy **targets** ($135M in-year OPEX, $200M annualized exit-rate OPEX, $75M in-year COGS), and 2016 **company-wide substantial operational integration**. These do not validate individual IT workstream savings or ERP cutover. See public filings: https://www.sec.gov/Archives/edgar/data/1141107/000119312516420003/d112940d8k.htm ; https://www.sec.gov/Archives/edgar/data/1141107/000119312515142180/d913832dex21.htm ; https://www.sec.gov/Archives/edgar/data/1645494/000119312516505875/d156909dex991.htm ; https://www.sec.gov/Archives/edgar/data/1645494/000119312517065796/d289156d10k.htm.
- Internal scorecard 88%/85%, operational Day 1 designation, ERP August 22 target, and Business 2.0 $40–57M projected opportunity have **not** been independently substantiated in this review; do not present them as realized outcome metrics.
- The original projected ~$8B is time-specific: a January 2016 investor presentation described ~$7B on a **2015 pro-forma** basis. Do not treat distinct baselines as conflicting actual revenue or present the 2015 projection as 2016 realized sales.

**Release readiness:** CI infrastructure **PASS**; substantive editorial approval **PENDING**; ADS-01 Search Console decision **BLOCKED**; branch-specific executive/affiliate browser QA **PENDING**; merge **NOT AUTHORIZED**. Source/PR details should be rechecked against a fresh head before any later release.
