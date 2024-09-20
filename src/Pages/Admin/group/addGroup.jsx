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

const AddGroup = ({ onClose, onGroupAdded }) => {
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("authToken");
    const adminId = localStorage.getItem("adminId"); // Assuming adminId is stored in localStorage

    // Check if the token is available
    if (!token) {
      toast.error("Authorization token is missing. Please log in again.");
      setSubmitting(false);
      return;
    }

    try {
      // Send the request with adminId in the URL
      await axios.post(`${server}/group/${adminId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization header
        },
      });
      toast.success("Group added successfully!");
      onGroupAdded(); // Refresh groups after addition
      onClose(); // Close the form
      resetForm();
    } catch (error) {
      console.error("Error adding group:", error);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Failed to add group. Please try again."
        );
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-group-form p-4">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Add Group</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
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

                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
                  >
                    <EditIcon className="mr-2" /> Add Group
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

export default AddGroup;
