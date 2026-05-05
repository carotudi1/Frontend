import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getById } from '../services/productService'
import { getApiErrorMessage } from '../utils/apiError'

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        <div>
          <span className="home-eyebrow">Detalle del producto</span>
          <h1>{product.nombre}</h1>
          <p>{product.descripcion || 'Producto sin descripcion registrada.'}</p>
        </div>

        <div className="product-detail__summary">
          <span>Precio</span>
          <strong>{formatPrice(product.precio)}</strong>
          <span>Stock disponible</span>
          <strong>{product.stock}</strong>
        </div>

        <div className="product-card__actions">
          <Link className="btn btn-outline-primary" to="/products">
            Volver
          </Link>
          <Link className="btn btn-primary" to={`/products/${product.id}/edit`}>
            Editar producto
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetailPage
