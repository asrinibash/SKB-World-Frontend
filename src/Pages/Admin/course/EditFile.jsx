/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { EditIcon, Plus, Trash2 } from "lucide-react";

const EditFile = ({ course, onClose, onUpdate }) => {
  const [fileInputs, setFileInputs] = useState([{ id: Date.now() }]); // Initial file input

  const addFileInput = () => {
    setFileInputs([...fileInputs, { id: Date.now() }]); // Add a new file input
  };

  const removeFileInput = (index) => {
    setFileInputs(fileInputs.filter((_, i) => i !== index)); // Remove specific file input
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("adminAuthToken");
    const formData = new FormData();

    values.files.forEach((file) => {
      if (file) formData.append("files", file); // Append each file to form data
    });

    try {
      const response = await axios.patch(
        `${server}/course/${course.id}/file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(`Files for course ${course.id} updated successfully.`);
      onUpdate(); // Refresh courses after update
      onClose(); // Close the edit file form
    } catch (error) {
      console.error(`Error updating files for course ${course.id}:`, error);
    }
  };

  return (
    <Formik
      initialValues={{ files: Array(fileInputs.length).fill(null) }}
      validationSchema={Yup.object().shape({
        files: Yup.array().of(Yup.mixed().required("File is required")),
      })}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <h2>Edit Files for {course.file}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Files:</label>
            {fileInputs.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <Field name={`files[${index}]`}>
                  {({ field }) => (
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          `files[${index}]`,
                          event.currentTarget.files[0]
                        ); // Set the file
                      }}
                      className="border rounded-md w-full p-2 dark:bg-black"
                      required // Mark as required if necessary
                    />
                  )}
                </Field>
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
  );
};

export default EditFile;
