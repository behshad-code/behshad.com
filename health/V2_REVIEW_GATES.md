# Men's Health Compass v2.0 | Review and Publication Gates

**Status:** Draft implementation quality review, November 6, 2026. **Not approved for merge or public deployment.**
**Review branch:** `feature/mens-health-compass-v2-review`  
**Draft PR:** #59  
**Baseline:** `main` commit `04f986734b9cbb279dcbfd487b14730061add21b`

## Confirmed implementation

- Six existing flagship guide URLs preserved; v1.0 snapshot remains recorded separately.
- Six secondary hubs, 24 supporting articles (including six robotic surgery modules), four resources, 36 listed references and 78 glossary entries are staged.
- Six guide files contain targeted additions, and the prostate landing page has six deeper topic links and three highlights.
- Branch-only `sandbox/mhc-v2-review/` contains an internal-link-rewritten mirror, marked noindex and without GoatCounter. **It is not a hosted review URL.**
- GitHub Actions `Health Compass hierarchy` and `Health Compass v2 review` passed on the current recorded head. CI validates hierarchy, generated content consistency, basic internal links and assets, **not clinical accuracy or browser appearance**.

## Required gates before user-facing review is called complete

### 1. Substantive content depth
The 24 article-data sections currently have **221–352 words of core explanation per article** (excluding titles, generic questions, generated reference shelf and shared page scaffolding). All 24 are structurally complete, but this alone does not meet the owner's request for a comprehensive patient reference.
- Enrich the specific topics that require more depth; prioritize stage-specific treatment, genomic-vs-germline test distinctions, individualized surveillance, biopsy tradeoffs, surgery selection, side-effect differences, aftercare and regional guideline interpretation.
- Use compact plain-language summaries first, then substantive evidence-linked examples, comparative tables where useful and practical questions.
- Avoid padding to an arbitrary word count and avoid duplicating six flagship guides. Verify every added material assertion and its patient population.
- Compare against the approved v2 strategy's full page-level scope, not simply the count of 24 article routes.

### 2. Clinical claim verification
- Independently check the 2026 AUA/SUO guideline; final PCFA/NHMRC guidance vs earlier draft; NCCN patient age bands; EAU edition; exact FDA indication for Pluvicto and IsoPSA.
- Verify PROTEUS comparator, absolute effect estimates and adverse effects; PACE-B versus PACE-A; robotic versus open trial limitations; Retzius-sparing margin tradeoffs; single-port SPARC cohort and outcomes.
- Label robotic manufacturer claims, forward-looking 2028 telesurgery plans and AI features as such; do not treat them as improved cancer outcomes.
- Check every claim sourced only from a press release or conference report and keep it qualified. Source ID presence does not equal primary verification.
- Confirm dates and appropriateness of "Evidence checked November 6, 2026" throughout the generated pages; do not overstate review completion.
- Avoid patient-specific medical advice. No qualified clinical peer review has been completed or should be implied.

### 3. Source quality, links and reference filters
- 36 listed sources are a curated selection, not the claimed 200 independently verified medical references.
- Test every external source URL and check exact source identification, date, study population, outcomes and claim support, not simply HTTP success.
- Review distinct generic reference categories in the source filters; where feasible add meaningful **topic/year/institution** filtering per approved v2 strategy.
- Validate the glossary definitions and use nonintrusive contextual linking.

### 4. User experience and design
- Use a **hosted first-party preview only after separate authorization for a public sandbox**. GitHub branch files are not yet accessible at `https://behshad.com/sandbox/mhc-v2-review/`.
- Check real browser desktop/mobile for navigation, cards, menus, external links, overflow, print checklists, keyboard behavior, accessible focus, and responsive tables.
- Preserve existing photography, illustrations, the six flagship cards, site typography and `/health/` general-hub boundary.
- Verify local-only question builder does not collect personal health data.

### 5. SEO, robots and publishing
- New article pages intentionally include `noindex,nofollow` in this **review branch**. This must be deliberately revisited for approved production pages; never silently publish nonindexable articles.
- Validate canonical URLs, descriptive metadata, schema matching actual content, sitemap, security of external scripts, no sensitive search/query analytics and no misleading site author/medical credentials.
- Treat `llms.txt`, structured data and sitemap as discovery aids, **not** guarantees of search indexing.

### 6. Version and release management
- Preserve the v1.0 locked baseline and content history.
- Confirm the v2.0 content snapshot represents **exactly** the approved final public text and source mappings, and retain the editorial change log.
- Run `node health/check-hierarchy.mjs`, `node health/check-v2.mjs`, `node health/build-v2.mjs` plus generated diff, HTML/schema/links and browser checks after final content edits.
- Keep this PR in draft. **Do not merge to `main`, host a sandbox or publish without the owner's explicit separate authorization.**

## Owner approval boundary

The existing GO authorizes scoped **development and preparation** of a first-party review experience, not deployment. Before asking for a separate PUBLISH GO, report exact pages checked, remaining medical/source caveats, actual preview URL if hosted with authorization, test outcomes and the current release commit.
