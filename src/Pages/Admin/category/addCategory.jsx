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

const AddCategory = ({ onClose, onCategoryAdded }) => {
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().url("Invalid URL"),
  });
  const token = localStorage.getItem("authToken");
  console.log("Token:", token); // Check if the token exists
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token); // Check if the token exists

    try {
      await axios.post(`${server}/category/create`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization header
        },
      });
      toast.success("Category added successfully!");
      onCategoryAdded(); // Refresh categories after addition
      onClose(); // Close the form
      resetForm();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-category-form p-4">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              image: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
                  <label className="block text-sm font-medium">
                    Image URL:
                  </label>
                  <Field
                    type="url"
                    name="image"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="image"
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
                    <EditIcon className="mr-2" /> Add Category
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

export default AddCategory;
