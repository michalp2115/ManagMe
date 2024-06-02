import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { UserStoryProvider } from "./context/UserStoryContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <UserStoryProvider>
          <Navbar />
          <div className="h-screen w-screen p-4 bg-violet-400 overflow-y-scroll">
            <div className="bg-stone-200 max-w-[1500px] w-full m-auto rounded-md shadow-xl p-4">
              <AppRoutes />
            </div>
          </div>
        </UserStoryProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
