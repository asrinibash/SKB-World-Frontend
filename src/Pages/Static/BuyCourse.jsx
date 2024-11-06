import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main.jsx";
import { useNavigate } from "react-router-dom";
import {
  FaFilePdf,
  FaQuoteLeft,
  FaFacebook,
  FaWhatsapp,
  FaRupeeSign,
} from "react-icons/fa";
import { HiReply } from "react-icons/hi";
import SearchFilter from "./SearchFilter";
import { format } from "date-fns";
import { GoReport } from "react-icons/go";
import { Link } from "react-router-dom";

export default function BuyCourse() {
  const { id } = useParams();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const handleContainerClick = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleRedirect = () => {
    navigate("/subscriptions");
  };
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
    const fetchCourseData = async () => {
      try {
        let response;
        if (id) {
          response = await axios.get(`${server}/course/${id}`);
          setCourse(response.data);
        } else {
          response = await axios.get(`${server}/course/getAll`);
          setCourses(response.data);
          setFilteredCourses(response.data);
        }
      } catch (err) {
        setError("Failed to load course details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  };

  const renderCourse = (courseData) => {
    if (!courseData) return null;

    return (
      <div>
        <div className="container mx-auto px-4 py-6 border rounded-md shadow-lg mb-8 bg-slate-200">
          <span className="font-bold text-xl">{courseData?.name}</span>
        </div>
        <div className="container mx-auto px-4 py-6 border rounded-md shadow-lg mb-8">
          <div className="mb-4">
            <span className="font-bold text-lg">{courseData?.name}</span>
            <br />
            <span className="text-gray-500 text-xs">
              by <b className="text-red-900">admin </b>
            </span>
            <span className="text-xs">
              {courseData.createdAt
                ? format(
                    new Date(courseData.updatedAt),
                    "EEE MMM dd, yyyy h:mm a"
                  )
                : "Date not available"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-slate-200">
            <div className="col-span-1 md:col-span-5 p-4 border rounded-lg">
              <div className="text-xl font-bold mb-4 text-blue-800">
                {courseData.name}
              </div>
              <h2 className="text-sm font-bold mb-4">ATTACHMENTS</h2>
              {courseData?.file && courseData.file.length > 0 ? (
                courseData.file.map((fileUrl, index) => (
                  <div
                    key={index}
                    className="mb-4 border w-full md:w-96 rounded-lg p-4 text-center cursor-pointer"
                    onClick={() => handleContainerClick(fileUrl)}
                    style={{ backgroundColor: "#FFA500", color: "white" }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span className="text-black text-left text-sm font-bold">
                          {courseData.name}
                        </span>
                        <span className="text-sm text-white font-bold">
                          {courseData.fileSizes && courseData.fileSizes[index]
                            ? `(${Math.round(
                                courseData.fileSizes[index] / 1024
                              )} MB)`
                            : "(Size unknown)"}
                          <span>Downloaded {courseData.downloads} times</span>
                        </span>
                      </div>
                      <FaFilePdf className="text-red-500 ml-4" size={84} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No file available.</p>
              )}

              <button
                onClick={handleRedirect}
                className="bg-red-200 p-2 md:p-3 flex items-center text-sm md:text-base"
              >
                <span className="font-bold whitespace-nowrap">
                  Download Cost
                </span>
                <b className="ml-3">
                  <FaRupeeSign />
                </b>
                <span className="font-semibold">{courseData.finalPrice}</span>
                <span className="line-through ml-2">
                  {courseData.originalPrice}
                </span>
              </button>
            </div>
            <div className="col-span-1 md:col-span-1 p-4 flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full m-1 mb-24">
                  <Link
                    to="/report"
                    title="Report this post"
                    className="flex items-center"
                  >
                    <GoReport className="text-orange-600" size={15} />
                  </Link>
                  <Link
                    to="/contactUs"
                    title="Quote this quote"
                    className="flex items-center"
                  >
                    <FaQuoteLeft className="text-gray-600" size={15} />
                  </Link>
                </div>
                <div className="flex justify-between w-full mb-2">
                  <Link
                    to="https://www.facebook.com/@sk.ziauddin.3152"
                    title="Share on Facebook"
                    className="flex items-center"
                  >
                    <FaFacebook className="text-blue-600" size={15} />
                  </Link>
                  <Link
                    to="https://chat.whatsapp.com/JRWKKjSRrYkJ91UEQKZYZZ"
                    title="Share on WhatsApp"
                    className="flex items-center"
                  >
                    <FaWhatsapp className="text-green-600" size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 p-4">
              <div>
                <span className="font-bold text-red-700">Admin</span>
                <br />
                <span className="text-xs">site admin</span>
                <br />
                <span className="text-sm">
                  Posts:{" "}
                  {courseData.categoryId
                    ? categories.find((cat) => cat.id === courseData.categoryId)
                        ?.courses.length
                    : 0}
                </span>
                <br />
                <span className="text-sm">
                  Joined:{" "}
                  {courseData.createdAt
                    ? format(
                        new Date(courseData.createdAt),
                        "EEE MMM dd, yyyy h:mm a"
                      )
                    : "Date not available"}
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/quote"
            title="Quote this quote"
            className="flex items-center mt-1 pl-2 border border-gray-300 rounded-md hover:bg-gray-100 w-full sm:w-2/12 md:w-3/12 lg:w-2/12"
          >
            <span className="font-bold text-red-800 mr-2">Post Reply</span>
            <HiReply className="text-red-800 transform" />
          </Link>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading course details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
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
