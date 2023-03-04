import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import { auth } from "./util/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Profile from "./components/Profile/Profile";

function App() {
  const signOutHandler = async () => {
    console.log(auth.currentUser);
    await signOut(auth);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(Boolean(user));
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {isAuthenticated && (
          <div>
            User is: {auth.currentUser.email}
            <button
              onClick={signOutHandler}
              className="flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
