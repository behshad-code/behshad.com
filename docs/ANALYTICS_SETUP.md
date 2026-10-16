# Ballot Compass / Behshad.com analytics activation (Version 2.4)

Tracking hooks are installed on both the **homepage** and **/ballot/**, but **no site analytics are active yet**. The owner must connect an analytics service.

1. Create a GoatCounter site at https://www.goatcounter.com/ and register behshad.com.
2. From the resulting dashboard URL, e.g. https://yourcode.goatcounter.com, copy just the *public site code* (`yourcode`).
3. On a separate GitHub feature branch, change `analytics-config.js` to `window.BC_ANALYTICS_GOATCOUNTER_CODE = 'yourcode';`.
4. Review, merge, and test the **private dashboard** at https://yourcode.goatcounter.com.
5. Pageviews for homepage and Ballot Compass should appear. GoatCounter can also display approximate engagement, sources and our fixed safe UI events.

## What is and is not captured

**Captured once activated:** aggregate page views, normal anonymous referrer/channel information, and the fixed events ballot-start, how-it-works-open, local-preview-open, reference-sheet-open, reference-sheet-print, priorities-dialog-open, research-tab-open, ballot-navigation, landing-feature-open.

**Never sent from our app:** user names, postal/residential addresses, priorities, candidate or proposition choices, saved leanings, reference sheet notes, form data or specific ballot question identifiers. No session replay, third-party advertising pixels or identity matching.

**Limitations:** Site visitors' actual names cannot be established from anonymous pageviews. Ad blockers can limit reporting. No owner analytics page is placed in this PUBLIC GitHub repository: your password-protected GoatCounter dashboard supplies that safely. This is a tracking-ready integration, **not** a live metrics system until the owner completes signup.

Documentation:
- https://www.goatcounter.com/help/events
- https://www.goatcounter.com/help/js
