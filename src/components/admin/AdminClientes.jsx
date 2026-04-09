import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminClientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('clientes')
      .select('*, pedidos(id, tipo_evento, fecha_evento, estado, created_at)')
      .order('created_at', { ascending: false })
    setClientes(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = clientes.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.telefono || '').includes(search)
  )

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Clientes <span className="badge badge-primary">{clientes.length}</span></h2>
        <input
          type="text"
          placeholder="Buscar por nombre, email o teléfono..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-search-input"
        />
      </div>

      {loading ? <p>Cargando...</p> : filtered.length === 0 ? (
        <p className="admin-empty">No hay clientes registrados.</p>
      ) : (
        <div className="admin-pedidos-list">
          {filtered.map(c => (
            <div key={c.id} className="admin-pedido-card">
              <div className="admin-pedido-header" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                <div>
                  <strong>{c.nombre}</strong>
                  <span className="admin-pedido-meta">
                    {c.email} · {c.telefono || 'Sin teléfono'} · {c.pedidos?.length || 0} pedido(s)
                  </span>
                </div>
                <div className="admin-pedido-right">
                  <span className="badge badge-green">
                    {c.pedidos?.length || 0} pedidos
                  </span>
                  <span>{expanded === c.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expanded === c.id && (
                <div className="admin-pedido-detail">
                  <div className="admin-detail-grid">
                    <div><label>Email</label><span>{c.email}</span></div>
                    <div><label>Teléfono</label><span>{c.telefono || '—'}</span></div>
                    <div><label>Cómo nos conoció</label><span>{c.como_nos_conociste || '—'}</span></div>
                    <div><label>Registrado</label><span>{new Date(c.created_at).toLocaleDateString('es-AR')}</span></div>
                  </div>
                  {c.pedidos?.length > 0 && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Historial de pedidos</label>
                      <table className="admin-table" style={{ marginTop: '0.5rem' }}>
                        <thead>
                          <tr><th>Evento</th><th>Fecha evento</th><th>Estado</th><th>Fecha pedido</th></tr>
                        </thead>
                        <tbody>
                          {c.pedidos.map(p => (
                            <tr key={p.id}>
                              <td>{p.tipo_evento || '—'}</td>
                              <td>{p.fecha_evento || '—'}</td>
                              <td><span className={`badge estado-${p.estado || 'nuevo'}`}>{p.estado || 'nuevo'}</span></td>
                              <td>{new Date(p.created_at).toLocaleDateString('es-AR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="admin-actions" style={{ marginTop: '1rem' }}>
                    <a
                      href={`https://wa.me/${c.telefono?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${c.nombre}! Te escribimos de Mery Cookies 🍪`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      📱 WhatsApp
                    </a>
                    <a href={`mailto:${c.email}`} className="btn btn-secondary btn-sm">✉️ Email</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
