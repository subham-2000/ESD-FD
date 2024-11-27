import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const CourseDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { students, fetchStudentsByCourseId } = useAuthStore();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        await fetchStudentsByCourseId(id);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id, fetchStudentsByCourseId]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course: {id}</h1>
      <p className="mb-4">Total Students: {students.length}</p>
      <h2 className="text-xl font-bold mb-2">Student List</h2>
      <ul className="list-disc pl-5">
        {students.map((student, index) => (
          <li key={index} className="mb-2">
            {student.firsName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
