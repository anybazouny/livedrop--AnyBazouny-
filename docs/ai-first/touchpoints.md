# Touchpoints — Selected AI Capabilities

## Touchpoint 1: Policies / FAQ Assistant (RAG)

**Problem statement**  
Users frequently ask about policies (returns, refunds, shipping, coupons) that are already documented
in the FAQ. Today, they must manually search or contact support, which delays resolution and increases 
support costs. An AI FAQ assistant can provide instant answers, lowering friction and support load.

**Happy path (6–10 steps)**  
1. User clicks “Help” or types a policy-related question.  
2. Frontend sends query + session ID to backend.  
3. Backend creates embedding for query.  
4. System retrieves top 3 relevant FAQ passages from vector DB.  
5. Backend constructs prompt with retrieved passages and user query.  
6. Fast LLM is called with the prompt.  
7. LLM returns summarized answer + confidence score.  
8. Backend returns answer + source links to frontend.  
9. Frontend displays answer and “Was this helpful?” button.  
10. If confidence < threshold, the system escalates to human support.  

**Grounding & guardrails**  
- Source of truth: internal FAQ and policies.  
- Retrieval scope: FAQ docs only.  
- Max context: 3 passages (≤1500 tokens).  
- Refuse if query is outside FAQ scope.  

**Human-in-the-loop**  
- Trigger: model confidence < 0.6.  
- UI surface: “Escalate to human” button.  
- Reviewer & SLA: support agent replies within 2h.  

**Latency budget**  
- Embedding lookup: 200 ms  
- Retrieval + rerank: 100 ms  
- LLM inference: 600 ms  
- Total p95 target: ≤1s  
- Cache strategy: store embeddings for repeated queries.  

**Error & fallback behavior**  
- Retrieval fails → show “No answer found, escalate.”  
- Model timeout → serve cached fallback or escalate.  

**PII handling**  
- Policy questions normally don’t use PII.  
- If query includes personal info → redirect to secure order-status flow.  
- Logging policy: anonymize queries, do not store raw PII.  

**Success metrics**  
- Product metric 1: Deflection rate = resolved_queries / total_queries.  
- Product metric 2: Avg. response time = total_latency / queries.  
- Business metric: Ticket reduction = baseline_tickets – current_tickets.  

**Feasibility note**  
FAQ data is complete and available. Retrieval can be implemented with an internal vector DB. OpenAI API 
or any fast hosted model can be tested. Risk is low since it uses static FAQ content. Next step:
prototype retrieval pipeline and run on 20–50 FAQ queries.  

---

## Touchpoint 2: Order-Status Assistant (API-backed)

**Problem statement**  
Users often ask “Where is my order?” and currently must navigate the order page or open a support
ticket. This creates friction and increases support workload. An AI-powered order-status assistant can
instantly fetch and present order information in a natural reply, reducing ticket volume and improving
user satisfaction.

**Happy path (6–10 steps)**  
1. User types “Where is my order?” or clicks “Track order.”  
2. Frontend requests order ID (or uses session identity).  
3. Frontend sends `GET /ai/order-status` with order ID to backend.  
4. Backend calls the existing internal order-status API.  
5. API returns structured order metadata (status, ETA).  
6. Backend formats data into a short text via LLM or template.  
7. Backend returns friendly answer: “Your order  is in transit, delivery Sep 25.”  
8. Frontend displays response to the user.  
9. If API error or invalid ID → fallback message prompts user to retry.  

**Grounding & guardrails**  
- Source of truth: internal order-status API.  
- Retrieval scope: order-status API only, no external data.  
- Max context: order metadata fields only.  
- Refuse if no valid order ID or if user asks about other customers’ orders.  

**Human-in-the-loop**  
- Trigger: API returns error, missing order, or LLM low confidence.  
- UI surface: “Escalate to support” option.  
- Reviewer & SLA: agent provides update within 1h.  

**Latency budget**  
- API lookup: 300 ms  
- LLM formatting (or template): 200 ms  
- Total p95 target: ≤800 ms  
- Cache strategy: none (always fresh from API).  

**Error & fallback behavior**  
- API unavailable → show “Unable to fetch status, please try later.”  
- Invalid order ID → prompt user to re-enter ID.  

**PII handling**  
- Data: order ID, shipping status.  
- PII is redacted before LLM call (if external).  
- Logging: store only anonymized status queries, never raw PII.  

**Success metrics**  
- Product metric 1: % orders answered instantly = instant_responses / total_queries.  
- Product metric 2: Avg. response time = total_latency / queries.  
- Business metric: Ticket reduction = baseline_order_tickets – current_order_tickets.  

**Feasibility note**  
API is already available and reliable. PII handling requires sanitization if external LLM is used; can 
fall back to templates if needed. Risk is moderate due to PII handling, but manageable. Next step: 
prototype backend call with dummy order IDs and test formatted responses.  

---
