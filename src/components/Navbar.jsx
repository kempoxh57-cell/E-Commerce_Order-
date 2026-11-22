import React from 'react';
import { ShoppingBag, ShoppingCart, Globe } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, cartTotal, language, setLanguage, lastOrder }) {
  const isKhmer = language === 'km';

  return (
    <header className="navbar-header no-print">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('products')}>
          <div className="brand-icon">
            <ShoppingBag size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-title">TechStore</span>
            <span className="brand-subtitle">{isKhmer ? 'ហាងអេឡិចត្រូនិចទំនើប' : 'Premium Electronics'}</span>
          </div>
        </div>

        {/* Clean Website Navigation */}
        <nav className="navbar-nav">
          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="nav-label">{isKhmer ? 'ទំនិញទាំងអស់' : 'Store'}</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <span className="nav-label">{isKhmer ? 'កន្ត្រកទំនិញ' : 'Cart'}</span>
            {cartCount > 0 && (
              <span className="badge-pill">{cartCount}</span>
            )}
          </button>

          {cartCount > 0 && (
            <button
              className={`nav-btn ${activeTab === 'checkout' ? 'active' : ''}`}
              onClick={() => setActiveTab('checkout')}
            >
              <span className="nav-label">{isKhmer ? 'ទូទាត់ប្រាក់' : 'Checkout'}</span>
            </button>
          )}

          {lastOrder && (
            <button
              className={`nav-btn ${activeTab === 'confirmation' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmation')}
            >
              <span className="nav-label">{isKhmer ? 'វិក្កយបត្រថ្មីៗ' : 'My Order'}</span>
            </button>
          )}
        </nav>

        {/* Right side: Language & Cart button */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <button 
            className="lang-toggle-btn"
            onClick={() => setLanguage(lang => lang === 'km' ? 'en' : 'km')}
            title="Switch Language"
          >
            <Globe size={15} />
            <span>{isKhmer ? 'KM' : 'EN'}</span>
          </button>

          {/* Quick Cart button */}
          <button 
            className="quick-cart-btn"
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart size={18} />
            <div className="quick-cart-info">
              <span className="quick-cart-count">{cartCount} {isKhmer ? 'មុខ' : 'items'}</span>
              <span className="quick-cart-total">${cartTotal.toFixed(2)}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
