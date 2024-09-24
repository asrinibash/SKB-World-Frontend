/* eslint-disable react/prop-types */
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { EditIcon, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card"; // Adjust import paths as needed
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

const AddUser = ({ onClose, onUserAdded }) => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    image: Yup.string().url("Invalid URL format").optional(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Show success toast before adding user
      toast.success("User added successfully!");

      // Delay the API call for a brief moment to show the toast
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

      // Now add the user
      await axios.post(`${server}/user/signup`, values);

      onUserAdded(); // Refresh users after addition
      resetForm(); // Reset the form fields
      onClose(); // Close the add form
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-user-form p-4">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
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
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Password:</label>
                  <Field
                    type="password"
                    name="password"
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
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
                    className="text-red-600"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
                  >
                    <EditIcon className="mr-2" /> Add User
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

export default AddUser;
