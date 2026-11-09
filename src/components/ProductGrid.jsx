import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, onAdd, search, filter }) {
  if (!products.length) {
    return (
      <div className="v-empty">
        <h2>Sin resultados</h2>
        <p>
          No encontramos fragancias para {search ? `“${search}”` : 'este filtro'}.
          Probá con otro nombre, código, inspiración o categoría.
        </p>
      </div>
    );
  }

  return (
    <section className="v-grid-section" aria-label="Catálogo de fragancias">
      <div className="v-grid-head">
        <div>
          <p className="v-kicker">Catálogo VANNA</p>
          <h2>Fragancias Millanel</h2>
        </div>
        <p className="v-grid-meta">{products.length} resultado{products.length === 1 ? '' : 's'}</p>
      </div>
      <div className="v-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
