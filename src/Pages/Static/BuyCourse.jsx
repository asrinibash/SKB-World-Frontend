/* eslint-disable no-unused-vars */
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main.jsx";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import skbImage from "../../assets/skbcompany2.png";
import { FaArrowUp } from "react-icons/fa"; // Import an up arrow icon
export default function BuyCourse({ courseId }) {
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
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [visibleComments, setVisibleComments] = useState(5); // Initially show 5 comments
  const [replyingTo, setReplyingTo] = useState(null); // Track comment being replied to
  const [replyText, setReplyText] = useState(""); // Text for reply

  // const handleShowMoreComments1 = () => {
  //   setVisibleComments((prev) => prev + 3); // Load more comments
  // };

  const handlePostReplyClick1 = (commentId) => {
    setReplyingTo(commentId); // Set the comment ID to show the reply form
  };

  const handleReplySubmit1 = async (parentCommentId, e) => {
    e.preventDefault();
    const token = localStorage.getItem("userAuthState");

    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const currentCourseId = course?.id || courseId;

    console.log("Submitting reply to comment with ID:", parentCommentId);

    try {
      const response = await axios.post(`${server}/comment/child`, {
        userId,
        courseId: currentCourseId,
        content: replyText, // Use replyText instead of comment for the reply content
        parentCommentId, // Set parentCommentId for the reply
      });

      console.log("Comment added:", response.data);

      // Optimistically update the comment state
      setFilteredCourses((prevCourses) => {
        return prevCourses.map((course) => {
          if (course.id === currentCourseId) {
            return {
              ...course,
              comments: [...course.comments, response.data], // Update comments
            };
          }
          return course;
        });
      });

      setReplyText(""); // Clear the reply input
      setShowCommentBox(false); // Close the reply box
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

  const handleShowMoreComments = () => {
    setVisibleComments((prevVisible) => prevVisible + 5); // Show 5 more comments on each click
  };

  // Fetch the user id from the local storage and decode it using jwt-decode
  useEffect(() => {
    const token = localStorage.getItem("userAuthState");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("User ID from JWT token:", decodedToken.userId); // Print user ID
    }
  }, []);

  const handleContainerClick = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handlePostReplyClick = (e) => {
    e.preventDefault(); // Prevents page navigation
    setShowCommentBox(!showCommentBox); // Toggle the comment box visibility

    // Check if `course` is defined and get its ID
    const currentCourseId = course?.id || courseId;

    if (!currentCourseId) {
      console.error("Course ID is missing.");
      return;
    }

    // Optionally, log userId and currentCourseId
    const token = localStorage.getItem("userAuthState");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log("User ID:", userId);
      console.log("Course ID:", currentCourseId);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update comment state
  };

  // const handleSubmitComment = (e) => {
  //   e.preventDefault();
  //   // Handle comment submission logic here
  //   console.log("Submitted comment:", comment);
  //   setComment(""); // Reset the comment input after submission
  // };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userAuthState");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const currentCourseId = course?.id || courseId;

    try {
      const response = await axios.post(`${server}/comment/parent`, {
        userId,
        courseId: currentCourseId,
        content: comment,
      });
      console.log("Comment added:", response.data);
      setComment("");
      setShowCommentBox(false);
    } catch (error) {
      console.error("Error adding comment:", error);
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
        const response = id
          ? await axios.get(`${server}/course/${id}`)
          : await axios.get(`${server}/course/getAll`);

        if (id) {
          setCourse(response.data);
        } else {
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
      <>
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
        <div>
          <div className="container mx-auto px-4 py-6 border rounded-md shadow-lg mb-8 ">
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

            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 ">
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
                  className=" p-2 md:p-3 flex items-center text-sm md:text-base"
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
                      ? categories.find(
                          (cat) => cat.id === courseData.categoryId
                        )?.courses.length
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
            <div>
              {/* Button to toggle the comment box */}
              <div className="p-4 w-full mx-auto">
                <button
                  onClick={handlePostReplyClick}
                  className="flex items-center border rounded-md px-4 py-2 mb-4"
                >
                  <span className="font-bold mr-2">Post Reply</span>
                  <HiReply />
                </button>
                {showCommentBox && (
                  <div className="mt-4">
                    <form
                      onSubmit={handleSubmitComment}
                      className="flex flex-col"
                    >
                      <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your comment..."
                        className="border  rounded-md p-2 mb-2"
                        rows="4"
                      />
                      <button
                        type="submit"
                        className="bg-primary rounded-md p-2"
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                )}

                <div className="space-y-4">
                  {courseData.comments
                    .slice(0, visibleComments)
                    .map((comment) => (
                      <div
                        key={comment.id}
                        className={`flex items-start space-x-3 border-b pb-4 ${
                          comment.parentCommentId ? "ml-10" : "" // Indent child comments
                        }`}
                      >
                        <img
                          src={skbImage || "default-avatar-url"}
                          alt={comment.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {comment.userName}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-3 mt-2">
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                              <FaThumbsUp className="mr-1" />{" "}
                              {comment.likes || 0}
                            </button>
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                              <FaThumbsDown className="mr-1" />{" "}
                              {comment.dislikes || 0}
                            </button>
                            <button
                              onClick={() => handlePostReplyClick1(comment.id)}
                              className="text-gray-500 hover:text-blue-500"
                            >
                              Reply
                            </button>
                          </div>

                          {/* Reply form for the specific comment */}
                          {replyingTo === comment.id && (
                            <div className="mt-3 ml-10">
                              {" "}
                              {/* Extra indent for reply input */}
                              <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full border rounded p-2"
                              />
                              <button
                                onClick={(e) =>
                                  handleReplySubmit1(comment.id, e)
                                }
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                              >
                                Post Reply
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {courseData.comments.length > visibleComments && (
                    <div className="text-center mt-4">
                      <button
                        onClick={handleShowMoreComments}
                        className="text-blue-500 hover:underline"
                      >
                        Read More 👇
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional rendering for the comment box */}
            </div>
          </div>
        </div>
      </>
    );
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

// PropTypes validation for courseId
BuyCourse.propTypes = {
  courseId: PropTypes.string.isRequired, // Validate courseId as a required string
};
