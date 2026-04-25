# PDD-Style Mobile Commerce Design

## Goal

Build a pure frontend Vue 3 mobile commerce app inspired by Pinduoduo. The app should use local mock data and allow a complete shopping flow from product discovery to order success.

## Confirmed Direction

- Visual style: high-energy red promotion style, close to the common Pinduoduo mobile homepage impression.
- Flow scope: homepage, campaign page, product detail, cart, checkout, and order success page.
- Technical approach: Vue 3 + Vite + Vue Router + Pinia, with all product, campaign, user, and order data mocked locally.

## Architecture

The app will be a Vite-powered Vue 3 single page application. Vue Router owns page navigation, while Pinia owns user shopping state such as cart items, checkout items, selected address, and the latest mock order.

Routes:

- `/`: homepage with search, channel shortcuts, flash sale blocks, and product feed.
- `/campaign`: promotional campaign page with coupons, countdown, and campaign products.
- `/product/:id`: product detail page with product information, specs, quantity controls, add-to-cart, and buy-now actions.
- `/cart`: cart page with selectable items, quantity changes, deletion, and checkout entry.
- `/checkout`: checkout page with address, selected products, delivery, discount, payment summary, and submit-order action.
- `/success`: order success page with order number, paid amount, and return actions.

## Data Model

Mock data will live in local source files and should be deterministic enough for predictable demos.

Products include:

- `id`
- `title`
- `subtitle`
- `price`
- `originalPrice`
- `sales`
- `image`
- `tags`
- `stock`
- `specs`
- `campaign`

Cart items include:

- `productId`
- `spec`
- `quantity`
- `selected`

Orders include:

- `orderNo`
- `items`
- `address`
- `subtotal`
- `discount`
- `shipping`
- `total`
- `createdAt`

The app does not need backend persistence. Cart and order state may live in memory for the first implementation. Local storage can be added later if persistence becomes a requirement.

## Page Behavior

Homepage:

- Uses a red header with a prominent search field.
- Shows dense channel shortcuts and promotion modules.
- Shows a two-column product feed.
- Product cards route to product detail.
- Bottom tab navigation includes home, campaign, and cart.

Campaign page:

- Uses a stronger promotional layout than the homepage.
- Shows coupon-like panels, a countdown, and campaign product sections.
- Product cards can either open detail or use buy-now to jump into checkout.

Product detail:

- Shows product hero area, price, tags, sales, specs, and delivery notes.
- Supports selecting a spec and changing quantity.
- `Add to cart` stores the selected product in Pinia and leaves the user on the detail page with feedback.
- `Buy now` sets checkout items to the selected product and routes to checkout.

Cart:

- Shows empty state when no items exist.
- Allows selecting items, select-all, quantity increment/decrement, and deletion.
- Checkout only includes selected items.
- Quantity cannot drop below 1.

Checkout:

- Shows a default mock address.
- Shows selected products and calculated price summary.
- Includes a discount amount when campaign items are present.
- Submitting creates a mock order in Pinia and routes to success.
- If checkout is opened without items, the page should guide the user back to shopping.

Success:

- Shows order number and total amount.
- Provides actions to return home or view cart.

## Visual Design

The mobile viewport is the primary target. On desktop, the app should render in a centered phone-width shell so the mobile layout remains easy to inspect.

Visual thesis: energetic red promotion surface, dense product discovery, and clear sticky purchase actions.

Content plan:

- Home: search, channels, sale modules, product feed.
- Campaign: coupons, countdown, featured deals.
- Product detail: price-led product decision surface.
- Cart and checkout: operational clarity with strong red purchase CTAs.

Interaction thesis:

- Sticky bottom navigation and sticky purchase bars keep primary actions reachable.
- Product cards use quick visual feedback on press or hover.
- Page transitions and lightweight entrance animation should make the app feel responsive without distracting from shopping.

## Error And Edge States

- Empty cart state routes users back to homepage.
- Checkout with no selected items shows a recoverable empty state.
- Quantity controls enforce minimum quantity 1 and maximum product stock.
- Missing product IDs should show a not-found style state with a way back to homepage.

## Verification

The implementation should be verified by:

- Running dependency installation if needed.
- Running the production build command.
- Starting the dev server and verifying the flow in browser.
- Manually checking these paths:
  - Home product -> detail -> add cart -> cart -> checkout -> success.
  - Campaign product -> buy now -> checkout -> success.
  - Empty cart state.
  - Quantity minimum and stock maximum behavior.

## Out Of Scope

- Real backend APIs.
- User authentication.
- Real payment integration.
- Real image asset fetching.
- Long-term cart persistence.
