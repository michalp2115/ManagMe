import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../pages/TaskForm';
import Task from '../pages/Task';
import { useTask } from '../context/TaskContext';

const UserStoryTasks = () => {
  const { userStoryId } = useParams<{ userStoryId: string }>();
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useTask();

  useEffect(() => {
    if (userStoryId) {
      fetchTasks(userStoryId);
    }
  }, [userStoryId, fetchTasks]);

  if (!userStoryId) {
    navigate('/');
    return null;
  }

  const userStoryTasks = tasks.filter(task => task.userStoryId === userStoryId);

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Tasks for User Story {userStoryId}</h2>
      <TaskForm userStoryId={userStoryId} />
      <div className="mt-4">
        {userStoryTasks.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No tasks available. Add a new task above.</p>
        ) : (
          userStoryTasks.map(task => (
            <Task key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserStoryTasks;
