/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../main";
import { Button } from "@radix-ui/themes";
import { ToastProvider, Toast, ToastTitle } from "@radix-ui/react-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card";

const AddCourseGroup = ({ groupId, onClose, onCourseAdded }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/getAll`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c.name === selectedCategory);
      if (category) {
        setCourses(category.courses); // Set courses directly from selected category
      }
    }
  }, [selectedCategory, categories]);

  const handleAddCourse = async () => {
    if (!selectedCategory || !selectedCourse) return;

    try {
      await axios.post(`${server}/group/addCourse/${groupId}/courses`, {
        categoryName: selectedCategory,
        courseName: selectedCourse,
      });
      onCourseAdded();
      onClose();
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "Course is already part of this group."
      ) {
        setToastMessage("Course is already part of this group.");
        setShowToast(true);
      } else {
        console.error("Error adding course to group:", err);
        setError("Failed to add course to group.");
      }
    }
  };

  return (
    <ToastProvider>
      <div className="add-course-group p-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Course to Group</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="error text-red-500">{error}</p>}

            {/* Category dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex items-center justify-between border  px-4 py-2 w-60 rounded-md ">
                  <span>Select Category</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.292 7.292a1 1 0 011.416 0L10 10.586l3.292-3.294a1 1 0 111.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" shadow-lg rounded-md mt-2 w-60">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onSelect={() => setSelectedCategory(category.name)}
                    className="px-4 py-2  cursor-pointer "
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Show selected category */}
            {selectedCategory && (
              <p className="mt-2 text-gray-600">
                Selected Category:{" "}
                <span className="font-medium">{selectedCategory}</span>
              </p>
            )}

            {/* Course dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex items-center justify-between border  px-4 py-2 w-60 rounded-md ">
                  <span>Select Course</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.292 7.292a1 1 0 011.416 0L10 10.586l3.292-3.294a1 1 0 111.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" shadow-lg rounded-md mt-2 w-60">
                {courses.map((course) => (
                  <DropdownMenuItem
                    key={course.id}
                    onSelect={() => setSelectedCourse(course.name)}
                    className="px-4 py-2 cursor-pointer "
                  >
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Show selected course */}
            {selectedCourse && (
              <p className="shadow-lg rounded-md mt-2 w-60">
                Selected Course:{" "}
                <span className="px-4 py-2 cursor-pointer ">
                  {selectedCourse}
                </span>
              </p>
            )}

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="submit"
                onClick={handleAddCourse}
                className="bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
              >
                Add Course
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg border border-red-700 hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Toast Notification */}
        {showToast && (
          <Toast open={showToast} onOpenChange={setShowToast}>
            <ToastTitle>{toastMessage}</ToastTitle>
          </Toast>
        )}
      </div>
    </ToastProvider>
  );
};

export default AddCourseGroup;
