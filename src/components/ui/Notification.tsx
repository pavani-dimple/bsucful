import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotification, NotificationType } from '../../contexts/NotificationContext';

interface NotificationProps {
  id: string;
  type: NotificationType;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ id, type, message }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-error-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-warning-500" />;
      case 'info':
        return <Info size={20} className="text-primary-500" />;
      default:
        return <Info size={20} className="text-primary-500" />;
    }
  };

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      case 'info':
        return 'toast-info';
      default:
        return 'toast-info';
    }
  };

  return (
    <div className={`toast ${getToastClass()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={() => removeNotification(id)}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;