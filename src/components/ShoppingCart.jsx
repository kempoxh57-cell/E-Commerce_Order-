import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingCart as CartIcon, ShieldCheck } from 'lucide-react';

export default function ShoppingCart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  language
}) {
  const isKhmer = language === 'km';

  // Calculate Subtotal and Grand Total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = subtotal;

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="empty-cart-card">
          <div className="empty-icon-circle">
            <CartIcon size={44} className="empty-icon" />
          </div>
          <h2>{isKhmer ? 'កន្ត្រកទំនិញរបស់អ្នកនៅទទេ' : 'Your Shopping Cart is Empty'}</h2>
          <p>
            {isKhmer 
              ? 'សូមចូលទៅកាន់ហាងដើម្បីជ្រើសរើសទំនិញដាក់ចូលកន្ត្រករបស់អ្នក។'
              : 'Looks like you have not added any items to your shopping cart yet.'}
          </p>
          <button className="btn-primary-large" onClick={onContinueShopping}>
            <ArrowLeft size={18} />
            <span>{isKhmer ? 'បន្តការទិញទំនិញ' : 'Browse Products'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-page">
      {/* Header */}
      <div className="cart-page-header">
        <div>
          <h1>{isKhmer ? 'កន្ត្រកទំនិញរបស់អ្នក' : 'Your Shopping Cart'}</h1>
          <p className="text-muted">
            {isKhmer 
              ? `អ្នកមាន ${totalItemsCount} មុខទំនិញក្នុងកន្ត្រក` 
              : `You have ${totalItemsCount} item(s) in your cart`}
          </p>
        </div>

        <button className="btn-clear-cart" onClick={onClearCart} title="Clear cart">
          <Trash2 size={15} />
          <span>{isKhmer ? 'សម្អាតកន្ត្រក' : 'Clear All'}</span>
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Left Side: Items Table */}
        <div className="cart-items-section">
          <div className="cart-items-card">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>{isKhmer ? 'ផលិតផល' : 'Product'}</th>
                  <th>{isKhmer ? 'តម្លៃឯកតា' : 'Unit Price'}</th>
                  <th style={{ textAlign: 'center' }}>{isKhmer ? 'ចំនួន' : 'Qty'}</th>
                  <th style={{ textAlign: 'right' }}>{isKhmer ? 'សរុប' : 'Subtotal'}</th>
                  <th style={{ textAlign: 'center' }}>{isKhmer ? 'លុប' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const lineTotal = item.price * item.quantity;

                  return (
                    <tr key={item.id} className="cart-row">
                      {/* Product details */}
                      <td className="product-col">
                        <img src={item.image} alt={item.name} className="cart-thumb" />
                        <div className="product-meta">
                          <strong className="product-name">
                            {isKhmer ? item.khmerName : item.name}
                          </strong>
                          <span className="product-cat">
                            {isKhmer ? item.khmerCategory : item.category}
                          </span>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="unit-price-col">
                        ${item.price.toFixed(2)}
                      </td>

                      {/* Update QTY controls */}
                      <td className="qty-col">
                        <div className="qty-control-box">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            title="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val >= 1) {
                                onUpdateQuantity(item.id, val);
                              }
                            }}
                            className="qty-input"
                          />

                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="line-total-col">
                        <strong>${lineTotal.toFixed(2)}</strong>
                      </td>

                      {/* Remove item button */}
                      <td className="action-col">
                        <button
                          type="button"
                          className="btn-remove-item"
                          onClick={() => onRemoveItem(item.id)}
                          title={isKhmer ? 'លុបទំនិញនេះ' : 'Remove item'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-table-footer-actions">
            <button className="btn-secondary" onClick={onContinueShopping}>
              <ArrowLeft size={16} />
              <span>{isKhmer ? 'បន្តការទិញទំនិញ' : 'Continue Shopping'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h2 className="summary-title">{isKhmer ? 'សង្ខេបតម្លៃ' : 'Order Summary'}</h2>
            
            <div className="summary-rows">
              <div className="summary-row">
                <span className="label">{isKhmer ? 'ចំនួនទំនិញ:' : 'Total Items:'}</span>
                <span className="val">{totalItemsCount}</span>
              </div>

              <div className="summary-row">
                <span className="label">{isKhmer ? 'តម្លៃទំនិញសរុប:' : 'Subtotal:'}</span>
                <span className="val">${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="label">{isKhmer ? 'ថ្លៃដឹកជញ្ជូន:' : 'Shipping:'}</span>
                <span className="val text-muted">{isKhmer ? 'គិតនៅជំហានបន្ទាប់' : 'Calculated at checkout'}</span>
              </div>

              <div className="divider-line"></div>

              {/* Grand Total */}
              <div className="summary-row grand-total-row">
                <span className="grand-label">{isKhmer ? 'តម្លៃសរុប:' : 'Total:'}</span>
                <span className="grand-amount">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* BTN Proceed to Checkout */}
            <button 
              className="btn-proceed-checkout"
              onClick={onProceedToCheckout}
            >
              <span>{isKhmer ? 'បន្តទៅកាន់ការទូទាត់' : 'Proceed to Checkout'}</span>
              <ArrowRight size={18} />
            </button>

            <div className="security-notice">
              <ShieldCheck size={16} className="text-success" />
              <span>{isKhmer ? 'ការទូទាត់មានសុវត្ថិភាព ១០០%' : '100% Safe & Secure Checkout'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
