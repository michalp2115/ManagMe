import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStory } from '../context/UserStoryContext';
import { useUser } from '../context/UserContext'; // Import the user context
import Priority from '../enums/Priority';
import State from '../enums/State';
import { UserStoryType } from '../types/types';

const UserStoryForm = () => {
  const { projectId, id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(Priority.Low);
  const [state, setState] = useState(State.Todo);
  const { userStories, addUserStory, updateUserStory } = useUserStory();
  const { user } = useUser(); // Get the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const story = userStories.find(story => story.id === id);
      if (story) {
        setName(story.name);
        setDescription(story.description);
        setPriority(story.priority);
        setState(story.state);
      }
    }
  }, [id, userStories]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('No logged-in user found');
      return;
    }

    const newStory: Omit<UserStoryType, 'id'> = {
      name,
      description,
      priority,
      state,
      createdDate: Date.now(),
      projectId: projectId || '',
      ownerId: user.id, // Set the owner ID to the logged-in user's ID
      type: 'userStory',
      projectName: '', // This can be set or left empty as needed
    };

    if (id) {
      await updateUserStory({ id, ...newStory });
    } else {
      await addUserStory(newStory);
    }

    navigate(`/projects/${projectId}/user-stories`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit User Story' : 'Create User Story'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-900"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-900"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="p-2 border rounded-md dark:bg-gray-900"
        >
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.High}>High</option>
        </select>
        <select
          value={state}
          onChange={(e) => setState(e.target.value as State)}
          className="p-2 border rounded-md dark:bg-gray-900"
        >
          <option value={State.Todo}>To Do</option>
          <option value={State.Doing}>Doing</option>
          <option value={State.Done}>Done</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UserStoryForm;
