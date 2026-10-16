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

## Privacy limits
Do not send voter choices, candidate or proposition IDs, priorities, addresses, search terms, name/email values, exact source URLs, or notes in event payloads. No visitor identity tracking or ad pixels are introduced. The hosted GoatCounter service does **not store visitor IP addresses or reverse-DNS hostnames**. IPs are briefly used to derive approximate geography and session statistics, per https://www.goatcounter.com/help/privacy. GitHub Pages does not supply raw visitor request logs for this site. Capturing raw IPs would require a different server-side collection system and a deliberate privacy/legal review, which is not implemented here.

## Validation
1. Test `/` and `/ballot/` in a browser that permits GoatCounter; check both page paths under **Pages**.
2. On `/ballot/`, click **Explore my ballot**, choose an in-app city preview, use a research tab, and click a source link. Verify corresponding fixed events under **Pages**.
3. Click **Share**. On a browser without a native share sheet, verify the copied URL contains `utm_campaign=ballot_shared`. Open that link in another browser and confirm the **Campaigns** widget.
4. Use the Facebook-tagged link above and confirm `ballot_launch` in **Campaigns**.
5. After testing, exclude your own browser using https://www.goatcounter.com/help/skip-dev to reduce test noise.

Ad blockers can prevent collection, and not every section will populate with only a few visits.
