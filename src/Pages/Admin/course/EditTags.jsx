import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditTags = ({ course, onClose, onUpdate }) => {
  const validationSchema = Yup.object({
    tags: Yup.array().of(Yup.string().required("Tag is required")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("adminAuthToken");

    try {
      await axios.patch(
        `${server}/course/${course.id}/tags`,
        {
          tags: values.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(); // Refresh courses after update
      onClose(); // Close the edit form
    } catch (error) {
      console.error("Error updating tags:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-tags-form p-4">
      <h2>Edit Tags for {course.name}</h2>
      <Formik
        initialValues={{ tags: course?.tags || [""] }} // Ensure initial value is set correctly
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldArray name="tags">
              {({ push, remove, form }) => (
                <>
                  {form.values.tags.map(
                    (
                      tag,
                      index // Use form.values.tags instead of tags
                    ) => (
                      <div key={index} className="mb-4">
                        <Field
                          name={`tags.${index}`}
                          placeholder="Enter tag"
                          className="border rounded-md w-full p-2"
                        />
                        <ErrorMessage
                          name={`tags.${index}`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 text-white"
                        >
                          Remove
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    type="button"
                    onClick={() => push("")}
                    className="bg-blue-500 text-white"
                  >
                    Add Tag
                  </Button>
                </>
              )}
            </FieldArray>
            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save Tags
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </Button>
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
