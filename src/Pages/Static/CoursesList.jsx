/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import axios from "axios";
import { Button } from "../../Components/Static/Ui/Button";
import { server } from "../../main.jsx";
import DEFAULT_COURSE_IMAGE from "../../assets/skbcompany2.png";

const COURSES_PER_PAGE = 10; // Display 10 courses per page

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          category === "all"
            ? `${server}/course/getAll`
            : `${server}/category/${category}`
        );

        const fetchedCourses = response.data.courses || [];
        const fetchedTotalCourses = fetchedCourses.length;

        setCourses(fetchedCourses);
        setTotalCourses(fetchedTotalCourses);
        setTotalPages(
          fetchedTotalCourses > 0
            ? Math.ceil(fetchedTotalCourses / COURSES_PER_PAGE)
            : 1
        );
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [category]);

  const paginatedCourses = courses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredCourses = paginatedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (courseId) => {
    // Navigate to the BuyCourse component with the course ID in the URL
    navigate(`/buyCourse/${courseId}`);
  };

  if (isLoading) return <div>Loading Courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-end mb-6">
        <label htmlFor="search" className="sr-only">
          Search courses
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search courses..."
          className="w-72 p-3 pl-10 border border-gray-300 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-4 border border-gray-300"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={DEFAULT_COURSE_IMAGE}
                alt={course.name}
                className="w-24 h-24 object-cover rounded border border-gray-200"
              />
              <div className="flex-1 border-l border-gray-300 pl-4">
                <h2 className="text-lg font-bold text-primary">
                  {course.name}
                </h2>
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="flex items-center mt-2">
                  <FaTag className="text-accent mr-2" />
                </div>
              </div>
              <Button onClick={() => handleBuyNow(course.id)}>Buy Now</Button>
            </motion.div>
          ))
        ) : (
          <p className="text-center">No courses found</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </motion.div>
  );
}
