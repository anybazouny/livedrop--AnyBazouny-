# AI Capability Map — ShopLite 

**Purpose:** short mapping of candidate AI capabilities, owners, and near-term priority. We selected two near-term touchpoints marked with ✅.

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| FAQ / Policies assistant (RAG) | Get quick answers about returns, shipping, coupons | Policies/FAQ markdown | 2 | 2000 | $0.01 | Show static FAQ page | ✅ |
| Order-status assistant (API-backed) | Check where my order is | `order-status` API | 2 | 800 | $0.005 | Link to order page | ✅ |
| Product search relevance (re-rank) | Find better products with natural queries | Query + click logs (sample) | 4 | 2500 | $0.02 | Default search ranking |   |
| Recommendations (session-based) | See personalized products | Session events | 5 | 3000 | $0.03 | Popular products list |   |

## Why these two

We selected **FAQ / Policies assistant** and **Order-status assistant** because they use inputs we 
already have (FAQ markdown and `order-status` API), making them low integration risk (Risk ≤ 2). They 
directly address high-volume support inquiries, so they are expected to reduce **support contact rate** 
while improving **conversion** by answering key blockers faster. Latency and cost per action are also
 within target budgets, and simple fallbacks exist if the AI step fails.
