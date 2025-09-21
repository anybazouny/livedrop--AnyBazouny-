# Cost Model — Selected Touchpoints

## Assumptions
- Model: Llama 3.1 8B Instruct via OpenRouter  
  - $0.05 / 1K prompt tokens  
  - $0.20 / 1K completion tokens  
- FAQ assistant (RAG):  
  - Avg tokens in: 750 (retrieved context + question)  
  - Avg tokens out: 250 (short answer)  
  - Requests/day: 1,000  
  - Cache hit rate: 30%  
- Order-status assistant:  
  - Avg tokens in: 150 (structured API result + question)  
  - Avg tokens out: 100 (short response)  
  - Requests/day: 500  
  - Cache hit rate: 0% (always fresh from API)  

---

## Calculation
**Formula:**  
Cost/action = (tokens_in/1000 × prompt_price) + (tokens_out/1000 × completion_price)  
Daily cost = Cost/action × Requests/day × (1 – cache_hit_rate)

### FAQ Assistant
- Cost/action = (750/1000 × 0.05) + (250/1000 × 0.20)  
= (0.0375) + (0.05) = **$0.0875**  
- Daily cost = 0.0875 × 1000 × (1 – 0.30)  
= 0.0875 × 700 = **$61.25/day**

### Order-Status Assistant
- Cost/action = (150/1000 × 0.05) + (100/1000 × 0.20)  
= (0.0075) + (0.02) = **$0.0275**  
- Daily cost = 0.0275 × 500 × (1 – 0.00)  
= 13.75 = **$13.75/day**

---

## Results
- FAQ Assistant: Cost/action = **$0.0875**, Daily = **$61.25**  
- Order-Status Assistant: Cost/action = **$0.0275**, Daily = **$13.75**

---

## Cost levers if over budget
- Shorten FAQ context from 750 → 500 tokens (lower prompt cost).  
- Use a smaller/faster model for low-risk answers.  
- Improve cache hit rate beyond 30% for repeated FAQ queries.  
- For order-status, bypass LLM and use template-based replies if cost or latency is a concern.  

---
