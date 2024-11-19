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
import { Trash2, EditIcon } from "lucide-react";
import EditUser from "./user/editUser";
import AddUser from "./user/addUser";
import { Button } from "@radix-ui/themes";
import { toast } from "react-toastify";

const ADUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const usersPerPage = 10; // Number of users per page

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${server}/user/getAll`);
      setUsers(response.data);
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId) => {
    const confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">Do you want to proceed with this action?</p>
        <div class="flex justify-center space-x-4">
          <button id="okButton" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
          <button id="cancelButton" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmationBox);

    document.getElementById("okButton").onclick = async () => {
      setTimeout(async () => {
        try {
          toast.success(`User with ID ${userId} deleted successfully.`);
          await axios.delete(`${server}/user/${userId}`);
          fetchUsers();
        } catch (error) {
          toast.error(`Error deleting user with ID ${userId}:`, error);
          console.error(`Error deleting user with ID ${userId}:`, error);
        }
        document.body.removeChild(confirmationBox);
      }, 1000);
    };

    document.getElementById("cancelButton").onclick = () => {
      document.body.removeChild(confirmationBox);
    };
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${server}/user/${userId}/status`, {
        userStatus: newStatus,
      });
      fetchUsers();
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

  // Logic to handle pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

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
                  <TableHead>SL No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Accout Status</TableHead>
                  <TableHead>Subscriber</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{indexOfFirstUser + index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <select
                        className="dark:bg-green-900"
                        value={user.userStatus}
                        onChange={(e) =>
                          handleStatusChange(user.id, e.target.value)
                        }
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="PENDING" className="bg-yellow-500">
                          Pending
                        </option>
                        <option value="BLOCKED" className="bg-red-900">
                          Blocked
                        </option>
                      </select>
                    </TableCell>
                    <TableCell>
                      {user.isSubscribed ? "Subscribed" : "Not Subscribed"}
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={
              currentPage === index + 1 ? "bg-primary text-white p-2" : ""
            }
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </Button>
      </div>

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
