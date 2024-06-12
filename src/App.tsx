import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { UserStoryProvider } from "./context/UserStoryContext";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <UserStoryProvider>
          <TaskProvider>
          <Navbar />
          <div className="h-screen w-screen p-4 bg-violet-400 dark:bg-gray-800 dark:text-white overflow-y-scroll">
            <div className="bg-stone-200 dark:bg-gray-900 dark:text-white max-w-[1500px] w-full m-auto rounded-md shadow-xl p-4">
              <AppRoutes />
            </div>
          </div>
          </TaskProvider>
        </UserStoryProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
