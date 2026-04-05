import { Link } from 'react-router-dom'
import './ComoPedir.css'

const steps = [
  {
    num: '01',
    icon: '🖼️',
    title: 'Explorá la galería',
    desc: 'Navegá por nuestros diseños y encontrá la temática que más se adapta a tu evento. También podés enviarnos una foto de referencia.',
    tips: ['Podés combinar elementos de distintos diseños', 'Si no encontrás lo que buscás, contanos tu idea', 'Guardá tus favoritos para mostrarnos'],
  },
  {
    num: '02',
    icon: '📋',
    title: 'Completá el formulario',
    desc: 'Completá el formulario de pedido con todos los detalles: fecha del evento, cantidad de cookies y la temática elegida.',
    tips: ['Indicá la fecha del evento, no la de entrega', 'Cuantos más detalles, mejor resultado', 'Podés agregar referencias visuales'],
  },
  {
    num: '03',
    icon: '💬',
    title: 'Nos ponemos en contacto',
    desc: 'En menos de 48hs te contactamos por WhatsApp para confirmar los detalles, el precio final y coordinar la entrega o envío.',
    tips: ['Confirmamos disponibilidad de agenda', 'Acordamos precio según complejidad', 'Coordinamos forma de pago y entrega'],
  },
  {
    num: '04',
    icon: '💳',
    title: 'Señas y confirmación',
    desc: 'Para confirmar el pedido se abona una seña del 50%. El saldo restante se abona al momento de la entrega.',
    tips: ['Transferencia bancaria / MercadoPago', 'El pedido queda reservado con la seña', 'Emitimos comprobante de pago'],
  },
  {
    num: '05',
    icon: '🍪',
    title: '¡Recibís tus cookies!',
    desc: 'Elaboramos tu pedido con amor, cuidado y los mejores materiales. Las cookies llegan perfectas y listas para sorprender.',
    tips: ['Entrega en mano (CABA/GBA)', 'Envíos al interior por correo', 'Packaging cuidado incluido'],
  },
]

const faqs = [
  {
    q: '¿Con cuánta anticipación debo hacer el pedido?',
    a: 'Mínimo 20 días antes del evento. Para fechas especiales como Navidad o temporada alta, recomendamos hacerlo con 30-45 días de anticipación.',
  },
  {
    q: '¿Cuántas cookies puedo pedir?',
    a: 'El pedido mínimo es de 12 cookies. No hay máximo, siempre y cuando la agenda lo permita.',
  },
  {
    q: '¿Tengo que elegir un diseño de la galería o puedo pedir algo personalizado?',
    a: 'Podés elegir cualquier diseño de la galería o traer tu propia idea. ¡Nos encanta crear diseños únicos y originales!',
  },
  {
    q: '¿Los ingredientes son aptos para celíacos o personas con alergias?',
    a: 'Por el momento nuestras cookies contienen gluten y pueden tener trazas de frutos secos. Consultanos si tenés alguna restricción particular.',
  },
  {
    q: '¿Hacen envíos al interior del país?',
    a: 'Sí, enviamos por correo a todo el país. El costo del envío corre por cuenta del cliente y se coordina al momento de la confirmación.',
  },
  {
    q: '¿Puedo cancelar un pedido?',
    a: 'Sí, con más de 10 días de anticipación podés cancelar y te devolvemos la seña. Con menos de 10 días no se realizan devoluciones.',
  },
]

export default function ComoPedir() {
  return (
    <main className="como-pedir">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <span className="section-tag">Proceso de compra</span>
          <h1 className="section-title">¿Cómo hacer tu pedido?</h1>
          <div className="divider" />
          <p className="section-subtitle">
            Es muy fácil. Seguí estos pasos y en poco tiempo tenés tus cookies artesanales listas para tu evento.
          </p>
        </div>
      </section>

      {/* Notice */}
      <div className="como-pedir__notice">
        <div className="container">
          <div className="como-pedir__notice-inner">
            <span className="como-pedir__notice-icon">⏱️</span>
            <div>
              <strong>Recordá: pedidos con mínimo 20 días de anticipación</strong>
              <p>Cada cookie se hace completamente a mano con love y dedicación. Por eso necesitamos ese tiempo para garantizar la calidad que nos caracteriza.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="section-padding">
        <div className="container">
          <div className="como-pedir__steps">
            {steps.map((step, i) => (
              <div key={step.num} className={`como-pedir__step ${i % 2 !== 0 ? 'como-pedir__step--reverse' : ''}`}>
                <div className="como-pedir__step-visual">
                  <div className="como-pedir__step-circle">
                    <span>{step.icon}</span>
                    <div className="como-pedir__step-num">{step.num}</div>
                  </div>
                  {i < steps.length - 1 && <div className="como-pedir__step-line" />}
                </div>
                <div className="como-pedir__step-content card">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <ul className="como-pedir__tips">
                    {step.tips.map((tip, ti) => (
                      <li key={ti}>✓ {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/hacer-pedido" className="btn btn-primary btn-large">
              ✨ Hacer mi pedido ahora
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding como-pedir__faq">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Preguntas frecuentes</span>
            <h2 className="section-title">Todo lo que necesitás saber</h2>
            <div className="divider" />
          </div>

          <div className="faq__grid">
            {faqs.map((faq, i) => (
              <div key={i} className="faq__item card">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
