import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const ESTADOS = ['nuevo', 'en_contacto', 'confirmado', 'entregado', 'cancelado']
const ESTADO_LABELS = {
  nuevo: '🆕 Nuevo',
  en_contacto: '💬 En contacto',
  confirmado: '✅ Confirmado',
  entregado: '📦 Entregado',
  cancelado: '❌ Cancelado',
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('pedidos').select('*').order('created_at', { ascending: false })
    setPedidos(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleEstado = async (id, estado) => {
    await supabase.from('pedidos').update({ estado }).eq('id', id)
    load()
  }

  const filtered = filtro === 'todos' ? pedidos : pedidos.filter(p => p.estado === filtro)

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Pedidos <span className="badge badge-primary">{pedidos.filter(p => p.estado === 'nuevo').length} nuevos</span></h2>
        <select value={filtro} onChange={e => setFiltro(e.target.value)} className="admin-select">
          <option value="todos">Todos</option>
          {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABELS[e]}</option>)}
        </select>
      </div>

      {loading ? <p>Cargando...</p> : filtered.length === 0 ? (
        <p className="admin-empty">No hay pedidos.</p>
      ) : (
        <div className="admin-pedidos-list">
          {filtered.map(p => (
            <div key={p.id} className="admin-pedido-card">
              <div className="admin-pedido-header" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                <div>
                  <strong>{p.nombre}</strong>
                  <span className="admin-pedido-meta">
                    {new Date(p.created_at).toLocaleDateString('es-AR')} · {p.tipo_evento} · {p.cantidad} uds
                  </span>
                </div>
                <div className="admin-pedido-right">
                  <select
                    value={p.estado || 'nuevo'}
                    onChange={e => { e.stopPropagation(); handleEstado(p.id, e.target.value) }}
                    onClick={e => e.stopPropagation()}
                    className={`admin-estado-select estado-${p.estado || 'nuevo'}`}
                  >
                    {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABELS[e]}</option>)}
                  </select>
                  <span>{expanded === p.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expanded === p.id && (
                <div className="admin-pedido-detail">
                  <div className="admin-detail-grid">
                    <div><label>Email</label><span>{p.email}</span></div>
                    <div><label>Teléfono</label><span>{p.telefono}</span></div>
                    <div><label>Fecha evento</label><span>{p.fecha_evento}</span></div>
                    <div><label>Cantidad</label><span>{p.cantidad}</span></div>
                    <div><label>Temática</label><span>{p.tematica || '—'}</span></div>
                    <div><label>Colores</label><span>{p.colores || '—'}</span></div>
                    <div><label>Cómo nos conoció</label><span>{p.como_nos_conociste || '—'}</span></div>
                  </div>
                  {p.mensaje && (
                    <div className="admin-pedido-mensaje">
                      <label>Mensaje</label>
                      <p>{p.mensaje}</p>
                    </div>
                  )}
                  <div className="admin-actions" style={{ marginTop: '1rem' }}>
                    <a
                      href={`https://wa.me/${p.telefono?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${p.nombre}, te contactamos de Mery Cookies por tu pedido para el ${p.tipo_evento} 🍪`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      📱 WhatsApp
                    </a>
                    <a href={`mailto:${p.email}`} className="btn btn-secondary btn-sm">✉️ Email</a>
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
