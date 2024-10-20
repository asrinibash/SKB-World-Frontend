import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main.jsx";
import { FaFilePdf } from "react-icons/fa";
import SearchFilter from "./SearchFilter"; // Import the SearchFilter component

export default function BuyCourse() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleContainerClick = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        let response;
        if (id) {
          response = await axios.get(`${server}/course/${id}`);
          setCourse(response.data);
        } else {
          response = await axios.get(`${server}/course/getAll`);
          setCourses(response.data);
          setFilteredCourses(response.data); // Set both courses and filteredCourses
        }
      } catch (err) {
        setError("Failed to load course details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  // Function to handle search filtering
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses); // Reset to all courses if search is empty
    }
  };

  const renderCourse = (courseData) => (
    <div className="container mx-auto px-4 py-8 border rounded-md shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-2 border-b pb-2">
        {courseData?.name}
      </h1>
      <p className="text-lg mb-4">{courseData?.description}</p>
      <p className="text-sm text-gray-600">
        By Admin - Date: {new Date(courseData?.createdAt).toLocaleDateString()}
      </p>
      <p className="text-lg font-semibold mb-4">Price: ${courseData?.price}</p>

      <div
        className="mb-4 border w-96 rounded-lg p-4 text-center cursor-pointer"
        onClick={() => handleContainerClick(courseData?.file?.[0])}
        style={{ backgroundColor: "#FFA500", color: "white" }}
      >
        {courseData?.file && courseData.file.length > 0 ? (
          <div className="flex flex-col items-center">
            <FaFilePdf className="text-red-500 mb-2" size={24} />
            <span className="text-black">
              {courseData.fileName || "Download Course File"}
            </span>
            <p className="text-sm text-gray-600">
              Size: {Math.round(courseData.fileSize / 1024) || "Unknown"} KB
            </p>
          </div>
        ) : (
          <p>No file available.</p>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Updated: {new Date(courseData?.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );

  if (isLoading) return <div>Loading course details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Include the SearchFilter component */}
      {!id && <SearchFilter onSearch={handleSearch} />}

      {id && course ? (
        renderCourse(course)
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">All Courses</h1>
          <div className="flex flex-col gap-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((courseItem) => renderCourse(courseItem))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
