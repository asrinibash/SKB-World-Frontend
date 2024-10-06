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
        setError("User already added in this group");
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
                <Button className="flex items-center justify-between border border-gray-300 px-4 py-2 w-60 rounded-md text-gray-700 bg-white hover:bg-gray-100">
                  <span>Select User</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.292 7.292a1 1 0 011.416 0L10 10.586l3.292-3.294a1 1 0 111.416 1.416l-4 4a1 1 0 01-1.416 0l-4-4a1 1 0 010-1.416z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 shadow-lg rounded-md mt-2 w-60">
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onSelect={() => setSelectedUser(user.name)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    {user.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Show selected user */}
            {selectedUser && (
              <p className="mt-2 text-gray-600">
                Selected User:{" "}
                <span className="font-medium">{selectedUser}</span>
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
