
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/api'

type OrderStatus = {
  status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered'
  carrier?: string
  eta?: string
}

const maskOrderId = (orderId: string | undefined) => {
  if (!orderId) return ''
  const last4 = orderId.slice(-4)
  return `****${last4}`
}


const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('No order id provided.')
      setLoading(false)
      return
    }

    const fetchStatus = async () => {
      setLoading(true)
      setError(null)
      try {
        const status = await getOrderStatus(id)
       
        setOrder({
          status: status.status as OrderStatus['status'],
          carrier: status.carrier,
          eta: status.eta
        })
      } catch (err) {
        console.error('getOrderStatus error', err)
        setError('Could not fetch order status.')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [id])

  if (loading) {
    return <div className="min-h-screen p-6">Loading order status...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to catalog</Link>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen p-6">
        <p>Order not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to catalog</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Order Status</h1>

      <div className="border rounded p-4 mb-4">
        <div className="mb-2">
          <strong>Order ID:</strong> <span aria-label="Order id">{maskOrderId(id)}</span>
        </div>

        <div className="mb-2">
          <strong>Status:</strong> <span>{order.status}</span>
        </div>

        {(order.status === 'Shipped' || order.status === 'Delivered') && (
          <>
            <div className="mb-2">
              <strong>Carrier:</strong> <span>{order.carrier ?? '—'}</span>
            </div>
            <div>
              <strong>ETA:</strong> <span>{order.eta ?? '—'}</span>
            </div>
          </>
        )}
      </div>

      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Back to catalog
      </Link>
    </div>
  )
}

export default OrderStatusPage
