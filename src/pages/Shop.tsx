import { useState } from 'react';
import { products } from '../data/data';
import { useApp } from '../AppContext';
import type { Product } from '../types';
import { SlidersHorizontal } from 'lucide-react';
import styles from './Shop.module.css';

function ShopCard({ product }: { product: Product }) {
  const { navigate, addToCart } = useApp();
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, '250g', 'Whole Bean');
  };
  return (
    <div className={styles.card} onClick={() => navigate('product', product)}>
      <div className={styles.cardVis}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className={styles.cardOv} />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <button className={styles.quickAdd} onClick={handleAdd}>Add to Cart</button>
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.origin}>{product.origin} · {product.region}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.notes}>{product.notes.slice(0, 3).join(' · ')}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>SCA</span>
            <span className={styles.scoreVal}>{product.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type FilterOrigin = 'all' | 'ethiopia' | 'colombia' | 'brazil' | 'india';
type FilterRoast = 'all' | 'light' | 'medium' | 'dark';
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'score';

export default function Shop() {
  const [filterOrigin, setFilterOrigin] = useState<FilterOrigin>('all');
  const [filterRoast, setFilterRoast] = useState<FilterRoast>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [priceMax, setPriceMax] = useState(6000);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = products
    .filter(p => filterOrigin === 'all' || p.origin.toLowerCase() === filterOrigin)
    .filter(p => filterRoast === 'all' || p.roast === filterRoast)
    .filter(p => p.price <= priceMax)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'score') return b.score - a.score;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>The <em>Collection</em></h1>
          <p className={styles.count}>{filtered.length} products</p>
        </div>
        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filter:</span>
          {(['all','ethiopia','colombia','brazil','india'] as FilterOrigin[]).map(o => (
            <button key={o} className={`${styles.filterBtn} ${filterOrigin === o ? styles.filterActive : ''}`}
              onClick={() => setFilterOrigin(o)}>
              {o === 'all' ? 'All' : o.charAt(0).toUpperCase() + o.slice(1)}
            </button>
          ))}
          <select className={styles.sortSel} value={sort} onChange={e => setSort(e.target.value as SortKey)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="score">SCA Score</option>
          </select>
          <button className={styles.mobileFilter} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <SlidersHorizontal size={16} /> Filter
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sideSection}>
            <div className={styles.sideTitle}>Roast Level</div>
            {(['all','light','medium','dark'] as FilterRoast[]).map(r => (
              <button key={r} className={`${styles.roastBtn} ${filterRoast === r ? styles.roastActive : ''}`}
                onClick={() => setFilterRoast(r)}>
                {r === 'all' ? 'All Roasts' : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.sideSection}>
            <div className={styles.sideTitle}>Price Range</div>
            <input type="range" className={styles.slider}
              min={1000} max={6000} value={priceMax}
              onChange={e => setPriceMax(+e.target.value)} />
            <div className={styles.priceVals}><span>₹1,000</span><span>₹{priceMax.toLocaleString('en-IN')}</span></div>
          </div>
          <div className={styles.sideSection}>
            <div className={styles.sideTitle}>Process</div>
            {['Washed', 'Natural', 'Honey', 'Monsoon', 'Anaerobic'].map(p => (
              <label key={p} className={styles.checkItem}>
                <input type="checkbox" /> {p}
              </label>
            ))}
          </div>
        </aside>

        <div className={styles.grid}>
          {filtered.map(p => <ShopCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
