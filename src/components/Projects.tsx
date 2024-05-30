import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ProjectType } from "../types/types";
import { useNavigate } from "react-router-dom";
import ForwardIcon from '@mui/icons-material/Forward';

interface ProjectProps {
  projects: ProjectType;
  deleteProject: (id: string) => void;
  toggleStatus: (project: ProjectType) => void;
}

const Projects = ({ projects, deleteProject, toggleStatus }: ProjectProps) => {
  const navigate = useNavigate();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteProject(projects.id);
  };

  const handleToggleStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleStatus(projects);
  };

  const handleEdit = () => {
    navigate(`/edit/${projects.id}`);
  };

  return (
    <tr className={`border border-gray-300 ${projects.status ? 'line-through' : ''}`}>
      <td className="border border-gray-300 px-4 py-2">{projects.id}</td>
      <td className="border border-gray-300 px-4 py-2">{projects.name}</td>
      <td className="border border-gray-300 px-4 py-2">{projects.description}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button className="mr-4" onClick={handleToggleStatus}>
          <CheckBoxIcon />
        </button>
        <button onClick={handleDelete} className="mr-1">
          <DeleteIcon />
        </button>
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
        <button className="ml-12">
          GO INTO
          <ForwardIcon/>
        </button>
      </td>
    </tr>
  );
};

export default Projects;
