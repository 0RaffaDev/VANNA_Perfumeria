const WHATSAPP_NUMBER = '5491100000000'; // Reemplazar por el número real

export default function AboutContact() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero consultar por fragancias VANNA.')}`;

  return (
    <>
      <section id="nosotros" className="v-section v-about" aria-label="Nosotros">
        <div className="v-section-head">
          <div>
            <p className="v-kicker">Nuestra esencia</p>
            <h2>Nosotros</h2>
            <p className="v-section-lead">VANNA Perfumería, con atención cuidada y fragancias inspiradas en Argentina.</p>
          </div>
        </div>
        <div className="v-about__grid">
          <article className="v-about__card">
            <h3>Sobre VANNA</h3>
            <p>
              <strong>VANNA Perfumería</strong> es una propuesta dedicada a la venta de fragancias
              <strong> Millanel</strong> en Argentina, con una experiencia cuidada, minimalista y
              orientada a ayudarte a encontrar el aroma ideal.
            </p>
            <p>
              Trabajamos con referencias de inspiración olfativa, familias aromáticas y opciones de
              tamaño para que elijas con confianza.
            </p>
          </article>
          <article className="v-about__card v-about__card--accent">
            <h3>Compromiso</h3>
            <ul className="v-list">
              <li>Asesoramiento personalizado por WhatsApp.</li>
              <li>Referencias de inspiración olfativa y familia aromática.</li>
              <li>Opciones de 30 ml, 60 ml y 100 ml según disponibilidad.</li>
              <li>Transferencia con 10% de descuento automático en el carrito.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="contacto" className="v-section v-contact" aria-label="Contacto">
        <div className="v-section-head">
          <div>
            <p className="v-kicker">Atención</p>
            <h2>Contacto</h2>
            <p className="v-section-lead">Coordiná tu pedido, consultá stock o pedí asesoramiento.</p>
          </div>
        </div>
        <div className="v-contact__card">
          <div>
            <h3>WhatsApp</h3>
            <p>La forma más rápida de comprar o consultar. Confirmamos disponibilidad, envío y forma de pago.</p>
            <a className="v-btn v-btn--primary v-btn--block" href={waUrl} target="_blank" rel="noreferrer">
              Hablar por WhatsApp
            </a>
          </div>
          <div className="v-contact__details">
            <div><span>Marca</span><strong>VANNA Perfumería</strong></div>
            <div><span>Actividad</span><strong>Revendedora Millanel</strong></div>
            <div><span>Ubicación</span><strong>Argentina</strong></div>
            <div><span>Pagos</span><strong>Mercado Pago · Transferencia (-10%) · WhatsApp</strong></div>
          </div>
        </div>
      </section>
    </>
  );
}
