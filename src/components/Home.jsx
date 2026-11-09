import ProductCard from './ProductCard.jsx';
import Promotions from './Promotions.jsx';
import AboutContact from './AboutContact.jsx';

function pickFeatured(perfumes, limit = 6) {
  const featured = perfumes.filter((p) => p.destacado);
  const rest = perfumes.filter((p) => !p.destacado);
  const byGender = (g) => rest.filter((p) => p.genero === g);
  const picks = [...featured];
  const pools = [byGender('femenino'), byGender('masculino'), byGender('unisex')].filter((p) => p.length);
  let i = 0;
  while (picks.length < limit && pools.some((p) => p.length)) {
    const pool = pools[i % pools.length];
    if (pool.length) picks.push(pool.shift());
    i += 1;
    if (i > 200) break;
  }
  for (const p of rest) {
    if (picks.length >= limit) break;
    if (!picks.find((x) => x.id === p.id)) picks.push(p);
  }
  return picks.slice(0, limit);
}

export default function Home({ perfumes, onAdd, onNavigateCatalog, onNavigateSection }) {
  const featured = pickFeatured(perfumes, 6);

  return (
    <div className="v-home-page" aria-label="Inicio">
      <section id="inicio" className="v-hero v-hero--home">
        <div className="v-hero__content">
          <p className="v-kicker">VANNA · Revendedora Millanel · Argentina</p>
          <h1>Perfumería fina, con la esencia que te representa.</h1>
          <p>
            Alternativas inspiradas en fragancias icónicas, presentadas con una estética nude,
            dorada y gris carbón. Descubrí tu próxima fragancia en una experiencia simple y elegante.
          </p>
          <div className="v-hero__actions">
            <button type="button" className="v-btn v-btn--primary" onClick={onNavigateCatalog}>
              Ver catálogo completo
            </button>
            <button type="button" className="v-btn v-btn--ghost" onClick={() => onNavigateSection?.('promociones')}>Ver promociones</button>
          </div>
        </div>
        <div className="v-hero__card" aria-hidden="true">
          <div className="v-hero__bottle" />
          <div className="v-hero__note">
            <span>Selección VANNA</span>
            <strong>Alta perfumería</strong>
          </div>
        </div>
      </section>

      <Promotions onNavigateCatalog={onNavigateCatalog} />

      <section className="v-section v-featured" aria-label="Perfumes destacados">
        <div className="v-section-head">
          <div>
            <p className="v-kicker">Exclusiva</p>
            <h2>Perfumes destacados</h2>
            <p className="v-section-lead">Una selección breve para descubrir VANNA. Explorá el catálogo completo para ver todas las fragancias.</p>
          </div>
        </div>
        <div className="v-grid v-grid--featured">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
        <div className="v-center">
          <button type="button" className="v-btn v-btn--primary v-btn--lg" onClick={onNavigateCatalog}>
            Ver catálogo completo
          </button>
        </div>
      </section>

      <AboutContact />
    </div>
  );
}
