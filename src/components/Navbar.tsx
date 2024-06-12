import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
  const { user, setUser } = useUser();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); 
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold">
        <Link to="/">ManagMe</Link>
      </h1>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="focus:outline-none">
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-200" />
          )}
        </button>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>
              Welcome, {user.name} {user.surname}
            </span>
            <Link to="/details">
              <AccountCircleIcon />
            </Link>
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
