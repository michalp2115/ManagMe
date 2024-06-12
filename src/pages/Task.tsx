import React from 'react';
import { TaskType } from '../types/types';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';

const Task = ({ task }: { task: TaskType }) => {
  const { deleteTask, updateTask } = useTask();
  const { users } = useUser();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleStateChange = (newState: 'todo' | 'doing' | 'done') => {
    const updatedTask = { ...task, state: newState };
    if (newState === 'doing') {
      updatedTask.startDate = new Date().toISOString();
    } else if (newState === 'done') {
      updatedTask.endDate = new Date().toISOString();
    }
    updateTask(updatedTask);
  };

  const assignedUser = users.find(user => user.id === task.userId);

  return (
    <div className="p-4 mb-4 bg-white dark:bg-gray-700 rounded shadow-md">
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Expected Time: {task.expectedTime} hours</p>
      <p>State: {task.state}</p>
      <p>Added: {new Date(task.addDate).toLocaleString()}</p>
      {task.startDate && <p>Started: {new Date(task.startDate).toLocaleString()}</p>}
      {task.endDate && <p>Ended: {new Date(task.endDate).toLocaleString()}</p>}
      {assignedUser && <p>Assigned to: {assignedUser.name} {assignedUser.surname}</p>}

      <div className="mt-2">
        {task.state !== 'todo' && (
          <button onClick={() => handleStateChange('todo')} className="mr-2">
            Mark as ToDo
          </button>
        )}
        {task.state !== 'doing' && (
          <button onClick={() => handleStateChange('doing')} className="mr-2">
            Mark as Doing
          </button>
        )}
        {task.state !== 'done' && (
          <button onClick={() => handleStateChange('done')} className="mr-2">
            Mark as Done
          </button>
        )}
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
