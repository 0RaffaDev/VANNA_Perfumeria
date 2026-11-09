import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { perfumes } from './data/perfumes.js';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import CatalogSection from './components/CatalogSection.jsx';
import CartDrawer from './components/CartDrawer.jsx';

function App() {
  const [view, setView] = useState('home'); // 'home' | 'catalog'
  const [scrollTarget, setScrollTarget] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  const cartCount = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);

  const navigate = (nextView, sectionId = null) => {
    if (nextView === 'catalog') {
      setScrollTarget(null);
      setView('catalog');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    // home
    if (view === 'home' && sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (view === 'home' && !sectionId) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    setScrollTarget(sectionId);
    setView('home');
  };

  useEffect(() => {
    if (view !== 'home') return;
    if (scrollTarget) {
      const id = scrollTarget;
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setScrollTarget(null);
      }, 0);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [view, scrollTarget]);

  const addToCart = ({ product, size }) => {
    const key = `${product.id}-${size.ml}`;
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.key === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          nombreVanna: product.nombreVanna,
          codigoMillanel: product.codigoMillanel,
          inspiracion: product.inspiracion,
          ml: size.ml,
          precio: size.precio,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateQty = (key, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((it) => it.key !== key);
      return prev.map((it) => (it.key === key ? { ...it, qty } : it));
    });
  };

  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key));
  const clearCart = () => setItems([]);

  return (
    <div className="v-app">
      <Navbar view={view} onNavigate={navigate} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="v-main">
        {view === 'home' ? <Home perfumes={perfumes} onAdd={addToCart} onNavigateCatalog={() => navigate('catalog')} onNavigateSection={(id) => navigate('home', id)} /> : null}
        {view === 'catalog' ? <CatalogSection perfumes={perfumes} onAdd={addToCart} /> : null}
      </main>

      <footer className="v-footer">
        <div>
          <strong>VANNA Perfumería</strong>
          <span>Revendedora Millanel · Argentina</span>
        </div>
        <p>Fragancias inspiradas. Marcas mencionadas como referencia olfativa; Millanel no está afiliada a los titulares originales.</p>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </div>
  );
}

export default App;
