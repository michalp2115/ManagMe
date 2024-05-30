import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EditProject from "../pages/EditProject";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditProject />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/details" element = {<Details/>} />
    </Routes>
  );
};

export default AppRoutes;
