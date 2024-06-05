import AddCircleIcon from "@mui/icons-material/AddCircle";

interface FormPropTypes {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  createProject: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ createProject, name, setName, description, setDescription }: FormPropTypes) => {
  return (
    <form
      onSubmit={createProject}
      className="flex justify-between bg-violet-300 p-4 rounded-lg items-center dark:bg-gray-800"
    >
      <input
        placeholder="Name"
        className="w-full text-xl rounded-lg p-[3px] mx-1 dark:bg-gray-800"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        placeholder="Description"
        className="w-full text-xl rounded-lg p-[3px] mx-1 dark:bg-gray-800"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button className="ml-2 rounded-lg text-gray-900">
        <AddCircleIcon />
      </button>
    </form>
  );
};

export default Form;
