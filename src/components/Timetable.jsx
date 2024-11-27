import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Timetable = () => {
  const { courses, setCourses } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await setCourses();
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [setCourses]);

  const handleCourseClick = (courseCode) => {
    navigate(`/course/${courseCode}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-md border cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCourseClick(course.courseCode)}
            >
              <h2 className="text-lg font-semibold mb-2">
                {course.courseName} ({course.courseCode})
              </h2>
              <p className="mb-2">Faculty: {course.facultyName}</p>
              <h3 className="font-bold mb-1">Schedule:</h3>
              <ul>
                {course.courseSchedule.map((schedule, idx) => (
                  <li key={idx}>
                    {schedule.day}, {schedule.time} - Room {schedule.room_no},{" "}
                    {schedule.building}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default Timetable;
