// import { useState, useEffect } from "react";
// import { Button } from "../../Components/Static/Ui/Button";
// import { motion } from "framer-motion";
// import { server } from "../../main.jsx";
// import { FaSearch, FaDownload, FaTag } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { format } from "date-fns"; // Install date-fns for date formatting

// export default function Courses() {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const coursesPerPage = 9; // Show 9 courses per page

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const [coursesResponse, categoriesResponse] = await Promise.all([
//           axios.get(`${server}/course/getAll`),
//           axios.get(`${server}/category/getAll`),
//         ]);

//         setCourses(coursesResponse.data);
//         setCategories(categoriesResponse.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(
//           "An error occurred while fetching data. Please try again later."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter and paginate courses
//   const filteredCourses = courses.filter((course) => {
//     const categoryMatch =
//       selectedCategory === "all" || course.category.id === selectedCategory;

//     const nameMatch =
//       !searchQuery ||
//       course.name.toLowerCase().includes(searchQuery.toLowerCase());

//     return categoryMatch && nameMatch;
//   });

//   const indexOfLastCourse = currentPage * coursesPerPage;
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = filteredCourses.slice(
//     indexOfFirstCourse,
//     indexOfLastCourse
//   );

//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen justify-center items-center text-2xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen justify-center items-center text-xl text-red-500">
//         {error}
//       </div>
//     );
//   }

//   const handleBuyNow = (courseId) => {
//     navigate(`/user/payment/${courseId}`);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <motion.div
//       className="container mx-auto px-4 py-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center ">
//         Explore <span className="text-accent">Our Courses</span>
//       </h1>
//       <p className="text-md md:text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-8">
//         We offer a wide range of courses to help you learn new skills and
//         advance your career.
//       </p>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <div className="md:w-1/4">
//           <div className="bg-secondary rounded-lg p-6 shadow-md">
//             <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
//             <ul className="space-y-2">
//               <li>
//                 <button
//                   className={`w-full text-left p-2 rounded transition-colors ${
//                     selectedCategory === "all"
//                       ? "bg-accent text-white"
//                       : "hover:bg-accent/10"
//                   }`}
//                   onClick={() => setSelectedCategory("all")}
//                 >
//                   All Categories
//                 </button>
//               </li>

//               {categories.map((category) => (
//                 <li key={category.id} className="mb-4">
//                   <button
//                     className={`w-full text-left p-4 rounded-lg shadow-md transition-colors
//         ${
//           selectedCategory === category.id
//             ? "bg-accent text-white"
//             : "bg-white hover:bg-accent/10 dark:bg-gray-800 dark:hover:bg-gray-700"
//         }`}
//                     onClick={() => setSelectedCategory(category.id)}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-lg dark:text-gray-300">
//                         {category.name}
//                       </span>
//                       <span className="text-sm text-gray-500 dark:text-gray-400">
//                         {format(new Date(category.createdAt), "dd MMM yyyy")}
//                         <br />
//                         <pre>By Admin</pre>
//                       </span>
//                     </div>
//                     <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
//                       {category.description}
//                     </p>
//                     <hr className="my-2 border-gray-300 dark:border-gray-600" />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="md:w-3/4">
//           <div className="mb-6 flex items-center justify-end">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search courses..."
//                 className="w-72 p-3 pl-10 border border-gray-300 dark:bg-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {currentCourses.length > 0 ? (
//               currentCourses.map((course) => (
//                 <motion.div
//                   key={course.id}
//                   className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl p-4"
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <img
//                     src={
//                       course.image ||
//                       "https://img.freepik.com/free-vector/software-development-programming-coding-learning-information-technology-courses-it-courses-all-levels-computing-hi-tech-course-concept_335657-191.jpg"
//                     }
//                     alt={course.name}
//                     className="w-full h-36 object-cover"
//                   />
//                   <h2 className="text-lg font-bold my-2 text-primary">
//                     {course.name}
//                   </h2>
//                   <p className="text-sm mb-3 line-clamp-3">
//                     {course.description}
//                   </p>
//                   <div className="flex items-center mb-3">
//                     <FaTag className="text-accent mr-2" />
//                     <span className="text-sm font-semibold">
//                       {course.category.name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center mb-3">
//                     <span className="text-xl font-bold text-accent">
//                       ${course.price.toFixed(2)}
//                     </span>
//                     <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
//                       <FaDownload className="mr-1" />
//                       <span>{course.downloads} downloads</span>
//                     </div>
//                   </div>
//                   <Button
//                     className="w-full justify-center text-sm"
//                     onClick={() => handleBuyNow(course.id)}
//                   >
//                     Buy Now
//                   </Button>
//                 </motion.div>
//               ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500 text-lg">
//                 No courses found. Please try a different search or category.
//               </p>
//             )}
//           </div>

//           {/* Pagination controls */}
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={handlePrevPage}
//               className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 ${
//                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               className={`px-4 py-2 ml-2 rounded-md bg-gray-200 text-gray-700 ${
//                 currentPage === totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }`}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
