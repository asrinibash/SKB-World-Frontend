/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { EditIcon, Trash2, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup"; // For validation
import { useEffect, useState } from "react";

const AddCourse = ({ onClose, onCourseAdded }) => {
  const [categories, setCategories] = useState([]);
  const [fileInputs, setFileInputs] = useState([{ file: null }]); // State to manage multiple file inputs

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/category/getAll`);
      setCategories(response.data); // Assuming the response is an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Must be positive"),
    categoryName: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    files: Yup.array()
      .of(Yup.mixed().required("File is required")) // Validation for array of files
      .min(1, "At least one file is required"), // At least one file must be present
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("adminAuthToken");

    // Check if the course name already exists

    // Create FormData for the new course
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("categoryName", values.categoryName);
    formData.append(
      "tags",
      JSON.stringify(values.tags.split(",").map((tag) => tag.trim()))
    );

    // Check if files array exists
    if (values.files && values.files.length) {
      values.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      await axios.post(`${server}/course/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success message
      toast.success("Course added successfully.");
      if (onCourseAdded) onCourseAdded(); // Check if onCourseAdded exists
      resetForm(); // Reset the form
    } catch (error) {
      toast.error("Course Name already added.");
    }
    setSubmitting(false); // Move setSubmitting(false) outside the try-catch
  };

  const addFileInput = () => {
    setFileInputs([...fileInputs, { file: null }]); // Add a new file input
  };

  const removeFileInput = (index) => {
    if (fileInputs.length > 1) {
      setFileInputs(fileInputs.filter((_, i) => i !== index)); // Remove the file input at the specified index
    }
  };

  return (
    <div className="add-course-form p-4">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Add Course</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              categoryName: "",
              tags: "",
              files: [], // Initialize as empty array
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Name:</label>
                  <Field
                    type="text"
                    name="name"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Description:
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Price:</label>
                  <Field
                    type="number"
                    name="price"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Category:</label>
                  <Field
                    as="select"
                    name="categoryName"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  >
                    <option value="" label="Select category" />
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option value="" label="No categories available" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="categoryName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Tags:</label>
                  <Field
                    type="text"
                    name="tags"
                    placeholder="Enter comma-separated tags (e.g., react,javascript,frontend)"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium">Files:</label>
                  {fileInputs.map((input, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="file"
                        name={`files[${index}]`}
                        onChange={(event) =>
                          setFieldValue(
                            `files[${index}]`,
                            event.currentTarget.files[0]
                          )
                        }
                        className="border rounded-md w-full p-2 dark:bg-black"
                      />
                      {fileInputs.length > 1 && ( // Only show remove button if there is more than one input
                        <Button
                          type="button"
                          onClick={() => removeFileInput(index)} // Remove the specific file input
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </Button>
                      )}
                      <ErrorMessage
                        name={`files[${index}]`}
                        component="div"
                        className="text-red-500 text-sm mt-1 ml-2"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addFileInput}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg border border-blue-700 hover:bg-blue-600 transition duration-200 ease-in-out"
                  >
                    <Plus className="mr-2" /> Add Another File
                  </Button>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
                  >
                    <EditIcon className="mr-2" /> Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex items-center bg-gray-300 text-black px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-400 transition duration-200 ease-in-out"
                  >
                    <Trash2 className="mr-2" /> Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;
