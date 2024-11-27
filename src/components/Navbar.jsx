import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  if (!authUser) {
    return null; // Do not render the navbar if the user is not authenticated
  }

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Welcome, {authUser}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
