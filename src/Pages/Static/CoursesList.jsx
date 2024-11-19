// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// import axios from "axios";
// import { server } from "../../main.jsx";

// export default function CategoryList() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${server}/category/getAll`);
//         setCategories(response.data);
//       } catch (err) {
//         setError("Failed to load categories.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${server}/course/getAll`);
//         console.log(response.data); // Log courses data to the console
//       } catch (err) {
//         console.error("Failed to load courses.");
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/coursesList?category=${categoryId}`);
//   };

//   if (isLoading) return <div>Loading Categories...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="bg-secondary rounded-lg p-6 shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
//       <ul className="space-y-2">
//         <li>
//           <button
//             className="w-full text-left p-2 rounded hover:bg-accent/10"
//             onClick={() => handleCategoryClick("all")}
//           >
//             All Categories
//           </button>
//         </li>
//         {/* {categories.map((category) => (
//           <li key={category.id}>
//             <button
//               className="w-full text-left p-4 rounded-lg shadow-md hover:bg-accent/10"
//               onClick={() => handleCategoryClick(category.id)}
//             >
//               <div className="flex justify-between items-center">
//                 <span className="font-bold text-lg dark:text-gray-300">
//                   {category.name}
//                 </span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {format(new Date(category.createdAt), "dd MMM yyyy")}
//                 </span>
//               </div>
//               <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
//                 {category.description}
//               </p>
//               <hr className="my-2 border-gray-300 dark:border-gray-600" />
//             </button>
//           </li>
//         ))} */}
//         <div className="overflow-x-auto space-y-6">
//           {categories.map((category) => (
//             <div key={category.id} className="w-full">
//               <table className="w-full bg-white shadow-md rounded-lg dark:bg-gray-800">
//                 <thead>
//                   <tr className="text-left bg-gray-100 dark:bg-gray-700">
//                     <th className="p-4 w-1/2 text-lg font-bold dark:text-gray-300">
//                       {category.name}
//                     </th>
//                     <th className="p-4 w-1/8 text-lg font-bold dark:text-gray-300">
//                       Topics
//                     </th>
//                     <th className="p-4 w-1/8 text-lg font-bold dark:text-gray-300">
//                       Posts
//                     </th>
//                     <th className="p-4 w-1/4 text-lg font-bold dark:text-gray-300">
//                       Last Post
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr
//                     className="hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => handleCategoryClick(category.id)}
//                   >
//                     <td className="p-4 font-semibold dark:text-gray-300">
//                       {category.name}
//                     </td>
//                     <td className="p-4 text-sm text-gray-700 dark:text-gray-400">
//                       -
//                     </td>
//                     <td className="p-4 text-sm text-gray-700 dark:text-gray-400">
//                       -
//                     </td>
//                     <td className="p-4 text-sm text-gray-700 dark:text-gray-400">
//                       {format(new Date(category.createdAt), "dd MMM yyyy")}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import skbImage from "../../assets/skbcompany2.png";
import { server } from "../../main.jsx";
// import { format } from "date-fns";
import { FaArrowUp } from "react-icons/fa"; // Import an up arrow icon

export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]); // Define courses state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Function to handle scrolling back to the top
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Event listener to toggle the visibility of the Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/getAll`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${server}/course/getAll`);
        setCourses(response.data); // Set courses data
      } catch (err) {
        console.error("Failed to load courses.");
      }
    };
    fetchCourses();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/coursesList?category=${categoryId}`);
  };

  const truncateName = (name) => {
    const words = name.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : name;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-4 mb-4 p-10 sm:p-20 md:p-48">
        <div className="relative flex justify-center items-center h-32 w-32">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img
            src={skbImage}
            alt="Avatar thinking"
            className="rounded-full h-28 w-28"
          />
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="bg-secondary rounded-lg p-6 shadow-md ">
        <ul className="space-y-2">
          <li>
            <button
              className="w-full text-left p-2 rounded hover:bg-accent/10 text-2xl font-bold mb-4 text-primary"
              // onClick={() => handleCategoryClick("all")}
            >
              All Categories
            </button>
          </li>
          {/* Removed the overflow-x-auto class */}
          <div className="space-y-1 ">
            {categories.map((category) => {
              const categoryCourses = courses.filter(
                (course) => course.categoryId === category.id
              ); // Filter courses by category

              return (
                <div key={category.id} className="w-full  rounded-lg">
                  <table className="w-full  shadow-md   border border-rounde  ">
                    <thead className="">
                      <tr className="text-left  ">
                        <th className="py-2 px-4  text-sm font-bold mb-2 ">
                          {category.name}
                        </th>
                        <th className="py-2 px-4  text-sm">Topics</th>
                        <th className="py-2 px-4  text-sm">Posts</th>
                        <th className="py-2 px-4  text-sm">Last Post</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => handleCategoryClick(category.id)}>
                        <td className="p-4 flex items-center text-sm">
                          <img
                            src={skbImage} // Replace with your static image URL
                            alt="Category" // Alternative text for the image
                            className="w-16 h-16 rounded-full mr-4" // Adjust size as needed
                          />
                          <div>
                            <a href="">
                              <span className="font-semibold  ">
                                {category.name}
                              </span>
                              <br />
                              <span className="text-gray-500">
                                {category.description}
                              </span>
                            </a>
                          </div>
                        </td>

                        <td className="p-4 text-sm ">
                          {categoryCourses.length}{" "}
                          {/* Number of topics/courses */}
                        </td>
                        <td className="p-4 text-sm">
                          {categoryCourses.length} {/* Number of posts */}
                        </td>
                        <td className="p-4 text-sm ">
                          {categoryCourses.length > 0 ? (
                            <>
                              <span className="font-semibold">
                                {truncateName(
                                  categoryCourses[categoryCourses.length - 1]
                                    .name
                                )}
                              </span>
                              <br />
                              <span className="text-gray-500"> by admin</span>
                              <br />
                              {format(
                                new Date(
                                  categoryCourses[
                                    categoryCourses.length - 1
                                  ].createdAt
                                ),
                                "EEE MMM dd, yyyy h:mm a" // Custom format string
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </ul>
      </div>

      <div>
        {/* Main content goes here */}

        {/* Back to Top button */}
        {showBackToTop && (
          <button
            onClick={handleBackToTop}
            className="fixed bottom-10 right-10 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary hover:text-primary"
            aria-label="Back to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
}
