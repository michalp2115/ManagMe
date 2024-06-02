import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../db/Firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { UserStoryType } from '../types/types';

type UserStoryContextType = {
  userStories: UserStoryType[];
  addUserStory: (userStory: Omit<UserStoryType, 'id'>) => Promise<void>;
  updateUserStory: (userStory: UserStoryType) => Promise<void>;
  deleteUserStory: (id: string) => Promise<void>;
  fetchUserStories: () => Promise<void>;
};

const UserStoryContext = createContext<UserStoryContextType | undefined>(undefined);

export const UserStoryProvider = ({ children }: { children: ReactNode }) => {
  const [userStories, setUserStories] = useState<UserStoryType[]>([]);

  const fetchUserStories = async () => {
    const querySnapshot = await getDocs(collection(db, 'userStories'));
    const stories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as UserStoryType[];
    setUserStories(stories);
  };

  const addUserStory = async (userStory: Omit<UserStoryType, 'id'>) => {
    const docRef = await addDoc(collection(db, 'userStories'), userStory);
    setUserStories(prev => [...prev, { id: docRef.id, ...userStory }]);
  };

  const updateUserStory = async (userStory: UserStoryType) => {
    const docRef = doc(db, 'userStories', userStory.id);
    await updateDoc(docRef, userStory);
    setUserStories(prev =>
      prev.map(story => (story.id === userStory.id ? userStory : story))
    );
  };

  const deleteUserStory = async (id: string) => {
    await deleteDoc(doc(db, 'userStories', id));
    setUserStories(prev => prev.filter(story => story.id !== id));
  };

  useEffect(() => {
    fetchUserStories();
  }, []);

  return (
    <UserStoryContext.Provider
      value={{ userStories, addUserStory, updateUserStory, deleteUserStory, fetchUserStories }}
    >
      {children}
    </UserStoryContext.Provider>
  );
};

export const useUserStory = () => {
  const context = useContext(UserStoryContext);
  if (!context) {
    throw new Error('useUserStory must be used within a UserStoryProvider');
  }
  return context;
};
