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
import EditUser from "./user/editUser"; // Import the EditUser component
import AddUser from "./user/addUser"; // Import the AddUser component
import { Button } from "@radix-ui/themes";

const ADUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false); // Manage Add User form visibility

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${server}/user/getAll`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user to edit
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Send DELETE request to the server
      await axios.delete(`${server}/user/${userId}`);

      // Optionally, refresh the user list after deletion
      console.log(`User with ID ${userId} deleted successfully.`);
      // You can call a function like `onUserDeleted()` here to refresh the list of users.
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const closeEditForm = () => {
    setEditingUser(null); // Close the edit form
  };

  const closeAddForm = () => {
    setAddingUser(false); // Close the add user form
  };

  const refreshUsers = () => {
    fetchUsers(); // Refresh users after update
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Users</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View the list of users.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button
        onClick={() => setAddingUser(true)} // Open Add User form
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        <EditIcon className="mr-2" /> Add User
      </Button>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleEditUser(user)}
                      className="p-1"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
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
      {editingUser && (
        <EditUser
          user={editingUser}
          onClose={closeEditForm}
          onUpdate={refreshUsers}
        />
      )}
      {addingUser && (
        <AddUser onClose={closeAddForm} onUserAdded={refreshUsers} />
      )}
    </div>
  );
};

export default ADUsers;
