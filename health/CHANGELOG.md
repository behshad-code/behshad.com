## 2.2.1 | Publication identity and health privacy | November 6, 2026

Removed the personal publisher/editor name from the Men's Health Compass About and editorial-methods content, homepage structured metadata, and six original guides' editor metadata. All Health Compass pages now link to a dedicated `/health/privacy/` summary. Added the privacy route to the sitemap and browser/discovery tests. No fictitious editorial committee is claimed, and no change was made to the main behshad.com privacy policy, unrelated websites, clinical guidance, ads, or analytics vendors.

---

## 2.2 | Discovery, publisher transparency and privacy | November 6, 2026

Added a dedicated About and editorial standards page identifying the site publisher, AI-assisted drafting boundaries, lack of independent clinician peer review, fictional white-coat illustration and future affiliate disclosure principle. Linked About and Privacy unobtrusively in the health page footers while preserving the V2.1 design and all clinical content. Updated the existing /privacy/ notice for health-specific aggregate analytics and local-only question building. Added publisher/breadcrumb JSON-LD to relevant pages, placed the new page in the XML sitemap, and introduced automated crawl metadata/sitemap/trust-link checks and a Search Console / Bing owner setup runbook.

No new analytics script, ad network, advertiser pixel, affiliate links, or personal visitor health tracking. Search engine property verification, indexing and traffic baseline remain external authenticated-account work, not claimed as completed by this code release. No health article clinical text or existing URLs were changed.

---

## 2.1 | Integrated six-category prostate education | November 6, 2026

Rebuilt the prostate landing page around **one** six-category navigation, replacing the redundant six-card flagship guide library and the second Explore Further category grid. Added six comprehensive evidence-linked category pillars, strengthened all 24 specialized supporting articles, clarified cross-cutting Insurance and Access, and preserved all six original guide routes and v1.0/v2.0 snapshots. Retained the approved health design, anatomy illustration, 36 curated references, 78-term glossary and private-on-device appointment question builder.

The 31-card consumer and 21-card global research compilations were mapped to topic ownership and editorial dispositions. Experimental and low-certainty findings remain qualified or deferred; the 151-record Flipboard discovery intake is **not** represented as complete independent medical verification. Source checks corrected the moved ACR PI-RADS reference. A first-party noindex review preview was deployed and real Chromium desktop/mobile navigation checks passed; no independent licensed clinician peer review has been performed or claimed.

Version record: `content-versions/v2.1.json`. Development PR #60. Preserved rollback baseline: production commit `9018ef5b16f3652a19cb5b6fb96c3cba48847c34` (includes the separate first-party review sandbox but not the v2.1 feature).

---

## 2.0 | Production release | November 6, 2026

The owner explicitly approved production release. This version preserves all six v1.0 flagship guide URLs, introduces six category hubs, 24 supporting articles including the robotic-surgery series, and four resources (source library, glossary, appointment question builder and editorial methods). The prostate landing page continues to show six flagship cards and three evidence-labeled research highlights. The release has 36 curated public reference entries and 78 glossary terms. The original v1.0 content snapshot remains in `content-versions/v1.0.json`.

The material is independent education, not individually tailored medical advice or a licensed clinician's peer review. The Flipboard intake was closed at 151 accessible discovery records; the website does not claim primary-source verification of every original article. New v2 pages are indexable. Medical evidence is subject to future revision.

---

## 2.0 | Editorial review branch | November 6, 2026

**Not published.** Owner approved scoped development, not a merge to `main` or production release. The v2 review branch now stages six category hubs, 24 authored supporting articles, 4 practical resources, and 33 evidence-linked additions to the six unchanged flagship URLs. The topic home retains exactly six flagship cards and three sourced research highlights. Source catalog: 36 selected references; glossary: 78 definitions. New pages are noindex pending approval.

The locked v1.0 version record is preserved. New content has not received independent clinician peer review; some study-specific numbers, regulatory indications and external links still require final checks. Flipboard source collection is closed at 151 accessible records with nine unexplained platform-count differences. No personal clinical details are published.

---

# Men's Health Compass: editorial versions

## 1.1 Navigation correction | November 5, 2026

Corrected a duplicated publishing hierarchy: the root `/health/` had a second copy of the six prostate article cards plus prostate-specific FAQ and updates sections, despite being the general Men's Health Compass homepage. The root now introduces Men's Health Compass, offers one featured Prostate Health topic, and explains the publication's editorial approach. The detailed prostate introduction, six guide cards, research highlights and source shelf remain only at `/health/prostate/`.

The six published article bodies, URLs, visual assets, Ballot Compass, and behshad.com main website are unchanged.

Added automated `health/check-hierarchy.mjs` regression checks and a scoped GitHub Actions workflow so future Health Compass changes cannot accidentally copy the article library back into the general homepage.

## Landing page structure and research highlights | November 5, 2026

Replaced duplicated introductory six-part overview with one concise intro, preserved all six full guide URLs and cards, and added three dated source-verified research updates linked to Oxford, UCL and FDA primary institutional announcements. The main site's files, branding, images, article bodies and Ballot Compass remain unchanged.

Introduced a research register of the 12 Flipboard items visible to the connected browser out of 160 stories reported by Flipboard. This register is an incomplete research intake, not a certification of all underlying studies. The remaining 148 stories need separate exhaustive review.

## 1.0 | November 5, 2026

First substantive prostate health education release. Includes six full guides covering rising PSA, diagnostic testing, active surveillance, treatment decisions, recovery and follow-up, and insurance access.

Baseline Git commit: `ed01b4ad952a6f303662be235652bf134e65e7bd`.

Exact article source blobs are recorded in `content-versions/v1.0.json`. The six article texts are preserved; subsequent graphical and navigational changes do not constitute new clinical content. Future editorial enrichment will be versioned with a clear description of what changed.

The public repository does not include any private clinical reports or personal patient histories.
