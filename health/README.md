# Men's Health Compass

An independent educational publication within behshad.com, accessible at https://behshad.com/health/.

## Scope

- /health/ is the publication's front page.
- /health/prostate/ is the first navigable topic guide, now with six complete practical articles:
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
- `assets/doctor-hero.png`: transparent doctor-costume character illustration used only in the health homepage hero.
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
