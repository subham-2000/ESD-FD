import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const BranchSelection = () => {
  const { branches, setBranches, setCourseId } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        await setBranches();
      } catch (err) {
        console.error(err);
      }
    };

    fetchBranches();
  }, [setBranches]);

  const handleBranchSelect = (branch) => {
    setCourseId(branch);
    navigate("/timetable");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Select Your Branch</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {branches.map((branch) => (
          <button
            key={branch.domain_id}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleBranchSelect(branch.domain_id)}
          >
            {branch.domain_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchSelection;
