/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../main";
import { Button } from "@radix-ui/themes";
import { ToastProvider, Toast, ToastTitle } from "@radix-ui/react-toast";
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
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
    if (!selectedUser) return;

    try {
      await axios.post(`${server}/group/addUser/${groupId}/users`, {
        name: selectedUser,
      });
      onUserAdded();
      onClose();
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "User is already part of this group."
      ) {
        setToastMessage("User is already part of this group.");
        setShowToast(true);
      } else {
        console.error("Error adding user to group:", err);
        setError("Failed to add user to group.");
      }
    }
  };

  return (
    <ToastProvider>
      <div className="add-user-group p-4">
        <Card>
          <CardHeader>
            <CardTitle>Add User to Group</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="error text-red-500">{error}</p>}

            {/* Dropdown menu to select users */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">Select User</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onSelect={() => setSelectedUser(user.name)}
                  >
                    {user.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Show selected user */}
            {selectedUser && (
              <p className="selected-user mt-2">
                Selected User: {selectedUser}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="submit"
                onClick={handleAddUser}
                className="bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
              >
                Add User
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg border border-red-700 hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Toast Notification */}
        {showToast && (
          <Toast open={showToast} onOpenChange={setShowToast}>
            <ToastTitle>{toastMessage}</ToastTitle>
          </Toast>
        )}
      </div>
    </ToastProvider>
  );
};

export default AddUserGroup;
