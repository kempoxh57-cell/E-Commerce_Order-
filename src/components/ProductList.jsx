import React, { useState } from 'react';
import { ShoppingCart, Check, Star, Laptop, Mouse, Keyboard, Monitor, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ProductList({ products, cart, onAddToCart, onNavigateToCart, language }) {
  const [justAddedId, setJustAddedId] = useState(null);
  const isKhmer = language === 'km';

  const handleAdd = (product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  const getProductIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'laptop':
        return <Laptop size={16} />;
      case 'mouse':
        return <Mouse size={16} />;
      case 'keyboard':
        return <Keyboard size={16} />;
      case 'monitor':
        return <Monitor size={16} />;
      default:
        return <ShoppingCart size={16} />;
    }
  };

  const totalInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="product-list-view">
      {/* Real E-Commerce Hero Banner */}
      <div className="store-hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={15} />
            <span>{isKhmer ? 'ផលិតផលគុណភាពខ្ពស់' : 'Featured Collection'}</span>
          </div>
          <h1>{isKhmer ? 'ឧបករណ៍អេឡិចត្រូនិចទំនើបសម្រាប់អ្នក' : 'Upgrade Your Workspace Setup'}</h1>
          <p className="hero-desc">
            {isKhmer 
              ? 'ជ្រើសរើសទំនិញដែលមានគុណភាពខ្ពស់៖ កុំព្យូទ័រយួរដៃ Laptop, អេក្រង់កុំព្យូទ័រ Monitor, ក្តារចុច Keyboard, និងកណ្ដុរ Mouse ជាមួយនឹងតម្លៃសមរម្យ។' 
              : 'Discover premium computing hardware, ergonomic peripherals, and high-resolution displays.'}
          </p>
        </div>
      </div>

      {/* Grid of 4 Products */}
      <div className="products-grid">
        {products.map((product) => {
          const cartItem = cart.find(item => item.id === product.id);
          const inCartQty = cartItem ? cartItem.quantity : 0;
          const isJustAdded = justAddedId === product.id;

          return (
            <div key={product.id} className="product-card">
              {/* Product Badge */}
              <div className="card-top-badges">
                <span className="category-tag">
                  {getProductIcon(product.name)}
                  <span>{isKhmer ? product.khmerCategory : product.category}</span>
                </span>
                {inCartQty > 0 && (
                  <span className="in-cart-indicator">
                    {inCartQty} {isKhmer ? 'ក្នុងកន្ត្រក' : 'in cart'}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="product-image-wrap">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-img"
                  loading="lazy"
                />
                <div className="price-tag-overlay">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Product Body */}
              <div className="product-body">
                <div className="rating-row">
                  <div className="stars">
                    <Star size={14} className="star-filled" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="reviews-count">({product.reviews} {isKhmer ? 'ការវាយតម្លៃ' : 'reviews'})</span>
                  <span className="stock-label">
                    {isKhmer ? `នៅសល់ ${product.stock}` : `${product.stock} in stock`}
                  </span>
                </div>

                <h3 className="product-title">
                  {isKhmer ? product.khmerName : product.name}
                </h3>
                <p className="product-description">
                  {product.description}
                </p>

                {/* Price and Add to Cart Button */}
                <div className="card-footer-row">
                  <div className="price-box">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{product.price}</span>
                    <span className="price-cents">.00</span>
                  </div>

                  <button
                    className={`btn-add-to-cart ${isJustAdded ? 'added' : ''}`}
                    onClick={() => handleAdd(product)}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={18} />
                        <span>{isKhmer ? 'បានបញ្ចូល!' : 'Added!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Prompt Bar if items in cart */}
      {totalInCart > 0 && (
        <div className="cart-floating-prompt">
          <div className="prompt-left">
            <span className="prompt-icon">🛒</span>
            <div>
              <strong>{totalInCart} {isKhmer ? 'មុខទំនិញក្នុងកន្ត្រក' : 'item(s) in your cart'}</strong>
              <p>{isKhmer ? 'រួចរាល់ដើម្បីពិនិត្យតម្លៃ និងទូទាត់ប្រាក់' : 'Ready to checkout your items'}</p>
            </div>
          </div>
          <button className="btn-go-to-cart" onClick={onNavigateToCart}>
            <span>{isKhmer ? 'មើលកន្ត្រកទំនិញ' : 'View Cart'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
