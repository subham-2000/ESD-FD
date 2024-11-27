import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Timetable from "./components/Timetable";
import CourseDetails from "./components/CourseDetails";
import BranchSelection from "./components/BranchSection";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const { token, setToken } = useAuthStore();

  useEffect(() => {
    // On component mount, check if the token exists in localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken); // Update Zustand state with token from localStorage
    }
    
  }, [token, setToken]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-16"> {/* To offset the fixed navbar */}
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to={"/domain"} />}
        />

        {/* Domain Route: Requires token */}
        <Route
          path="/domain"
          element={token ? <BranchSelection /> : <Navigate to="/login" />}
        />

        {/* Timetable Route: Requires authUser */}
        <Route
          path="/timetable"
          element={token ? <Timetable /> : <Navigate to="/login" />}
        />

        {/* CourseDetails Route: Requires token */}
        <Route
          path="/course/:id"
          element={token ? <CourseDetails /> : <Navigate to="/login" />}
        />
         <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
    </div>
  );
};

export default App;
