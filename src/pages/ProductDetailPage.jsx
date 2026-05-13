import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getById } from '../services/productService'
import { addToCart } from '../services/cartService'
import { getApiErrorMessage } from '../utils/apiError'
import { isAdmin } from '../utils/roles'

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const ProductDetailPage = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedSize, setSelectedSize] = useState('M')
  const admin = isAdmin(user)
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  useEffect(() => {
    getById(id)
      .then(setProduct)
      .catch((apiError) => setError(getApiErrorMessage(apiError, 'Producto no encontrado.')))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="catalog-message">Cargando producto...</div>

  if (error) {
    return (
      <main className="form-page">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Volver a productos
        </button>
      </main>
    )
  }

  return (
    <main className="form-page">
      <section className="product-detail">
        <div className="product-detail__layout">
          <div className="product-detail__image">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.nombre} /> : <span>Sin imagen</span>}
          </div>

          <div>
            <span className="home-eyebrow">Detalle del producto</span>
            <h1>{product.nombre}</h1>
            <p>{product.descripcion || 'Producto sin descripcion registrada.'}</p>
          </div>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        <div className="product-detail__summary">
          <span>Precio</span>
          <strong>{formatPrice(product.precio)}</strong>
          <span>Stock disponible</span>
          <strong>{product.stock}</strong>
        </div>

        {!admin && (
          <div className="size-picker">
            <span>Escoge tu talla</span>
            <div className="size-picker__options" role="group" aria-label="Tallas disponibles">
              {sizes.map((size) => (
                <button
                  className={selectedSize === size ? 'size-picker__option is-selected' : 'size-picker__option'}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
            <p>Talla seleccionada: {selectedSize}</p>
          </div>
        )}

        <div className="product-card__actions">
          <Link className="btn btn-outline-primary" to="/products">
            Volver
          </Link>
          {admin ? (
            <Link className="btn btn-primary" to={`/products/${product.id}/edit`}>
              Editar producto
            </Link>
          ) : (
            <button
              className="btn btn-primary"
              disabled={Number(product.stock || 0) === 0}
              onClick={() => {
                addToCart({ ...product, selectedSize })
                setSuccess(`${product.nombre} talla ${selectedSize} agregado al carrito.`)
              }}
              type="button"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default ProductDetailPage
