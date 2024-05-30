import React from 'react';
import { useUser } from '../context/UserContext';

const Details = () => {
  // Access user data from context
  const { user } = useUser();

  return (
    <div className="max-w-[400px] w-full m-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default Details;
