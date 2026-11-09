export default function Promotions({ onNavigateCatalog, sectionId = 'promociones' }) {
  return (
    <section id={sectionId} className="v-section v-promos" aria-label="Promociones">
      <div className="v-section-head">
        <div>
          <p className="v-kicker">Beneficios</p>
          <h2>Promociones</h2>
          <p className="v-section-lead">Ofertas vigentes y beneficios de pago para tu compra en VANNA.</p>
        </div>
      </div>

      <div className="v-promo-banner">
        <div className="v-promo-banner__main">
          <span className="v-promo-badge">Pago por transferencia</span>
          <h3>10% OFF aplicado al instante</h3>
          <p>
            Seleccioná <strong>Transferencia bancaria</strong> en el carrito y obtené un
            <strong> 10% de descuento automático</strong> sobre el total. El beneficio se calcula al
            momento, sin cupones ni pasos extra.
          </p>
        </div>
        <div className="v-promo-banner__side">
          <div className="v-promo-offer">
            <strong>Campaña Millanel vigente</strong>
            <span>Fragancias inspiradas disponibles en 30 ml, 60 ml y 100 ml según stock.</span>
          </div>
          <div className="v-promo-offer">
            <strong>Asesoramiento por WhatsApp</strong>
            <span>Te ayudamos a elegir tu fragancia y coordinamos envío según tu zona.</span>
          </div>
          {onNavigateCatalog ? (
            <button type="button" className="v-btn v-btn--primary" onClick={onNavigateCatalog}>
              Ver catálogo completo
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
