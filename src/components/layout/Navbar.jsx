import { NavLink, useNavigate } from 'react-router-dom'
import { clearSession, getCurrentUser } from '../../services/authServices'

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/products' },
  { label: 'Login', to: '/login' },
  { label: 'Registro', to: '/register' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <nav className="site-navbar">
      <div className="site-navbar__inner">
        <NavLink className="site-brand" to="/">
          <img className="site-brand__logo" src="/logo.jpeg" alt="Logo EFORM" />
          <span>EFORM</span>
        </NavLink>

        <div className="site-menu" aria-label="Menu principal">
          {navItems
            .filter((item) => (user ? !['/login', '/register'].includes(item.to) : true))
            .map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'site-menu__link is-active' : 'site-menu__link')}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          {user && (
            <>
              <span className="site-menu__user">{user.name || user.email}</span>
              <button className="site-menu__button" onClick={handleLogout} type="button">
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
