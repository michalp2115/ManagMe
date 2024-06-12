import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { useUserStory } from '../context/UserStoryContext';
import TaskForm from '../pages/TaskForm';
import Task from '../pages/Task';

const UserStoryDetails = () => {
  const { projectId, userStoryId } = useParams<{ projectId: string; userStoryId: string }>();
  const { tasks, fetchTasks } = useTask();
  const { userStories } = useUserStory();

  useEffect(() => {
    if (userStoryId) {
      fetchTasks(userStoryId);
    }
  }, [userStoryId, fetchTasks]);

  const userStory = userStories.find(story => story.id === userStoryId);

  if (!userStory) {
    return <div>User story not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{userStory.name}</h2>
      <p>{userStory.description}</p>
      <TaskForm userStoryId={userStoryId!} />
      <div className="mt-4">
        {tasks.filter(task => task.userStoryId === userStoryId).map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default UserStoryDetails;
