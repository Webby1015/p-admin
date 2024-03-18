import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import Policy from "./Pages/Policy";
import Error from "./Pages/Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Remove the import for vite-plugin-env-compatible
// No need to import it here

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      console.log("User logged out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Router>
          <button
            onClick={logout}
            className="bg-red-500 mx-20 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Login </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={(event) => {
                  setEmail(event.target.value);
                  // Access the environment variable directly
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
