import './SubscriptionModal.css';

function SubscriptionModal({ isOpen, onClose }) {
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

        <div className="coming-soon-message">
          <p>Email subscriptions coming soon.</p>
          <p className="coming-soon-note">Check back for daily AI insights delivered to your inbox.</p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;