
import React from 'react'
import { useCart } from '../lib/store'
import { formatCurrency } from '../lib/format'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { items, addToCart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  const handleQtyChange = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, qty)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/catalog" className="text-blue-500 hover:underline">
          Go to catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>{formatCurrency(item.price)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => handleQtyChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="px-2 py-1 ml-2 text-red-500 hover:underline"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">
          Total: {formatCurrency(totalPrice())}
        </div>
        <Link
          to="/checkout"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartPage
