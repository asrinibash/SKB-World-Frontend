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

const EditGroup = ({ group, onClose, onUpdate }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div className="edit-group-form p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Group</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: group?.name || "",
              description: group?.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const token = localStorage.getItem("adminAuthToken"); // Retrieve the token
              try {
                await axios.put(`${server}/group/${group.id}`, values, {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add token to headers
                  },
                });
                onUpdate(); // Refresh groups after update
                onClose(); // Close the edit form
              } catch (error) {
                console.error("Error updating group:", error);
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
                    <EditIcon className="mr-2" /> Update Group
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

export default EditGroup;
