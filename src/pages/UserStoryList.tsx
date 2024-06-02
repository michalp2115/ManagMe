import React from 'react';
import { useUserStory } from '../context/UserStoryContext';
import { Link } from 'react-router-dom';

const UserStoryList = () => {
  const { userStories } = useUserStory();

  const renderUserStories = (state: string) =>
    userStories
      .filter(story => story.state === state)
      .map(story => (
        <div key={story.id}>
          <h3>{story.name}</h3>
          <p>{story.description}</p>
          <p>Priority: {story.priority}</p>
          <Link to={`/user-stories/edit/${story.id}`}>Edit</Link>
          <button>Delete</button>
        </div>
      ));

  return (
    <div>
      <h2>To Do</h2>
      {renderUserStories('ToDo')}
      <h2>Doing</h2>
      {renderUserStories('Doing')}
      <h2>Done</h2>
      {renderUserStories('Done')}
    </div>
  );
};

export default UserStoryList;
