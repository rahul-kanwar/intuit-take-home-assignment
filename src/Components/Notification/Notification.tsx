import React, { useEffect } from 'react';

import { NotificationContainer } from './Notification.style';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <NotificationContainer>{message}</NotificationContainer>;
};

export default Notification;
