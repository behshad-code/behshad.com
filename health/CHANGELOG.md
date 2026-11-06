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
