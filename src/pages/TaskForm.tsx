import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { TaskType } from '../types/types';

const TaskForm = ({ userStoryId }: { userStoryId: string }) => {
  const { addTask } = useTask();
  const { users } = useUser();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [expectedTime, setExpectedTime] = useState<number>(0);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Omit<TaskType, 'id'> = {
      name,
      description,
      priority,
      userStoryId,
      expectedTime,
      state: 'todo',
      addDate: new Date().toISOString(),
      userId,
    };
    await addTask(newTask);
    setName('');
    setDescription('');
    setPriority('low');
    setExpectedTime(0);
    setUserId(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
            Task Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="expectedTime">
            Expected Time (hours)
          </label>
          <input
            type="number"
            name="expectedTime"
            value={expectedTime}
            onChange={(e) => setExpectedTime(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="userId">
            Assign User
          </label>
          <select
            name="userId"
            value={userId || ''}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
          >
            <option value="">None</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
