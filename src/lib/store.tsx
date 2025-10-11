
import React, { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from 'react'



export interface Product {
  id: string
  title: string
  price: number
  image: string
  tags: string[]
  stockQty: number
  description?: string
}

export interface CartItem extends Product {
  quantity: number
}


interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  totalPrice: () => number
  clearCart: () => void
}


const CartContext = createContext<CartContextType | undefined>(undefined)


export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
 
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {
      
    }
  }, [items])

  const addToCart = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        )
      }
      return [...prev, { ...product, quantity: qty }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
  }

  const totalPrice = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const clearCart = () => setItems([])

  
  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}


export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
