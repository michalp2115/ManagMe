// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EditProject from '../pages/EditProject';
import Details from '../pages/Details';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserStoryList from '../pages/UserStoryList';
import UserStoryForm from '../pages/UserStoryForm';
import ProjectUserStories from '../pages/ProjectUserStories';
import UserStoryTasks from '../pages/UserStoryTask';
import Notifications from '../pages/Notifications';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/details" element={<Details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects/:projectId/user-stories" element={<ProjectUserStories />} />
      <Route path="/projects/:projectId/user-stories/new" element={<UserStoryForm />} />
      <Route path="/projects/:projectId/user-stories/edit/:id" element={<UserStoryForm />} />
      <Route path="/projects/:projectId/user-stories/:userStoryId/tasks" element={<UserStoryTasks />} />
      <Route path="/notifications" element={<Notifications/>}/>
    </Routes>
  );
};

export default AppRoutes;
