import { useState } from 'react';
import './SubscriptionModal.css';

function SubscriptionModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail('');
    }, 2000);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="subscription-modal-backdrop" onClick={handleBackdropClick}>
      <div className="subscription-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">Subscribe to LTAI Daily News</h2>
          <p className="modal-subtitle">Get daily AI insights delivered to your inbox</p>
        </div>

        {isSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>Thanks for subscribing! Check your email to confirm.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="subscription-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="email-input"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            <p className="privacy-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default SubscriptionModal;