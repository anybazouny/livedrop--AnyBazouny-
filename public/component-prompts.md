# component-prompts.md
Brief log of prompts used to scaffold components and what the AI produced.

---

## Catalog page (src/pages/catalog.tsx)
**Prompt used**
"Generate a Catalog page in React+TSX that reads product data, supports client-side search using title/tags, sorting by price asc/desc, and a tag filter. Render a product card with title, price, image, Add-to-Cart button and View link. Use Tailwind, lazy-load images, and use the provided useCart hook."

**What was produced**
- `src/pages/catalog.tsx` — full component with async product loading (from public/mock-catalog.json), search, tag filter, sort, lazy images, aria-labels, and wired `addToCart(product, 1)`.

---

## Product page (src/pages/product.tsx)
**Prompt used**
"Create a product detail page `/p/:id` that fetches a single product, shows title, price, description, stock indicator, Add-to-Cart button (disabled when out of stock), and renders 3 related items by shared tag."

**What was produced**
- `src/pages/product.tsx` — loads product and related items (via listProducts/getProduct), Add-to-Cart call, accessible controls, and lazy images.

---

## Cart (src/pages/cart.tsx + src/lib/store.tsx)
**Prompt used**
"Implement a persistent cart using React Context. Provide addToCart, removeFromCart, updateQuantity, totalPrice, clearCart. Persist to localStorage and expose a useCart hook."

**What was produced**
- `src/lib/store.tsx` — CartProvider, useCart hook, localStorage rehydrate and persist, all TypeScript typed.
- `src/pages/cart.tsx` — cart UI with qty +/- and remove; totals formatted via formatCurrency.

---

## Checkout (src/pages/checkout.tsx)
**Prompt used**
"Create a checkout stub that shows order summary and total, Place Order button creates a fake order id and routes to /order/:id. Clear cart after placing."

**What was produced**
- `src/pages/checkout.tsx` — summary, Place Order flow, error handling, accessibility attributes.

---

## Order Status (src/pages/order-status.tsx + src/lib/api.ts)
**Prompt used**
"Implement an order status page that reads /order/:id, calls getOrderStatus and displays status, carrier, ETA. Mask full order id (show last 4)."

**What was produced**
- `src/pages/order-status.tsx` — shows masked order ID and status.
- `src/lib/api.ts` — deterministic getOrderStatus implementation for demo.

---

## Ask Support (src/components/organisms/AskSupport.tsx, src/assistant/engine.ts, src/assistant/ground-truth.json)
**Prompt used**
"Build an Ask Support slide-over component and a local engine. Engine must only use ground-truth.json and getOrderStatus(orderId), detect order ids using /[A-Z0-9]{10,}/, score Q&As by keyword-overlap, append citation [Qxx], mask PII, and refuse when confidence is low."

**What was produced**
- `src/assistant/ground-truth.json` — 20 Q&A pairs.
- `src/assistant/engine.ts` — local matcher (tokenize + overlap scoring), order-id detection and masking.
- `src/components/organisms/AskSupport.tsx` — accessible slide-over UI, Enter-key submit, responses list, and minimal focus handling.

---

Notes
- All prompts were targeted to produce TypeScript + Tailwind + accessible outputs.  
- Tests and Storybook stubs were included for critical components (can be expanded on request).
