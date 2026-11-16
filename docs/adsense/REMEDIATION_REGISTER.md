# Behshad.com AdSense remediation register

**Source baseline:** Phase 1 audit, November 15, 2026 (20 findings, ADS-01–ADS-20).  
**Update:** Phase 2 approved branch-only batch, November 15, 2026. Added ADS-21.  
**Production:** No approved Phase 2 changes have been merged or deployed. The statuses below describe the development-branch candidate only.

| ID | Priority | Scope | Phase 2 development status | Release dependency |
| --- | --- | --- | --- | --- |
| ADS-01 | P1 | Three short executive bridge pages | Implemented in branch: `noindex,follow`, preserved pages/canonicals/links, removed from sitemap | **BLOCKED for merge** pending Search Console indexing/performance and URL Inspection review; assess search landing-page tradeoff |
| ADS-02 | P1 | M&A integration Home navigation | Implemented in branch: change label to Home only | Verify rendered desktop/mobile link and layout |
| ADS-03 | P1 | M&A internal pre-publication instruction | Implemented in branch: remove exact instruction, preserve evidence attribution | Review nearby historical statements and additional publication-note leftovers; no invented outcomes |
| ADS-04 | P1 | Health publication About and Privacy affiliate statements | Implemented in branch: present-tense, Amazon Associate, clinical/editorial separation; accurate meta description and source-backed modification dates | Verify published disclosure, links, content semantics and privacy; ADS-05 deferred |
| ADS-05 | P1 | Product-specific GoatCounter event semantics | Deferred; no analytics changes | Separate browser/network review and privacy approval |
| ADS-06 | P1 | Ballot Compass 2026 results sitemap omission | Implemented in branch: add canonical without invented lastmod | XML validation, canonical and Google Search Console inspection |
| ADS-07 | P1 | Root hash-based navigation | Deferred; no routing changes | Browser and Search Console crawl/render evidence |
| ADS-08 | P1 | Live deployment/accessibility verification | Deferred | Browser and HTTP checks; no live claim from source |
| ADS-09 | P1 | Search Console indexing/coverage baseline | Deferred | Authenticated Search Console review |
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
| ADS-20 | P2 | Regression and QA coverage | Deferred beyond targeted Phase 2 verification | Follow existing CI and real-browser gates |
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
