import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { ShoppingBag, Search, Heart, Sun, Moon, X, Menu } from 'lucide-react';
import styles from './Nav.module.css';

export default function Nav() {
  const { navigate, cartCount, setCartOpen, page } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const solidNav = scrolled || page !== 'home';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', page: 'shop' as const },
    { label: 'Origins', page: 'origins' as const },
    { label: 'Journal', page: 'journal' as const },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${solidNav ? styles.scrolled : ''}`}>
        <button className={styles.logo} onClick={() => navigate('home')}>
          <span className={styles.logoMark}>
            <svg className={styles.logoIcon} viewBox="0 0 52 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Outer arch frame */}
              <path d="M4 61 L4 27 A22 22 0 0 1 48 27 L48 61 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              {/* Coffee bean */}
              <ellipse cx="26" cy="25" rx="8" ry="11" stroke="currentColor" strokeWidth="1.15" fill="none"/>
              {/* Bean crease */}
              <path d="M26 14 C21 25 26 36 26 36" stroke="currentColor" strokeWidth="0.9" fill="none"/>
              {/* Sunray lines from (26,37) downward */}
              <line x1="26" y1="37" x2="26" y2="58" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="22" y2="58" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="18" y2="57" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="13" y2="55" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="9"  y2="51" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="5"  y2="46" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="30" y2="58" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="34" y2="57" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="39" y2="55" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="43" y2="51" stroke="currentColor" strokeWidth="0.85"/>
              <line x1="26" y1="37" x2="47" y2="46" stroke="currentColor" strokeWidth="0.85"/>
              {/* Bottom foliage arcs */}
              <path d="M8 59 Q13 54 19 57" stroke="currentColor" strokeWidth="0.9" fill="none"/>
              <path d="M44 59 Q39 54 33 57" stroke="currentColor" strokeWidth="0.9" fill="none"/>
            </svg>
            <span className={styles.logoText}>Brown Theory</span>
          </span>
        </button>

        <ul className={styles.links}>
          {navLinks.map(l => (
            <li key={l.page}>
              <button
                onClick={() => navigate(l.page)}
                className={page === l.page ? styles.active : ''}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
          </button>
          <button className={styles.cartBtn} onClick={() => setCartOpen(true)} aria-label="Cart">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
          <button className={styles.orderBtn} onClick={() => navigate('shop')}>
            Order Now
          </button>
          <button className={styles.menuBtn} onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay}>
          <button className={styles.searchClose} onClick={() => setSearchOpen(false)}>
            <X size={24} strokeWidth={1.5} />
          </button>
          <div className={styles.searchInner}>
            <p className={styles.searchLabel}>Search</p>
            <input
              className={styles.searchInput}
              placeholder="Ethiopia, Geisha, Natural…"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)}>
            <X size={24} strokeWidth={1.5} />
          </button>
          <div className={styles.mobileLinks}>
            <button onClick={() => { navigate('home'); setMobileOpen(false); }}>Home</button>
            {navLinks.map(l => (
              <button key={l.page} onClick={() => { navigate(l.page); setMobileOpen(false); }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
