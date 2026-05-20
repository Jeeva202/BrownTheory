import { useApp } from '../AppContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, navigate } = useApp();

  return (
    <>
      <div
        className={`${styles.overlay} ${cartOpen ? styles.overlayShow : ''}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`${styles.drawer} ${cartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.title}>Your Selection</div>
          <button className={styles.close} onClick={() => setCartOpen(false)}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <ShoppingBag size={22} strokeWidth={1.5} color="var(--gold)" />
              </div>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptySub}>Add a single origin to begin</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className={styles.itemDetails}>
                  <p className={styles.itemOrigin}>{item.origin}</p>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>{item.selectedSize} · {item.selectedGrind}</p>
                  <div className={styles.itemRow}>
                    <div className={styles.qty}>
                      <button onClick={() => updateQty(item.id, item.selectedSize, -1)}><Minus size={11} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.selectedSize, 1)}><Plus size={11} /></button>
                    </div>
                    <span className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id, item.selectedSize)}>
                      <Trash2 size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className={styles.subLabel}>Subtotal</span>
              <span className={styles.subVal}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p className={styles.shippingNote}>Free shipping on orders over ₹3,000 · Roasted fresh to order</p>
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.8rem' }}
              onClick={() => { setCartOpen(false); navigate('checkout'); }}>
              Proceed to Checkout
            </button>
            <button className={styles.continueBtn} onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
