import { createContext, useState } from 'react';

interface NotificationContextType {
  message: string | null;
  hideNotification: () => void;
  showNotification: (message: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const hideNotification = () => setMessage(null);
  const showNotification = (message: string) => {
    setMessage(message);
    setTimeout(hideNotification, 3000);
  };

  return (
    <NotificationContext.Provider value={{ message, hideNotification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
};

export default NotificationProvider;
