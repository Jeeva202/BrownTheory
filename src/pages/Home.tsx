import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useApp } from '../AppContext';
import { products, journal } from '../data/data';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown, ArrowRight, MapPin, Flame, Package, Truck, Mail, Phone } from 'lucide-react';
import type { Product } from '../types';
import styles from './Home.module.css';

const processSteps = [
  {
    num: '01', icon: MapPin, title: 'Sourced Direct',
    body: 'We travel to farms in Ethiopia, Colombia, Brazil & India every harvest. We cup alongside farmers, negotiate directly — no importers, no middlemen — selecting only the top 1% of each lot.',
  },
  {
    num: '02', icon: Flame, title: 'Small-Batch Roasted',
    body: "Every bean roasted in 5kg batches on our vintage Probat in Bengaluru. No automated profiles — just our roastmaster's judgment, honed over 12 years, dialled to each origin's sweet spot.",
  },
  {
    num: '03', icon: Package, title: 'Hand-Packed',
    body: 'Nitrogen-flushed into our custom kraft bags within 24 hours of roast. Each bag is hand-stamped with farm name, altitude, harvest date, and roast details — then inspected before sealing.',
  },
  {
    num: '04', icon: Truck, title: 'Delivered Fresh',
    body: 'Nationwide via BlueDart, guaranteed within 7 days of roast. Bengaluru same-day available. You always receive coffee at peak freshness — never from a warehouse shelf.',
  },
];

const workshops = [
  {
    title: 'Monthly Cupping Table',
    date: 'First Saturday — Every Month',
    desc: 'A guided sensory journey across 6 coffees. Learn to identify origin markers, process characters, and roast development in real time with our head roaster.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    spots: '12 Seats',
  },
  {
    title: 'Barista Masterclass',
    date: 'Second Sunday — Every Month',
    desc: 'Pull espresso on our La Marzocco, master milk texturing, and dial in pour-over ratios. Beginner to intermediate home baristas welcome.',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80',
    spots: '8 Seats',
  },
  {
    title: 'Brew Method Workshop',
    date: 'Every Saturday — 10am',
    desc: 'V60, Chemex, AeroPress, Moka Pot. Water chemistry, grind science, brew ratios — a morning of hands-on practice that turns technique into instinct.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80',
    spots: '16 Seats',
  },
];

function ProductCard({ product }: { product: Product }) {
  const { navigate } = useApp();
  return (
    <div className={styles.prodCard} onClick={() => navigate('product', product)}>
      <div className={styles.prodImg}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className={styles.prodOverlay} />
        {product.badge && <span className={styles.prodBadge}>{product.badge}</span>}
        <span className={styles.prodBean}>{product.beanType} · {product.beanVariety}</span>
      </div>
      <div className={styles.prodInfo}>
        <p className={styles.prodOrigin}>{product.origin} · {product.region}</p>
        <h3 className={styles.prodName}>{product.name}</h3>
        <p className={styles.prodNotes}>{product.notes.join(' · ')}</p>
        <div className={styles.prodFooter}>
          <span className={styles.prodPrice}>₹{product.price.toLocaleString('en-IN')}</span>
          <span className={styles.prodScore}>SCA <strong>{product.score}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { navigate } = useApp();
  const featuredProducts = products.filter(p => p.featured);
  const heroRef = useRef<HTMLElement>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [sent, setSent] = useState(false);
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal();
  const r4 = useReveal(); const r5 = useReveal(); const r6 = useReveal();
  const r7 = useReveal(); const r8 = useReveal(); const r9 = useReveal();
  const r10 = useReveal(); const r11 = useReveal(); const r12 = useReveal();

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current?.querySelector('img') as HTMLElement | null;
      if (el) el.style.transform = `scale(1.06) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setContactName(''); setContactEmail(''); setContactMsg('');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80"
            alt="Cinematic coffee"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          {/* <p className={`eyebrow ${styles.heroEye}`}>Single Origin · Artisan Roasted · Est. 2019</p> */}
          <h1 className={styles.heroH}>
            The<br /><em>Art of</em><br />Coffee
          </h1>
          <p className={styles.heroSub}>Sourced from the world's finest farms</p>
          <div className={styles.heroBtns}>
            <button className="btn-gold" onClick={() => navigate('shop')}>Explore Collection</button>
            <button className="btn-outline" onClick={() => navigate('origins')}>Our Origins</button>
          </div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}><span className={styles.statN}>04</span><span className={styles.statL}>Origins</span></div>
          <div className={styles.stat}><span className={styles.statN}>12</span><span className={styles.statL}>Blends</span></div>
          <div className={styles.stat}><span className={styles.statN}>94+</span><span className={styles.statL}>SCA Score</span></div>
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.scrollLine} />
          <ChevronDown size={12} color="rgba(242,237,228,0.4)" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {['Ethiopia Yirgacheffe', 'Colombia Huila', 'Brazil Cerrado', 'India Coorg',
            'Ethiopia Sidama', 'Colombia Pink Bourbon', 'Brazil Bourbon', 'India Araku',
            'Ethiopia Yirgacheffe', 'Colombia Huila', 'Brazil Cerrado', 'India Coorg'].map((t, i) => (
            <span key={i} className={styles.trackItem}>{t} <em>✦</em></span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.products}>
        <div className={styles.sectionHead} ref={r1}>
          <div className="eyebrow">The Collection</div>
          <h2 className="section-title">Curated <em>Expressions</em></h2>
          <div className="gold-line" />
          <p className={styles.sectionBody}>Each blend is a chapter. Each origin, a world unto itself.</p>
        </div>
        <div className={styles.prodGrid}>
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className={styles.prodCta} ref={r2}>
          <button className="btn-gold" onClick={() => navigate('shop')}>
            View All Coffees <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── PROCESS JOURNEY ── */}
      <section className={styles.process}>
        <div className={styles.processInner}>
          <div className={styles.processHead} ref={r3}>
            <div className="eyebrow">The Brown Theory Way</div>
            <h2 className="section-title">Craft in<br /><em>Every Touch</em></h2>
            <div className="gold-line" />
            <p className={styles.sectionBody}>
              From hand-picking to your doorstep — we own every step. No brokers, no warehouse middlemen, no compromise on freshness.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, i) => {
              const refs = [r4, r5, r6, r7];
              return (
                <div key={step.num} className={styles.processStep} ref={refs[i]}>
                  <div className={styles.processNum}>{step.num}</div>
                  <div className={styles.processIcon}><step.icon size={20} strokeWidth={1.2} /></div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <div className={styles.processBar} />
                  <p className={styles.processBody}>{step.body}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.processStory} ref={r8}>
            <div className={styles.psImg}>
              <img src="https://images.unsplash.com/photo-1552912470-ee2af8bce888?w=900&q=80" alt="Coffee farm partnership" />
            </div>
            <div className={styles.psTxt}>
              <div className="eyebrow">Our Promise</div>
              <h3 className={styles.psTitle}>We Know <em>Every Farm</em><br />By Name</h3>
              <p className={styles.psBody}>
                Brown Theory was built on a single conviction — that the world's best coffee is grown by people who have tended the same land for generations. We pay 35–60% above Fair Trade minimums, visit every partner farm annually, and co-invest in processing infrastructure. When you open a bag of Brown Theory, you hold something with a known, proud story behind every gram.
              </p>
              <div className={styles.psTags}>
                {['Direct Trade', 'Fair Price Paid', 'Annual Farm Visits', 'Full Traceability'].map(t => (
                  <span key={t} className={styles.psTag}>{t}</span>
                ))}
              </div>
              <button className={styles.btnDark} onClick={() => navigate('origins')}>Meet Our Farm Partners</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGING SHOWCASE ── */}
      <section className={styles.packaging}>
        <div className={styles.packagingInner}>
          <div className={`${styles.packHead} reveal`} ref={r9}>
            <div className="eyebrow">Premium Packaging</div>
            <h2 className="section-title">Design as <em>Philosophy</em></h2>
            <div className="gold-line" />
            <p className={styles.sectionBody}>
              Matte kraft, gold foil stamping, and recycled inner lining. Each bag is a keepsake.
            </p>
          </div>
          <div className={styles.packGrid}>
            {[
              { img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80', label: '250g · Kraft Signature', tag: 'Bestseller' },
              { img: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=700&q=80', label: '1kg · Black Reserve Label', tag: 'New' },
              { img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80', label: '100g · Gift Collection', tag: 'Gift' },
            ].map((item, i) => (
              <div key={i} className={styles.packCard}>
                <div className={styles.packImgWrap}>
                  <img src={item.img} alt={item.label} loading="lazy" />
                  <div className={styles.packFoil} />
                  <div className={styles.packBrand}>
                    <span className={styles.packBrandName}>Brown Theory</span>
                    <span className={styles.packBrandSub}>Specialty Coffee · Bengaluru</span>
                  </div>
                  <span className={styles.packBadge}>{item.tag}</span>
                </div>
                <div className={styles.packLabel}>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION ── */}
      <section className={styles.sub}>
        <div className={styles.subBg}>
          <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80" alt="bg" />
          <div className={styles.subOverlay} />
        </div>
        <div className={`${styles.subContent} reveal`} ref={r10}>
          <div className="eyebrow">Never Run Out</div>
          <h2 className={styles.subTitle}>The <em>Subscription</em></h2>
          <p className={styles.subBody}>
            Fresh-roasted beans, delivered on your schedule. Cancel or pause anytime.
            Every delivery includes tasting notes and brew guides.
          </p>
          <div className={styles.subOptions}>
            {[
              { label: 'Weekly', price: '₹2,200' },
              { label: 'Fortnightly', price: '₹2,000', active: true },
              { label: 'Monthly', price: '₹1,800' },
            ].map(opt => (
              <div key={opt.label} className={`${styles.subOpt} ${opt.active ? styles.subOptActive : ''}`}>
                <span className={styles.subOptPrice}>{opt.price}</span>
                <span className={styles.subOptLabel}>{opt.label}</span>
              </div>
            ))}
          </div>
          <button className="btn-gold">Start Subscription</button>
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section className={styles.journalSection}>
        <div className={styles.sectionHead}>
          <div className="eyebrow">The Brown Theory Journal</div>
          <h2 className="section-title">Stories from<br /><em>the Field</em></h2>
          <div className="gold-line" />
        </div>
        <div className={styles.journalGrid}>
          {journal.slice(0, 3).map((post, i) => (
            <div key={post.id} className={`${styles.jCard} ${i === 0 ? styles.jCardMain : ''}`}>
              <div className={styles.jImg}>
                <img src={post.image} alt={post.title} loading="lazy" />
                <div className={styles.jOverlay} />
                <div className={styles.jInfo}>
                  <span className={styles.jCat}>{post.category}</span>
                  <h3 className={styles.jTitle}>{post.title}</h3>
                  <span className={styles.jMeta}>{post.author} · {post.date} · {post.readTime} read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-outline" onClick={() => navigate('journal')}>Read the Journal</button>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className={styles.community}>
        <div className={styles.communityInner}>
          <div className={styles.commHead} ref={r11}>
            <div className="eyebrow">More Than Coffee</div>
            <h2 className="section-title">Join the <em>Brown Theory</em><br />Community</h2>
            <div className="gold-line" />
            <p className={styles.commBody}>
              A gathering of curious palates and devoted brewers. Monthly workshops, cupping tables, and conversations that only happen over a really good cup.
            </p>
          </div>
          <div className={styles.workshopGrid}>
            {workshops.map(w => (
              <div key={w.title} className={styles.workshopCard}>
                <div className={styles.workshopImg}>
                  <img src={w.image} alt={w.title} loading="lazy" />
                  <div className={styles.workshopOverlay} />
                </div>
                <div className={styles.workshopInfo}>
                  <span className={styles.workshopDate}>{w.date}</span>
                  <h3 className={styles.workshopTitle}>{w.title}</h3>
                  <p className={styles.workshopDesc}>{w.desc}</p>
                  <span className={styles.workshopSpots}>{w.spots}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.memberPerks}>
            <div className={styles.perksLeft}>
              <h3>Member Benefits</h3>
              <ul>
                <li>Monthly cupping sessions reserved for members</li>
                <li>Early access to limited micro-lots before public release</li>
                <li>10% off all orders, every order, always</li>
                <li>Personalised monthly tasting notes & brew guide</li>
                <li>Access to members-only WhatsApp & Slack community</li>
              </ul>
            </div>
            <div className={styles.perksRight}>
              <p className={styles.perksPrice}>₹599<span>/month</span></p>
              <p className={styles.perksNote}>Cancel or pause anytime. No lock-in.</p>
              <button className="btn-gold">Become a Member</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <div className={styles.contactInfo} ref={r12}>
            <div className="eyebrow">Get In Touch</div>
            <h2 className={styles.contactTitle}>Let's Talk<br /><em>Coffee</em></h2>
            <p className={styles.contactBody}>
              Trade enquiries, wholesale orders, custom roasting for cafés and hotels — or just to say hello. We read and reply to every message personally.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactDetail}>
                <span>Email</span>
                <a href="mailto:hello@hebrew.coffee">hello@hebrew.coffee</a>
              </div>
              <div className={styles.contactDetail}>
                <span>Roastery & Tastings</span>
                <span>12 Indiranagar 12th Main, Bengaluru — 560 038</span>
              </div>
              <div className={styles.contactDetail}>
                <span>Phone</span>
                <a href="tel:+918012345678">+91 80 1234 5678</a>
              </div>
            </div>
            <div className={styles.contactIcons}>
              <a href="mailto:hello@hebrew.coffee" className={styles.contactIcon} aria-label="Email">
                <Mail size={16} strokeWidth={1.2} />
              </a>
              <a href="tel:+918012345678" className={styles.contactIcon} aria-label="Phone">
                <Phone size={16} strokeWidth={1.2} />
              </a>
            </div>
          </div>
          <form className={styles.contactForm} onSubmit={handleContact}>
            {sent ? (
              <div className={styles.sentMsg}>
                <div className={styles.sentCheck}>✓</div>
                <h3>Message received.</h3>
                <p>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className={styles.formRow}>
                  <input
                    className={styles.formInput}
                    placeholder="Your Name"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="Email Address"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <textarea
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  placeholder="Tell us what you're looking for — wholesale, custom roast, event catering, or your ideal Monday morning cup."
                  value={contactMsg}
                  onChange={e => setContactMsg(e.target.value)}
                  required
                />
                <button type="submit" className="btn-gold">Send Message <ArrowRight size={13} /></button>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
