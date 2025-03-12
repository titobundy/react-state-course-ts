import React from 'react';
import useNotification from '../hooks/useNotification';

const NotificationButton: React.FC = () => {
  const { showNotification } = useNotification();
  return (
    <button
      onClick={() =>
        showNotification('✅ ¡Tu transacción se ha realizado con éxito!')
      }
    >
      Confirmar Transacción
    </button>
  );
};

export default NotificationButton;
