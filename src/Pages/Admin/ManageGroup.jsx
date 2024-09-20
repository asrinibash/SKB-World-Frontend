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
import EditGroup from "./group/editGroup"; // Import the EditGroup component
import AddGroup from "./group/addGroup"; // Import the AddGroup component
import { Button } from "@radix-ui/themes";

const ManageGroups = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [addingGroup, setAddingGroup] = useState(false); // Manage Add Group form visibility

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    try {
      const response = await axios.get(`${server}/group`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group); // Set the group to edit
  };

  const handleDeleteGroup = async (groupId) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    try {
      await axios.delete(`${server}/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      console.log(`Group with ID ${groupId} deleted successfully.`);
      fetchGroups(); // Refresh the group list after deletion
    } catch (error) {
      console.error(`Error deleting group with ID ${groupId}:`, error);
    }
  };

  const closeEditForm = () => {
    setEditingGroup(null); // Close the edit form
  };

  const closeAddForm = () => {
    setAddingGroup(false); // Close the add group form
  };

  const refreshGroups = () => {
    fetchGroups(); // Refresh groups after update
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
        onClick={() => setAddingGroup(true)} // Open Add Group form
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
                    {" "}
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
                      onClick={() => handleDeleteGroup(group.id)}
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
    </div>
  );
};

export default ManageGroups;
