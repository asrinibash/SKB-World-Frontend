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
import EditUser from "./user/editUser";
import AddUser from "./user/addUser";
import { Button } from "@radix-ui/themes";

const ADUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);

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
    setEditingUser(user);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${server}/user/${userId}`);
      fetchUsers();
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${server}/user/${userId}/status`, {
        userStatus: newStatus,
      });
      fetchUsers(); // Refresh user list after status update
      console.log(`User with ID ${userId} status updated to ${newStatus}.`);
    } catch (error) {
      console.error(`Error updating status for user ID ${userId}:`, error);
    }
  };

  const closeEditForm = () => {
    setEditingUser(null);
  };

  const closeAddForm = () => {
    setAddingUser(false);
  };

  const refreshUsers = () => {
    fetchUsers();
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
        onClick={() => setAddingUser(true)}
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
                <TableHead>User Status</TableHead>
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
                  <TableCell>
                    <select
                      value={user.userStatus}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="PENDING">Pending</option>
                      <option value="BLOCKED">Blocked</option>
                    </select>
                  </TableCell>
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
