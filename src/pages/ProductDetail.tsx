import { useState } from 'react';
import { useApp } from '../AppContext';
import { products } from '../data/data';
import { ShoppingBag, Heart, Truck, Minus, Plus } from 'lucide-react';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { selectedProduct, navigate, addToCart } = useApp();
  const product = selectedProduct;
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'attributes' | 'brew'>('description');

  if (!product) return null;

  const related = products.filter(p => p.origin === product.origin && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedGrind, qty);
  };

  return (
    <div className={styles.page}>
      <div className={styles.detail}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            <img src={product.images[activeImg]} alt={product.name} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.thumbs}>
            {product.images.map((img, i) => (
              <button key={i} className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}>
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.breadcrumb}>
            <button onClick={() => navigate('shop')}>Shop</button>
            <span>/</span>
            <button onClick={() => navigate('shop')}>{product.origin}</button>
            <span>/</span>
            <span className={styles.breadActive}>{product.name}</span>
          </p>

          <p className={styles.origin}>{product.origin} · {product.region}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.tagline}>{product.notes.join(' · ')}</p>

          <div className={styles.scoreRow}>
            <div className={styles.score}>
              <span className={styles.scoreNum}>{product.score}</span>
              <span className={styles.scoreLabel}>SCA Score</span>
            </div>
            <div className={styles.scoreDivider} />
            <div className={styles.flavorProfile}>
              <p className={styles.fpLabel}>Flavor Notes</p>
              <div className={styles.fpTags}>
                {product.notes.map(n => (
                  <span key={n} className={styles.fpTag}>{n}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Size */}
          <div className={styles.optRow}>
            <div className={styles.optLabel}>Weight</div>
            <div className={styles.optBtns}>
              {['100g', '250g', '500g', '1kg'].map(s => (
                <button key={s} className={`${styles.optBtn} ${selectedSize === s ? styles.optActive : ''}`}
                  onClick={() => setSelectedSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grind */}
          <div className={styles.optRow}>
            <div className={styles.optLabel}>Grind</div>
            <div className={styles.optBtns}>
              {['Whole Bean', 'Filter', 'Espresso', 'French Press'].map(g => (
                <button key={g} className={`${styles.optBtn} ${selectedGrind === g ? styles.optActive : ''}`}
                  onClick={() => setSelectedGrind(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Add */}
          <div className={styles.priceRow}>
            <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            <span className={styles.priceNote}>/ {selectedSize} · {selectedGrind}</span>
          </div>

          <div className={styles.addRow}>
            <div className={styles.qtyCtrl}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={12} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}><Plus size={12} /></button>
            </div>
            <button className="btn-gold" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAdd}>
              <ShoppingBag size={15} strokeWidth={1.5} /> Add to Cart
            </button>
            <button className={styles.wishBtn} aria-label="Wishlist">
              <Heart size={17} strokeWidth={1.5} />
            </button>
          </div>

          <div className={styles.shipping}>
            <Truck size={15} strokeWidth={1.5} color="var(--gold)" />
            <p>
              <strong>Roasted to order</strong> · Dispatched within 48 hours.
              Free shipping on orders over ₹3,000.
            </p>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <div className={styles.tabBtns}>
              {(['description', 'attributes', 'brew'] as const).map(tab => (
                <button key={tab} className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab === 'description' ? 'Story' : tab === 'attributes' ? 'Cup Profile' : 'Brew Guide'}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <p className={styles.tabText}>{product.description}</p>
              )}
              {activeTab === 'attributes' && (
                <div className={styles.roastBars}>
                  {[
                    { label: 'Acidity', val: product.acidity },
                    { label: 'Body', val: product.body },
                    { label: 'Sweetness', val: product.sweetness },
                    { label: 'Bitterness', val: product.bitterness },
                  ].map(attr => (
                    <div key={attr.label} className={styles.attr}>
                      <div className={styles.attrLabel}>
                        <span>{attr.label}</span>
                        <span>{attr.val}/100</span>
                      </div>
                      <div className={styles.attrTrack}>
                        <div className={styles.attrFill} style={{ width: `${attr.val}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className={styles.processInfo}>
                    <div className={styles.processItem}><span>Roast</span><strong>{product.roast.charAt(0).toUpperCase() + product.roast.slice(1)}</strong></div>
                    <div className={styles.processItem}><span>Process</span><strong>{product.process}</strong></div>
                    <div className={styles.processItem}><span>Altitude</span><strong>1,800–2,200m</strong></div>
                    <div className={styles.processItem}><span>Variety</span><strong>Heirloom</strong></div>
                  </div>
                </div>
              )}
              {activeTab === 'brew' && (
                <div className={styles.brewGuide}>
                  {[
                    { method: 'Pour Over', ratio: '1:15', temp: '91°C', time: '3:30 min' },
                    { method: 'Espresso', ratio: '1:2', temp: '93°C', time: '27 sec' },
                    { method: 'French Press', ratio: '1:12', temp: '95°C', time: '4 min' },
                  ].map(b => (
                    <div key={b.method} className={styles.brewRow}>
                      <span className={styles.brewMethod}>{b.method}</span>
                      <span>{b.ratio}</span>
                      <span>{b.temp}</span>
                      <span>{b.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className={styles.related}>
          <div className="eyebrow" style={{ textAlign: 'center' }}>You May Also Like</div>
          <div className={styles.relatedGrid}>
            {related.map(p => (
              <div key={p.id} className={styles.relCard} onClick={() => navigate('product', p)}>
                <div className={styles.relImg}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className={styles.relOv} />
                </div>
                <div className={styles.relInfo}>
                  <p className={styles.relOrigin}>{p.origin}</p>
                  <h4 className={styles.relName}>{p.name}</h4>
                  <span className={styles.relPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
