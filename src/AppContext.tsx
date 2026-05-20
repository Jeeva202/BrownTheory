import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CartItem, Product, Page } from './types';
import { products } from './data/data';

interface AppContextType {
  page: Page;
  navigate: (p: Page, payload?: unknown) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, grind: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, delta: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  selectedProduct: Product | null;
  cartCount: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

function findProductById(id?: string): Product | null {
  if (!id) return null;
  return products.find(p => p.id === id) ?? null;
}

function parseRoute(pathname: string): { page: Page; productId?: string } {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { page: 'home' };
  if (path === '/shop') return { page: 'shop' };
  if (path === '/origins') return { page: 'origins' };
  if (path === '/journal') return { page: 'journal' };
  if (path === '/checkout') return { page: 'checkout' };

  if (path.startsWith('/product/')) {
    const id = decodeURIComponent(path.split('/')[2] ?? '');
    return { page: 'product', productId: id };
  }

  return { page: 'home' };
}

function pageToPath(page: Page, product?: Product | null): string {
  if (page === 'home') return '/';
  if (page === 'shop') return '/shop';
  if (page === 'origins') return '/origins';
  if (page === 'journal') return '/journal';
  if (page === 'checkout') return '/checkout';
  if (page === 'product' && product?.id) return `/product/${encodeURIComponent(product.id)}`;
  return '/shop';
}

function isProductPayload(payload: unknown): payload is Product {
  return !!payload && typeof payload === 'object' && 'id' in payload;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const initialRoute = parseRoute(window.location.pathname);
  const initialProduct = findProductById(initialRoute.productId);

  const [page, setPage] = useState<Page>(initialRoute.page === 'product' && !initialProduct ? 'shop' : initialRoute.page);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct);

  useEffect(() => {
    const onPopState = () => {
      const route = parseRoute(window.location.pathname);
      if (route.page === 'product') {
        const matched = findProductById(route.productId);
        setSelectedProduct(matched);
        setPage(matched ? 'product' : 'shop');
        return;
      }
      setPage(route.page);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (p: Page, payload?: unknown) => {
    let nextPage = p;
    let nextSelectedProduct = selectedProduct;

    if (p === 'product') {
      if (isProductPayload(payload)) {
        nextSelectedProduct = payload;
        setSelectedProduct(payload);
      } else if (!selectedProduct) {
        nextPage = 'shop';
      }
    }

    const nextPath = pageToPath(nextPage, nextSelectedProduct);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, grind: string, qty = 1) => {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.selectedSize}` === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty, selectedSize: size, selectedGrind: grind }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) =>
    setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === size)));

  const updateQty = (id: string, size: string, delta: number) =>
    setCart(prev => prev
      .map(i => i.id === id && i.selectedSize === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{ page, navigate, cart, addToCart, removeFromCart, updateQty, cartOpen, setCartOpen, selectedProduct, cartCount, cartTotal }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
