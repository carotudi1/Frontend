import { useNavigate } from 'react-router-dom'

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

const ProductCard = ({ product, isAdmin = false, onAddToCart, onDelete }) => {
  const navigate = useNavigate()
  const stock = Number(product.stock || 0)

  return (
    <article className="product-card">
      <div className="product-card__header">
        <span className={stock > 0 ? 'product-status' : 'product-status product-status--empty'}>
          {stock > 0 ? 'Disponible' : 'Sin stock'}
        </span>
        <strong>{formatPrice(product.precio)}</strong>
      </div>

      <h3>{product.nombre}</h3>
      <p>{product.descripcion || 'Producto sin descripcion registrada.'}</p>

      <div className="product-card__stock">
        <span>Stock</span>
        <strong>{stock}</strong>
      </div>

      <div className="product-card__actions">
        <button className="btn btn-outline-primary" onClick={() => navigate(`/products/${product.id}`)}>
          Ver
        </button>
        {isAdmin ? (
          <>
            <button className="btn btn-primary" onClick={() => navigate(`/products/${product.id}/edit`)}>
              Editar
            </button>
            {onDelete && (
              <button className="btn btn-outline-danger" onClick={() => onDelete(product.id)}>
                Eliminar
              </button>
            )}
          </>
        ) : (
          <button className="btn btn-primary" disabled={stock === 0} onClick={() => onAddToCart?.(product)}>
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  )
}

export default ProductCard
