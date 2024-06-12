import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserStory } from '../context/UserStoryContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Forward } from '@mui/icons-material';

const ProjectUserStories = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { userStories, deleteUserStory } = useUserStory();
  const projectUserStories = userStories.filter(story => story.projectId === projectId);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-600">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">User Stories for Project {projectId}</h2>
      <div className="mb-4">
        <Link
          to={`/projects/${projectId}/user-stories/new`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md dark:bg-white dark:text-black dark:font-bold"
        >
          Create New User Story
        </Link>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left dark:bg-gray-900">
            <th className="border px-4 py-2">UserStory Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectUserStories.map(story => (
            <tr key={story.id} className="hover:bg-gray-100 dark:bg-gray-900">
              <td className="border px-4 py-2">{story.name}</td>
              <td className="border px-4 py-2">{story.description}</td>
              <td className="border px-4 py-2">{story.priority}</td>
              <td className="border px-4 py-2">{story.state}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/projects/${projectId}/user-stories/${story.id}/tasks`}
                  className="mr-2 text-blue-500 dark:text-white"
                >
                  GO INTO <Forward/>
                </Link>
                <Link
                  to={`/projects/${projectId}/user-stories/edit/${story.id}`}
                  className="mr-2 text-blue-500 hover:text-blue-700 dark:text-white"
                >
                  <EditIcon />
                </Link>
                <button
                  onClick={() => deleteUserStory(story.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectUserStories;
