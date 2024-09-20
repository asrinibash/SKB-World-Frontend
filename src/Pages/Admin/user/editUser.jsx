/* eslint-disable react/prop-types */
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { Trash2, EditIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation

const EditUser = ({ user, onClose, onUpdate }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <div className="edit-user-form p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.put(`${server}/user/${user.id}`, values);
                onUpdate(); // Fetch users after update
                onClose(); // Close the edit form
              } catch (error) {
                console.error("Error updating user:", error);
              } finally {
                setSubmitting(false);
              }
            }}
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
                  <label className="block text-sm font-medium">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    disabled // Disable the email field
                    className="border rounded-md w-full p-2 dark:bg-black"
                  />
                  <ErrorMessage
                    name="email"
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
                    <EditIcon className="mr-2" /> Update User
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

export default EditUser;
