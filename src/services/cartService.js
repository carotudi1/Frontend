const CART_KEY = 'cart'

export const getCart = () => {
  const storedCart = localStorage.getItem(CART_KEY)
  if (!storedCart) return []

  try {
    return JSON.parse(storedCart)
  } catch {
    localStorage.removeItem(CART_KEY)
    return []
  }
}

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const addToCart = (product) => {
  const cart = getCart()
  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    const nextCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    )
    saveCart(nextCart)
    return nextCart
  }

  const nextCart = [...cart, { ...product, quantity: 1 }]
  saveCart(nextCart)
  return nextCart
}

export const removeFromCart = (id) => {
  const nextCart = getCart().filter((item) => item.id !== id)
  saveCart(nextCart)
  return nextCart
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}
