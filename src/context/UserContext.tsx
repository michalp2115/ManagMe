// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { db } from "../db/Firebase";
import { collection, getDocs } from "firebase/firestore";

interface UserType {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  users: UserType[];
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as UserType[];
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  console.log("Current user:", context.user);
  return context;
};
