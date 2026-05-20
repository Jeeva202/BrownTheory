import { ThemeProvider } from './ThemeContext';
import { AppProvider, useApp } from './AppContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Origins from './pages/Origins';
import Journal from './pages/Journal';
import Checkout from './pages/Checkout';

function PageContent() {
  const { page } = useApp();
  return (
    <>
      <Nav />
      {page === 'home' && <Home />}
      {page === 'shop' && <Shop />}
      {page === 'product' && <ProductDetail />}
      {page === 'origins' && <Origins />}
      {page === 'journal' && <Journal />}
      {page === 'checkout' && <Checkout />}
      {page !== 'checkout' && <Footer />}
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <PageContent />
      </AppProvider>
    </ThemeProvider>
  );
}
