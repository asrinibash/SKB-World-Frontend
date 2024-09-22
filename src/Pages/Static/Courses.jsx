import { useState, useEffect } from "react";
import { Button } from "../../Components/Static/Ui/Button";
import { motion } from "framer-motion";
import { server } from "../../main.jsx";
import { FaSearch, FaDownload, FaTag } from "react-icons/fa";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [coursesResponse, categoriesResponse] = await Promise.all([
          axios.get(`${server}/course/getAll`),
          axios.get(`${server}/category/getAll`),
        ]);

        setCourses(coursesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "all" || course.category.id === selectedCategory;

    const nameMatch =
      !searchQuery ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && nameMatch;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center text-xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Explore Our <span className="text-accent">Courses</span>
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-secondary p-4 rounded-lg shadow-md">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <select
            className="w-full p-2 pl-3 pr-10 border border-gray-300 dark:bg-green-800 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 fill-current text-gray-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by tags..."
            className="w-full p-2 pl-10 border border-gray-300 dark:bg-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-secondary rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-primary">
                  {course.name}
                </h2>
                <p className=" text-sm mb-4">{course.description}</p>
                <div className="flex items-center mb-3">
                  <FaTag className="text-accent mr-2" />
                  <span className="text-sm font-semibold ">
                    Category: {course.category.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-accent text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-accent">
                    ${course.price.toFixed(2)}
                  </span>
                  <div className="flex items-center ">
                    <FaDownload className="mr-1" />
                    <span className="text-sm">
                      {course.downloads} downloads
                    </span>
                  </div>
                </div>
                <Button className="w-full justify-center">Buy Now</Button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No courses found. Please try a different search or category.
          </p>
        )}
      </div>
    </motion.div>
  );
}
