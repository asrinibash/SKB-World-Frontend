/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { EditIcon, Trash2 } from "lucide-react";
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
    categoryName: Yup.string().required("Category is required"), // updated to categoryName
    tags: Yup.string().required("Tags are required"),
    file: Yup.mixed().required("File is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("categoryName", values.categoryName);
    formData.append(
      "tags",
      JSON.stringify(values.tags.split(",").map((tag) => tag.trim()))
    );
    formData.append("file", values.file);

    // Log FormData
    console.log("FormData to be sent:", [...formData]);

    try {
      await axios.post(`${server}/course/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Success handling...
    } catch (error) {
      console.error("Error adding course:", error.response);
      toast.error("Failed to add course. Please try again.");
    } finally {
      setSubmitting(false);
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
              categoryName: "", // updated to match backend
              tags: "",
              file: null,
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
                    name="categoryName" // updated to categoryName
                    className="border rounded-md w-full p-2 dark:bg-black"
                  >
                    <option value="" label="Select category" />
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {" "}
                          {/* Pass category name */}
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option value="" label="No categories available" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="categoryName" // updated to categoryName
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
                  <label className="block text-sm font-medium">File:</label>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) =>
                      setFieldValue("file", event.currentTarget.files[0])
                    }
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
                  >
                    <EditIcon className="mr-2" /> Add Course
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg border border-red-700 hover:bg-red-600 transition duration-200 ease-in-out"
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
