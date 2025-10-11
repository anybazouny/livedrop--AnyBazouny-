
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../lib/api'
import { useCart } from '../lib/store'
import { formatCurrency } from '../lib/format'

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    if (items.length === 0) {
      
    }
  }, [items.length])

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setError(null)
    setPlacing(true)
    try {
      
      const result = await placeOrder(items)
     
      clearCart()
      
      navigate(`/order/${result.orderId}`)
    } catch (err) {
      console.error('placeOrder error', err)
      setError('Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          aria-label="Go back to catalog"
        >
          Back to Catalog
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <section aria-labelledby="order-summary">
        <h2 id="order-summary" className="text-xl font-semibold mb-2">Order summary</h2>

        <div className="border rounded p-4 mb-4">
          {items.map((it) => (
            <div key={it.id} className="flex justify-between py-2 border-b last:border-b-0">
              <div>
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
              </div>
              <div className="font-medium">{formatCurrency(it.price * it.quantity)}</div>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(totalPrice())}</span>
          </div>
        </div>
      </section>

      {error && <div role="alert" className="mb-4 text-red-600">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          autoFocus
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring"
          aria-busy={placing}
          aria-label="Place order"
        >
          {placing ? 'Placing order...' : 'Place Order'}
        </button>

        <button
          onClick={() => navigate('/cart')}
          className="px-4 py-2 border rounded"
          aria-label="Back to cart"
        >
          Back to Cart
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
