# AI-Assisted Website Development: GitHub Connection and Release Runbook

**Repository:** `behshad-code/behshad.com`  
**Production branch:** `main` (protected; use a branch and pull request)  
**Published site:** `https://behshad.com/` through GitHub Pages  
**Scope:** Main website, Men's Health Compass, Ballot Compass, and future subprojects  
**Maintained:** November 9, 2026

> **Start here in every fresh development session.** This runbook is a durable, repository-backed reference. Do not depend on assumptions about chat memory, shell availability, cached credentials, or an earlier tool configuration.

## 1. One approved access path: the connected GitHub app

**Default for repository reading, branches, file changes, pull requests, merges, and GitHub Actions: use the GitHub connector/app available to ChatGPT.**

- Discover current GitHub connector operations for the active session. In sessions providing `functions.exec` and `ALL_TOOLS`, look for names beginning with `mcp__GitHub__`; inspect the actual action contract before invoking it. Tool names or schemas can evolve.
- Read the repository metadata with the connected GitHub app, then read `AGENTS.md`, this runbook, the root `README.md`, and applicable area-specific instructions. Do not jump directly to writing.
- Do not use a `git clone` command, local `git push`, GitHub REST requests from a sandbox, a web search, or a raw GitHub URL **as a substitute for the connected GitHub app**. Those paths may lack network access or authentication, even when the app is fully working.
- Local Python/container tools may prepare assets, audit a local file, or run available tests, but that local environment's network connection is **not** evidence of the GitHub connector's status. Preserve the distinction.
- Web browsing can supply public site context, but it does not replace an authenticated repository write operation.

**Verified incident (November 9, 2026):** A local shell `git clone https://github.com/behshad-code/behshad.com.git` failed with `Could not resolve host: github.com`. That was a DNS/network limitation of the local execution environment. It was **not** a lost GitHub app connection. The app subsequently read the repository, reported push access, and successfully created a development branch. Never diagnose disconnection from a shell-network failure alone.

### Connection health checklist, in order

1. **Discover the app** in the active tool environment. Do not infer that it vanished just because it has a different tool entrypoint.
2. **Get repository metadata** through the GitHub app (`get_repo` or current equivalent). Verify exact repository, default branch, and reported permissions.
3. **Read a known file** through the GitHub app (`fetch_file`, e.g. `AGENTS.md` or `health/README.md`).
4. When a write capability needs proof, **create a new, narrowly named non-production branch** from `main` via the GitHub app. Never use a production edit merely to test the connection. Do not delete unrelated or previously created branches.
5. If those steps succeed, GitHub connectivity is operational; continue using the app. Do not demand user reconnection.
6. If the GitHub app itself reports an authorization, installation, repository-selection, access, or permission problem, investigate that exact issue. Use the available connection-management flow only if needed; user action may be required. Distinguish authentication failure, insufficient permissions, protected-`main` writes, repository not found, temporary provider error, and local sandbox network failure.
7. Explain precisely which operation failed and what remains possible. **Never claim access has been lost or that work was published without validating through the GitHub app.**

## 2. Source of truth and reading order

Before making changes:

1. Read `AGENTS.md` (repo-wide non-negotiable safety, previews, and release rules).
2. Read `README.md` and inspect current `main`, relevant PRs, and active work. Use GitHub app reads.
3. For Men's Health Compass also read `health/SITE-ARCHITECTURE.md` and `health/README.md`. Other projects have their own instructions.
4. Read the **actual files** for the affected pages/components and their shared CSS, JS, and assets; do not rely on an older screenshot or a previous assistant's description.
5. Identify whether the page is hand-maintained or generated. In particular:
   - The prostate home `health/prostate/index.html` is maintained directly (not produced by `health/build-v2.mjs`).
   - Many v2.1 category/pillar pages are generated from `health/prostate/data/v2.1-pillars/*.json` by `health/build-v2.mjs`. Where the generator adds contextual navigation/markup, make that change in the generator **and** regenerate/commit its output.
   - The build workflow runs `node health/build-v2.mjs` followed by `git diff --exit-code -- health/prostate`; a hand-edited generated file may be overwritten and fail the build.
   - Other static pages may have their own generator. Inspect and confirm ownership rather than guessing.
6. Record the current branch and relevant commit SHA. Preserve simultaneous work, existing site behavior, links, SEO, GoatCounter, assets, DNS/`CNAME`, privacy safeguards, and other site sections.

## 3. Change implementation, through the GitHub connector

**Use a surgical, issue-specific change.** Do not redesign previously approved material unless asked.

1. Resolve scope and explicit user approval. For feature publication, a proposed design is **not** permission to publish; wait for the user's approval or "GO." Documentation and investigation can be performed without modifying live site content.
2. Create/reuse a specific feature branch based on the current `main`; avoid collisions and inspect preexisting branches before reusing them.
3. Use GitHub connector operations to read and modify UTF-8 content:
   - `fetch_file` to read content and exact blob SHA.
   - `update_file` for existing files, passing the current SHA and the feature branch.
   - `create_file` for new UTF-8 files, always on the feature branch.
   - Make sequential edits to a single path; stale SHAs and concurrent writes can conflict.
4. **Binary images/assets:** never fake a file by writing base64 as ordinary text. Use the available GitHub Git-data blob/tree/commit/ref actions, or a supported binary upload path. The blob must be created with proper binary content/encoding, placed at its intended repository path in a tree based on the current branch, committed, and attached to that branch. Verify asset path, dimensions, type, byte count, and that page images load in a real browser. Do not embed unnecessary base64 data URLs in published HTML.
5. Images must be appropriate, accurate, optimized, and rights-cleared. Preserve approved imagery; do not silently substitute an AI-generated product image for the real product.
6. Keep affiliate URLs accurate. For a recommendation card, when the owner requests it, the product image, linked title, and button should open the **same** verified tagged destination; use appropriate `rel` attributes and meaningful GoatCounter event names without collecting visitors' personal data.
7. Disclosures and medically relevant text must follow applicable obligations and the site's approved editorial policy. Do not invent medical outcomes, verified personal-use claims, approvals, product details, prices, or references.
8. Make source-of-truth updates together with generated outputs so future builds do not revert the change.

## 4. Pre-merge checks

Use the workflows already in this repository; don't replace them with a speculative test stack.

- `node health/build-v2.mjs` and a check that generated HTML diffs are intentional/current.
- `node health/check-hierarchy.mjs` and `node health/check-v2.mjs` for health changes.
- Relevant `health/check-discovery.mjs` and `health/check-v21-sources.mjs` checks where applicable.
- The GitHub Actions workflows `health-v2-review.yml`, `health-v21-browser.yml`, and `health-v21-hosted.yml` (where their path triggers apply).
- Existing real-browser scripts `health/qa-v21-browser.mjs` and `health/qa-v21-hosted.mjs`. Check desktop and mobile; add a tablet viewport for iPad-specific layout issues. Chromium validation is **not** proof of real Safari-specific behavior.
- Test internal links, image loading and natural dimensions, captions/alt text, keyboard/focus interactions, responsive overflow, canonical/meta tags when relevant, existing navigation, outbound links, affiliate tags, and GoatCounter event markup.
- Respect the approved **first-party GitHub Pages sandbox** under the stable `https://behshad.com/sandbox/<feature>-review/` path when a hosted preview is required. Never introduce third-party preview mirrors or claim that an unlisted/noindex URL is private.

A passing source check is not a published site. A passing build is not proof that links and interaction work. Document tests that actually ran and anything not verified.

## 5. Pull request, production, and review

1. Create a narrowly scoped pull request targeting protected `main` via the GitHub app. Describe files changed, site impact, tests performed, remaining uncertainty, and any user-approved content choices.
2. Inspect the PR's exact head SHA and CI status via GitHub. Resolve failed checks on the feature branch. Do not use direct writes to `main` as a workaround for its protections.
3. Obtain explicit approval for publication where not already given. Do not merge work outside the agreed scope.
4. Merge the reviewed PR through the GitHub app using the head SHA to guard against unexpected updates.
5. **Verify deployment** using the GitHub Actions Pages workflow/run for the merged commit, with a successful `deploy` job/conclusion. Also inspect the production source and the live public URLs as access permits.
6. Do not equate `merged` with `deployed`, or automated Chromium checks with physical iPad/Safari validation.
7. Report concisely: changed content, exact PR, what tests passed, whether Pages deployed successfully, live URL(s), and anything requiring the owner's visual review.
8. Never claim a live implementation happened when only a mockup or branch exists. Do not promise background work without actually scheduling it through a supported tool.
9. Protect Git history. Do not force push, remove existing site sandboxes/branches as incidental cleanup, or erase unrelated work.

## 6. Failure playbook: diagnose the layer, not the symptom

| Symptom | Likely layer / next action |
| --- | --- |
| Shell says `Could not resolve host: github.com` | **Local container DNS/network**. Check GitHub app independently. Do not claim GitHub connection lost. |
| GitHub app operation not listed | Discover available app tools/connector state before substituting manual workflows. |
| GitHub app says authentication required | Check connection/reconnection via plugin management; explicit user action if needed. Do not assume it is a permissions issue. |
| GitHub app reads repo but write fails | Inspect reported permissions, operation error, branch rules, and target branch. Test a feature branch, not `main`. |
| Direct `main` write rejected | Expected for protected branch. Use feature branch → PR → merge. |
| `Generated pages are current` fails | Update source data or `health/build-v2.mjs`, regenerate outputs, then rerun checks. |
| Build passed, but live change is not visible | Inspect Pages workflow, deployed commit, asset paths, browser caching, and actual live page before asserting success. |
| Product/teaser image cropped on tablet | Inspect `object-fit`, aspect ratio, and container dimensions; test tablet viewport and ask for Safari visual verification when appropriate. |
| Amazon click not tracked | Verify the exact destination, affiliate tag, clickable elements, link `rel`, and GoatCounter click attribute separately; do not simulate purchases or promise commission attribution. |
| Uploaded binary inaccessible in one tool | Diagnose the file bridge/storage step; do not invent a raw URL or replace the image without the owner's knowledge. |

## 7. Continuity contract for future assistants

- **Every new conversation**: read this file from the current GitHub repository through the connected GitHub app before editing.
- Treat actual repository instructions, current GitHub state, and the user's current authorization as the source of truth. Past chat context and assistant memory can help locate material but may be stale or incomplete.
- If connector access is temporarily absent, say which access route was tested, check the connection through supported tools, and preserve the request/scope. Do not declare an infrastructure outage based on a local `git clone` failure.
- Preserve named product links, uploaded images, approved layouts, and partial work across turns. Track unfinished work explicitly, but never call it complete until PR merge and deployment are verified.
- If an architectural or tool approach must change, explain the reason and obtain user approval for material changes rather than silently improvising.
- Never commit private credentials, medical records, bank/tax information, private contact details, or confidential employer data to this public repo.

**This runbook supplements, and does not override, `AGENTS.md`, `README.md`, `health/SITE-ARCHITECTURE.md`, or the user's explicit instructions.**
