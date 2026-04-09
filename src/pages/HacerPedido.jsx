import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './HacerPedido.css'

const eventos = [
  'Cumpleaños', 'Baby Shower', 'Bautismo', 'Casamiento',
  'Comunión', 'Navidad', 'Pascua', 'San Valentín',
  'Año Nuevo', 'Graduación', 'Corporativo', 'Otro',
]

const cantidades = ['12-24', '25-49', '50-80', 'Más de 80']

const WHATSAPP_NUMBER = '5491135186587'

export default function HacerPedido() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaEvento: '',
    tipoEvento: '',
    cantidad: '',
    tematica: '',
    colores: '',
    mensaje: '',
    comoNosConociste: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [tematicas, setTematicas] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('tematicas').select('id, nombre').eq('activa', true).order('nombre')
      .then(({ data }) => setTematicas(data || []))
  }, [])

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email inválido'
    if (!form.telefono.trim()) e.telefono = 'El teléfono es obligatorio'
    if (!form.fechaEvento) e.fechaEvento = 'Indicá la fecha del evento'
    if (!form.tipoEvento) e.tipoEvento = 'Seleccioná el tipo de evento'
    if (!form.cantidad) e.cantidad = 'Seleccioná la cantidad aproximada'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const buildWhatsAppMessage = () => {
    const lines = [
      `🍪 *Nuevo pedido - Mery Cookies*`,
      ``,
      `👤 *Nombre:* ${form.nombre}`,
      `📧 *Email:* ${form.email}`,
      `📱 *Teléfono:* ${form.telefono}`,
      ``,
      `📅 *Fecha del evento:* ${form.fechaEvento}`,
      `🎉 *Tipo de evento:* ${form.tipoEvento}`,
      `🍪 *Cantidad aproximada:* ${form.cantidad}`,
      `🎨 *Temática:* ${form.tematica || 'A confirmar'}`,
      `🎨 *Colores preferidos:* ${form.colores || 'No especificado'}`,
      ``,
      `📝 *Detalles adicionales:*`,
      form.mensaje || 'Sin comentarios adicionales',
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSaving(true)
    // Upsert cliente por email
    const { data: clienteData } = await supabase
      .from('clientes')
      .upsert({ nombre: form.nombre, email: form.email, telefono: form.telefono, como_nos_conociste: form.comoNosConociste }, { onConflict: 'email' })
      .select('id')
      .single()

    await supabase.from('pedidos').insert({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      fecha_evento: form.fechaEvento,
      tipo_evento: form.tipoEvento,
      cantidad: form.cantidad,
      tematica: form.tematica,
      colores: form.colores,
      mensaje: form.mensaje,
      como_nos_conociste: form.comoNosConociste,
      estado: 'nuevo',
      cliente_id: clienteData?.id || null,
    })
    setSaving(false)
    setSubmitted(true)
  }

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  if (submitted) {
    return (
      <main className="hacer-pedido">
        <div className="container hacer-pedido__success">
          <div className="success-card card">
            <div className="success-icon">🍪</div>
            <h2>¡Pedido enviado con éxito!</h2>
            <p>
              Gracias, <strong>{form.nombre}</strong>. Recibimos tu solicitud y te contactaremos
              en las próximas 48hs para confirmar todos los detalles.
            </p>
            <div className="success-card__actions">
              <button onClick={handleWhatsApp} className="btn btn-primary btn-large">
                📱 Enviar también por WhatsApp
              </button>
              <Link to="/" className="btn btn-secondary">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="hacer-pedido">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <span className="section-tag">¡Empezamos!</span>
          <h1 className="section-title">Hacer mi pedido</h1>
          <div className="divider" />
          <p className="section-subtitle">
            Completá el formulario y en menos de 48hs te contactamos para confirmar los detalles.
          </p>
        </div>
      </section>

      {/* Notice */}
      <div className="hacer-pedido__notice">
        <div className="container">
          <div className="hacer-pedido__notice-inner">
            <span>⏱️</span>
            <p>Pedidos con <strong>mínimo 20 días de anticipación</strong> al evento.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="section-padding">
        <div className="container hacer-pedido__layout">
          <form
            className="pedido-form card"
            onSubmit={handleSubmit}
            id="order-form"
            noValidate
          >
            <h2>Tu información de contacto</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: María García"
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono / WhatsApp *</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+54 11 XXXX XXXX"
                className={errors.telefono ? 'error' : ''}
              />
              {errors.telefono && <span className="form-error">{errors.telefono}</span>}
            </div>

            <div className="form-divider" />
            <h2>Detalles del pedido</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaEvento">Fecha del evento *</label>
                <input
                  id="fechaEvento"
                  name="fechaEvento"
                  type="date"
                  value={form.fechaEvento}
                  onChange={handleChange}
                  className={errors.fechaEvento ? 'error' : ''}
                  min={new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                {errors.fechaEvento && <span className="form-error">{errors.fechaEvento}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="tipoEvento">Tipo de evento *</label>
                <select
                  id="tipoEvento"
                  name="tipoEvento"
                  value={form.tipoEvento}
                  onChange={handleChange}
                  className={errors.tipoEvento ? 'error' : ''}
                >
                  <option value="">Seleccioná...</option>
                  {eventos.map(ev => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
                {errors.tipoEvento && <span className="form-error">{errors.tipoEvento}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Cantidad aproximada *</label>
              <div className="form-options">
                {cantidades.map(c => (
                  <label
                    key={c}
                    className={`form-option ${form.cantidad === c ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="cantidad"
                      value={c}
                      checked={form.cantidad === c}
                      onChange={handleChange}
                    />
                    {c}
                  </label>
                ))}
              </div>
              {errors.cantidad && <span className="form-error">{errors.cantidad}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tematica">Temática deseada</label>
                <select
                  id="tematica"
                  name="tematica"
                  value={form.tematica}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná o describí abajo</option>
                  {tematicas.map(t => (
                    <option key={t.id} value={t.nombre}>{t.nombre}</option>
                  ))}
                  <option value="Diseño personalizado">Diseño personalizado</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="colores">Colores preferidos</label>
                <input
                  id="colores"
                  name="colores"
                  type="text"
                  value={form.colores}
                  onChange={handleChange}
                  placeholder="Ej: rosa, dorado y blanco"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Detalles adicionales o referencias</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Contanos más sobre tu idea, referencias, detalles especiales... ¡Cuanto más nos contés, mejor el resultado!"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label htmlFor="comoNosConociste">¿Cómo nos conociste?</label>
              <select
                id="comoNosConociste"
                name="comoNosConociste"
                value={form.comoNosConociste}
                onChange={handleChange}
              >
                <option value="">Seleccioná...</option>
                <option value="instagram">Instagram</option>
                <option value="recomendacion">Recomendación de un amigo</option>
                <option value="google">Google</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary btn-large" style={{ width: '100%', justifyContent: 'center' }}>
              {saving ? 'Enviando...' : '✨ Enviar pedido'}
            </button>
          </form>

          {/* Sidebar */}
          <aside className="pedido-sidebar">
            <div className="sidebar-card card">
              <h3>💬 ¿Preferís hablar directamente?</h3>
              <p>Si te resulta más cómodo, podés contactarnos directo por WhatsApp.</p>
              <button onClick={handleWhatsApp} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                📱 Escribir por WhatsApp
              </button>
            </div>

            <div className="sidebar-card card">
              <h3>📍 Cobertura</h3>
              <ul className="sidebar-list">
                <li>📍 Capiovi, Misiones</li>
                <li>📦 Envíos al interior por correo</li>
                <li>🤝 Costo del envío a cargo del cliente</li>
              </ul>
            </div>

            <div className="sidebar-card card">
              <h3>💳 Formas de pago</h3>
              <ul className="sidebar-list">
                <li>💙 MercadoPago</li>
                <li>🏦 Transferencia bancaria</li>
                <li>50% de seña al confirmar</li>
                <li>50% restante en la entrega</li>
              </ul>
            </div>

            <div className="sidebar-card card">
              <h3>⏱️ Tiempos importantes</h3>
              <ul className="sidebar-list">
                <li>📅 Mínimo 20 días de anticipación</li>
                <li>✉️ Respuesta en menos de 48hs</li>
                <li>🗓️ Sujeto a disponibilidad de agenda</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
