

import { useState, useEffect } from 'react'
import { useCart } from '../lib/store'
import { Link } from 'react-router-dom'
import type { Product } from '../lib/api'
import { listProducts as apiListProducts } from '../lib/api'

export default function Catalog() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const [tagFilter, setTagFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const list = await apiListProducts()
        if (!mounted) return
        setProducts(list)
      } catch (err: any) {
        console.error('Failed to load products', err)
        if (mounted) setError('Failed to load catalog')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="p-6">Loading catalog…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  const filtered = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => tagFilter === 'all' || p.tags.includes(tagFilter))
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price))

  const tags = Array.from(new Set(products.flatMap((p) => p.tags)))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catalog</h1>

      <div className="flex mb-4 space-x-2">
        <input
          aria-label="Search products"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="border px-2 py-1 rounded">
          <option value="all">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <button onClick={() => setSortAsc(!sortAsc)} className="px-2 py-1 border rounded" aria-pressed={!sortAsc}>
          Price {sortAsc ? '▲' : '▼'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((product: Product) => (
          <div key={product.id} className="border p-2 rounded shadow flex flex-col items-center bg-white">
            <Link to={`/p/${product.id}`} className="w-full flex justify-center">
              <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-2" loading="lazy" width={128} height={128} />
            </Link>

            <h2 className="font-semibold text-center">{product.title}</h2>
            <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => addToCart(product, 1)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring"
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Cart
              </button>

              <Link
                to={`/p/${product.id}`}
                className="px-3 py-1 border rounded flex items-center justify-center"
                aria-label={`Open ${product.title} product page`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
