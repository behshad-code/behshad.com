# Men's Health Compass | Site Architecture and Editorial Operating Model

**Status:** Approved publishing hierarchy, recorded November 5, 2026.  
**Applies to:** `/health/` and all present or future health topics.  
**Purpose:** Prevent duplicate content and preserve an intuitive, expandable educational publication.

## 1. Nonnegotiable visitor hierarchy

```text
behshad.com > Beyond Work
    |
    v
/health/                          MEN'S HEALTH COMPASS (publication homepage)
    |  What the publication covers; one card per complete health topic;
    |  how we use evidence. No prostate article library on this page.
    |
    +-- /health/prostate/         PROSTATE HEALTH (one topic landing page)
    |       |  Brief introduction to prostate health
    |       |  Six practical guide cards
    |       |  Carefully selected, dated research developments
    |       |  Trusted source library
    |       |
    |       +-- rising-psa/             Detailed guide
    |       +-- tests-explained/        Detailed guide
    |       +-- active-surveillance/    Detailed guide
    |       +-- treatment-decisions/    Detailed guide
    |       +-- recovery-follow-up/    Detailed guide
    |       +-- insurance-access/      Detailed guide
    |
    +-- /health/<future-topic>/   NEW TOPIC (only when fully ready)
            |  Its own landing page and appropriately scoped education
            +-- optional topic-specific guides, if genuinely useful
```

**The general homepage is not a second topic homepage.** Each item of content has one primary home. Do not repeat the same numbered cards, FAQ sequence, or topic research panel at more than one layer. A short topic teaser that links to the topic landing page is acceptable; duplicating the topic's full guide directory is not.

## 2. Ownership and boundaries

| Level | File | Contains | Must not contain |
| --- | --- | --- | --- |
| Publication | `health/index.html` | Brand introduction, topic discovery, editorial approach, one topic card per *complete* focus area | Six prostate guide cards, prostate research feed, prostate-only FAQs, competing numbered series, links to every prostate article |
| Topic | `health/prostate/index.html` | Prostate intro, optional brief explanations of BPH/prostatitis/cancer, exactly six current guide cards, limited dated discoveries, source shelf | A repeated second numbered overview, unverified headlines, a general all-men's-health directory |
| Article | `health/prostate/<slug>/index.html` | Full focused educational guide, questions, clinical uncertainty, qualified primary references, related links | Repeated general homepage, full listing of all future health topics |
| Source intake | `health/research/` | Public bibliographic metadata, intake status, evidence assessment, source URLs and editorial change log | Private health information, pasted copyrighted articles, automatic publishing of unverified claims |

**Navigation intent:** Main site → Men’s Health Compass → chosen topic → selected guide. The reverse breadcrumb/brand navigation should lead back toward the topic and general hub. Topic links should be discoverable but not duplicated into another full library on the root.

**Growth:** Adding a new topic means introducing a new completed topic entry from `/health/`, not extending the prostate guide with unrelated material. Do not create dead-end "coming soon" cards or unfinished public guides.

## 3. Prostate topic content model

The six currently approved published guides are:
1. When PSA is rising (`rising-psa`)
2. Tests that clarify the picture (`tests-explained`)
3. Active surveillance (`active-surveillance`)
4. Choosing a treatment (`treatment-decisions`)
5. Recovery and life afterward (`recovery-follow-up`)
6. Insurance and access (`insurance-access`)

Preserve these URLs and the verified v1.0 guide bodies. A short overview belongs *before* the cards and is not another numbered guide sequence. Dated research highlights belong *after* the cards and are not a substitute for evidence-based guide updates. The source shelf can remain collapsed until requested.

If new research reveals a gap, first enrich the relevant existing guide where appropriate. Add a new guide only for a meaningfully distinct reader need. Avoid depth for its own sake or making the landing page long.

## 4. Research-to-publication pipeline

1. **Collect:** Inventorize Flipboard and new research with source URL, publisher, publication date when known, topic and extraction provenance.
2. **Deduplicate:** Group headlines covering the same study. Do not count repeated press stories as independent evidence.
3. **Verify:** Check the original paper, professional guideline, trial registry, university notice, or FDA decision. Capture population, methods, outcomes, limitations and current clinical relevance.
4. **Classify:** Established guidance/regulatory action; clinical research; early or preclinical findings; unverified news; excluded/duplicate. An interesting claim is not automatically a patient recommendation.
5. **Map:** Decide whether the finding corrects or enriches an existing guide, deserves a brief dated research highlight, belongs in the source register only, or should be excluded.
6. **Review, version, publish:** Human editorial review precedes publication. Substantive changes to the six guide bodies require a new content version and a `CHANGELOG.md` entry. Preserve prior facts unless updated evidence warrants correction.

No automatic newsfeed and no one-page-per-article pattern. Keep the visitor experience concise while allowing the behind-the-scenes research library to expand.

**Flipboard intake baseline (November 5, 2026):** Magazine displayed 160 stories; 12 initially visible stories were cataloged in `research/flipboard-intake-2026-11-05.json`. The remaining 148 have **not** been inventoried. Logging a story headline is **not** the same as reading and verifying the original article. Some of the first source leads have primary-source context; most remain unreviewed. See `research/README.md` for the actual evidence-status register. Do not report the complete magazine as analyzed until every accessible item has been inspected and coverage limitations logged.

## 5. Design and publishing safeguards

- Keep the established Men's Health Compass typography, colors, compact header mark, fictional illustrated homepage hero, and prostate anatomical artwork. Do not redesign them during editorial cleanup.
- Reuse `health/health.css` for scoped styles. Do not change `index.html`, `site.css`, Ballot Compass, CNAME, site-wide analytics, or unrelated assets as a side effect of a health change.
- Maintain unique page titles, canonical URLs, semantic headers, accessible image alternatives, working anchor links and mobile layouts.
- Analytics should remain aggregate only. Do not log identifiable health questions or individual research interests.
- Make medical uncertainty explicit; do not claim a clinician reviewed content unless that review actually occurred.
- Avoid copying articles verbatim or exposing source material that is private or licensed.
- Use an isolated branch and pull request. The approved review URL is a complete navigable first-party GitHub Pages sandbox under `/sandbox/<feature>-review/`. Review desktop **and** mobile, and follow the repository `AGENTS.md` rules for approval, production verification and separate sandbox cleanup.

## 6. Required checks before every health release

1. **Review both entry pages together**, not just the file being edited: `/health/` and `/health/prostate/`.
2. Run `node health/check-hierarchy.mjs`. Its invariant is a general topic hub with **0 guide cards**, a prostate topic with the **6 existing guide cards**, and all six article URLs present. Extend the check deliberately when future topics are added.
3. Click-test the visitor route: Beyond Work → Men's Health Compass → Prostate Health → a guide → back navigation. Verify there is no loop, duplicate six-card grid, dead end or unrelated topic under prostate.
4. Verify responsive desktop/mobile layout, images, link targets and accordions with a real browser. Static source checks and a successful Pages deployment are not substitutes for visual/browser validation.
5. Compare the changed-file list to the requested scope. Preserve each guide's exact content baseline unless an explicitly reviewed editorial update requires versioning.
6. Confirm the GitHub Pages production deployment succeeds. Remove temporary previews only in a separate scoped change afterward.

## 7. Governing references

- [Health Compass README](README.md)
- [Prostate research workflow and coverage](research/README.md)
- [Editorial changelog](CHANGELOG.md)
- [Automated hierarchy test](check-hierarchy.mjs)
- [Repository-wide publishing rules](../AGENTS.md)

**Design lesson:** Do not optimize two pages independently. Design the *visitor journey and content ownership* first, then update only the layer that owns the information.
