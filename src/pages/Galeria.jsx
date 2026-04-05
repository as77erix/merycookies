import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { gallery, categories } from '../data/gallery'
import './Galeria.css'

export default function Galeria() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategory = (catId) => {
    setActiveCategory(catId)
    if (catId === 'todos') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: catId })
    }
  }

  const filtered = gallery.filter(item => {
    const matchCat = activeCategory === 'todos' || item.category === activeCategory
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="galeria">
      {/* Header */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <span className="section-tag">Portfolio</span>
          <h1 className="section-title">Nuestra Galería</h1>
          <div className="divider" />
          <p className="section-subtitle">
            Explorá todos nuestros diseños. ¡Cada uno puede personalizarse con colores y detalles a tu gusto!
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="galeria__filters">
        <div className="container">
          <div className="galeria__search-wrap">
            <span className="galeria__search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar diseño..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="galeria__search"
              id="gallery-search"
            />
          </div>

          <div className="galeria__categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={() => handleCategory(cat.id)}
                className={`galeria__cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="galeria__grid-section section-padding">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="galeria__empty">
              <span>🍪</span>
              <p>No encontramos diseños con esa búsqueda.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('todos') }} className="btn btn-secondary">
                Ver todos
              </button>
            </div>
          ) : (
            <div className="galeria__grid">
              {filtered.map(item => (
                <div key={item.id} className="galeria__card card">
                  <div className="galeria__card-img">
                    <img src={item.image} alt={`Cookies ${item.title}`} loading="lazy" />
                    <div className="galeria__card-overlay">
                      <Link to="/hacer-pedido" className="btn btn-primary">
                        ✨ Pedir este diseño
                      </Link>
                    </div>
                    {item.tag && (
                      <span className="badge badge-primary galeria__tag">{item.tag}</span>
                    )}
                  </div>
                  <div className="galeria__card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="galeria__cta">
        <div className="container text-center">
          <p>¿No encontrás lo que buscás? ¡Contanos tu idea y lo creamos!</p>
          <Link to="/hacer-pedido" className="btn btn-primary btn-large" style={{ marginTop: '1rem' }}>
            ✨ Pedido personalizado
          </Link>
        </div>
      </div>
    </main>
  )
}
