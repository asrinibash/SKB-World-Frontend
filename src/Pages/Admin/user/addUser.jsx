/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../../main";
import { EditIcon, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../Components/Admin/Ui/Card"; // Adjust import paths as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/user/signup`, formData);
      toast.success("User Added successfully!");
      onUserAdded(); // Refresh users after addition

      onClose(); // Close the add form
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to added user. Please try again.");
    }
  };

  return (
    <div className="add-user-form p-4">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="border rounded-md w-full p-2 dark:bg-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="border rounded-md w-full p-2 dark:bg-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="border rounded-md w-full p-2 dark:bg-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image URL:</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="border rounded-md w-full p-2 dark:bg-black"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg border border-green-700 hover:bg-green-600 transition duration-200 ease-in-out"
              >
                <EditIcon className="mr-2" /> Add User
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg border border-red-700 hover:bg-red-600 transition duration-200 ease-in-out"
              >
                <Trash2 className="mr-2" /> Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
