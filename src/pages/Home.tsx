import Form from "../components/Form";
import Projects from "../components/Projects";
import { useState, useEffect, FormEvent } from "react";
import { db } from "../db/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

interface ProjectType {
  id: string;
  name?: string;
  description?: string;
  status?: boolean;
}

const Home = () => {
  const [project, setProject] = useState<ProjectType[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // CREATE PROJECT
  const createProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || description === "") {
      alert("Please enter both a name and a description");
      return;
    }
    await addDoc(collection(db, "projects"), {
      name: name,
      description: description,
      status: false,
    });
    setName("");
    setDescription("");
  };

  // READ PROJECT
  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const projectsArr: ProjectType[] = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setProject(projectsArr);
    });
    return () => unsubscribe();
  }, []);

  // STATUS PROJECT
  const toggleStatus = async (project: ProjectType) => {
    await updateDoc(doc(db, "projects", project.id), {
      status: !project.status,
    });
  };

  // DELETE PROJECT
  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
  };

  const incompleteProjectsCount = project.filter(p => !p.status).length;

  return (
    <div>
      <Form
        createProject={createProject}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
      />
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 dark:text-gray-300 dark:bg-gray-800">ID</th>
            <th className="border border-gray-300 px-4 py-2 dark:text-gray-300 dark:bg-gray-800">Name</th>
            <th className="border border-gray-300 px-4 py-2 dark:text-gray-300 dark:bg-gray-800">Description</th>
            <th className="border border-gray-300 px-4 py-2 dark:text-gray-300 dark:bg-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {project.map((projects, index) => (
            <Projects
              key={index}
              projects={projects}
              deleteProject={deleteProject}
              toggleStatus={toggleStatus}
            />
          ))}
        </tbody>
      </table>
      <p className="text-center font-bold text-stone-800 mt-4 dark:text-white">
        You have {incompleteProjectsCount} things to complete
      </p>
    </div>
  );
};

export default Home;
