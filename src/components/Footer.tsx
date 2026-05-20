import { useApp } from '../AppContext';
import { Share2, Globe, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className={styles.footer}>
      <div className={styles.wordmark}>Brown Theory</div>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>Brown <span>Theory</span></div>
            <p className={styles.tagline}>
              Luxury single-origin coffee, roasted with intention.<br />
              Every cup, a provenance story.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socBtn} aria-label="Instagram"><Share2 size={13} strokeWidth={1.5} /></a>
              <a href="#" className={styles.socBtn} aria-label="Twitter"><Globe size={13} strokeWidth={1.5} /></a>
              <a href="#" className={styles.socBtn} aria-label="Email"><Mail size={13} strokeWidth={1.5} /></a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Collection</h4>
            <ul>
              <li><button onClick={() => navigate('shop')}>Signature Blends</button></li>
              <li><button onClick={() => navigate('shop')}>Single Origins</button></li>
              <li><button onClick={() => navigate('shop')}>Seasonal Lots</button></li>
              <li><button onClick={() => navigate('shop')}>Subscription</button></li>
              <li><button onClick={() => navigate('shop')}>Gift Sets</button></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Craft</h4>
            <ul>
              <li><button>Our Roastery</button></li>
              <li><button onClick={() => navigate('origins')}>Farm Partners</button></li>
              <li><button>Brewing Guides</button></li>
              <li><button onClick={() => navigate('journal')}>The Journal</button></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@hebrew.coffee">hello@hebrew.coffee</a></li>
              <li><span>Bengaluru, India</span></li>
              <li><button>Trade Enquiries</button></li>
              <li><button>Press</button></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Brown Theory Coffee Co. All rights reserved.</span>
          <div className={styles.legal}>
            <button>Privacy</button>
            <button>Terms</button>
            <button>Shipping Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
