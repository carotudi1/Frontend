import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', to: '/home' },
  { label: 'Productos', to: '/products' },
]

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
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
          {navItems.map((item) => (
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
