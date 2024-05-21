import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EditProject from "../pages/EditProject";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditProject />} />
    </Routes>
  );
};

export default AppRoutes;
