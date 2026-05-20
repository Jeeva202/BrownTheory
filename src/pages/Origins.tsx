import { useState } from 'react';
import { origins, products } from '../data/data';
import { useApp } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { MapPin, Mountain, Calendar, Leaf } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Origins.module.css';

const LeafletMapContainer = MapContainer as any;
const LeafletTileLayer = TileLayer as any;
const LeafletCircleMarker = CircleMarker as any;
const LeafletTooltip = Tooltip as any;

const ORIGIN_COORDS: Record<string, [number, number]> = {
  ethiopia: [9.145, 40.4897],
  colombia: [4.5709, -74.2973],
  brazil: [-14.235, -51.9253],
  india: [20.5937, 78.9629],
};

export default function Origins() {
  const { navigate } = useApp();
  const { theme } = useTheme();
  const [selectedOrigin, setSelectedOrigin] = useState(origins[0]);

  const originProducts = products.filter(p => selectedOrigin.products.includes(p.id));
  const tileUrl = theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className="eyebrow">Provenance</div>
          <h1 className={styles.heroTitle}>
            Rooted in<br /><em>Remarkable</em><br />Places
          </h1>
          <p className={styles.heroBody}>
            From Ethiopia's ancient forests to India's monsoon-kissed hillsides, every bean
            carries the memory of its landscape. We work directly with farmers who share
            our obsession with quality.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapWrap}>
          <div className={styles.mapContainer}>
            <div className={styles.mapViewport}>
              <LeafletMapContainer
                center={[12, 10]}
                zoom={2}
                minZoom={2}
                maxZoom={5}
                scrollWheelZoom={false}
                worldCopyJump
                className={styles.realMap}
              >
                <LeafletTileLayer
                  url={tileUrl}
                  attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                />
                {origins.map(o => {
                  const pos = ORIGIN_COORDS[o.id] ?? [0, 0];
                  const active = selectedOrigin.id === o.id;
                  return (
                    <LeafletCircleMarker
                      key={o.id}
                      center={pos}
                      radius={active ? 9 : 7}
                      pathOptions={{
                        color: active ? '#E8D5A3' : '#C9A96E',
                        fillColor: active ? '#E8D5A3' : '#C9A96E',
                        fillOpacity: active ? 0.95 : 0.8,
                        weight: active ? 2 : 1,
                      }}
                      eventHandlers={{ click: () => setSelectedOrigin(o) }}
                    >
                      <LeafletTooltip direction="top" offset={[0, -8]}>
                        {o.country}
                      </LeafletTooltip>
                    </LeafletCircleMarker>
                  );
                })}
              </LeafletMapContainer>
            </div>
          </div>

          {/* Detail Panel */}
          <div className={styles.detailPanel}>
            <div className={styles.panelHeader}>
              <img src={selectedOrigin.image} alt={selectedOrigin.country} />
              <div className={styles.panelHeaderOv} />
              <div className={styles.panelHeaderText}>
                <p className={styles.panelEye}>Origin</p>
                <h2 className={styles.panelCountry}>{selectedOrigin.country}</h2>
                <p className={styles.panelRegion}>{selectedOrigin.region}</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <p className={styles.panelDesc}>{selectedOrigin.description}</p>
              <div className={styles.panelStats}>
                <div className={styles.stat}>
                  <Mountain size={14} strokeWidth={1.5} color="var(--gold)" />
                  <div>
                    <span className={styles.statLabel}>Altitude</span>
                    <span className={styles.statVal}>{selectedOrigin.altitude}</span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <Calendar size={14} strokeWidth={1.5} color="var(--gold)" />
                  <div>
                    <span className={styles.statLabel}>Harvest</span>
                    <span className={styles.statVal}>{selectedOrigin.harvest}</span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <Leaf size={14} strokeWidth={1.5} color="var(--gold)" />
                  <div>
                    <span className={styles.statLabel}>Variety</span>
                    <span className={styles.statVal}>{selectedOrigin.variety}</span>
                  </div>
                </div>
              </div>
              <div className={styles.panelProds}>
                <p className={styles.prodLabel}>Available Lots</p>
                {originProducts.map(p => (
                  <div key={p.id} className={styles.prodItem} onClick={() => navigate('product', p)}>
                    <span className={styles.prodItemName}>{p.name}</span>
                    <span className={styles.prodItemPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Cards */}
      <section className={styles.cards}>
        <div className={styles.cardsGrid}>
          {origins.map(o => (
            <div key={o.id} className={`${styles.originCard} ${selectedOrigin.id === o.id ? styles.cardActive : ''}`}
              onClick={() => setSelectedOrigin(o)}>
              <div className={styles.cardImg}>
                <img src={o.image} alt={o.country} loading="lazy" />
                <div className={styles.cardImgOv} />
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardRegion}><MapPin size={11} strokeWidth={1.5} />{o.region}</p>
                <h3 className={styles.cardCountry}>{o.country}</h3>
                <p className={styles.cardFlavors}>{o.variety}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
