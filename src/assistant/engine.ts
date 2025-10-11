
import groundTruth from './ground-truth.json'
import type { Product } from '../lib/api'
import { getOrderStatus } from '../lib/api'

export type GTItem = {
  qid: string
  category: string
  question: string
  answer: string
}

const ORDER_ID_REGEX = /([A-Z0-9]{10,})/g


function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean)
}


function scoreOverlap(queryTokens: string[], qaTokens: string[]): number {
  if (queryTokens.length === 0) return 0
  const qaSet = new Set(qaTokens)
  const shared = queryTokens.filter((t) => qaSet.has(t)).length
  return shared / queryTokens.length
}


function maskOrderId(id: string) {
  if (!id) return ''
  const last4 = id.slice(-4)
  return `****${last4}`
}

export type EngineResponse =
  | { ok: true; answer: string; qid?: string }
  | { ok: false; reason: string }


export async function answerQuestion(rawQuestion: string): Promise<EngineResponse> {
  const question = rawQuestion.trim()
  if (!question) return { ok: false, reason: 'Empty question' }

  
  const ids: string[] = []
  let m: RegExpExecArray | null
  while ((m = ORDER_ID_REGEX.exec(question)) !== null) {
    ids.push(m[1])
  }

  let orderSnippet = ''
  if (ids.length > 0) {
    
    const id = ids[0]
    try {
      const status = getOrderStatus(id)
      orderSnippet = `Order ${maskOrderId(id)} status: ${status.status}.`
      if (status.carrier) orderSnippet += ` Carrier: ${status.carrier}.`
      if (status.eta) orderSnippet += ` ETA: ${status.eta}.`
    } catch (err) {
      
      orderSnippet = ''
    }
  }

  
  const qTokens = tokenize(question)
  const scored = (groundTruth as GTItem[]).map((qa) => {
    const qaTokens = tokenize(qa.question + ' ' + qa.answer + ' ' + qa.category)
    return {
      qa,
      score: scoreOverlap(qTokens, qaTokens)
    }
  })

 
  scored.sort((a, b) => b.score - a.score)
  const top = scored[0]

 
  const THRESHOLD = 0.25

  if (top && top.score >= THRESHOLD) {
    
    let response = top.qa.answer
    
    if (orderSnippet) {
      response = `${orderSnippet} ${response}`
    }
    
    if (!/\[Q\d+\]/.test(response)) {
      response = `${response} [${top.qa.qid}]`
    }
    return { ok: true, answer: response, qid: top.qa.qid }
  }

  
  if (orderSnippet) {
    const resp = `${orderSnippet} I couldn't confidently answer other questions—please ask a clear question or contact support.`
    return { ok: true, answer: resp }
  }

 
  return { ok: false, reason: "I can't answer that from my available knowledge. Please contact support or rephrase your question." }
}
