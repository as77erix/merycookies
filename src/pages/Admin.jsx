import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminTematicas from '../components/admin/AdminTematicas'
import AdminImagenes from '../components/admin/AdminImagenes'
import AdminPedidos from '../components/admin/AdminPedidos'
import './Admin.css'

const TABS = [
  { id: 'pedidos', label: '📋 Pedidos' },
  { id: 'tematicas', label: '🏷️ Temáticas' },
  { id: 'imagenes', label: '🖼️ Imágenes' },
]

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pedidos')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) return <div className="admin-loading">Cargando...</div>
  if (!session) return <AdminLogin />

  return (
    <main className="admin-panel">
      <div className="admin-header">
        <h1>🍪 Panel Admin</h1>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm">Cerrar sesión</button>
      </div>

      <div className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`admin-tab ${tab === t.id ? 'active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {tab === 'pedidos' && <AdminPedidos />}
        {tab === 'tematicas' && <AdminTematicas />}
        {tab === 'imagenes' && <AdminImagenes />}
      </div>
    </main>
  )
}
