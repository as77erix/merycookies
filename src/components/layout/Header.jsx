import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/galeria', label: 'Galería' },
    { to: '/como-pedir', label: '¿Cómo pedir?' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">🍪</div>
          <div className="header__logo-text">
            <span className="header__logo-name">Mery Cookies</span>
            <span className="header__logo-sub">Cookies Glaseadas</span>
          </div>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/hacer-pedido" className="btn btn-primary header__cta">
            ✨ Hacer Pedido
          </Link>
        </nav>

        <button
          className={`header__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && <div className="header__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}
