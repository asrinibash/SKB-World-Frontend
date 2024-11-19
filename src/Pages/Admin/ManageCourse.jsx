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
import skbImage from "../../assets/skbcompany2.png";
import axios from "axios";
import { server } from "../../main";
import { Trash2, EditIcon, Tags, Paperclip } from "lucide-react";
import EditCourse from "./course/editCourse";
import AddCourse from "./course/addCourse";
import { Button } from "@radix-ui/themes";
import EditTags from "./course/EditTags";
import EditFile from "./course/EditFile";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false);
  const [editingTagsCourse, setEditingTagsCourse] = useState(null);
  const [editingFileCourse, setEditingFileCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 courses per page

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${server}/course/getAll`);
      setCourses(response.data);
    } catch (error) {
      setError("Error fetching courses. Please try again.");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) return console.error("Authorization token is missing.");

      axios
        .delete(`${server}/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          fetchCourses();
          console.log(`Course with ID ${courseId} deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting course with ID ${courseId}:`, error);
        });
    }
  };

  const closeEditForm = () => setEditingCourse(null);
  const closeAddForm = () => setAddingCourse(false);
  const closeEditTagsForm = () => setEditingTagsCourse(null);
  const closeEditFileForm = () => setEditingFileCourse(null);
  const refreshCourses = () => fetchCourses();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCourses = courses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Courses</CardTitle>
          <CardDescription>
            View and manage the list of courses.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button
        onClick={() => setAddingCourse(true)}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        <EditIcon className="mr-2" /> Add Course
      </Button>
      <Card>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center mt-4 mb-4 p-10 sm:p-20 md:p-20">
              <div className="relative flex justify-center items-center h-14 w-14">
                <div className="absolute animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-500"></div>
                <img
                  src={skbImage}
                  alt="Avatar thinking"
                  className="rounded-full h-10 w-10 z-8"
                />
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sl. No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Final Price</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedCourses.map((course, index) => (
                    <TableRow key={course.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>{course.originalPrice}</TableCell>
                      <TableCell>{course.finalPrice}</TableCell>
                      <TableCell>{course.tags.join(", ")}</TableCell>
                      <TableCell>{course.downloads}</TableCell>
                      <TableCell>{course.file.length}</TableCell>
                      <TableCell>
                        {new Date(course.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1"
                        >
                          <Trash2 />
                        </Button>
                        <Button
                          onClick={() => handleEditCourse(course)}
                          className="p-1"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => setEditingTagsCourse(course)}
                          className="p-1"
                        >
                          <Tags />
                        </Button>
                        <Button
                          onClick={() => setEditingFileCourse(course)}
                          className="p-1"
                        >
                          <Paperclip />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center items-center mt-6 mb-4 space-x-3">
                <Button
                  onClick={() => handlePreviousPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
                >
                  &lt; Previous
                </Button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-primary text-white p-3 rounded-lg"
                        : "bg-white text-gray-700 p-3 rounded-lg hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button
                  onClick={() => handleNextPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
                >
                  Next &gt;
                </Button>
              </div>
            </>
          )}
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
        <AddCourse onClose={closeAddForm} onAdd={refreshCourses} />
      )}
      {editingTagsCourse && (
        <EditTags
          course={editingTagsCourse}
          onClose={closeEditTagsForm}
          onUpdate={refreshCourses}
        />
      )}
      {editingFileCourse && (
        <EditFile
          course={editingFileCourse}
          onClose={closeEditFileForm}
          onUpdate={refreshCourses}
        />
      )}
    </div>
  );
};

export default ManageCourses;
