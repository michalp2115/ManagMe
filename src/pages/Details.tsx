import React from "react";
import { useUser } from "../context/UserContext";

const Details = () => {
  const { user } = useUser();

  if (!user) {
    return <div>No user details available</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Email: {user.email}</p>
      <p>UID: {user.id}</p>
    </div>
  );
};

export default Details;
