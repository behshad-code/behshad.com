# Men's Health Compass v2.2 | BPH and sexual-health editorial review

**Status:** Draft for owner review, November 7, 2026. No clinical peer review or live release is claimed.

## Editorial scope
Only two existing focused guides are expanded: `basics/common-conditions` and `living-well/sexual-health`. Six questions with fully written answers are added to each guide. These are distinct from the existing questions to take to a clinical appointment. No general men's sexual health, testosterone or fertility page is introduced in this phase.

The original Health Compass articles and FAQ collection were used **only to identify reader questions and gaps**. New prose is independently authored, not copied, and clinical assertions are grounded in the source catalog.

## Verified source classes

- **NIDDK:** Benign enlargement is not cancer, urinary symptoms do not necessarily scale with gland size, and symptoms require evaluation to identify underlying causes and urgent complications.
- **AUA 2026 BPH guidance Parts I, II and III:** Current guideline series covering evaluation, medicines and procedures. The PubMed records expose *abstracts*, not complete recommendation tables. For precise IPSS classifications, named medication distinctions and counseling details, use the full 2023 AUA BPH guideline as corroboration.
- **AUA 2023 BPH guidance:** IPSS/AUA-SI evaluation, medication classes, PSA effects of 5-alpha-reductase inhibitors, cataract surgery considerations, and tradeoffs of interventions.
- **FDA-approved Cialis (tadalafil) label, revised March 2026:** Daily BPH indication, contraindications involving nitrates and riociguat, and caution concerning alpha-blockers. The U.S. label **does not recommend tadalafil plus an alpha-blocker for BPH**, even where newer clinical guidelines discuss selected combinations.
- **DailyMed sildenafil label, revised December 2025:** ED indication, food/timing, and medication interactions.
- **AUA erectile dysfunction guideline:** ED as a marker of cardiovascular risk; oral treatments and counseling; early PDE5 use after prostate surgery has not reliably shown improved spontaneous, unassisted function.

## Clinical risk controls
1. IPSS is a symptom-tracking and discussion tool, **not** a diagnosis or prostate cancer screen.
2. BPH is multifactorial; do not equate it with a high testosterone level or attribute it solely to DHT.
3. Tadalafil for BPH can be appropriate whether or not ED is present; do not suggest unsupervised combinations with alpha-blockers or cardiovascular medicines.
4. PDE5 inhibitors are **contraindicated with nitrates and riociguat**. Emergency warnings and medication review appear in both applicable education sections.
5. Avoid claiming erectile medication repairs injured nerves or guarantees return of spontaneous erections after prostatectomy.
6. Do not treat all erectile problems as cardiovascular disease; evaluation depends on the prostate treatment history and individual circumstances.
7. Keep clinical disclaimers, source links, lack-of-peer-review statement, and stable v2.1 navigation.
8. Retain primary-source citations close to consequential text, including each answered FAQ.

## Reproducibility and acceptance
- Structured v2.2 editorial additions: `health/prostate/data/v2.2-enrichment.json`.
- Existing v2.0 and v2.1 materials remain immutable; `health/build-v2.mjs` layers v2.2 content after prior enhancements.
- Run `node health/build-v2.mjs`, `node health/check-hierarchy.mjs`, and `node health/check-v2.mjs`.
- Confirm generated diff is limited to intended deep guides, the curated source library, source indexes and documentation.
- Validate both affected guides on desktop and mobile in the approved GitHub Pages review environment before publishing.
- No new ads, analytics providers, personal health tracking, marketing links, or full-text copies from other publications.
