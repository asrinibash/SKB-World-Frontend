/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../main";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../Components/Admin/Ui/Table";
import { Button, Card } from "@radix-ui/themes";
import { Trash2 } from "lucide-react"; // Icon for deleting users
import { CardContent } from "../../../Components/Admin/Ui/Card";

const ViewCourseGroup = ({ groupId, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${server}/group/getAllGroupCourse/${groupId}`
        );
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [groupId]);

  //   const handleRemoveUser = async (userId) => {
  //     try {
  //       await axios.delete(
  //         `${server}/group/removeUser/${groupId}/users/${userId}`
  //       );
  //       setUsers(users.filter((user) => user.id !== userId));
  //     } catch (err) {
  //       console.error("Error removing user from group:", err);
  //       setError("Failed to remove user from group.");
  //     }
  //   };

  return (
    <div className="view-user-group p-4">
      <h2 className="text-xl mb-4">Group Courses</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  {/* <TableHead>Email</TableHead> */}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    {/* <TableCell>{course.email}</TableCell> */}
                    <TableCell>
                      <Button
                        // onClick={() => handleRemoveUser(user.id)}
                        className="p-1"
                      >
                        <Trash2 /> {/* Icon for deleting a user */}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="mt-4">
        <Button onClick={onClose} className="bg-red-500 text-white px-4 py-2">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewCourseGroup;
