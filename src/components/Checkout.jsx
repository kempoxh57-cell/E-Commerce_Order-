import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { SHIPPING_METHODS } from '../data/products';

export default function Checkout({
  cart,
  onBackToCart,
  onPlaceOrder,
  orderCount,
  language
}) {
  const isKhmer = language === 'km';

  // Customer Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Phnom Penh',
    notes: ''
  });

  // Selected Shipping Method
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_METHODS[0].id);

  // Field validation error states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currentShipping = SHIPPING_METHODS.find(s => s.id === selectedShipping) || SHIPPING_METHODS[0];
  const shippingFee = currentShipping.price;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate Required Fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = isKhmer ? 'សូមបញ្ចូលនាមខ្លួន' : 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = isKhmer ? 'សូមបញ្ចូលនាមត្រកូល' : 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = isKhmer ? 'សូមបញ្ចូលអ៊ីមែល' : 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isKhmer ? 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវទេ' : 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isKhmer ? 'សូមបញ្ចូលលេខទូរស័ព្ទ' : 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = isKhmer ? 'លេខទូរស័ព្ទត្រូវមានយ៉ាងតិច ៨ ខ្ទង់' : 'Phone must be at least 8 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = isKhmer ? 'សូមបញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន' : 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place Order Button handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const nextOrderNumber = String(orderCount + 1).padStart(4, '0');
    const newOrder = {
      orderId: `ORD-${nextOrderNumber}`,
      customerName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: `${formData.address.trim()}${formData.city ? ', ' + formData.city : ''}`,
      orderDate: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      orderedProducts: cart.map(item => ({
        id: item.id,
        name: item.name,
        khmerName: item.khmerName,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        image: item.image
      })),
      shippingMethod: currentShipping.name,
      khmerShippingMethod: currentShipping.khmerName,
      shippingFee: shippingFee,
      subtotal: subtotal,
      totalAmount: grandTotal,
      orderStatus: 'Pending',
      paymentMethod: 'Cash on Delivery (COD)'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(newOrder);
    }, 600);
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-page-header">
        <button className="btn-back-text" onClick={onBackToCart}>
          <ArrowLeft size={16} />
          <span>{isKhmer ? 'ត្រឡប់ទៅកន្ត្រក' : 'Back to Cart'}</span>
        </button>
        <div className="checkout-title-wrap">
          <h1>{isKhmer ? 'ការទូទាត់ និងដឹកជញ្ជូន' : 'Checkout & Shipping'}</h1>
          <p className="text-muted">
            {isKhmer 
              ? 'សូមបំពេញព័ត៌មានខាងក្រោមដើម្បីបញ្ចប់ការបញ្ជាទិញរបស់អ្នក'
              : 'Please enter your shipping address and choose your delivery speed.'}
          </p>
        </div>
      </div>

      <div className="checkout-layout-grid">
        {/* Left Side: Checkout Form */}
        <div className="checkout-form-section">
          <form onSubmit={handlePlaceOrder} noValidate>
            {/* Customer Information Card */}
            <div className="checkout-card">
              <div className="card-section-header">
                <span className="step-number">1</span>
                <div>
                  <h2>{isKhmer ? 'ព័ត៌មានអតិថិជន' : 'Customer Contact & Shipping'}</h2>
                  <p className="section-subtext">{isKhmer ? 'ព័ត៌មានសម្រាប់ទំនាក់ទំនងដឹកជញ្ជូន' : 'Where should we send your order?'}</p>
                </div>
              </div>

              <div className="form-fields-grid">
                {/* 1. First Name */}
                <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
                  <label htmlFor="firstName">
                    {isKhmer ? 'នាមខ្លួន' : 'First Name'} <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Sokha"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.firstName && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>

                {/* 2. Last Name */}
                <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
                  <label htmlFor="lastName">
                    {isKhmer ? 'នាមត្រកូល' : 'Last Name'} <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Meng"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.lastName && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.lastName}</span>
                    </div>
                  )}
                </div>

                {/* 3. Email */}
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">
                    {isKhmer ? 'អ៊ីមែល' : 'Email Address'} <span className="req-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.email && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* 4. Phone Number */}
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone">
                    {isKhmer ? 'លេខទូរស័ព្ទ' : 'Phone Number'} <span className="req-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="012 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.phone && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* 5. Address */}
                <div className={`form-group full-width ${errors.address ? 'has-error' : ''}`}>
                  <label htmlFor="address">
                    {isKhmer ? 'អាសយដ្ឋានដឹកជញ្ជូន' : 'Street Address'} <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    placeholder={isKhmer ? 'ផ្ទះលេខ..., ផ្លូវ..., សង្កាត់..., រាជធានីភ្នំពេញ' : 'Street name, house number, Khan, Phnom Penh...'}
                    value={formData.address}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                  {errors.address && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 7. Shipping Method */}
            <div className="checkout-card mt-4">
              <div className="card-section-header">
                <span className="step-number">2</span>
                <div>
                  <h2>{isKhmer ? 'ជម្រើសដឹកជញ្ជូន' : 'Shipping Method'}</h2>
                  <p className="section-subtext">{isKhmer ? 'ជ្រើសរើសល្បឿនដឹកជញ្ជូនដែលអ្នកពេញចិត្ត' : 'Select your delivery speed'}</p>
                </div>
              </div>

              <div className="shipping-options-list">
                {SHIPPING_METHODS.map((method) => {
                  const isSelected = selectedShipping === method.id;
                  return (
                    <label 
                      key={method.id} 
                      className={`shipping-option-card ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setSelectedShipping(method.id)}
                        className="shipping-radio"
                      />
                      <div className="shipping-info">
                        <div className="shipping-title-row">
                          <strong className="shipping-name">
                            {isKhmer ? method.khmerName : method.name}
                          </strong>
                          <span className="shipping-price-pill">
                            {method.price === 0 ? (isKhmer ? 'ឥតគិតថ្លៃ' : 'FREE') : `$${method.price.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="shipping-subtext">
                          <Truck size={14} />
                          <span>{method.time}</span> • <span>{method.description}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 10. Place Order Button */}
            <div className="place-order-card">
              <div className="guarantee-row">
                <ShieldCheck size={18} className="text-success" />
                <span>{isKhmer ? 'ការទូទាត់ប្រាក់ពេលទំនិញមកដល់ (Cash on Delivery)' : 'Payment on Delivery Available'}</span>
              </div>
              <button 
                type="submit" 
                className="btn-place-order"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>{isKhmer ? 'កំពុងដំណើរការ...' : 'Placing Order...'}</span>
                ) : (
                  <>
                    <CreditCard size={18} />
                    <span>{isKhmer ? 'បញ្ជាក់ការបញ្ជាទិញ' : 'Place Order'} • ${grandTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="checkout-summary-section">
          <div className="summary-card sticky-summary">
            <h2 className="summary-title">{isKhmer ? 'សង្ខេបបញ្ជីទំនិញ' : 'Order Summary'}</h2>
            
            {/* List of ordered products preview */}
            <div className="checkout-items-preview">
              {cart.map(item => (
                <div key={item.id} className="preview-item-row">
                  <div className="preview-item-left">
                    <img src={item.image} alt={item.name} className="preview-thumb" />
                    <div>
                      <div className="preview-item-title">{isKhmer ? item.khmerName : item.name}</div>
                      <div className="preview-item-qty">Qty: {item.quantity} × ${item.price}</div>
                    </div>
                  </div>
                  <div className="preview-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider-line"></div>

            {/* Financial breakdown */}
            <div className="summary-rows">
              <div className="summary-row">
                <span className="label">{isKhmer ? 'តម្លៃទំនិញ:' : 'Items Subtotal:'}</span>
                <span className="val">${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="label">{isKhmer ? 'ថ្លៃដឹកជញ្ជូន:' : 'Shipping:'}</span>
                <span className="val">
                  {shippingFee === 0 ? (isKhmer ? 'ឥតគិតថ្លៃ' : 'Free ($0.00)') : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="shipping-selected-hint">
                <span>{isKhmer ? currentShipping.khmerName : currentShipping.name}</span>
              </div>

              <div className="divider-line"></div>

              {/* Grand Total */}
              <div className="summary-row grand-total-row">
                <span className="grand-label">{isKhmer ? 'តម្លៃសរុប:' : 'Total:'}</span>
                <span className="grand-amount">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
