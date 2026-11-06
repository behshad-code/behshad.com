# Men's Health Compass | v2.1 Information Architecture and Editorial Operating Model

**Status:** Approved development specification, November 6, 2026. Production pending release gates.
**Applies to:** `/health/` and its prostate topic. Supersedes the v1/v2 instruction that the prostate home must carry six flagship guide cards.
**Previous designs and snapshots:** Preserved in Git history and the v1.0/v2.0 content version records.

## Visitor hierarchy

```text
behshad.com → Beyond Work
  /health/                    General Men's Health Compass publication, one card per complete health topic
    /health/prostate/         Prostate topic home, one six-category primary navigation
      /basics/                1. Prostate Basics, complete pillar and related focused explanations
      /screening/             2. Screening & PSA, including the original rising-psa guide
      /diagnosis/             3. Prostate Cancer, including tests-explained
      /treatments/            4. Treatment Options, including active-surveillance, treatment-decisions, robotic surgery
      /living-well/           5. Living Well, including recovery-follow-up
      /research/              6. Research & Updates, curated and evidence-labeled
      /insurance-access/      Cross-cutting original guide linked from relevant categories
      /resources/             Source library, glossary, questions, editorial methods
```

The general `/health/` home must NOT duplicate prostate categories or the guide library.
The prostate topic home has **one** six-category grid. The original six-flagship-card grid and the second "Explore Further" grid are removed. A compact "Find answers for your situation" area may link to existing pages but is not a second topic directory.

## Content ownership, depth and redundancy

Every category page is a substantive patient education **pillar**, not merely a directory. It explains the overall subject, context, major choices, practical implications, evidence limits and authoritative references, then links to narrow deep dives where the visitor can learn more.

- Basics owns foundational anatomy, BPH, prostatitis, symptoms and distinctions from cancer.
- Screening owns PSA, risk-based decisions, biomarkers and screening pathways.
- Diagnosis owns biopsy, MRI, pathology, Grade Group, staging and diagnostic versus prognostic versus predictive tools.
- Treatment owns surveillance, surgery, radiation, systemic therapy, recurrence, comparison and the six robotic surgery modules.
- Living Well owns urinary, sexual, bowel, exercise, emotional, bone/heart and PSA follow-up issues.
- Research owns curated guidance, phase 3 studies, regulatory developments and qualified emerging research.

An established guide's URL is preserved and must remain discoverable through its category; its more focused content must complement, not duplicate, the pillar. No blanket redirects or deletions of established articles. Review the necessity of each short supporting article before expansion or consolidation. A page count is not an educational completeness metric.

## Editorial and evidence boundaries

Research intake and public claims are different layers. The owner ended Flipboard harvesting at 151 accessible records from a displayed 160; the count discrepancy and publisher-access gaps remain recorded. The 31-card consumer compilation and 21-card institutional compilation are **research inputs**, not a validated clinical evidence registry.

When publishing a consequential claim:
1. Check the original guideline, trial, regulatory document, peer-reviewed paper or appropriate official institution.
2. Record population, design, comparator, measured outcomes, benefits/harms, date and limitations.
3. Distinguish FDA approval, guideline recommendations, randomized evidence, observational evidence, conference claims, preclinical findings and company plans.
4. Map only source-backed educational findings to a pillar or focused article.
5. Date the material and source the statement close to where it appears. No personalized medical instructions, private cases or professional peer-review claims without qualified review.

The reference library is a curated verified-source layer, not an unfiltered Flipboard export. Do not copy licensed papers or expose private working research artifacts in public GitHub or sandbox.

## Technical implementation and QA

The site remains static HTML, CSS and JavaScript on GitHub Pages. Preserve the established health identity, visual assets, colors, typography, main site, Ballot Compass, analytics and DNS. The canonical source for generated v2.1 category HTML is `health/prostate/data/v2.1-pillars/*.json`, rendered by `node health/build-v2.mjs`.

Run:
- `node health/build-v2.mjs`; generated page diffs must be intentional.
- `node health/check-hierarchy.mjs`; one category grid and preserved guide routes.
- `node health/check-v2.mjs`; source, page, asset and content structure checks.
- External link and claim verification, HTML and accessibility checks, and **real desktop and mobile browser journeys**.

The approved first-party preview is a complete, navigable GitHub Pages sandbox at a stable `/sandbox/<feature>-review/` URL. A branch-only directory is not a hosted preview, and noindex does not make public files private. Do not use third-party mirror hosts.

## Release protection

Use an isolated branch and PR. Treat CI success as a code gate, not complete clinical or UX verification. Preserve v1.0 and v2.0 history and publish v2.1 only after all agreed medical, content, browser and technical gates pass. Explicit owner GO authorizes conditional publication, not bypassing failed checks. Verify the GitHub Pages deployment and public pages before declaring completion. Keep rollback references and remove previews only through separate scoped changes.
