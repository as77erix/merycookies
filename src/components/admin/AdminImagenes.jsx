import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminImagenes() {
  const [imagenes, setImagenes] = useState([])
  const [tematicas, setTematicas] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ titulo: '', descripcion: '', tematica_id: '', tag: '', orden: 0 })
  const [file, setFile] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const [{ data: imgs }, { data: tems }] = await Promise.all([
      supabase.from('imagenes').select('*, tematicas(nombre)').order('orden'),
      supabase.from('tematicas').select('id, nombre').eq('activa', true).order('nombre'),
    ])
    setImagenes(imgs || [])
    setTematicas(tems || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop()
    const path = `galeria/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('imagenes').upload(path, file, { upsert: false })
    if (error) throw error
    const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let url = editId ? imagenes.find(i => i.id === editId)?.url : null
      if (file) url = await uploadImage(file)
      if (!url) { setError('Seleccioná una imagen'); setSaving(false); return }

      const payload = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        tematica_id: form.tematica_id || null,
        tag: form.tag,
        orden: Number(form.orden),
        url,
        activa: true,
      }
      if (editId) {
        await supabase.from('imagenes').update(payload).eq('id', editId)
      } else {
        await supabase.from('imagenes').insert(payload)
      }
      setForm({ titulo: '', descripcion: '', tematica_id: '', tag: '', orden: 0 })
      setFile(null)
      setEditId(null)
      load()
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  const handleEdit = (img) => {
    setEditId(img.id)
    setForm({
      titulo: img.titulo,
      descripcion: img.descripcion || '',
      tematica_id: img.tematica_id || '',
      tag: img.tag || '',
      orden: img.orden || 0,
    })
    setFile(null)
  }

  const handleDelete = async (img) => {
    if (!confirm('¿Eliminar esta imagen?')) return
    // Extract path from URL
    const path = img.url.split('/imagenes/')[1]
    if (path) await supabase.storage.from('imagenes').remove([path])
    await supabase.from('imagenes').delete().eq('id', img.id)
    load()
  }

  const handleToggle = async (img) => {
    await supabase.from('imagenes').update({ activa: !img.activa }).eq('id', img.id)
    load()
  }

  const handleCancel = () => {
    setEditId(null)
    setForm({ titulo: '', descripcion: '', tematica_id: '', tag: '', orden: 0 })
    setFile(null)
    setError('')
  }

  return (
    <div className="admin-section">
      <h2>Imágenes de Galería</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Título *</label>
            <input type="text" value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} required />
          </div>
          <div className="admin-form-group">
            <label>Temática</label>
            <select value={form.tematica_id} onChange={e => setForm(p => ({ ...p, tematica_id: e.target.value }))}>
              <option value="">Sin temática</option>
              {tematicas.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Descripción</label>
            <input type="text" value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} />
          </div>
          <div className="admin-form-group">
            <label>Tag (ej: "Muy popular")</label>
            <input type="text" value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Orden</label>
            <input type="number" value={form.orden} onChange={e => setForm(p => ({ ...p, orden: e.target.value }))} min="0" />
          </div>
          <div className="admin-form-group">
            <label>Imagen {editId ? '(opcional, reemplaza la actual)' : '*'}</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
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
        <div className="admin-grid">
          {imagenes.map(img => (
            <div key={img.id} className={`admin-img-card ${!img.activa ? 'inactive' : ''}`}>
              <img src={img.url} alt={img.titulo} />
              <div className="admin-img-info">
                <strong>{img.titulo}</strong>
                <span>{img.tematicas?.nombre || 'Sin temática'}</span>
                {img.tag && <span className="badge badge-primary">{img.tag}</span>}
              </div>
              <div className="admin-actions">
                <button onClick={() => handleToggle(img)} className={`badge ${img.activa ? 'badge-green' : 'badge-gray'}`}>
                  {img.activa ? 'Visible' : 'Oculta'}
                </button>
                <button onClick={() => handleEdit(img)} className="btn btn-secondary btn-xs">Editar</button>
                <button onClick={() => handleDelete(img)} className="btn btn-danger btn-xs">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
