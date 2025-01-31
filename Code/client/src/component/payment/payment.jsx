import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './payment.css';
import TotalView, { totalPrice } from '../cart/TotalView';
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalAmount = totalPrice } = location.state || {};
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });
  const [cardType, setCardType] = useState('');

  const detectCardType = (number) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'cardNumber':
        formattedValue = value
          .replace(/\D/g, '')
          .slice(0, 16)
          .replace(/(\d{4})/g, '$1 ')
          .trim();
        if (value.length <= 16) {
          setCardType(detectCardType(value));
        }
        break;
      case 'expiry':
        formattedValue = value
          .replace(/\D/g, '')
          .slice(0, 4)
          .replace(/(\d{2})(\d{2})/, '$1/$2');
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 3);
        break;
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/paymentdecision');
    }
  };

  const validateForm = () => {
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    if (!formData.cardHolder) {
      alert('Please enter the cardholder name');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (formData.cvv.length !== 3) {
      alert('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  return (
    <div className="payment-container">
      <div className="card-container">
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card-type">
              {cardType && (
                <img 
                  src={`/card-types/${cardType}.png`} 
                  alt={cardType} 
                  className="card-logo"
                />
              )}
            </div>
            <div className="card-number">
              {formData.cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className="card-info">
              <div className="card-holder">
                <span>Card Holder</span>
                <div>{formData.cardHolder || 'FULL NAME'}</div>
              </div>
              <div className="card-expiry">
                <span>Expires</span>
                <div>{formData.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>
          <div className="card-back">
            <div className="magnetic-strip"></div>
            <div className="cvv-container">
              <div className="cvv-label">CVV</div>
              <div className="cvv-band">
                <div className="cvv">{formData.cvv || '•••'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        
        <div className="form-group">
          <label>Card Holder</label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
            />
          </div>
          
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Pay ₹{totalAmount}
        </button>
      </form>
    </div>
  );
};

export default Payment;

