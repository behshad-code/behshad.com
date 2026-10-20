# behshad.com

Source for the public personal website at https://behshad.com, hosted on GitHub Pages.

## Site structure

- `index.html` — public content for Home, About, Experience, Beyond Work, and Contact. Each section has its own descriptive HTML comment and section ID.
- `site.css` — responsive site design, colors, typography, and layout.
- `site.js` — navigation, Experience filters, interest panels, and GoatCounter event tracking.
- `assets/` — original portrait and images used by the main site.
- `ballot/` — **separate Ballot Compass application**; preserve its code and assets when editing the main site.
- `analytics-config.js` and `analytics.js` — existing analytics integration used by Ballot Compass.
- `CNAME` — GitHub Pages custom domain.

## Making updates

1. Review the specific public page or component being changed; keep unrelated sections intact.
2. Make changes on a branch, preview in a browser on desktop and mobile, then merge to `main` after approval.
3. Confirm images, links, and JavaScript interactions before and after the Pages deployment.
4. Preserve `CNAME`, `ballot/`, and existing analytics. Do not commit API keys or personal information.
5. Git history provides rollback. **Do not leave unused public preview directories.**

### GoatCounter

The main site uses the existing `behshad.goatcounter.com` account. It tracks aggregate visits and fixed names for page-section visits, navigation, calls to action, Experience filters, and outbound links. Do not send visitor inputs, message content, email addresses, or other personal data to analytics.

### Contact

The site currently uses a working LinkedIn contact link. A private direct-message form is intentionally *not* enabled until server-side email delivery and bot protection are configured. Never embed the recipient's private email address into browser-delivered code.

### Social metadata

Update the canonical URL, description, Open Graph metadata, and preview image when changing the public positioning. Keep the canonical URL at `https://behshad.com/`. Main site is indexable; temporary previews should not be.


### Approved preview hosting and security

- Use only this repository and its GitHub Pages host for website previews: a complete, navigable sandbox under `https://behshad.com/sandbox/<feature>-review/`. Keep the approved entry URL stable across revisions.
- Do not create, share, embed, or request previews through third-party repository-rendering or caching services, including `raw.githack.com`, `rawcdn.githack.com`, RawGit, or equivalent proxy/CDN preview hosts. Do not substitute a different hosting provider for the approved GitHub Pages workflow.
- A public branch, unlisted URL, or `noindex` tag is not private. Keep credentials, private source documents, personal data, and confidential working materials out of every public branch and sandbox.
- Preserve current feature branches and approved sandboxes during unrelated security work. Do not delete history or rewrite commits to remove a preview URL. Cache invalidation cannot prevent a public GitHub file from being fetched again.
- Use a scoped pull request for changes to protected `main`; never bypass branch protections. Publish feature content only after explicit approval, verify Pages deployment and desktop/mobile behavior, then remove obsolete sandboxes in a separate scoped change.
