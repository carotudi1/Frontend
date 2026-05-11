import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearCart, getCart, removeFromCart } from '../services/cartService'

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const CartPage = () => {
  const [items, setItems] = useState(() => getCart())

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.precio || 0) * Number(item.quantity || 1), 0)
  }, [items])

  const handleRemove = (id) => {
    setItems(removeFromCart(id))
  }

  const handleClear = () => {
    clearCart()
    setItems([])
  }

  return (
    <main className="products-page">
      <section className="page-header">
        <div>
          <span className="home-eyebrow">Carrito</span>
          <h1>Productos seleccionados</h1>
          <p>Revisa los productos que agregaste antes de continuar con tu pedido.</p>
        </div>
        <Link className="btn btn-outline-primary" to="/products">
          Seguir viendo productos
        </Link>
      </section>

      {items.length === 0 ? (
        <div className="empty-state">
          <h2>Tu carrito esta vacio</h2>
          <p>Agrega productos desde el catalogo para verlos aqui.</p>
          <Link className="btn btn-primary" to="/products">
            Ver catalogo
          </Link>
        </div>
      ) : (
        <section className="cart-panel">
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h3>{item.nombre}</h3>
                  <p>{item.descripcion || 'Producto sin descripcion registrada.'}</p>
                  <span>Cantidad: {item.quantity}</span>
                </div>
                <strong>{formatPrice(Number(item.precio || 0) * Number(item.quantity || 1))}</strong>
                <button className="btn btn-outline-danger" onClick={() => handleRemove(item.id)} type="button">
                  Quitar
                </button>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <span>Total estimado</span>
            <strong>{formatPrice(total)}</strong>
            <button className="btn btn-outline-danger" onClick={handleClear} type="button">
              Vaciar carrito
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage
