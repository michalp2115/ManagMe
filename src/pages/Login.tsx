import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../db/Firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error before attempting login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user UID:", user.uid); // Log UID of the logged-in user
  
      // Fetch user information from Firestore
      const userDocRef = doc(db, "users", user.uid);
      console.log(userDocRef)
      const userSnap = await getDoc(userDocRef);
      console.log("User snapshot:", userSnap.exists() ? userSnap.data() : "User not found");
      
      if (userSnap) {
        const userData = userSnap.data();
        if(userData){
          const loggedUser = {
            id: user.uid,
            name: userData.name,
            surname: userData.surname
          }; // <-- Closing curly brace added here
          setUser(loggedUser); // Set user context
          navigate("/"); // Navigate to the home page
        }
      
      
        
  
      } else {
        setError("User data not found"); // Set an error if user data not found
      }
    } catch (error: any) {
      console.error("Error logging in:", error.code, error.message);
      setError("Login failed. Please check your credentials and try again."); // Display the specific error message
    }
  };
  

  return (
    <div className="max-w-[400px] w-full m-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full text-xl rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-xl rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
