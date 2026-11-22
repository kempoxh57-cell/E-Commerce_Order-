import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { INITIAL_PRODUCTS } from './data/products';
import './App.css';

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'cart' | 'checkout' | 'confirmation'
  const [lastOrder, setLastOrder] = useState(null);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [language, setLanguage] = useState('km'); // 'km' (Khmer) or 'en' (English)

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear all items
  const handleClearCart = () => {
    setCart([]);
  };

  // Handle Order Placement
  const handlePlaceOrder = (newOrder) => {
    setLastOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart after placing order
    setActiveTab('confirmation');
  };

  // Cart totals
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app-layout">
      {/* Clean Modern Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        cartTotal={cartTotal}
        language={language}
        setLanguage={setLanguage}
        lastOrder={lastOrder}
      />

      {/* Main Content Area */}
      <main className="main-content-wrapper">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onNavigateToCart={() => setActiveTab('cart')}
            language={language}
          />
        )}

        {activeTab === 'cart' && (
          <ShoppingCart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setActiveTab('checkout')}
            onContinueShopping={() => setActiveTab('products')}
            language={language}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            cart={cart}
            onBackToCart={() => setActiveTab('cart')}
            onPlaceOrder={handlePlaceOrder}
            orderCount={ordersHistory.length}
            language={language}
          />
        )}

        {activeTab === 'confirmation' && (
          <OrderConfirmation
            order={lastOrder}
            onShopAgain={() => setActiveTab('products')}
            language={language}
          />
        )}
      </main>

      {/* Professional Footer */}
      <footer className="app-footer no-print">
        <div className="footer-container">
          <div className="footer-left">
            <strong>TechStore</strong> &copy; {new Date().getFullYear()} &bull; {language === 'km' ? 'ហាងលក់ឧបករណ៍អេឡិចត្រូនិចទំនើប' : 'All Rights Reserved'}
          </div>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setActiveTab('products')}>
              {language === 'km' ? 'ទំនិញ' : 'Products'}
            </button>
            <button className="footer-link-btn" onClick={() => setActiveTab('cart')}>
              {language === 'km' ? 'កន្ត្រកទំនិញ' : 'Cart'} ({cartCount})
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
