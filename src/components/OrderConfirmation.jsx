import React, { useEffect } from 'react';
import { 
  CheckCircle, 
  Printer, 
  ShoppingBag, 
  Clock, 
  User, 
  Calendar, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Database,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmation({
  order,
  onShopAgain,
  onViewERD,
  language
}) {
  const isKhmer = language === 'km';
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="order-confirmation-empty">
        <p>{isKhmer ? 'មិនមានទិន្នន័យការបញ្ជាទិញនៅឡើយទេ' : 'No order details found.'}</p>
        <button className="btn-secondary" onClick={onShopAgain}>
          {isKhmer ? 'ត្រឡប់ទៅកាន់ហាង' : 'Go to Store'}
        </button>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-confirmation-page">
      {/* Main Invoice Card */}
      <div className="confirmation-card invoice-container">
        {/* Success Header Banner */}
        <div className="success-banner-box">
          <div className="success-icon-wrap">
            <CheckCircle size={44} className="success-icon" />
          </div>
          {/* Message: Order Placed Successfully! */}
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-khmer-sub">
            {isKhmer ? 'ការបញ្ជាទិញរបស់អ្នកត្រូវបានទទួល និងកំពុងរៀបចំដឹកជញ្ជូន។' : 'Thank you for your order! We have received your purchase request.'}
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="order-meta-grid">
          {/* Order ID */}
          <div className="meta-box">
            <span className="meta-label">Order ID</span>
            <div className="meta-value-row">
              <span className="order-id-highlight">{order.orderId}</span>
              <button 
                type="button" 
                className="btn-copy-id no-print" 
                onClick={handleCopyOrderId}
                title="Copy Order ID"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Customer Name */}
          <div className="meta-box">
            <span className="meta-label">Customer Name</span>
            <div className="meta-value-text">
              <User size={16} />
              <strong>{order.customerName}</strong>
            </div>
          </div>

          {/* Order Date */}
          <div className="meta-box">
            <span className="meta-label">Order Date</span>
            <div className="meta-value-text">
              <Calendar size={16} />
              <span>{order.orderDate}</span>
            </div>
          </div>

          {/* Order Status: Pending */}
          <div className="meta-box">
            <span className="meta-label">Order Status</span>
            <div className="status-pill status-pending">
              <Clock size={14} />
              <span>{order.orderStatus}</span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="order-customer-details-card">
          <h3>{isKhmer ? 'ព័ត៌មានដឹកជញ្ជូន' : 'Delivery Information'}</h3>
          <div className="customer-info-columns">
            <div className="info-col">
              <div className="info-entry">
                <Mail size={15} />
                <span>{order.customerEmail}</span>
              </div>
              <div className="info-entry">
                <Phone size={15} />
                <span>{order.customerPhone}</span>
              </div>
            </div>
            <div className="info-col">
              <div className="info-entry">
                <MapPin size={15} />
                <span>{order.customerAddress}</span>
              </div>
              <div className="info-entry">
                <Truck size={15} />
                <span>{order.shippingMethod} ({order.shippingFee === 0 ? 'Free' : `$${order.shippingFee.toFixed(2)}`})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Products Table */}
        <div className="ordered-products-section">
          <h3>{isKhmer ? 'មុខទំនិញដែលបានកុម្ម៉ង់' : 'Ordered Products'}</h3>
          <table className="confirmation-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th style={{ textAlign: 'center' }}>Unit Price</th>
                <th style={{ textAlign: 'center' }}>QTY</th>
                <th style={{ textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderedProducts.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td className="product-cell">
                    <img src={item.image} alt={item.name} className="product-table-thumb" />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="khmer-item-name">{item.khmerName}</div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>${item.price.toFixed(2)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="qty-tag">× {item.quantity}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '600' }}>
                    ${item.subtotal.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="confirmation-totals-box">
          <div className="totals-inner">
            <div className="total-line">
              <span>Items Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Shipping Fee ({order.shippingMethod}):</span>
              <span>${order.shippingFee.toFixed(2)}</span>
            </div>
            <div className="divider-line"></div>
            {/* Total Amount */}
            <div className="total-line grand-total-highlight">
              <span>Total Amount:</span>
              <span className="total-price">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="invoice-footer-note">
          <p>
            {isKhmer 
              ? 'សូមអរគុណសម្រាប់ការទិញទំនិញជាមួយ TechStore! យើងខ្ញុំនឹងទាក់ទងទៅកាន់លេខ ' + order.customerPhone + ' ដើម្បីបញ្ជាក់ការដឹកជញ្ជូន។'
              : `Thank you for shopping with TechStore! We will contact you at ${order.customerPhone} when the courier departs.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons no-print">
          <button className="btn-print" onClick={handlePrint}>
            <Printer size={18} />
            <span>{isKhmer ? 'បោះពុម្ពវិក្កយបត្រ' : 'Print Invoice'}</span>
          </button>

          <button className="btn-primary-large" onClick={onShopAgain}>
            <ShoppingBag size={18} />
            <span>{isKhmer ? 'បន្តការទិញទំនិញ' : 'Continue Shopping'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
