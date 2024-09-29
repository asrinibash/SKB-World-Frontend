import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../Components/Admin/Ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../Components/Admin/Ui/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main";
import { Trash2, EditIcon, Tags, Paperclip } from "lucide-react";
import EditCourse from "./course/editCourse"; // Import the EditCourse component
import AddCourse from "./course/addCourse"; // Import the AddCourse component
import { Button } from "@radix-ui/themes";
import EditTags from "./course/EditTags";
import EditFile from "./course/EditFile"; // Import the EditFile component

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false); // Manage Add Course form visibility
  const [editingTagsCourse, setEditingTagsCourse] = useState(null); // Manage Edit Tags form visibility
  const [editingFileCourse, setEditingFileCourse] = useState(null); // Manage Edit File form visibility

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${server}/course/getAll`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course); // Set the course to edit
  };

  const handleDeleteCourse = (courseId) => {
    // Show confirmation dialog first
    const confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">Do you want to delete this course?</p>
        <div class="flex justify-center space-x-4">
          <button id="okButton" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
          <button id="cancelButton" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    `;

    // Append the confirmation box to the body
    document.body.appendChild(confirmationBox);

    // Handle OK button click
    document.getElementById("okButton").onclick = async () => {
      const token = localStorage.getItem("adminAuthToken"); // Retrieve the token
      if (!token) {
        console.error("Authorization token is missing. Please log in again.");
        document.body.removeChild(confirmationBox); // Remove the confirmation box
        return;
      }

      setTimeout(async () => {
        try {
          // Perform delete request with authorization token
          await axios.delete(`${server}/course/${courseId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          });
          console.log(`Course with ID ${courseId} deleted successfully.`);
          fetchCourses(); // Refresh the course list after deletion
        } catch (error) {
          console.error(`Error deleting course with ID ${courseId}:`, error);
        }
        document.body.removeChild(confirmationBox); // Remove the confirmation box after the action
      }, 1000); // Delay deletion by 1 second (1000ms)
    };

    // Handle Cancel button click
    document.getElementById("cancelButton").onclick = () => {
      document.body.removeChild(confirmationBox); // Just remove the confirmation box on cancel
    };
  };

  const closeEditForm = () => {
    setEditingCourse(null); // Close the edit form
  };

  const closeAddForm = () => {
    setAddingCourse(false); // Close the add course form
  };

  const closeEditTagsForm = () => {
    setEditingTagsCourse(null); // Close the edit tags form
  };

  const closeEditFileForm = () => {
    setEditingFileCourse(null); // Close the edit file form
  };

  const refreshCourses = () => {
    fetchCourses(); // Refresh courses after update
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Courses</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View and manage the list of courses.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button
        onClick={() => setAddingCourse(true)} // Open Add Course form
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        <EditIcon className="mr-2" /> Add Course
      </Button>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>{course.tags.join(", ")}</TableCell>
                  <TableCell>{course.downloads}</TableCell>
                  <TableCell>{course.file.length}</TableCell>
                  <TableCell>
                    {new Date(course.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleDeleteCourse(course.id)} // Delete course
                      className="p-1"
                    >
                      <Trash2 />
                    </Button>
                    <Button
                      onClick={() => handleEditCourse(course)} // Edit course
                      className="p-1"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingTagsCourse(course); // Open Edit Tags form
                      }} // Edit course tags
                      className="p-1"
                    >
                      <Tags />
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingFileCourse(course); // Open Edit File form
                      }} // Edit course file
                      className="p-1"
                    >
                      <Paperclip />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editingCourse && (
        <EditCourse
          course={editingCourse}
          onClose={closeEditForm}
          onUpdate={refreshCourses}
        />
      )}
      {addingCourse && (
        <AddCourse
          onClose={closeAddForm}
          onAdd={refreshCourses} // Refresh courses after adding a new one
        />
      )}
      {editingTagsCourse && (
        <EditTags
          course={editingTagsCourse}
          onClose={closeEditTagsForm}
          onUpdate={refreshCourses} // Refresh courses after updating tags
        />
      )}
      {editingFileCourse && (
        <EditFile
          course={editingFileCourse}
          onClose={closeEditFileForm}
          onUpdate={refreshCourses} // Refresh courses after updating the file
        />
      )}
    </div>
  );
};

export default ManageCourses;
