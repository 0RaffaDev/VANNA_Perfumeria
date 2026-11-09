import { useEffect, useState } from 'react';

const NAV = [
  { key: 'home', label: 'Inicio', section: null },
  { key: 'catalog', label: 'Catálogo', section: null },
  { key: 'promotions', label: 'Promociones', section: 'promociones' },
  { key: 'about', label: 'Nosotros', section: 'nosotros' },
  { key: 'contact', label: 'Contacto', section: 'contacto' },
];

export default function Navbar({ view, onNavigate, cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const go = (item) => {
    setOpen(false);
    if (item.key === 'catalog') {
      onNavigate('catalog');
      return;
    }
    if (item.key === 'home') {
      onNavigate('home');
      return;
    }
    onNavigate('home', item.section);
  };

  const isActive = (item) => {
    if (item.key === 'catalog') return view === 'catalog';
    if (item.key === 'home') return view === 'home';
    return false;
  };

  return (
    <header className={`v-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="v-navbar__inner">
        <button type="button" className="v-brand v-brand--btn" onClick={() => go(NAV[0])} aria-label="VANNA Perfumería, ir al inicio">
          <span className="v-brand__mark">VANNA</span>
          <span className="v-brand__sub">Perfumería · Millanel</span>
        </button>

        <button type="button" className="v-nav-toggle" aria-expanded={open} aria-label="Abrir menú" onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>

        <nav className={`v-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`v-nav__link ${isActive(item) ? 'is-active' : ''}`}
              onClick={() => go(item)}
              aria-current={isActive(item) ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="v-cart-btn" onClick={onOpenCart} aria-label={`Abrir carrito, ${cartCount} items`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 8h12l-1.2 11H7.2L6 8Z" />
            <path d="M9 8a3 3 0 0 1 6 0" />
          </svg>
          <span>Carrito</span>
          {cartCount > 0 ? <span className="v-cart-btn__count">{cartCount}</span> : null}
        </button>
      </div>
    </header>
  );
}
