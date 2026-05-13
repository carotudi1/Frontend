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
  const selectedSize = product.selectedSize || 'M'
  const existing = cart.find((item) => item.id === product.id && (item.selectedSize || 'M') === selectedSize)

  if (existing) {
    const nextCart = cart.map((item) =>
      item.id === product.id && (item.selectedSize || 'M') === selectedSize
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    saveCart(nextCart)
    return nextCart
  }

  const nextCart = [...cart, { ...product, selectedSize, quantity: 1 }]
  saveCart(nextCart)
  return nextCart
}

export const updateCartQuantity = (id, quantity, selectedSize = 'M') => {
  const safeQuantity = Math.max(1, Number(quantity) || 1)
  const nextCart = getCart().map((item) =>
    item.id === id && (item.selectedSize || 'M') === selectedSize ? { ...item, quantity: safeQuantity } : item
  )
  saveCart(nextCart)
  return nextCart
}

export const removeFromCart = (id, selectedSize = 'M') => {
  const nextCart = getCart().filter((item) => !(item.id === id && (item.selectedSize || 'M') === selectedSize))
  saveCart(nextCart)
  return nextCart
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}
