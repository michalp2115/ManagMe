import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen p-4 bg-violet-400 overflow-y-scroll">
        <div className="bg-stone-200 max-w-[1500px] w-full m-auto rounded-md shadow-xl p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 p-2">
            ManagMe
          </h1>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
