# Audit implementation notes — November 10, 2026

Both repository branches are published as `codex/full-stack-audit`: [frontend](https://github.com/dminasian1999/shrek-front/tree/codex/full-stack-audit) and [backend](https://github.com/dminasian1999/shrek-back/tree/codex/full-stack-audit). GitHub access was restored after reconnecting the integration. Deploy the backend first, then this frontend, after completing the backend migration steps; keep payments disabled until sandbox verification passes.

## Visitor improvements

The supplied URL redirects to gejekoushiangifts.vercel.app. The repository's older Sevan shell differed from that live deployment; the new shell preserves the live Gejekoushian’s name, logo and verified public contact information while using existing catalog photography. A consistent cream/green storefront replaces the mixed template layout. Mobile navigation, calls to action, responsive collection grids, accessible focus and reduced-motion states, contact links, FAQ disclosures and a useful 404 now work.

The guest cart no longer crashes. Product detail and catalog views show actual prices and variant availability, with search that debounces input and ignores stale responses, pagination, empty and retry states. Mobile cart cards expose totals and 44px quantity/removal controls. Address/account forms retain edits after failure and await confirmed saves. Staff product editing now saves per-variant inventory and grams weight instead of silently discarding `quantity`.

Checkout creates a server-confirmed pending order, displays its final shipping/total, and uses server-side PayPal create/capture. Order history can resume pending payments. Missing credentials, shipping errors and SDK/capture failures produce clear states. There are no browser-created amount-based charges, fake card forms, false newsletter success or placeholder policy links. The insecure unrelated HTTP contact form was removed.

Login supports Enter and browser validation; account registration shows pending/duplicate errors. Unicode password changes use JSON. Credentials move out of persistent localStorage into a tab session with defensive storage handling. Late requests and post-payment refreshes cannot restore authentication after logout. HTTPS and a future server-issued authentication token design remain necessary; this change preserves the existing Basic API contract.

## Verification

- Fresh `npm ci`; full ESLint; TypeScript `type-check`; production build; 30 focused tests: all passed.
- 42 final browser journey checks at 1440 and390px: passed against the real local API and MongoDB, including registration, catalog search/empty/failure/recovery, sold-out controls, cart/wishlist, quantity totals, address save, unsupported shipping failure, server quote, pending-order resume, profile and Unicode password changes, staff guards and API permissions. No browser exceptions or horizontal overflow.
- 18 additional public-page viewport checks at 1440/390/320px; six public pages passed Axe WCAG2A/AA/2.1AA checks. Checkout passed Axe at desktop and mobile. Mobile cart quantity/removal was also verified with the real API at 320/390/1440px. Automated checks complement manual keyboard checks; they do not certify all assistive technologies.
- Production entry JavaScript reduced from 632.63 KB to about400KB; CSS from 970.13 KB to about427KB (roughly37% and56% smaller, uncompressed). Gzip entry assets fell from194.24/171.33KB to about125/77KB. These are build artifact measurements, not a claim about production Core Web Vitals. Large unused banners and duplicate CSS/fonts/carousel code no longer load in the shell; a smaller existing image replaces the homepage jewelry preview.
- `npm audit`: 104 original advisory entries (including 4 critical and 77 high) to zero after compatible tool/router updates, removal of unused carousel/npm dependencies and a tested minimatch override in TypeScript ESLint. Audit results are a point-in-time dependency check.

Staff product create/edit/delete and missing-upload-configuration recovery also passed with the real API at 1440/390/320px, including persisted weights and variants, API404 after deletion, zero Axe violations, no overflow and no browser exceptions.

The backend companion passes 40 tests, including actual MongoDB replica-set stock commit/rollback with a mocked gateway. No production records, emails, S3 uploads or payments were created. Actual PayPal sandbox/live, S3 and mail integration remain unverified without credentials. The deployed API first timed out, then returned HTTP 503.

See both READMEs for environment setup and backend migration requirements: remove/rotate old default administrator credentials, purge legacy card data/tokens, validate catalog inventory/weights and shipping rates, configure Mongo transactions and currency conversion, and complete sandbox payment verification before enabling charges. New public copy remains English; existing Armenian/Russian form translations are partial. Backend unsupported SDKs and remaining Spring advisory matches are documented in its README.
