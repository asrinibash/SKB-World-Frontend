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
import { Trash2, EditIcon } from "lucide-react";
import EditCourse from "./course/editCourse"; // Import the EditCourse component
import AddCourse from "./course/addCourse"; // Import the AddCourse component
import { Button } from "@radix-ui/themes";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false); // Manage Add Course form visibility

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

  const handleDeleteCourse = async (courseId) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    try {
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
  };

  const closeEditForm = () => {
    setEditingCourse(null); // Close the edit form
  };

  const closeAddForm = () => {
    setAddingCourse(false); // Close the add course form
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
                <TableHead>createdAt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    {" "}
                    {new Date(course.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleEditCourse(course)}
                      className="p-1"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1"
                    >
                      <Trash2 />
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
        <AddCourse onClose={closeAddForm} onCourseAdded={refreshCourses} />
      )}
    </div>
  );
};

export default ManageCourses;
