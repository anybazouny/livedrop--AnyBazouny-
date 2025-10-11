
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, listProducts } from '../lib/api'
import type { Product } from '../lib/api'
import { useCart } from '../lib/store'
import { getProduct as apiGetProduct, listProducts as apiListProducts } from '../lib/api'
export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
  if (!id) return
  let mounted = true
  ;(async () => {
    try {
      const p = await apiGetProduct(id)
      if (!mounted) return
      setProduct(p ?? null)

      if (p) {
        const all = await apiListProducts()
        const relatedItems = all.filter((item) => item.id !== id && item.tags.some((t) => p.tags.includes(t)))
        const shuffled = relatedItems.sort(() => 0.5 - Math.random())
        setRelated(shuffled.slice(0, 3))
      } else {
        setRelated([])
      }
    } catch (err) {
      console.error(err)
      if (mounted) {
        setProduct(null)
        setRelated([])
      }
    }
  })()

  return () => {
    mounted = false
  }
}, [id])

  if (!product) return <div className="p-6">Product not found</div>

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.title} loading="lazy" className="w-full h-auto object-cover rounded" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-green-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description ?? 'No description available.'}</p>
          <p className="mb-4">
            <strong>Stock:</strong> {product.stockQty > 0 ? `${product.stockQty} available` : 'Out of stock'}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stockQty <= 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              aria-disabled={product.stockQty <= 0}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>

            <Link to="/cart" className="px-4 py-2 border rounded self-center">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Related products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.id} to={`/p/${r.id}`} className="border p-2 rounded flex flex-col items-center">
                <img src={r.image} alt={r.title} loading="lazy" className="w-28 h-28 object-cover mb-2" />
                <div className="text-center">
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-gray-600">${r.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
