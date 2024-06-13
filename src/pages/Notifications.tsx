import React from 'react';
import { useNotifications } from '../context/NotificationsContext';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li
            key={notification.id}
            className={`p-2 mb-2 ${notification.isRead ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-400'} rounded`}
            onClick={() => markAsRead(notification.id)}
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
