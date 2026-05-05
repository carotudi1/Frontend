import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll, remove } from '../services/productService'
import ProductCard from '../components/products/ProductCard'
import { getApiErrorMessage } from '../utils/apiError'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAll()
      .then(setProducts)
      .catch((apiError) => setError(getApiErrorMessage(apiError, 'Error al cargar productos.')))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.nombre?.toLowerCase().includes(filter.trim().toLowerCase())
    )
  }, [filter, products])

  const handleDelete = async (id) => {
    const shouldDelete = confirm('Quieres eliminar este producto?')
    if (!shouldDelete) return

    try {
      await remove(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No fue posible eliminar el producto.'))
    }
  }

  return (
    <main className="products-page">
      <section className="page-header">
        <div>
          <span className="home-eyebrow">Catalogo EFORM</span>
          <h1>Productos</h1>
          <p>Administra los uniformes, precios y cantidades disponibles para los aprendices.</p>
        </div>
        <Link className="btn btn-primary btn-lg" to="/products/new">
          Nuevo producto
        </Link>
      </section>

      <section className="toolbar-panel">
        <input
          className="form-control"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar producto por nombre"
          value={filter}
        />
        <span>{filteredProducts.length} producto(s)</span>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="catalog-message">Cargando productos...</div>}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <h2>No hay productos para mostrar</h2>
          <p>Crea el primer uniforme o cambia el filtro de busqueda.</p>
          <Link className="btn btn-primary" to="/products/new">
            Crear producto
          </Link>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  )
}

export default ProductPage
