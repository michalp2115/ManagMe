import React, { createContext, useContext, useState, ReactNode } from "react";
import { TaskType } from "../types/types";
import { db } from "../db/Firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";

interface TaskContextType {
  tasks: TaskType[];
  fetchTasks: (userStoryId: string) => void;
  addTask: (task: Omit<TaskType, 'id'>) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (task: TaskType) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async (userStoryId: string) => {
    const q = query(collection(db, "tasks"), where("userStoryId", "==", userStoryId));
    const querySnapshot = await getDocs(q);
    const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TaskType));
    setTasks(tasksData);
  };

  const addTask = async (task: Omit<TaskType, 'id'>) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    setTasks(prevTasks => [...prevTasks, { ...task, id: docRef.id }]);
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const updateTask = async (task: TaskType) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, task);
    setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? task : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
