# RAG System Evaluation

## Retrieval Quality Tests 
| Test ID | Question | Expected Documents | Pass Criteria |
|---------|----------|-------------------|---------------|
| R01 | How to create seller account? | Document 8: Seller Account Setup and Management | Retrieved docs include Document 8 |
| R02 | Return window for items | Document 6: Return and Refund Policies | Retrieved docs include Document 6 |
| R03 | Payment methods supported | Document 4: Payment Methods and Security | Retrieved docs include Document 4 |
| R04 | Multi-seller cart behavior | Document 3: Shopping Cart and Checkout Process | Retrieved docs include Document 3 |
| R05 | Tracking an order | Document 5: Order Tracking and Delivery | Retrieved docs include Document 5 |
| R06 | Inventory sync best practices | Document 9: Inventory Management for Sellers | Retrieved docs include Document 9 |
| R07 | Promotional code stacking | Document 15: Promotional Codes and Discounts | Retrieved docs include Document 15 |
| R08 | Mobile biometric sign-in | Document 12: Security and Privacy Policies; Document 11: Mobile App Features | Retrieved docs include both docs |
| R09 | API webhook payload | Document 13: API Documentation for Developers | Retrieved docs include Document 13 |
| R10 | Commission and payout schedule | Document 10: Commission and Fee Structure | Retrieved docs include Document 10 |

## Response Quality Tests 
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---------|----------|-------------------|-----------------|-------------------|
| Q01 | How do I create a seller account? | ["seller registration","business verification"] | ["instant approval"] | Direct answer with citation to Document 8 |
| Q02 | Return policy summary | ["30-day return window","return authorization"] | ["no returns"] | Concise policy statement, mention RA process |
| Q03 | Payment security measures | ["tokenization","PCI-DSS"] | ["raw card storage"] | Cite Document 4, avoid technical speculation |
| Q04 | Tracking multi-package order | ["tracking metadata","unified tracking"] | ["no tracking"] | Explain merged tracking view |
| Q05 | Inventory API best practices | ["API/webhooks","real-time sync"] | ["manual only"] | Multi-source synthesis from docs 9 & 13 |
| Q06 | Promotional stacking rules | ["stackable","priority order"] | ["unbounded stacking"] | Provide deterministic example |
| Q07 | Biometric login security | ["biometric APIs","secure keystore"] | ["store biometric data"] | Reference OS-native guidance |
| Q08 | Refund timeline | ["5-10 business days","original payment method"] | ["instant refund"] | Clear expectation setting |
| Q09 | How to test webhooks | ["sandbox API key","ngrok"] | ["testing in production"] | Step-by-step testing checklist |
| Q10 | Buyer protection steps | ["support ticket","return authorization"] | ["no support"] | Escalation steps with citations |
| Q11 | Seller fee breakdown | ["commission","fixed marketplace fee"] | ["no commission"] | Provide example calculation |
| Q12 | Moderation for reviews | ["verified purchase","automated filters"] | ["allow hate speech"] | Cite review moderation rules |
| Q13 | API rate limit behavior | ["429 Too Many Requests","retry"] | ["silent drops"] | Explain handling and retries |
| Q14 | Refunds for split shipments | ["per seller","order summary"] | ["single refund for all sellers"] | Clarify per-seller process |
| Q15 | International shipping notes | ["customs","duties and taxes"] | ["no customs info"] | Explain customs handling and expectations |

## Edge Case Tests 
| Test ID | Scenario | Expected Response Type |
|---------|----------|----------------------|
| E01 | Question not in KB | Refusal with explanation and suggestion to contact support |
| E02 | Ambiguous question | Clarifying question prompt |
| E03 | Malformed input (empty string) | Request for valid question |
| E04 | Excessively long question beyond token limit | Truncate and ask to rephrase or summarize |
| E05 | Conflicting docs (two docs disagree) | Present both sources and flag inconsistency |
