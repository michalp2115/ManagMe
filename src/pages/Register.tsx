import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../db/Firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useUser } from "../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        surname: surname
      });

      // Mocking a logged user
      const loggedUser = {
        id: user.uid,
        name: name,
        surname: surname,
        email: email
      };
      console.log("User logged in: ", loggedUser)
      setUser(loggedUser); 

      navigate("/");
    } catch (error: any) {
      console.error("Error registering:", error);
      setError("Registration failed. Please try again.");  
    }
  };

  return (
    <div className="max-w-[400px] w-full m-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full text-xl rounded-lg p-2 dark:text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="w-full text-xl rounded-lg p-2 dark:text-black"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full text-xl rounded-lg p-2 dark:text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-xl rounded-lg p-2 dark:text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
