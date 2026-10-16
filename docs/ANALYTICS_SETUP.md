# Behshad.com and Ballot Compass analytics

## Current status
GoatCounter tracking is activated on `behshad.com` and `behshad.com/ballot/` using the hosted `behshad` site code. The integration is loaded from `analytics-config.js` and `analytics.js`. The public site code is not a secret. No analytics account credentials or access tokens are in the repository.

Private owner dashboard: https://behshad.goatcounter.com/
Site setting: **Dashboard viewable by → Only logged in users**. Use a strong password and MFA.

## Sharing and attribution
Use this link when announcing the site on Facebook:

https://behshad.com/ballot/?utm_campaign=ballot_launch&utm_source=facebook

Visitors can click **Share** from the ballot research workspace (the approved welcome page is unchanged). That uses:

https://behshad.com/ballot/?utm_campaign=ballot_shared&utm_source=visitor_share

GoatCounter automatically groups incoming visits with these query parameters under **Campaigns**. A visit attributed to `ballot_shared` means someone opened a site-generated sharing URL. It does NOT prove a particular share reached someone or identify who shared it. Someone manually forwarding the original Facebook URL still appears as `ballot_launch`. Browser privacy settings and Facebook's in-app browser can also hide normal referrers.

## Automatic site metrics
Page visits, aggregate referrers, campaign attribution, browser and operating system summaries, screen size, and approximate geography subject to collection settings and visitors' browser protections. Main page and Ballot Compass are distinct page paths, `/` and `/ballot/`.

## Safe interaction events
The original nine fixed events remain:
- `ballot-start`, `how-it-works-open`, `local-preview-open`
- `reference-sheet-open`, `reference-sheet-print`, `priorities-dialog-open`
- `research-tab-open`, `ballot-navigation`, `landing-feature-open`

Additional event categories:
- `local-preview-selected` and `local-directory-search-used`
- `county-election-office-open`, `official-research-source-open`, `external-research-source-open`
- `homepage-linkedin-open`
- `share-button-open`, `share-link-copied`, `share-sheet-completed`

Events are recorded under `interaction-<name>` in the GoatCounter dashboard. Click and share events show intent/actions, not confirmed delivery, readership, ballot completion, or conversion.

## Interpreting early launch traffic (especially mobile)
- **Pages** rows such as `/` and `/ballot` are website views. Rows prefixed `interaction-` are **event counts**, not pageviews. GoatCounter's **Totals** can include both. Do not describe the total as unique people.
- **iOS share** measures the operating-system share of recorded activity, not the percentage of distinct voters or people. **Screen size** helps infer phone usage but isn't a guaranteed device classification.
- **Referrers** and **Campaigns** answer different questions and overlap. For example, Facebook referrals and the `ballot_launch` tagged campaign must not be added together as distinct people.
- **Unknown referrer** does not prove a link was forwarded. Social apps and browser privacy controls can hide referrer headers. A tagged `ballot_shared` visit is evidence that a site-generated sharing link was opened, not that a particular person forwarded it.
- `interaction-ballot-start` means someone clicked the entry button. It is not a verified person-level conversion rate or a completed ballot.
- `interaction-mobile-evidence-open` counts **switches into the mobile Evidence panel**, not specific propositions or positions. It is intentionally separate from `interaction-research-tab-open`.
- `interaction-local-preview-open` now includes both the desktop and mobile **local directory entry** buttons. The separate `interaction-local-preview-selected` records selecting an in-app community preview.
- `interaction-reference-sheet-open` and `interaction-reference-sheet-print` show actions, not confirmed printing or voting. No ballot choices or notes are tracked.

For a clean view, choose a date range after launch and look at the site page rows first. Treat interaction rows as engagement signals, not visitors. After validating analytics in your own browsers, exclude testing activity from your browser using https://www.goatcounter.com/help/skip-dev.

## Mobile and performance review
The existing HTML, CSS, media breakpoints, page design, and ballot logic are deliberately unchanged in this tracking update. Mobile testing should still include an actual iPhone Safari or iOS in-app browser walkthrough (welcome → Explore my ballot → Evidence → local directory → source link → reference sheet → Share). A source-level check cannot establish real-world page speed or prove the interaction flows on every device. Prioritize a measured field test before undertaking any changes to the large, embedded-artwork page.

## Privacy limits
Do not send voter choices, candidate or proposition IDs, priorities, addresses, search terms, name/email values, exact source URLs, or notes in event payloads. No visitor identity tracking or ad pixels are introduced. The hosted GoatCounter service does **not store visitor IP addresses or reverse-DNS hostnames**. IPs are briefly used to derive approximate geography and session statistics, per https://www.goatcounter.com/help/privacy. GitHub Pages does not supply raw visitor request logs for this site. Capturing raw IPs would require a different server-side collection system and a deliberate privacy/legal review, which is not implemented here.

## Validation
1. Test `/` and `/ballot/` in a browser that permits GoatCounter; check both page paths under **Pages**.
2. On `/ballot/`, click **Explore my ballot**, choose an in-app city preview, use a research tab, and click a source link. Verify corresponding fixed events under **Pages**.
3. Click **Share**. On a browser without a native share sheet, verify the copied URL contains `utm_campaign=ballot_shared`. Open that link in another browser and confirm the **Campaigns** widget.
4. Use the Facebook-tagged link above and confirm `ballot_launch` in **Campaigns**.
5. After testing, exclude your own browser using https://www.goatcounter.com/help/skip-dev to reduce test noise.

Ad blockers can prevent collection, and not every section will populate with only a few visits.
