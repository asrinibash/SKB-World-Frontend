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
import { Trash2, EditIcon, UserPlus, Eye } from "lucide-react";
import EditGroup from "./group/editGroup";
import AddGroup from "./group/addGroup";
import AddUserGroup from "./group/addUserGroup";
import ViewUserGroup from "./group/ViewUserGroup"; // Import ViewUserGroup
import { Button } from "@radix-ui/themes";
import { AiFillFileAdd } from "react-icons/ai";
import AddCourse from "./group/addCourse";
import ViewCourseGroup from "./group/viewCourseGroup";

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [addingGroup, setAddingGroup] = useState(false);
  const [addingUserToGroup, setAddingUserToGroup] = useState(null);
  const [viewingGroupUsers, setViewingGroupUsers] = useState(null);
  const [viewingGroupCourses, setViewingGroupCourses] = useState(null); // Separate state for viewing courses
  const [addingCourseToGroup, setAddingCourseToGroup] = useState(null);

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
    try {
      const response = await axios.get(`${server}/group/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
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
          alert(
            "If the group is empty, it will be deleted. Otherwise, all group members will be removed before deletion."
          );
          await axios.delete(`${server}/group/${groupId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(`Group with ID ${groupId} deleted successfully.`);
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
    setViewingGroupUsers(groupId); // Set group ID for viewing users
  };

  const handleViewCourses = (groupId) => {
    setViewingGroupCourses(groupId); // Set group ID for viewing courses
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
    setViewingGroupUsers(null); // Close user view modal
  };

  const closeViewCourses = () => {
    setViewingGroupCourses(null); // Close course view modal
  };

  const refreshGroups = () => {
    fetchGroups();
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Groups</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View and manage the list of groups.
          </CardDescription>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
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
        </CardContent>
      </Card>

      {editingGroup && (
        <EditGroup
          group={editingGroup}
          onClose={closeEditForm}
          onUpdate={refreshGroups}
        />
      )}
      {addingGroup && (
        <AddGroup onClose={closeAddForm} onGroupAdded={refreshGroups} />
      )}
      {addingUserToGroup && (
        <AddUserGroup
          groupId={addingUserToGroup}
          onClose={closeAddUserForm}
          onUserAdded={refreshGroups}
        />
      )}
      {viewingGroupUsers && (
        <ViewUserGroup groupId={viewingGroupUsers} onClose={closeViewUsers} />
      )}
      {viewingGroupCourses && (
        <ViewCourseGroup
          groupId={viewingGroupCourses}
          onClose={closeViewCourses}
        />
      )}
      {addingCourseToGroup && (
        <AddCourse
          groupId={addingCourseToGroup}
          onClose={closeAddCourseForm}
          onCourseAdded={refreshGroups}
        />
      )}
    </div>
  );
};

export default ManageGroups;
