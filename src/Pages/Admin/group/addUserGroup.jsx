/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../main";
import { Button } from "@radix-ui/themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card";

const AddUserGroup = ({ groupId, onClose, onUserAdded }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // This should hold the user name
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${server}/user/getAll`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!selectedUser) return; // Ensure a user is selected

    try {
      // Pass the user name in the request body
      await axios.post(`${server}/group/addUser/${groupId}/users`, {
        userName: selectedUser, // Send the selected user's name
      });
      onUserAdded(); // Callback to refresh the user list or update the UI
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error adding user to group:", err);
      setError("Failed to add user to group."); // Handle error
    }
  };

  return (
    <div className="add-user-group p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add User to Group</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="error">{error}</p>}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Select User</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {users.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onSelect={() => setSelectedUser(user.name)} // Set selected user name
                >
                  {user.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedUser && (
            <p className="selected-user">Selected User: {selectedUser}</p>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={handleAddUser} className="bg-green-500 text-white">
              Add User
            </Button>
            <Button onClick={onClose} className="bg-red-500 text-white">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUserGroup;
