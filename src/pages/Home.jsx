import { Link } from 'react-router-dom'
import heroImg from '../assets/cookies_hero.png'
import safariImg from '../assets/cookies_safari.png'
import navImg from '../assets/cookies_navidad.png'
import babyImg from '../assets/cookies_babyshower.png'
import autosImg from '../assets/cookies_autos.png'
import './Home.css'

const featured = [
  { id: 1, title: 'Safari', img: safariImg, tag: 'Muy popular', cat: 'safari' },
  { id: 2, title: 'Navidad', img: navImg, tag: 'Temporada', cat: 'navidad' },
  { id: 3, title: 'Baby Shower', img: babyImg, tag: 'Personalizable', cat: 'babyshower' },
  { id: 4, title: 'Autos & Vehículos', img: autosImg, tag: 'Ideal para él', cat: 'autos' },
]

const steps = [
  { num: '01', icon: '💬', title: 'Elegís tu diseño', desc: 'Explorá la galería y elegís la temática que más te gusta, o nos contás tu idea.' },
  { num: '02', icon: '📋', title: 'Completás el formulario', desc: 'Nos indicás la fecha del evento, la cantidad y cualquier detalle especial.' },
  { num: '03', icon: '✅', title: 'Confirmamos el pedido', desc: 'Te contactamos para confirmar disponibilidad y acordar los detalles finales.' },
  { num: '04', icon: '🍪', title: '¡Recibís tus cookies!', desc: 'Elaboramos tu pedido con amor y lo entregamos a tiempo para tu evento.' },
]

export default function Home() {
  return (
    <main className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="badge badge-primary hero__eyebrow">✨ Artesanal & Glaseado</span>
            <h1 className="hero__title">
              Cookies que son <br />
              <em>pequeñas obras de arte</em>
            </h1>
            <p className="hero__desc">
              Cookies glaseadas hechas a mano para tus momentos más especiales.
              Cada pieza es única, decorada con amor y el más alto nivel de detalle.
            </p>
            <div className="hero__notice">
              <span>⏱️</span>
              <span>Pedidos con mínimo <strong>20 días de anticipación</strong></span>
            </div>
            <div className="hero__actions">
              <Link to="/hacer-pedido" className="btn btn-primary btn-large">
                ✨ Hacer mi pedido
              </Link>
              <Link to="/galeria" className="btn btn-secondary btn-large">
                Ver galería
              </Link>
            </div>
          </div>
          <div className="hero__image-wrap">
            <div className="hero__image-blob" />
            <img src={heroImg} alt="Cookies glaseadas artesanales - Mery Cookies" className="hero__image float" />
            <div className="hero__badge hero__badge--1">
              <span>🌟</span>
              <div>
                <strong>100%</strong>
                <span>Artesanal</span>
              </div>
            </div>
            <div className="hero__badge hero__badge--2">
              <span>🎨</span>
              <div>
                <strong>Royal Icing</strong>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ===== FEATURED GALLERY ===== */}
      <section className="section-padding featured">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Nuestro trabajo</span>
            <h2 className="section-title">Diseños que enamoran</h2>
            <div className="divider" />
            <p className="section-subtitle">
              Cada set es totalmente personalizable. Estos son algunos de nuestros diseños más queridos.
            </p>
          </div>

          <div className="featured__grid">
            {featured.map((item) => (
              <Link
                key={item.id}
                to={`/galeria?cat=${item.cat}`}
                className="featured__card card"
              >
                <div className="featured__card-img">
                  <img src={item.img} alt={`Cookies ${item.title}`} loading="lazy" />
                  <span className="badge badge-primary featured__tag">{item.tag}</span>
                </div>
                <div className="featured__card-body">
                  <h3>{item.title}</h3>
                  <span className="featured__arrow">Ver más →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/galeria" className="btn btn-secondary">
              Ver galería completa
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding how-it-works">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Simple y sencillo</span>
            <h2 className="section-title">¿Cómo hacer tu pedido?</h2>
            <div className="divider" />
          </div>

          <div className="how-it-works__grid">
            {steps.map((step) => (
              <div key={step.num} className="how-it-works__step">
                <div className="how-it-works__number">{step.num}</div>
                <div className="how-it-works__icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/hacer-pedido" className="btn btn-primary btn-large">
              ✨ Empezar mi pedido
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>¿Tenés una fecha especial?</h2>
            <p>Cumpleaños, bautismos, baby showers, casamientos, Navidad... ¡Lo hacemos realidad!</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/hacer-pedido" className="btn btn-accent btn-large">
              ✨ Pedir ahora
            </Link>
            <a
              href="https://www.instagram.com/themerycookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
            >
              Ver Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
