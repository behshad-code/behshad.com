# Men's Health Compass v2.1 | Evidence and Publication QA

**Status:** Working verification register, November 6, 2026. It does not certify an independent clinician review.

## Research coverage and provenance

- Original v1.0 and v2.0 article snapshots remain versioned and accessible in Git history.
- Discovery material: 151 accessible Flipboard records; 31 consumer research cards; 21 global/institutional research cards with 58 listed source entries.
- A master editorial placement matrix covers the 52 research cards and is retained as a separate working artifact, not posted as a certified medical dataset.
- The website's public references remain a curated subset of original studies, clinical guidelines and institutional resources.
- Not all 151 original publisher articles were independently opened or medically verified. Nine Flipboard count discrepancies remain unresolved by user decision, and harvesting is closed.

## Selected high-impact verification checks

| Subject | Primary source | Check and limitation |
| --- | --- | --- |
| 2026 early detection | AUA/SUO Journal of Urology 2026, DOI 10.1097/JU.0000000000004995 | Guideline amendment is published; recommendations vary by risk and context. The journal may restrict automated full text. |
| Australia 2026 | PCFA official final early-detection guidance and NHMRC approval list | Use final approved guidance, not age-40 consultation draft. Jurisdiction-specific recommendations are not U.S. mandates. |
| Prostate MRI | American College of Radiology current PI-RADS page | ACR moved its official page. Corrected URL under Clinical-Tools-and-Reference. Old page returned 404. |
| PROTEUS | Taplin et al., NEJM 2026, PMID 42223077 | Selected high-risk localized/locally advanced surgical patients; 5-year metastasis-free survival 78.2% vs 73.5%, with more grade 3/4 adverse events (39.6% vs 31.0%). Not a recommendation for all risk groups or established approval of the regimen. |
| PACE-B | NEJM 2024, DOI 10.1056/NEJMoa2403365 | Compares short-course SBRT against longer radiation schedules. **Does not** compare SBRT with prostatectomy. |
| Robotic vs open | Lancet Oncology 2018 Brisbane randomized trial, DOI 10.1016/S1470-2045(18)30357-7 | Functional outcomes were similar at 24 months in trial circumstances. Do not generalize to every surgeon, patient or newer robot. |
| Single port SPARC | PMID 42103552 | Large observational comparison; selection and learning curves preclude claims that one route is universally superior. |
| Retzius-sparing and nerve preservation | Retzius meta-analysis and NeuroSAFE PROOF randomized trial | Early continence and nerve preservation should be balanced against oncologic safety; adverse margin trade-offs require case-specific discussion. |
| PSMA radioligand therapy | FDA July 31, 2026 Pluvicto indication and full prescribing information | The ARPI combination is for defined PSMA-positive metastatic androgen-pathway modulation-naïve/sensitive disease; not localized disease. |
| Experimental treatments | NICE HTG688 and appropriate EAU guidance | Investigational focal procedures, biomarkers, AI tools and company roadmaps must not be presented as proven standards of care. |

## Link and browser QA

- External source-link automation checked 36 entries. ACR old URL returned 404 and was corrected in source JSON and rendered pages. Some publisher DOI routes returned 403 to automated clients; that is an access limitation, not proof of a broken scientific citation.
- Local Chromium tested 20 routes at desktop 1440px and mobile 390px; it does not establish first-party hosted behavior. A separate hosted preview test exists.
- First-party sandbox preview is explicitly public, noindex and no GoatCounter; it contains no private patient or research source files.
- `health/check-hierarchy.mjs` and `health/check-v2.mjs` enforce one six-category homepage, source references, generated manuscript consistency, and preserved flagship routes.

## Open and ongoing conditions

1. Check generated pages against edited source JSON after each medical source correction.
2. Confirm official institutional sources and drug labels remain current before future revision.
3. Treat restricted journal text, incomplete full-article intake and emerging research as limitations, not hidden evidence.
4. No independent licensed clinician peer review has been performed or implied.
5. Verify hosted sandbox navigation and accessibility before production.
6. Preserve old content history, update v2.1 versioning, and verify GitHub Pages deployment and live routes when publishing.

## Editorial methodology

The purpose is clear, useful, traceable patient education, not personalized medical advice or instructions for choosing a particular treatment. Source citations should support the precise claim, and limitations must appear near patient-actionable statements. No news article or manufacturer announcement is itself a medical standard of care.
