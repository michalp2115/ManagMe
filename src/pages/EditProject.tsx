import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../db/Firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface ProjectType {
  id: string;
  name?: string;
  description?: string;
  status?: boolean;
}

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      console.log("Fetching project with ID:", id);
      if (id) {
        const projectDoc = doc(db, "projects", id);
        const projectSnap = await getDoc(projectDoc);
        if (projectSnap.exists()) {
          const projectData = projectSnap.data() as ProjectType;
          console.log("Fetched project data:", projectData);
          setName(projectData.name || "");
          setDescription(projectData.description || "");
          setStatus(projectData.status || false);
        } else {
          console.log("Project not found with ID:", id);
        }
      }
    };
  
    fetchProject();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      const projectDoc = doc(db, "projects", id);
      await updateDoc(projectDoc, {
        name,
        description,
        status,
      });
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-gray-100 p-8 rounded-lg shadow-md dark:bg-gray-600"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-white">
          Edit Project
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 dark:text-black"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 dark:text-black"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="status"
              className="mr-2"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <span className="text-gray-700 dark:text-white">Completed</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none dark:bg-gray-400"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
