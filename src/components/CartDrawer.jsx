import { useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '5491100000000'; // Reemplazar por el número real (código país + área + número, sin +)
const TRANSFER_ALIAS = 'vanna.perfumes.mp';
const TRANSFER_CBU = '0000000000000000000000';
const TRANSFER_TITULAR = 'VANNA Perfumería';

function formatARS(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value || 0);
}

export default function CartDrawer({ open, items, onClose, onUpdateQty, onRemove, onClear }) {
  const [payMethod, setPayMethod] = useState('whatsapp');
  const [mpStatus, setMpStatus] = useState('idle');

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + it.precio * it.qty, 0), [items]);
  const transferDiscount = Math.round(subtotal * 0.1);
  const transferTotal = subtotal - transferDiscount;
  const count = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);

  const whatsappUrl = useMemo(() => {
    if (!items.length) return '#';
    const lines = [];
    lines.push('Hola! Quiero hacer un pedido en *VANNA Perfumería*:');
    lines.push('');
    items.forEach((it, i) => {
      lines.push(`${i + 1}. ${it.nombreVanna} (N° ${it.codigoMillanel})`);
      if (it.inspiracion) lines.push(`   Inspiración: ${it.inspiracion}`);
      lines.push(`   Tamaño: ${it.ml} ml · Cant.: ${it.qty} · ${formatARS(it.precio * it.qty)}`);
    });
    lines.push('');
    lines.push(`Subtotal: ${formatARS(subtotal)}`);
    if (payMethod === 'transferencia') {
      lines.push(`Descuento transferencia (10%): -${formatARS(transferDiscount)}`);
      lines.push(`*Total a abonar: ${formatARS(transferTotal)}*`);
      lines.push('Método de pago: Transferencia bancaria');
    } else if (payMethod === 'mercadopago') {
      lines.push(`*Total: ${formatARS(subtotal)}*`);
      lines.push('Método de pago: Mercado Pago');
    } else {
      lines.push(`*Total: ${formatARS(subtotal)}*`);
      lines.push('Método de pago: A coordinar');
    }
    lines.push('');
    lines.push('¿Me confirmás disponibilidad y envío?');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [items, subtotal, transferDiscount, transferTotal, payMethod]);

  const handleMercadoPago = () => {
    if (!items.length) return;
    setMpStatus('processing');
    window.setTimeout(() => setMpStatus('ready'), 900);
  };

  return (
    <>
      <div className={`v-drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`v-drawer ${open ? 'is-open' : ''}`} aria-label="Carrito de compras" aria-hidden={!open}>
        <div className="v-drawer__head">
          <div>
            <p className="v-kicker">Tu selección</p>
            <h2>Carrito {count ? `(${count})` : ''}</h2>
          </div>
          <button type="button" className="v-icon-btn" onClick={onClose} aria-label="Cerrar carrito">×</button>
        </div>

        <div className="v-drawer__body">
          {!items.length ? (
            <div className="v-empty v-empty--drawer">
              <h3>Tu carrito está vacío</h3>
              <p>Elegí una fragancia y agregala para ver opciones de pago y envío.</p>
            </div>
          ) : (
            <>
              <ul className="v-cart-list">
                {items.map((it) => (
                  <li key={it.key} className="v-cart-item">
                    <div className="v-cart-item__main">
                      <strong>{it.nombreVanna}</strong>
                      <span>N° {it.codigoMillanel} · {it.ml} ml</span>
                      {it.inspiracion ? <small>{it.inspiracion}</small> : null}
                    </div>
                    <div className="v-cart-item__side">
                      <div className="v-qty" aria-label={`Cantidad de ${it.nombreVanna}`}>
                        <button type="button" onClick={() => onUpdateQty(it.key, it.qty - 1)} aria-label="Reducir">−</button>
                        <span>{it.qty}</span>
                        <button type="button" onClick={() => onUpdateQty(it.key, it.qty + 1)} aria-label="Aumentar">+</button>
                      </div>
                      <div className="v-cart-item__price">{formatARS(it.precio * it.qty)}</div>
                      <button type="button" className="v-link-danger" onClick={() => onRemove(it.key)}>Quitar</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="v-link-muted" onClick={onClear}>Vaciar carrito</button>

              <div className="v-summary">
                <div className="v-summary__row"><span>Subtotal</span><strong>{formatARS(subtotal)}</strong></div>
                {payMethod === 'transferencia' ? (
                  <>
                    <div className="v-summary__row v-summary__row--accent"><span>Descuento transferencia (10%)</span><strong>-{formatARS(transferDiscount)}</strong></div>
                    <div className="v-summary__row v-summary__row--total"><span>Total</span><strong>{formatARS(transferTotal)}</strong></div>
                  </>
                ) : (
                  <div className="v-summary__row v-summary__row--total"><span>Total</span><strong>{formatARS(subtotal)}</strong></div>
                )}
                <p className="v-summary__note">Envío a coordinar por WhatsApp según zona.</p>
              </div>

              <section className="v-pay" aria-label="Métodos de pago">
                <h3>Pago y envío</h3>
                <div className="v-pay__methods">
                  <label className={`v-pay-option ${payMethod === 'mercadopago' ? 'is-active' : ''}`}>
                    <input type="radio" name="pay" checked={payMethod === 'mercadopago'} onChange={() => setPayMethod('mercadopago')} />
                    <span><strong>Mercado Pago</strong><small>Checkout / simulación</small></span>
                  </label>
                  <label className={`v-pay-option ${payMethod === 'transferencia' ? 'is-active' : ''}`}>
                    <input type="radio" name="pay" checked={payMethod === 'transferencia'} onChange={() => setPayMethod('transferencia')} />
                    <span><strong>Transferencia bancaria</strong><small>10% OFF aplicado al instante</small></span>
                  </label>
                  <label className={`v-pay-option ${payMethod === 'whatsapp' ? 'is-active' : ''}`}>
                    <input type="radio" name="pay" checked={payMethod === 'whatsapp'} onChange={() => setPayMethod('whatsapp')} />
                    <span><strong>Coordinar por WhatsApp</strong><small>Envío y pago asistido</small></span>
                  </label>
                </div>

                {payMethod === 'mercadopago' ? (
                  <div className="v-pay-panel">
                    <p>Pagá con tarjeta, débito o saldo de Mercado Pago. <em>(Simulación: conectá tu preferencia/checkout real en producción).</em></p>
                    <button type="button" className="v-pay-btn v-pay-btn--mp" onClick={handleMercadoPago} disabled={mpStatus === 'processing'}>
                      {mpStatus === 'processing' ? 'Preparando checkout…' : mpStatus === 'ready' ? 'Checkout listo (simulado)' : `Pagar ${formatARS(subtotal)} con Mercado Pago`}
                    </button>
                    {mpStatus === 'ready' ? <p className="v-pay-ok">Simulación OK. Integrá aquí el link de pago o Checkout Pro de Mercado Pago.</p> : null}
                  </div>
                ) : null}

                {payMethod === 'transferencia' ? (
                  <div className="v-pay-panel v-pay-panel--transfer">
                    <p>Transferí y obtené <strong>10% de descuento</strong>. Total con descuento: <strong>{formatARS(transferTotal)}</strong>.</p>
                    <dl className="v-transfer">
                      <div><dt>Alias</dt><dd>{TRANSFER_ALIAS}</dd></div>
                      <div><dt>CBU</dt><dd>{TRANSFER_CBU}</dd></div>
                      <div><dt>Titular</dt><dd>{TRANSFER_TITULAR}</dd></div>
                    </dl>
                    <p className="v-muted">Reemplazá alias/CBU/titular por los datos reales en <code>src/components/CartDrawer.jsx</code>.</p>
                  </div>
                ) : null}

                <a className="v-pay-btn v-pay-btn--wa" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Comprar por WhatsApp
                </a>
                <p className="v-muted">Se abre WhatsApp con el detalle completo y formateado del pedido.</p>
              </section>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
