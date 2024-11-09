import PropTypes from "prop-types";
import axios from "axios";
import { server } from "../../../main";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const EditTags = ({ course, onClose, onUpdate }) => {
  const validationSchema = Yup.object({
    tags: Yup.array().of(Yup.string().required("Tag is required")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("adminAuthToken");

    try {
      await axios.patch(
        `${server}/course/${course.id}/tags`,
        { tags: values.tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating tags:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md mx-auto animate-float-advanced">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
        Edit Tags for {course.name}
      </h2>

      <Formik
        initialValues={{ tags: course?.tags || [""] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FieldArray name="tags">
              {({ push, remove, form }) => (
                <div className="space-y-2">
                  {form.values.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Field
                        name={`tags.${index}`}
                        placeholder="Enter tag"
                        className="flex-grow border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name={`tags.${index}`}
                        component="div"
                        className="text-red-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Remove tag"
                      >
                        <MdDeleteForever size={24} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="flex items-center text-blue-600 hover:text-blue-800 mt-2 space-x-1"
                  >
                    <IoMdAddCircle size={20} />
                    <span>Add Tag</span>
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Tags
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// PropTypes validation
EditTags.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditTags;
