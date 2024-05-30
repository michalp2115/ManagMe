import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); 
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold">
        <Link to="/">ManagMe</Link>
      </h1>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>
              Welcome, {user.name} {user.surname}
            </span>
            <Link to ="/details"><AccountCircleIcon/></Link>
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
