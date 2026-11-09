import { useMemo, useState } from 'react';
import ProductGrid from './ProductGrid.jsx';

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'femenino', label: 'Femenino' },
  { key: 'masculino', label: 'Masculino' },
  { key: 'unisex', label: 'Unisex' },
];

function normalize(s) {
  return (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function CatalogSection({ perfumes, onAdd }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');

  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return perfumes.filter((p) => {
      if (filter !== 'todos' && p.genero !== filter) return false;
      if (!q) return true;
      const hay = [p.nombreVanna, p.codigoMillanel, p.inspiracion, p.familia, `n ${p.codigoMillanel}`, p.genero]
        .map(normalize)
        .join(' ');
      return hay.includes(q);
    });
  }, [perfumes, search, filter]);

  return (
    <div className="v-view v-catalog" aria-label="Catálogo">
      <div className="v-section-head v-section-head--stack">
        <div>
          <p className="v-kicker">Explorar</p>
          <h2>Catálogo</h2>
          <p className="v-section-lead">Buscador masivo y filtros por género para explorar todas las fragancias disponibles.</p>
        </div>
      </div>

      <div className="v-catalog-controls">
        <div className="v-search v-search--catalog">
          <svg className="v-search__icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, código o inspiración…"
            aria-label="Buscar en catálogo"
          />
          {search ? (
            <button type="button" className="v-search__clear" onClick={() => setSearch('')} aria-label="Limpiar búsqueda">×</button>
          ) : null}
        </div>
        <nav className="v-filters v-filters--catalog" aria-label="Filtros por género">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`v-filter ${filter === f.key ? 'is-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </div>

      <ProductGrid products={filtered} onAdd={onAdd} search={search} filter={filter} />
    </div>
  );
}
