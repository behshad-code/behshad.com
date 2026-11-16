# Behshad.com AdSense remediation register

**Source baseline:** Phase 1 audit, November 15, 2026 (20 findings, ADS-01–ADS-20).  
**Update:** Phase 2B release preparation, November 15, 2026 Pacific time (CI runs November 16 UTC). Added ADS-21 in Phase 2; compatibility-only workflow repair and evidence review in Phase 2B.  
**Production:** No approved Phase 2 changes have been merged or deployed. The statuses below describe the development-branch candidate only.

| ID | Priority | Scope | Phase 2 development status | Release dependency |
| --- | --- | --- | --- | --- |
| ADS-01 | P1 | Three short executive bridge pages | `noindex,follow` + sitemap removals still implemented **in unmerged PR only**; explicitly not approved for release | **HOLD:** owner-supplied private Search Console evidence raises indexing-loss concern. Obtain 3-month URL performance and destination comparison, then owner decision. Prefer keeping indexed bridges until resolved |
| ADS-02 | P1 | M&A integration Home navigation | Implemented in branch: change label to Home only | Verify rendered desktop/mobile link and layout |
| ADS-03 | P1 | M&A internal pre-publication instruction | Implemented in branch: remove exact instruction, preserve evidence attribution | Review nearby historical statements and additional publication-note leftovers; no invented outcomes |
| ADS-04 | P1 | Health publication About and Privacy affiliate statements | Implemented in branch: present-tense, Amazon Associate, clinical/editorial separation; accurate meta description and source-backed modification dates | Verify published disclosure, links, content semantics and privacy; ADS-05 deferred |
| ADS-05 | P1 | Product-specific GoatCounter event semantics | Deferred; no analytics changes | Separate browser/network review and privacy approval |
| ADS-06 | P1 | Ballot Compass 2026 results sitemap omission | Implemented in branch: add canonical without invented lastmod | XML validation, canonical and Google Search Console inspection |
| ADS-07 | P1 | Root hash-based navigation | Deferred; no routing changes | Browser and Search Console crawl/render evidence |
| ADS-08 | P1 | Live deployment/accessibility verification | Deferred | Browser and HTTP checks; no live claim from source |
| ADS-09 | P1 | Search Console indexing/coverage baseline | Owner-provided authenticated findings considered, but underlying private reports and URL performance data not independently inspected in this GitHub session | Private read-only Search Console task; no confidential dashboard data in public repository |
| ADS-10 | P2 | Public review sandbox indexability | Deferred; no sandbox deletion or edits | Browser/Search Console diagnostic |
| ADS-11 | P2 | Health publication hub depth and discovery | Deferred | Editorial approval and user-focused evidence |
| ADS-12 | P2 | Ballot app performance and accessibility | Deferred | Real browser and mobile performance |
| ADS-13 | P2 | Dated election results maintenance | Deferred; election text untouched | Confirm latest official updates before any content release |
| ADS-14 | P2 | Medical editorial validation | Deferred; clinical prose untouched | Primary medical source verification |
| ADS-15 | P2 | Recovery PDF accessibility | Deferred; PDF untouched | Browser and download checks |
| ADS-16 | P2 | ads.txt / advertising setup | Deferred; no ad scripts or ads.txt changes | Separate AdSense approval/readiness action |
| ADS-17 | P2 | Advertising privacy and consent | Deferred | Applicable consent review before enabling ads |
| ADS-18 | P2 | Cross-publication governance | Deferred | Editorial owner decision |
| ADS-19 | P3 | Documentation maintenance | Deferred beyond this register | Review obsolete operational docs later |
| ADS-20 | P2 | Regression and QA coverage | Phase 2B CI runner repair and relevant existing checks passed; other targeted executive/affiliate branch browser checks not yet executed | Complete targeted unmerged-branch executive desktop/mobile and affiliate browser acceptance; no public preview without approval |
| ADS-21 | P1 | M&A production footer “Private mockup” | **Added Phase 2:** implemented in branch, normal copyright retained | Verify source and rendered footer |

## Approved batch scope and rollback

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
