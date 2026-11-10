# Gejekoushian’s Armenian Ceramics & Gifts

React 18 + TypeScript + Redux Toolkit storefront, built with Vite. The supplied live address redirects to https://gejekoushiangifts.vercel.app; its brand/contact details are preserved here. The previous repository contained older Sevan branding and differed from the live deployment.

## Run locally

Use Node 24 LTS and npm. Start [shrek-back](https://github.com/dminasian1999/shrek-back) with local MongoDB first.

```sh
npm ci
cp .env.example .env.local
npm run dev -- --host 0.0.0.0
```

Open http://localhost:5173. `VITE_API_BASE_URL` is the backend origin (no `/users`). It defaults to `https://shrek-back.onrender.com` when omitted. Vite variables are public and embedded at build time; changing them requires a rebuild. Never place client secrets here. Set the **public** `VITE_PAYPAL_CLIENT_ID` only after configuring the matching sandbox/live backend account.

```sh
npm run lint
npm run type-check
npm test
npm run build
npm run preview -- --host 0.0.0.0
```

For the preview server on port 4173, include `http://localhost:4173` in the backend `APP_CORS_ALLOWED_ORIGINS`.

## Routes and journeys

| Routes | Visitor action / API |
| --- | --- |
| `/`, `/collections`, `/about`, `/contact-us`, `/faq` | Public information, collection links, real email/phone support |
| `/shop`, `/shop/:category`, `/category/:id/:type` | Search/filter/sort `POST /posts/search`; empty/error/retry states |
| `/product/:id` | `GET /post/:id`; select in-stock variant, sign in to add to cart/wishlist |
| `/login`, `/register`, `/forgot-password` | Account forms; recovery availability accurately stated |
| `/wishlist`, `/cart` | Owner cart/wishlist APIs; guests get sign-in guidance |
| `/account`, `/profile` | Protected profile/address/password; owner order history and pending-payment links |
| `/checkout`, `/checkout?order=:id` | Protected server quote, saved order resume, server-owned PayPal create/capture |
| `/new`, `/product/edit/:id` | Moderator/administrator catalog tools; validated grams and per-variant stock |
| Other paths | Useful 404 page; old template-only report/sales routes point to the account; signup points to registration |

Authentication uses explicit Basic headers because that is the existing backend contract. Credentials are held in tab-scoped `sessionStorage`, are restored only while their saved session is less than one hour old, and are removed on logout; legacy `localStorage` credentials are removed. HTTPS is required in production. This is not a token/session redesign; migrate to short-lived server-issued credentials in a separate change.

## Checkout deployment

Deploy the backend change before this frontend, then deploy both together before enabling payment. The browser sends `POST /checkOut` with `{shippingAddress}`; the server reads canonical catalog/cart data and returns a pending order with USD total and shipping. PayPal create receives the local `{orderId}`; capture and amount/currency/owner verification happen on the server. The browser never supplies the charge amount or marks an order paid.

Backend setup requires a transaction-capable MongoDB replica set, valid shipping tables, an explicit ILS-to-USD shipping conversion rate, PayPal sandbox credentials, and `CHECKOUT_PAYMENTS_ENABLED=true`. Keep checkout disabled until sandbox approval/capture/retry tests are completed with your account. No real PayPal credentials were available for this audit. See backend README for migrations and reconciliation requirements.

`vercel.json` supplies SPA deep-link fallback and response headers. Review Vercel production/staging environment variables before deploying. The current Render dashboard link is an administration URL; the public API URL used by this repository is above.

## Remaining setup and boundaries

- Password recovery email delivery and newsletters were not implemented; the UI no longer claims success for either.
- New public copy is English; existing Armenian/Russian account-form translations remain partial. Product descriptions come from your catalog.
- Confirm business policies and translations before publishing additional policy pages. Unsupported refund/free-shipping/24-hour support promises were removed.
- Automated accessibility checks supplement manual keyboard and mobile checks; they do not certify every assistive-technology combination.
