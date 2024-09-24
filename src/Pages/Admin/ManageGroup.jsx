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

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [addingGroup, setAddingGroup] = useState(false);
  const [addingUserToGroup, setAddingUserToGroup] = useState(null);
  const [viewingGroupUsers, setViewingGroupUsers] = useState(null); // New state for viewing group users

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

  const handleDeleteGroup = async (groupId) => {
    const token = localStorage.getItem("adminAuthToken");
    try {
      alert("If group is empty then delete else delete all the groupmember ");
      await axios.delete(`${server}/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchGroups();
    } catch (error) {
      console.error(`Error deleting group with ID ${groupId}:`, error);
    }
  };

  const handleViewUsers = (groupId) => {
    setViewingGroupUsers(groupId); // Set group ID for viewing users
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
    </div>
  );
};

export default ManageGroups;
