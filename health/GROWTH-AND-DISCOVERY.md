# Men's Health Compass | Growth, Discovery, and Privacy Operations

**Baseline:** November 6, 2026. Applies to `https://behshad.com/health/` and the prostate topic under the existing GitHub Pages domain. This is an operational checklist, not a claim of search indexing or traffic.

## What exists
- GitHub Pages static HTML, one XML sitemap, canonical routes, SEO titles and descriptions, social cards, and indexable production pages.
- `robots.txt` generally allows crawling, including Googlebot, Bingbot and OpenAI's **OAI-SearchBot**; it does not separately grant or deny model-training use by **GPTBot**. Do not equate AI search crawl access with model training. Source: https://developers.openai.com/api/docs/bots
- `health/check-discovery.mjs` verifies the health URLs, homepage and guide metadata, JSON-LD validity, transparency links, health privacy disclosure, and unchanged GoatCounter inclusion.
- GoatCounter at `behshad.goatcounter.com`, already deployed sitewide. **Do not add additional scripts, tracking pixels, or health-interest interaction events without an explicit privacy review.**
- New publication-level About and editorial standards at `/health/about/`, linked from guide footers; dedicated health publication privacy coverage at `/health/privacy/`.

## Search ownership and measurement: account step still required
Domain ownership verification and search-performance data require a signed-in property owner. Repository or public page access alone cannot complete this.

### Google Search Console
1. Sign in to https://search.google.com/search-console/ using the intended publishing account; look for an existing verified `behshad.com` property first. Do not create a duplicate if it already exists.
2. If no property exists, add a **Domain property** for `behshad.com` and perform its requested DNS TXT verification with the domain's DNS provider. Alternatively add a URL-prefix property and use the exact verification method Search Console provides. Do not invent DNS tokens or place placeholder verification tags in public files.
3. Submit `https://behshad.com/sitemap.xml`. Check sitemap processing status and URL Inspection for `/health/`, `/health/prostate/`, `/health/prostate/basics/`, one deep guide, and `/health/about/`. Indexing is not guaranteed just because a page is eligible.
4. Review **Pages/Indexing** for discovered/crawled versus indexed, submitted URLs, canonical and noindex conflicts, redirect errors, and search performance by `/health/` page path. If available for the property, review AI Search feature performance separately.
5. Do not use `site:` search result counts as an authoritative index coverage report.

### Bing Webmaster Tools
1. Sign in at https://www.bing.com/webmasters/; inspect any existing `behshad.com` property.
2. If necessary, import the verified property from Search Console (with authorization) or verify by Bing's supported methods. Confirm `https://behshad.com/sitemap.xml` is visible/accepted.
3. Check URL Inspection, crawl/index status, site performance, and emerging AI search reporting, when available.

## Weekly baseline dashboard (manual until accounts are connected)
| Metric | Source | Scope / interpretation |
| --- | --- | --- |
| Page views by day/week | GoatCounter | Aggregate URLs starting `/health/`; chart week-on-week. |
| Top educational routes | GoatCounter | Path-level aggregate counts; do not create person-level interest profiles. |
| Search and AI referrals | GoatCounter | Referrer domain and UTM when present, e.g. `utm_source=chatgpt.com`. Referral attribution is incomplete and not a census of AI usage. |
| Search impressions, clicks, CTR, queries | Search Console | Filter page URL `contains /health/`; compare 7/28/90 days as data becomes available. |
| Search index coverage | Search Console and Bing | Count indexable, actually indexed, excluded and errors for health URLs. |
| Crawl & metadata health | GitHub Actions | Run `node health/check-discovery.mjs`, `node health/check-hierarchy.mjs`, `node health/check-v2.mjs`; check real desktop/mobile browser flow. |

**No traffic claims until baseline data is observed.** Avoid tracking individual medical questions, on-page search strings, PSA values, or appointment selections. The on-device question builder remains local. GitHub Pages does not expose server request logs through this workflow; GoatCounter does not establish the number of Googlebot, Bingbot or OAI-SearchBot crawls.

## Ongoing SEO editorial process
- Keep one general health home, one six-category prostate topic home, and established article URLs. Do not create thin duplicate guide pages merely to target keywords.
- Use source-linked evidence, article scope, dated updates where appropriate, truthful authorship/editor information, and clear medical-review limitations.
- Preserve readable HTML and internal crawlable links; validate page titles, descriptions, canonical URL, JSON-LD, alt text, accessible mobile navigation and social preview.
- Update sitemap with new **published** pages only. Do not add review sandboxes; make sure previews carry noindex and cannot be mistaken for production.
- Monitor major guideline and regulatory changes for outdated medical claims; do not automatically publish health research from a feed.
- Validate with the Google Rich Results Test and Search Console as additional evidence, but do not treat JSON-LD as a guaranteed ranking or rich-result boost.

## Revenue-readiness boundary
- Keep health guides free and free of ads until a pilot has been explicitly approved.
- First pilot should be one clearly labeled, useful, nonmedical affiliate resource on an appropriate resource page, without additional tracking pixels or clinical endorsements.
- Before publication: verify actual affiliate approval and correct link, add a near-link disclosure of possible commissions, mark the link `rel="sponsored noopener noreferrer"`, and update the privacy notice for any material new data sharing.
- Capture outbound aggregate click totals only if a privacy-safe event design is approved; rely on the affiliate provider's earnings report for actual paid conversions. Do not infer a purchase from a click.
- Review referral terms, payout minimums, returns, compliance, and whether the program accepts this domain. No affiliate program or ad account has been created by this website change.

## Release verification
1. Run hierarchy, v2 generation/diff, discovery, browser and hosted checks in GitHub Actions.
2. Merge only reviewed scoped changes. Confirm Pages production deployment.
3. Verify /health/, /health/prostate/, /health/about/, /privacy/ and /sitemap.xml via a current live fetch or browser.
4. Record ownership-verification and search dashboard status separately; they depend on authenticated account access and future indexing.
