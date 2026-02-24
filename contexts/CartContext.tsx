'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image?: string
}

interface CartContextType {
  cart: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, color?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // For BOGO free items or items with unique IDs, always add as new item
      if (item.id.includes('-free') || item.id.includes('-bogo')) {
        return [...prevCart, item]
      }

      const existingItem = prevCart.find(
        (cartItem) => 
          cartItem.id === item.id && 
          cartItem.color === item.color
      )

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && 
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }

      return [...prevCart, item]
    })
  }

  const removeFromCart = (id: string, color?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => 
        !(item.id === id && item.color === color)
      )
    )
  }

  const updateQuantity = (id: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, color)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
