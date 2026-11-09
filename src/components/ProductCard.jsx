import { useMemo, useState } from 'react';

function formatARS(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value || 0);
}

function toTitleCase(str) {
  return (str || '').toLowerCase().replace(/(^|\s|[(/-])([\p{L}])/gu, (m, p1, p2) => p1 + p2.toUpperCase());
}

function getDisplayName(inspiracion, fallback) {
  const raw = (inspiracion || '').trim();
  if (!raw) return fallback || 'Fragancia VANNA';
  let name = raw.replace(/^ALTERNATIVA OLFATIVA DE\s+/i, '').trim();
  const parts = name.split(/\s+de\s+/i);
  if (parts.length >= 2) {
    const tail = parts[parts.length - 1].trim();
    const head = parts.slice(0, -1).join(' de ').trim();
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9áéíóúñ]/gi, '');
    if (tail && (norm(head).includes(norm(tail)) || norm(tail).length <= 18)) {
      name = head;
    }
  }
  name = name.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const letters = name.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, '');
  const upperRatio = letters ? (letters.match(/[A-ZÁÉÍÓÚÑ]/g) || []).length / letters.length : 0;
  if (upperRatio > 0.72 && name.length > 4) name = toTitleCase(name);
  return name || raw;
}

function Notes({ notas }) {
  const sections = [
    { key: 'salida', label: 'Salida' },
    { key: 'corazon', label: 'Corazón' },
    { key: 'fondo', label: 'Fondo' },
  ];
  const hasAny = sections.some((s) => (notas?.[s.key] || []).length > 0);
  if (!hasAny) {
    return <p className="v-notes v-notes--empty">Pirámide olfativa a confirmar.</p>;
  }
  return (
    <div className="v-notes">
      {sections.map((s) => {
        const items = notas?.[s.key] || [];
        if (!items.length) return null;
        return (
          <div key={s.key} className="v-notes__row">
            <span className="v-notes__label">{s.label}</span>
            <span className="v-notes__value">{items.join(', ')}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, onAdd }) {
  const sizes = product.tamanos?.length ? product.tamanos : [{ ml: 60, precio: 0 }];
  const [selectedMl, setSelectedMl] = useState(sizes[1]?.ml ?? sizes[0].ml);
  const [showNotes, setShowNotes] = useState(false);
  const selected = useMemo(() => sizes.find((s) => s.ml === selectedMl) || sizes[0], [sizes, selectedMl]);

  const genderLabel = { femenino: 'Femenino', masculino: 'Masculino', unisex: 'Unisex' }[product.genero] || 'Fragancia';
  const displayName = getDisplayName(product.inspiracion, product.nombreVanna);

  return (
    <article className="v-card">
      <div className="v-card__accent" aria-hidden="true" />
      <header className="v-card__header">
        <div className="v-card__meta">
          <span className={`v-pill v-pill--${product.genero || 'neutral'}`}>{genderLabel}</span>
          <span className="v-card__ref-code">Millanel N° {product.codigoMillanel}</span>
        </div>
        <h3 className="v-card__name" title={product.inspiracion || displayName}>{displayName}</h3>
        {product.familia ? (
          <p className="v-card__family"><span>Familia olfativa</span>{product.familia}</p>
        ) : (
          <p className="v-card__family v-card__family--muted"><span>Familia olfativa</span>A confirmar</p>
        )}
      </header>

      <div className="v-card__body">
        <div className="v-sizes" role="group" aria-label="Precios por tamaño">
          {sizes.map((s) => (
            <button
              key={s.ml}
              type="button"
              className={`v-size ${selectedMl === s.ml ? 'is-active' : ''}`}
              onClick={() => setSelectedMl(s.ml)}
            >
              <span className="v-size__ml">{s.ml} ml</span>
              <span className="v-size__price">{formatARS(s.precio)}</span>
            </button>
          ))}
        </div>

        <button type="button" className="v-notes-toggle" onClick={() => setShowNotes((v) => !v)}>
          {showNotes ? 'Ocultar notas olfativas' : 'Ver notas olfativas'}
        </button>
        {showNotes ? <Notes notas={product.notas} /> : null}
      </div>

      <footer className="v-card__footer">
        <div className="v-price">
          <span className="v-price__label">Seleccionado · {selected.ml} ml</span>
          <span className="v-price__value">{formatARS(selected.precio)}</span>
        </div>
        <button
          type="button"
          className="v-add"
          onClick={() => onAdd({ product, size: selected })}
        >
          Agregar al carrito
        </button>
      </footer>
    </article>
  );
}
