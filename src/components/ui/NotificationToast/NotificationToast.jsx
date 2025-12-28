import { useEffect } from 'react';
import './NotificationToast.css';

function NotificationToast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible && message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onClose]);

  if (!isVisible || !message) return null;

  return (
    <div className="notification-toast">
      {message}
    </div>
  );
}

export default NotificationToast;