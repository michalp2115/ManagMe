import React from "react";
import { useUser } from "../context/UserContext";

const Details = () => {
  const { user } = useUser();

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Surname:</strong> {user?.surname}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>UID:</strong> {user?.id}</p>
    </div>
  );
};

export default Details;
