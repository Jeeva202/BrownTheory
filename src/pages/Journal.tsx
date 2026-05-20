import { journal } from '../data/data';
import styles from './Journal.module.css';

export default function Journal() {
  const featured = journal.find(j => j.featured)!;
  const rest = journal.filter(j => !j.featured);
  const fallbackImage = (seed: string) => `https://picsum.photos/seed/${seed}/1600/900`;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="eyebrow">The Brown Theory Journal</div>
        <h1 className={styles.title}>The <em>Field</em><br />Dispatch</h1>
        <p className={styles.issue}>Volume I · 2026</p>
      </div>

      {/* Featured article */}
      <div className={styles.featured}>
        <div className={styles.featMainCard}>
          <div className={styles.featImg}>
            <img
              src={featured.image}
              alt={featured.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage(`featured-${featured.id}`);
              }}
            />
            <div className={styles.featOv} />
            <div className={styles.featInfo}>
              <span className={styles.featCat}>{featured.category}</span>
              <h2 className={styles.featTitle}>{featured.title}</h2>
              <p className={styles.featExcerpt}>{featured.excerpt}</p>
              <span className={styles.featMeta}>{featured.author} · {featured.date} · {featured.readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {rest.map(post => (
          <div key={post.id} className={styles.card}>
            <div className={styles.cardImg}>
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImage(`post-${post.id}`);
                }}
              />
              <div className={styles.cardOv} />
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardCat}>{post.category}</span>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{post.author}</span>
                <span>{post.date} · {post.readTime} read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
