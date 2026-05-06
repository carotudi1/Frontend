import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, clearSession } from '../services/authServices'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [stats] = useState(() => ({
    totalProducts: Math.floor(Math.random() * 100) + 10,
    totalSets: Math.floor(Math.random() * 20) + 5,
    recentActivity: [
      'Producto nuevo agregado',
      'Set actualizado',
      'Inventario revisado',
    ],
  }))

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  if (!user) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <h1>Bienvenido, {user.name || user.email}</h1>
        <p>Panel de control de gestion</p>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.totalProducts}</h3>
          <p>Total de Productos</p>
          <Link to="/products" className="btn btn-outline">
            Ver productos
          </Link>
        </div>

        <div className="stat-card">
          <h3>{stats.totalSets}</h3>
          <p>Total de Sets</p>
          <Link to="/sets" className="btn btn-outline">
            Ver sets
          </Link>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Acciones rapidas</h2>
        <div className="action-grid">
          <Link to="/products/new" className="action-card">
            <h3>Nuevo Producto</h3>
            <p>Agregar un nuevo producto al catalogo</p>
          </Link>

          <Link to="/sets/new" className="action-card">
            <h3>Crear Set</h3>
            <p>Crear un nuevo set de productos</p>
          </Link>

          <Link to="/products" className="action-card">
            <h3>Ver Productos</h3>
            <p>Consultar y gestionar productos</p>
          </Link>

          <Link to="/sets" className="action-card">
            <h3>Gestionar Sets</h3>
            <p>Administrar sets existentes</p>
          </Link>
        </div>
      </div>

      <div className="dashboard-activity">
        <h2>Actividad reciente</h2>
        <ul className="activity-list">
          {stats.recentActivity.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
