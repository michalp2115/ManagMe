// src/context/NotificationsContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../db/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from './UserContext';

interface NotificationType {
  id: string;
  message: string;
  isRead: boolean;
}

interface NotificationsContextType {
  notifications: NotificationType[];
  markAsRead: (id: string) => void;
  fetchNotifications: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useUser();

  const fetchNotifications = async () => {
    if (!user) return;

    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('userId', '==', user.id), where('priority', 'in', ['medium', 'high']));
    const querySnapshot = await getDocs(q);
    
    const fetchedNotifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      message: `Task with ID: ${doc.id} has ${doc.data().priority} priority`,
      isRead: false,
    }));

    setNotifications(fetchedNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification => (notification.id === id ? { ...notification, isRead: true } : notification))
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead, fetchNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
