import { useState } from 'react';
import { useApp } from '../AppContext';
import { Check, Lock } from 'lucide-react';
import styles from './Checkout.module.css';

type Step = 1 | 2 | 3 | 4;

export default function Checkout() {
  const { cart, cartTotal, navigate } = useApp();
  const [step, setStep] = useState<Step>(1);

  const gst = Math.round(cartTotal * 0.18);
  const total = cartTotal + gst;

  const stepNext = () => setStep(s => Math.min(4, s + 1) as Step);
  const stepBack = () => setStep(s => Math.max(1, s - 1) as Step);

  const stepLabels = ['Contact', 'Shipping', 'Payment', 'Confirm'];

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={styles.pageHead}>
            <div className="eyebrow">Secure Checkout</div>
            <h1 className={styles.heading}>Complete <em>Your Order</em></h1>
          </div>

          {/* Steps */}
          <div className={styles.stepsRow}>
            {stepLabels.map((l, i) => (
              <div key={l} className={`${styles.step} ${step === i + 1 ? styles.stepActive : ''} ${step > i + 1 ? styles.stepDone : ''}`}>
                {step > i + 1 ? <Check size={11} strokeWidth={2} /> : null}
                {step > i + 1 ? ' ' : ''}{l}
              </div>
            ))}
          </div>

          {/* Step 1: Contact */}
          {step === 1 && (
            <div>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <p className={styles.sectionSub}>We'll send order updates to your email</p>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input type="text" placeholder="Arjun" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input type="text" placeholder="Mehta" className={styles.input} />
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Phone</label>
                  <input type="tel" placeholder="+91 98765 43210" className={styles.input} />
                </div>
              </div>
              <label className={styles.checkLabel}>
                <input type="checkbox" />
                <span>Subscribe to our journal for tasting notes and origin stories</span>
              </label>
              <div className={styles.nav}>
                <button className="btn-gold" onClick={stepNext}>Continue to Shipping →</button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div>
              <h2 className={styles.sectionTitle}>Shipping Address</h2>
              <p className={styles.sectionSub}>Roasted to order and dispatched within 48 hours</p>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Address Line 1</label>
                  <input type="text" placeholder="House / Flat No., Street" className={styles.input} />
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Address Line 2 (optional)</label>
                  <input type="text" placeholder="Landmark" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input type="text" placeholder="Bengaluru" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>State</label>
                  <select className={styles.select}>
                    <option>Karnataka</option><option>Maharashtra</option>
                    <option>Tamil Nadu</option><option>Delhi</option><option>Kerala</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Pincode</label>
                  <input type="text" placeholder="560001" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <input value="India" readOnly className={styles.input} />
                </div>
              </div>
              <div className={styles.radioGroup}>
                {[
                  { label: 'Standard (3–5 days)', sub: 'Tracked via BlueDart', price: 'Free', val: 'standard' },
                  { label: 'Express (1–2 days)', sub: 'Priority dispatch', price: '₹199', val: 'express' },
                  { label: 'Same Day (Bengaluru)', sub: 'Order before 12pm', price: '₹349', val: 'same' },
                ].map(opt => (
                  <label key={opt.val} className={styles.radioOpt}>
                    <input type="radio" name="delivery" defaultChecked={opt.val === 'standard'} />
                    <div className={styles.radioInfo}>
                      <span className={styles.radioTitle}>{opt.label}</span>
                      <span className={styles.radioSub}>{opt.sub}</span>
                    </div>
                    <span className={styles.radioPrice}>{opt.price}</span>
                  </label>
                ))}
              </div>
              <div className={styles.nav}>
                <button className="btn-outline" onClick={stepBack}>← Back</button>
                <button className="btn-gold" onClick={stepNext}>Continue to Payment →</button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className={styles.sectionTitle}>Payment</h2>
              <p className={styles.sectionSub}>All transactions are encrypted and secure</p>
              <div className={styles.radioGroup} style={{ marginBottom: '1.5rem' }}>
                {[
                  { label: 'Credit / Debit Card', sub: 'Visa · Mastercard · Amex', val: 'card' },
                  { label: 'UPI', sub: 'GPay · PhonePe · Paytm', val: 'upi' },
                  { label: 'Cash on Delivery', sub: '+₹50 handling fee', val: 'cod' },
                ].map(opt => (
                  <label key={opt.val} className={styles.radioOpt}>
                    <input type="radio" name="payment" defaultChecked={opt.val === 'card'} />
                    <div className={styles.radioInfo}>
                      <span className={styles.radioTitle}>{opt.label}</span>
                      <span className={styles.radioSub}>{opt.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Card Number</label>
                  <input placeholder="4242 4242 4242 4242" maxLength={19} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>Expiry</label>
                  <input placeholder="MM / YY" maxLength={7} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>CVV</label>
                  <input placeholder="•••" maxLength={4} type="password" className={styles.input} />
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Cardholder Name</label>
                  <input placeholder="As on card" className={styles.input} />
                </div>
              </div>
              <div className={styles.secureNote}>
                <Lock size={14} strokeWidth={1.5} color="var(--gold)" />
                <span>256-bit SSL encrypted · PCI DSS compliant · Your data is never stored</span>
              </div>
              <div className={styles.nav}>
                <button className="btn-outline" onClick={stepBack}>← Back</button>
                <button className="btn-gold" onClick={stepNext}>Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmed */}
          {step === 4 && (
            <div className={styles.confirmed}>
              <div className={styles.confirmedIcon}>
                <Check size={28} strokeWidth={1.5} color="var(--gold)" />
              </div>
              <h2 className={styles.confirmedTitle}>Order Confirmed</h2>
              <p className={styles.confirmedBody}>
                Your beans will be roasted to order and dispatched within 48 hours.
                A confirmation and tracking link will be sent to your email.
              </p>
              <div className={styles.orderId}>Order #NOI-2025-{Math.floor(Math.random() * 9000 + 1000)}</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-gold" onClick={() => navigate('shop')}>Continue Shopping</button>
                <button className="btn-outline" onClick={() => navigate('journal')}>Read the Journal</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className={styles.summary}>
          <h3 className={styles.sumTitle}>Order Summary</h3>
          <div className={styles.sumItems}>
            {cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className={styles.sumItem}>
                <div className={styles.sumImg}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.sumInfo}>
                  <p className={styles.sumName}>{item.name}</p>
                  <p className={styles.sumMeta}>{item.selectedSize} · qty {item.qty}</p>
                </div>
                <span className={styles.sumPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className={styles.sumTotals}>
            <div className={styles.sumRow}><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <div className={styles.sumRow}><span>Shipping</span><span>Free</span></div>
            <div className={styles.sumRow}><span>GST (18%)</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
            <div className={`${styles.sumRow} ${styles.sumTotal}`}>
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className={styles.promoWrap}>
            <input placeholder="Promo code" className={styles.promoInput} />
            <button className="btn-ghost">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
