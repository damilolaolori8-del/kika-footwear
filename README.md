# KIKA Footwear

Responsive multi-brand footwear storefront built with Next.js 15, TypeScript, Tailwind CSS 4, and Lucide icons.

## Run locally

Requires Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

Run these commands in the project folder on the same computer as your browser, then open http://localhost:3000. Keep the terminal running. `localhost` always refers to your own computer; starting the server in a cloud workspace does not make it accessible at your computer’s localhost address. The cloud onboarding screen does not provide a browser preview. Other hosting tools may provide forwarded ports or deployment URLs. The server binds to 0.0.0.0.

```bash
npm run typecheck
npm run build
npm start
```

## Features

Homepage, category browsing, shop search/filter/sort, product pages with EU size selection, browser-persistent cart and wishlist, simulated checkout, demo sign-up/login/account, About, Contact, FAQs, and shipping information.

## Demo boundaries

No real payments, identity verification, inventory, fulfilment, emails, or backend persistence. Account profiles, cart and wishlist are stored in localStorage in the current browser. No passwords or card details are requested. Checkout delivery fields are not transmitted or retained. Contact messages are validated locally only. Catalogue brands, names, prices, sizes and policies are illustrative and need supplier/legal verification before commercial launch. USD is used throughout.

Product and editorial photography is served from Unsplash and requires internet access to `images.unsplash.com`. A local footwear illustration is displayed until photography loads, so restricted networks do not show broken images; illustrative photos may not depict the named model. For production, replace with licensed, verified product assets. Real commerce requires payment-provider integration, a secure authentication backend, trusted server-side pricing and inventory, order storage, transactional email, and confirmed policies.
