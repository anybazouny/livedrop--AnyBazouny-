#!/usr/bin/env python3
"""
Simple command-line chat interface for the Shoplite RAG API.
Usage:
    python chat-interface.py
The script will prompt for the base API URL (ngrok tunnel) and then allow interactive Q&A.
"""
import requests, os, sys, time, json

def get_base_url():
    env_url = os.environ.get("SHOPLITE_RAG_URL")
    if env_url:
        return env_url.rstrip("/")
    return input("Enter the base API URL (e.g. https://abcd-1234.ngrok.io): ").strip().rstrip("/")

def chat_loop(base_url):
    print(f"Using base URL: {base_url}")
    session = requests.Session()
    conversation_log = []
    while True:
        try:
            q = input("\n> ").strip()
            if q.lower() in ("exit","quit","q"):
                print("Exiting. Conversation log saved to conversation_log.json")
                with open("conversation_log.json","w",encoding="utf-8") as f:
                    json.dump(conversation_log, f, indent=2, ensure_ascii=False)
                break
            if not q:
                print("Please enter a question or 'exit' to quit.")
                continue
            print("[Retrieving context...]")
            payload = {"question": q, "top_k": 5}
            try:
                r = session.post(f"{base_url}/chat", json=payload, timeout=30)
            except Exception as e:
                print(f"[Error contacting server: {e}]")
                continue
            if r.status_code != 200:
                print(f"[Server returned status {r.status_code}: {r.text}]")
                continue
            data = r.json()
            answer = data.get("answer") or data.get("response") or data.get("result")
            sources = data.get("sources") or data.get("doc_titles") or []
            confidence = data.get("confidence", "unknown")
            print(f"\nAnswer: {answer}\nSources: {sources}\nConfidence: {confidence}\n")
            conversation_log.append({"question": q, "answer": answer, "sources": sources, "timestamp": time.time()})
        except KeyboardInterrupt:
            print("\nInterrupted. Type 'exit' to save and quit.")
            continue

if __name__ == '__main__':
    base = get_base_url()
    chat_loop(base)
