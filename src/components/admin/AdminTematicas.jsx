import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminTematicas() {
  const [tematicas, setTematicas] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', slug: '' })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('tematicas').select('*').order('nombre')
    setTematicas(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre.trim()) return
    setSaving(true)
    setError('')
    const slug = form.slug.trim() || form.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (editId) {
      const { error } = await supabase.from('tematicas').update({ nombre: form.nombre, slug }).eq('id', editId)
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.from('tematicas').insert({ nombre: form.nombre, slug, activa: true })
      if (error) setError(error.message)
    }
    setSaving(false)
    setForm({ nombre: '', slug: '' })
    setEditId(null)
    load()
  }

  const handleEdit = (t) => {
    setEditId(t.id)
    setForm({ nombre: t.nombre, slug: t.slug })
  }

  const handleToggle = async (t) => {
    await supabase.from('tematicas').update({ activa: !t.activa }).eq('id', t.id)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta temática?')) return
    await supabase.from('tematicas').delete().eq('id', id)
    load()
  }

  const handleCancel = () => {
    setEditId(null)
    setForm({ nombre: '', slug: '' })
    setError('')
  }

  return (
    <div className="admin-section">
      <h2>Temáticas</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
              placeholder="Ej: Baby Shower"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Slug (opcional)</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
              placeholder="Ej: baby-shower"
            />
          </div>
        </div>
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
            {saving ? 'Guardando...' : editId ? 'Actualizar' : 'Agregar'}
          </button>
          {editId && <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>}
        </div>
      </form>

      {loading ? <p>Cargando...</p> : (
        <table className="admin-table">
          <thead>
            <tr><th>Nombre</th><th>Slug</th><th>Activa</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {tematicas.map(t => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td><code>{t.slug}</code></td>
                <td>
                  <button onClick={() => handleToggle(t)} className={`badge ${t.activa ? 'badge-green' : 'badge-gray'}`}>
                    {t.activa ? 'Sí' : 'No'}
                  </button>
                </td>
                <td className="admin-actions">
                  <button onClick={() => handleEdit(t)} className="btn btn-secondary btn-xs">Editar</button>
                  <button onClick={() => handleDelete(t.id)} className="btn btn-danger btn-xs">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
