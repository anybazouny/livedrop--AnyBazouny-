


export type Product = {
  id: string
  title: string
  price: number
  image: string
  tags: string[]
  stockQty: number
  description?: string
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Delivered'


let _catalogCache: Product[] | null = null

export async function loadCatalog(): Promise<Product[]> {
  if (_catalogCache) return _catalogCache
  const res = await fetch('/mock-catalog.json')
  if (!res.ok) throw new Error('Failed to load catalog.json')
  const data = (await res.json()) as Product[]
  _catalogCache = data
  return data
}

export async function listProducts(): Promise<Product[]> {
  return await loadCatalog()
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const list = await loadCatalog()
  return list.find((p) => p.id === id)
}


export function getOrderStatus(orderId: string): { status: OrderStatus; carrier?: string; eta?: string } {
  const sum = String(orderId).split('').reduce((s, ch) => s + ch.charCodeAt(0), 0)
  const idx = sum % 4
  const statuses: OrderStatus[] = ['Placed', 'Packed', 'Shipped', 'Delivered']
  const status = statuses[idx]

  if (status === 'Shipped' || status === 'Delivered') {
    const now = new Date()
    const etaDays = 2 + (sum % 4) // 2..5
    const eta = new Date(now.getTime() + etaDays * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    const carriers = ['FedEx', 'DHL', 'Aramex', 'UPS']
    const carrier = carriers[sum % carriers.length]
    return { status, carrier, eta }
  }

  return { status }
}


export function placeOrder(cart: Product[]): { orderId: string } {
  const orderId = Math.random().toString(36).substring(2, 12).toUpperCase()
  return { orderId }
}
