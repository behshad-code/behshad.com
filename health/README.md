# Men's Health Compass

An independent educational publication within behshad.com, accessible at https://behshad.com/health/.

**Start here for any future website change:** [Site architecture and editorial operating model](SITE-ARCHITECTURE.md). This document establishes the mandatory publication → topic → article hierarchy, permitted content at each level, research intake process, and release checklist.

## Scope

- /health/ is the publication's front page.
- /health/prostate/ is the prostate topic landing page with one six-category navigation system. The six original guide URLs remain supported and linked from their relevant categories:
  - /health/prostate/rising-psa/
  - /health/prostate/tests-explained/
  - /health/prostate/active-surveillance/
  - /health/prostate/treatment-decisions/
  - /health/prostate/recovery-follow-up/
  - /health/prostate/insurance-access/
- health.css contains the publication's isolated responsive design.
- assets/ holds original artwork for this publication.

Keep this publication separate from the main site's layout, Ballot Compass, and other projects. The Beyond Work entry tile links directly here.

## Editorial standards for expansion

1. Write clear, source-linked health education, not individualized medical advice.
2. Distinguish peer-reviewed findings, expert guidelines, regulatory approvals, and preliminary research.
3. Verify medical claims against authoritative sources before publishing. Include publication/review dates and meaningful change notes for substantive articles.
4. Do not claim medical review or certification unless a named qualified reviewer has actually approved the content.
5. Do not automatically publish research alerts; require human editorial review.
6. Do not collect visitor health information or record individual medical interests in interaction analytics.
7. Keep advertising, if introduced, plainly labeled and independent of editorial decisions.
8. Do not add empty article links. Publish a new article URL only when its full, verified content is ready.

## Implementation

Use static HTML and CSS under this path. Reuse the existing privacy-conscious GoatCounter account for aggregate page views. Do not introduce new hosting providers, scripts collecting personal data, or external publication dependencies. Maintain canonical URLs and the root sitemap when adding published pages.

## Visual identity (November 2026)

- `assets/mens-health-compass-logo.png`: full illustrated Compass wordmark with the publisher depicted in a fictional medical outfit.
- `assets/mens-health-compass-mark.png`: transparent emblem for the compact header logo.
- `assets/doctor-hero.png`: transparent character illustration reused on the health homepage hero and in the Beyond Work discovery imagery.
- The illustration is fictional. It must not be presented as evidence that the publisher is a licensed medical professional.
- Keep the rendered page text and navigation as HTML, not flattened image screenshots.

## Editorial privacy boundary

Clinical insights can inform general educational explanations, questions and references. Never publish personal clinical histories, timelines, unique results, individual consultations, unpublished patient materials, or source files in the repository or public preview. The new guides contain only generalized education and public references. Preserve evidence boundaries and clinical uncertainty.

## Content version baseline

**Version 1.0** is the released six-guide prostate education library at Git commit `ed01b4ad952a6f303662be235652bf134e65e7bd` (November 5, 2026). Its article bodies and their exact source blobs are recorded in `content-versions/v1.0.json`. Future substantive editorial changes require a new content version and changelog entry. Design and navigation improvements do not silently modify the frozen article texts. The medical-guide source PDF and any individual clinical records are not in this repository.

## Navigation and artwork

- Main site: `/#beyond` > Men's Health Compass tile or Personal Projects feature > `/health/`.
- Health landing page: Explore prostate health or featured topic > `/health/prostate/` > six education articles.
- `assets/prostate-anatomy-3d.png` is a conceptual 3D prostate illustration supplied for this site. It is not patient imaging or a diagnostic representation. It is reused on the health homepage and prostate topic header.
- The original compass mark and approved health hero portrait are preserved.

## Prostate topic landing page (November 2026)

The `/health/prostate/` landing page now has one coherent reading path: a compact introduction with optional explanations of BPH, prostatitis and cancer; the six original, unchanged guide cards; three dated, sourced research highlights; and an expandable list of trusted reference organizations. The older duplicated six-part overview and sidebar were removed from this landing page only. The full guide pages and their frozen v1.0 article texts are untouched.

The research source intake is tracked in [research/README.md](research/README.md). The initial Flipboard capture includes **12 of 160 displayed stories**. The subsequent owner-editor collection captured 151 accessible records from a magazine displaying 160; that intake is now closed. The nine-story discrepancy and incomplete publisher-article verification are documented in the off-repository working research package, not represented as completed medical evidence. Research highlights shown to visitors are curated and reviewed; the site does not automatically publish from Flipboard or other feeds.

## Information architecture boundary (required for all future changes)

**General hub:** `/health/` introduces Men's Health Compass and lists available men's health **topics**, not individual prostate guides, news articles, or a second numbered prostate content series. It currently has one complete, clickable topic: Prostate Health & Prostate Cancer. Future topics belong alongside prostate as they are ready. Never add empty or placeholder topic links.

**Topic home:** `/health/prostate/` owns the prostate-specific brief introduction, six guide cards, significant research highlights, and related source shelf. Only this page should serve as the prostate topic directory.

**Deep guides:** The six `/health/prostate/<slug>/` articles retain their URLs and versioned editorial text. Changes to their clinical content require source verification and content version tracking.

**Regression rule:** Run `node health/check-hierarchy.mjs` before each Health Compass change. CI runs the same test for health-path pull requests. Never copy the topic library, research highlights, or guide summaries into `/health/` in the name of discovery. Verify **both** `/health/` and `/health/prostate/` side by side, including mobile behavior, before publication.


## v2.0 production edition | November 6, 2026

Developed in branch `feature/mens-health-compass-v2-review`, the v2.0 edition contains 24 source-linked educational articles, six secondary hubs, four resources and enriched copies of the six original guides. General `/health/` stays unchanged and the content v1.0 baseline remains locked. The original new-article content is in `health/prostate/data/`. Run `node health/build-v2.mjs` to regenerate only new pages, then `node health/check-hierarchy.mjs` and `node health/check-v2.mjs`. The owner granted the separate production GO on November 6, 2026. The educational content is not clinician peer reviewed, and source-specific applicability should be checked against current guidance.

## v2.1 integrated six-category edition (production release, November 6, 2026)

The prostate topic homepage now has one six-category navigation: Prostate Basics, Screening & PSA, Prostate Cancer, Treatment Options, Living Well, and Research & Updates. Each category hub contains a substantive evidence-linked pillar and focused supporting articles. The six original flagship routes are preserved as related deep dives and do not form a competing second homepage grid. Insurance and Access is cross-cutting. Review the current content and publishing rules in `SITE-ARCHITECTURE.md` and the draft release details in `content-versions/v2.1-review.json`.

The owner authorized conditional v2.1 production release. Required hierarchy, generated-content and real-browser checks were completed for the approved scope; no independent clinician peer review is claimed. The first-party review sandbox at `/sandbox/mhc-v21-review/` is public but excluded from indexing, marked as a preview, and does not collect user health questions. Do not confuse that preview with the production release. The 31-card consumer and 21-card global compilations are secondary evidence-discovery inputs. The 151-item Flipboard intake is closed and is not presented as a completely verified primary evidence register.
