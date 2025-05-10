import React, { useEffect } from 'react';
import { FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import './Notification.css';

function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaExclamationTriangle />;
      default:
        return null;
    }
  };

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <div className="notification-icon">{getIcon()}</div>
        <div className="notification-message">{message}</div>
        <button className="notification-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default Notification; 