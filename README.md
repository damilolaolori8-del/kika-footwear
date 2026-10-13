# KIKA Footwear

A blue-and-white footwear retail assignment built with Next.js 15, TypeScript, Tailwind CSS 4, Manrope, Space Grotesk and Lucide icons. Brand identity: **Keep It Klassic Always**. Based in Lagos, Nigeria.

## Development

Requires Node.js 20.9+ and npm. In the project directory:

```bash
npm ci
npm run dev
```

Open http://localhost:3000 on the computer running the server. Keep the terminal open. `localhost` on your computer does not reach a cloud server. The cloud onboarding screen does not provide a browser preview. Share the production Vercel URL to let others view the assignment.

```bash
npm run typecheck
npm run build
npm start
```

## Browser tests

```bash
npx playwright install chromium
npm run test:e2e
```

If Chromium is already installed in a restricted cloud workspace, use its binary:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

The suite checks collection/search/price filters, size validation, persistent cart and wishlist, NGN checkout totals, demo registration and login, duplicate email and incorrect password handling, supplied contact links, image responses and mobile layouts at 320px and 390px.

## What works

- 20 product pages with EU size selection and descriptions.
- Original-brand icon edit, campus collection (₦25,000–₦55,000), and a 9–5 collection including flats, loafers and unisex smart shoes.
- Search, collection/category filters, price range, sorting, responsive navigation.
- Browser-persistent cart and wishlist; simulated checkout with NGN totals.
- Demo email/password registration, sign-in, sign-out, duplicate email checks and account page.
- TikTok, Instagram, X and YouTube links provided by the owner; click-to-call **09066400635** and **Lagos, Nigeria** contact information.

## Assignment boundaries

No real payments, identity verification, live stock, fulfilment, email sending or backend persistence. Demo accounts work only in the browser where they were created. Passwords are salted and hashed using browser Web Crypto PBKDF2, but localStorage is not a secure authentication backend. Users are asked to use a demo password, not a password used elsewhere. Profiles/sessions/cart/wishlist can be modified by browser users and must never authorize real orders or access to private data. Clearing browser data removes demo accounts. Delivery fields are not transmitted or retained; contact forms validate locally only.

All prices are in NGN. Branded prices are **indicative estimates for new original stock**, not live market research or verified supplier quotes. The campus collection contains illustrative independent-label alternatives, not branded replicas. The retailer's original-brand positioning is the intended business concept; supplier authenticity and stock are not verified by this assignment. Materials, availability, delivery rates and policies need confirmation before commercial launch. Illustrative Lagos shipping is ₦3,500, free from ₦200,000.

## Edit content

- `lib/products.ts`: catalogue, prices, sizes, category/collection membership, image references and image notes.
- `lib/contact.ts`: phone, location and social links.
- `public/brand/kika-logo.png`: new generated logo concept.
- `public/products/`: locally served product/reference imagery; Next.js optimises these assets for browsers.
- `app/globals.css`: cobalt blue, navy and white visual identity and responsive styling.
- `IMAGE_SOURCES.md`: photography/source notes. Some assets illustrate a silhouette in another colourway or are generated concepts; product pages disclose this. These are not evidence of actual stock or authenticity.

No environment variables are needed for the assignment. GitHub pushes to `main` normally trigger Vercel's connected production deployment. Real commerce needs secure server authentication, provider payments, server-validated prices/inventory, order persistence and confirmed policies.
