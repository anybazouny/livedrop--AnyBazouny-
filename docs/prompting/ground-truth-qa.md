### Q01: How do I create a seller account on Shoplite?
**Expected retrieval context:** Document 8: Seller Account Setup and Management
**Authoritative answer:** To create a seller account, go to the Shoplite seller registration page, complete your business profile with contact details, bank payout info, upload a logo and business description, and accept the marketplace agreement. Expect business verification to take 2-3 business days before products can be published.
**Required keywords in LLM response:** ['seller registration', 'business verification', '2-3 business days']
**Forbidden content:** ['instant approval', 'no verification required', 'personal accounts']


### Q02: What is Shoplite's return window for standard items?
**Expected retrieval context:** Document 6: Return and Refund Policies
**Authoritative answer:** Most non-perishable items fall under a 30-day return window measured from delivery date. Exceptions such as perishable or personalized goods may be excluded or follow different rules.
**Required keywords in LLM response:** ['30-day return window', 'delivery date', 'exceptions']
**Forbidden content:** ['no returns', 'lifetime returns']


### Q03: Which payment methods does Shoplite support?
**Expected retrieval context:** Document 4: Payment Methods and Security
**Authoritative answer:** Shoplite supports major credit/debit cards (Visa, MasterCard), digital wallets . Seller payouts use bank transfer or supported payout partners.
**Required keywords in LLM response:** ['Visa']
**Forbidden content:** ['cash on delivery only', 'no card support']


### Q04: How does Shoplite handle multi-seller carts?
**Expected retrieval context:** Document 3: Shopping Cart and Checkout Process
**Authoritative answer:** Shoplite allows items from multiple sellers in one cart; checkout may split orders per seller for fulfillment but presents a consolidated invoice and calculates shipping per seller when necessary.
**Required keywords in LLM response:** ['multiple sellers', 'split shipments', 'consolidated invoice']
**Forbidden content:** ['single-seller only', 'auto-merge shipments']


### Q05: What security measures protect payment data?
**Expected retrieval context:** Document 4: Payment Methods and Security
**Authoritative answer:** Shoplite uses TLS/HTTPS for all sensitive pages, tokenization for payment data through the payment processor, and PCI-DSS aligned processing via certified processors. Fraud detection is performed using rule-based and ML checks.
**Required keywords in LLM response:** ['TLS', 'tokenization', 'PCI-DSS']
**Forbidden content:** ['storing raw card data', 'no fraud checks']


### Q06: How can I track my order from Shoplite?
**Expected retrieval context:** Document 5: Order Tracking and Delivery
**Authoritative answer:** After a seller marks an order as shipped, Shoplite provides tracking metadata, email/in-app notifications, and a unified tracking timeline integrated with carriers . For multi-package orders, each package's tracking is shown in the order view.
**Required keywords in LLM response:** ['tracking metadata', 'carrier integrations', 'unified tracking']
**Forbidden content:** ['tracking not available', 'no carrier integration']


### Q07: What are the seller fees and how are payouts scheduled?
**Expected retrieval context:** Document 10: Commission and Fee Structure
**Authoritative answer:** Shoplite charges a commission (percentage + fixed marketplace fee) that varies by category and seller tier. Payouts are typically on a 7-day rolling schedule after delivery confirmation; faster payouts are available for a fee.
**Required keywords in LLM response:** ['commission', '7-day rolling', 'seller tier']
**Forbidden content:** ['no commission', 'instant payout always']


### Q08: What moderation rules apply to product reviews?
**Expected retrieval context:** Document 7: Product Reviews and Ratings
**Authoritative answer:** Reviews must not include hate speech, profanity, or defamation. Shoplite uses automated filters and human moderation for flagged content; incentivized reviews must be disclosed.
**Required keywords in LLM response:** ['moderation', 'verified purchase', 'no profanity']
**Forbidden content:** ['allow hate speech', 'anonymous fake reviews']


### Q09: If an international order is delayed and I want a refund, what are the steps?
**Expected retrieval context:** Document 5: Order Tracking and Delivery + Document 6: Return and Refund Policies + Document 11: Customer Support Procedures
**Authoritative answer:** First, check the tracking timeline for exceptions. If the carrier confirms delay or loss, open a support ticket via in-app messaging and include tracking details. If eligible within the 30-day return window and the seller agrees or Shoplite mediation finds fault, request a return authorization (RA) or a refund. Support may require proof of delivery attempt or carrier confirmation; refunds to the original payment method may take 5-10 business days.
**Required keywords in LLM response:** ['tracking timeline', 'support ticket', 'return authorization']
**Forbidden content:** ['instant refund', 'no support involvement']


### Q10: How do sellers manage synced inventory and avoid overselling during promotions?
**Expected retrieval context:** Document 9: Inventory Management for Sellers + Document 13: API Documentation for Developers
**Authoritative answer:** Sellers should enable real-time inventory sync via API/webhooks with their fulfillment partner. Shoplite also performs an inventory re-check at checkout and supports reserved inventory holds during checkout. For promotions, batch updates and threshold alerts help manage spikes; webhook-based updates reduce oversell risk.
**Required keywords in LLM response:** ['inventory sync', 'API/webhooks', 'checkout re-check']
**Forbidden content:** ['no inventory checks', 'manual only']


### Q11: What information should be in the API order webhook payload for fulfillment partners?
**Expected retrieval context:** Document 13: API Documentation for Developers
**Authoritative answer:** A minimal order  should include order id, buyer contact, items (SKU, quantity), shipping address, shipping method, total cost, taxes, and a callback URL for fulfillment status updates. Include a signed header or HMAC signature for verification.
**Required keywords in LLM response:** ['order id', 'SKU', 'shipping address']
**Forbidden content:** ['plain-text secret keys', 'missing buyer info']


### Q12: How does Shoplite protect user privacy while offering analytics?
**Expected retrieval context:** Document 12: Security and Privacy Policies + Document 11: Customer Support Procedures
**Authoritative answer:** Shoplite anonymizes and aggregates analytics data to improve products while complying with GDPR. Personal data access is logged and limited; users can request data exports or deletion. Support agents access only necessary context for issue resolution.
**Required keywords in LLM response:** ['anonymize', 'GDPR', 'data export']
**Forbidden content:** ['selling personal data', 'unrestricted staff access']


### Q13: What are best practices for setting shipping templates for sellers selling internationally?
**Expected retrieval context:** Document 8: Seller Account Setup and Management + Document 5: Order Tracking and Delivery
**Authoritative answer:** Define zone-based rates, include estimated duties and taxes as guidance, set handling times per SKU, and provide clear customs notes. Enable carrier integrations to supply tracking and select carriers with reliable international service.
**Required keywords in LLM response:** ['zone-based rates', 'handling times', 'carrier integrations']
**Forbidden content:** ['no customs info', 'one-size-fits-all rates']


### Q14: How should a seller respond to a buyer claim of damaged goods upon delivery?
**Expected retrieval context:** Document 11: Customer Support Procedures + Document 5: Order Tracking and Delivery + Document 6: Return and Refund Policies
**Authoritative answer:** Seller should request photos and evidence, open a pickup claim with the carrier if applicable, provide return authorization, and offer a refund or replacement according to return policy. If disputed, escalate to Shoplite support with shipment proof.
**Required keywords in LLM response:** ['photos', 'return authorization', 'carrier claim']
**Forbidden content:** ['ignore buyer', 'automatic refund without evidence']


### Q15: How do promotional code stacking rules work and how can sellers test them?
**Expected retrieval context:** Document 15: Promotional Codes and Discounts + Document 8: Seller Account Setup and Management
**Authoritative answer:** Promotions can be marked as stackable or mutually exclusive. Checkout applies promotions in deterministic priority order and rules prevent abusive combos. Sellers can test coupons in sandbox mode and run A/B experiments before live rollout.
**Required keywords in LLM response:** ['stackable', 'priority order', 'sandbox']
**Forbidden content:** ['unbounded stacking', 'silent coupon overrides']


### Q16: What should a mobile app implement to support biometric sign-in securely?
**Expected retrieval context:** Document 12: Security and Privacy Policies + Document 11: Mobile App Features
**Authoritative answer:** Implement OS-native biometric APIs (Face ID / Touch ID / Android BiometricPrompt) and store authentication tokens in secure OS-managed keystores, never biometric data. Provide fallback to PIN and enable remote token revocation in account settings.
**Required keywords in LLM response:** ['biometric APIs', 'secure keystore', 'token revocation']
**Forbidden content:** ['store biometric data', 'use weak fallback']


### Q17: How can a buyer request a data export under GDPR?
**Expected retrieval context:** Document 1: Shoplite User Registration Process + Document 12: Security and Privacy Policies
**Authoritative answer:** From account settings, visit 'Privacy' and select 'Request Data Export'. The system will prepare a JSON export of personal data and send an email when the export is ready. Support may require identity verification for sensitive requests.
**Required keywords in LLM response:** ['account settings', 'data export', 'identity verification']
**Forbidden content:** ['automatic public export', 'no verification']


### Q18: What steps should a developer take to test webhooks in Shoplite's sandbox?
**Expected retrieval context:** Document 13: API Documentation for Developers
**Authoritative answer:** Create a sandbox API key, register a webhook endpoint (ngrok or other public URL), simulate order events using the sandbox UI or API test endpoints, and verify signatures on received payloads. Adjust retry logic and examine response codes to ensure robustness.
**Required keywords in LLM response:** ['sandbox API key', 'ngrok', 'signature verification']
**Forbidden content:** ['testing in production', 'no signature checks']


### Q19: What are Shoplite's policies regarding incentivized reviews?
**Expected retrieval context:** Document 7: Product Reviews and Ratings
**Authoritative answer:** Incentivized reviews must be disclosed and cannot be used to manipulate ratings. Sellers must follow local disclosure laws; undisclosed incentivized reviews are prohibited and may lead to penalties.
**Required keywords in LLM response:** ['disclosed', 'no manipulation', 'local laws']
**Forbidden content:** ['undisclosed incentives', 'fake reviews']


### Q20: How does Shoplite handle refunds for split shipments?
**Expected retrieval context:** Document 3: Shopping Cart and Checkout Process + Document 6: Return and Refund Policies
**Authoritative answer:** For split shipments, refunds and returns are processed per shipment and per seller. The buyer's order summary explains which items shipped from which seller and the refund timeline for each seller once the returned item is received or the seller accepts the return.
**Required keywords in LLM response:** ['split shipments', 'per seller', 'order summary']
**Forbidden content:** ['single refund for all sellers', 'instant full refund']
