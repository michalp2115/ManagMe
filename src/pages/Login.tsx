// src/pages/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider, signInWithPopup } from "../db/Firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user UID:", user.uid); 
  
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      console.log("User snapshot:", userSnap.exists() ? userSnap.data() : "User not found");
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const loggedUser = {
          id: user.uid,
          name: userData.name,
          surname: userData.surname,
          email: userData.email 
        }; 
        setUser(loggedUser); 
        navigate("/"); 
      } else {
        setError("User data not found"); 
      }
    } catch (error: any) {
      console.error("Error logging in:", error.code, error.message);
      setError("Login failed. Please check your credentials and try again."); 
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user UID:", user.uid);

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const loggedUser = {
          id: user.uid,
          name: userData.name,
          surname: userData.surname,
          email: userData.email
        };
        setUser(loggedUser);
        navigate("/");
      } else {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          surname: ""
        });
        setUser({
          id: user.uid,
          name: user.displayName || "",
          surname: "",
          email: user.email || ""
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error logging in with Google:", error.code, error.message);
      setError("Google login failed. Please try again.");
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
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white p-2 rounded-lg w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
