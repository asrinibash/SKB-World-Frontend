import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../Components/Admin/Ui/Card";
import skbImage from "../../assets/skbcompany2.png";
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
import { Trash2, EditIcon, UserPlus, Eye } from "lucide-react";
import EditGroup from "./group/editGroup";
import AddGroup from "./group/addGroup";
import AddUserGroup from "./group/addUserGroup";
import ViewUserGroup from "./group/ViewUserGroup";
import { Button } from "@radix-ui/themes";
import { AiFillFileAdd } from "react-icons/ai";
import AddCourse from "./group/addCourse";
import ViewCourseGroup from "./group/viewCourseGroup";

const ITEMS_PER_PAGE = 10; // Number of items per page

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [addingGroup, setAddingGroup] = useState(false);
  const [addingUserToGroup, setAddingUserToGroup] = useState(null);
  const [viewingGroupUsers, setViewingGroupUsers] = useState(null);
  const [viewingGroupCourses, setViewingGroupCourses] = useState(null);
  const [addingCourseToGroup, setAddingCourseToGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  const handleAddCourse = (groupId) => {
    setAddingCourseToGroup(groupId);
  };

  const closeAddCourseForm = () => {
    setAddingCourseToGroup(null);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${server}/group/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setError("Failed to load groups.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
  };

  const handleDeleteGroup = (groupId) => {
    const confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">If the group is empty, it will be deleted. Otherwise, all group members will be removed before deletion.</p>
        <div class="flex justify-center space-x-4">
          <button id="okButton" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
          <button id="cancelButton" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmationBox);

    document.getElementById("okButton").onclick = async () => {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) {
        console.error("Authorization token is missing. Please log in again.");
        document.body.removeChild(confirmationBox);
        return;
      }

      setTimeout(async () => {
        try {
          await axios.delete(`${server}/group/${groupId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchGroups();
        } catch (error) {
          console.error(`Error deleting group with ID ${groupId}:`, error);
        }
        document.body.removeChild(confirmationBox);
      }, 1000);
    };

    document.getElementById("cancelButton").onclick = () => {
      document.body.removeChild(confirmationBox);
    };
  };

  const handleViewUsers = (groupId) => {
    setViewingGroupUsers(groupId);
  };

  const handleViewCourses = (groupId) => {
    setViewingGroupCourses(groupId);
  };

  const handleAddMember = (groupId) => {
    setAddingUserToGroup(groupId);
  };

  const closeEditForm = () => {
    setEditingGroup(null);
  };

  const closeAddForm = () => {
    setAddingGroup(false);
  };

  const closeAddUserForm = () => {
    setAddingUserToGroup(null);
  };

  const closeViewUsers = () => {
    setViewingGroupUsers(null);
  };

  const closeViewCourses = () => {
    setViewingGroupCourses(null);
  };

  const refreshGroups = () => {
    fetchGroups();
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGroups = groups.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Groups</CardTitle>
          <CardDescription>View and manage the list of groups.</CardDescription>
        </CardHeader>
      </Card>
      <Button
        onClick={() => setAddingGroup(true)}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        <EditIcon className="mr-2" /> Add Group
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl. No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>CreatedAt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentGroups.map((group, index) => (
                  <TableRow key={group.id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell>
                      {new Date(group.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        onClick={() => handleEditGroup(group)}
                        className="p-1"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleAddMember(group.id)}
                        className="p-1"
                      >
                        <UserPlus />
                      </Button>
                      <Button
                        onClick={() => handleAddCourse(group.id)}
                        className="p-1"
                      >
                        <AiFillFileAdd />
                      </Button>
                      <Button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="p-1"
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        onClick={() => handleViewUsers(group.id)}
                        className="p-1"
                      >
                        <Eye />
                      </Button>
                      <Button
                        onClick={() => handleViewCourses(group.id)}
                        className="p-1"
                      >
                        <Eye />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={
                  currentPage === i + 1 ? "bg-primary text-white p-2" : ""
                }
              >
                {i + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </Button>
          </div>
        </CardContent>
      </Card>

      {editingGroup && (
        <EditGroup
          group={editingGroup}
          onClose={closeEditForm}
          onSave={refreshGroups}
        />
      )}
      {addingGroup && (
        <AddGroup onClose={closeAddForm} onSave={refreshGroups} />
      )}
      {addingUserToGroup && (
        <AddUserGroup groupId={addingUserToGroup} onClose={closeAddUserForm} />
      )}
      {viewingGroupUsers && (
        <ViewUserGroup groupId={viewingGroupUsers} onClose={closeViewUsers} />
      )}
      {addingCourseToGroup && (
        <AddCourse groupId={addingCourseToGroup} onClose={closeAddCourseForm} />
      )}
      {viewingGroupCourses && (
        <ViewCourseGroup
          groupId={viewingGroupCourses}
          onClose={closeViewCourses}
        />
      )}
    </div>
  );
};

export default ManageGroups;
