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
import EditCategory from "./category/editCategory"; // Import the EditCategory component
import AddCategory from "./category/addCategory"; // Import the AddCategory component
import { Button } from "@radix-ui/themes";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false); // Manage Add Category form visibility

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/category/getAll`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category); // Set the category to edit
  };

  const handleDeleteCategory = (categoryId) => {
    // Show confirmation dialog first
    const confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p class="mb-6">Do you want to delete this category?</p>
        <div class="flex justify-center space-x-4">
          <button id="okButton" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">OK</button>
          <button id="cancelButton" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    `;

    // Append the confirmation box to the body
    document.body.appendChild(confirmationBox);

    // Handle OK button click
    document.getElementById("okButton").onclick = async () => {
      // Delete category with authorization token
      const token = localStorage.getItem("adminAuthToken"); // Use the correct key for admin token
      if (!token) {
        console.error("Authorization token is missing. Please log in again.");
        document.body.removeChild(confirmationBox); // Remove the confirmation box
        return; // Exit if no token is found
      }

      setTimeout(async () => {
        try {
          await axios.delete(`${server}/category/${categoryId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          });
          console.log(`Category with ID ${categoryId} deleted successfully.`);
          fetchCategories(); // Refresh the category list after deletion
        } catch (error) {
          console.error(
            `Error deleting category with ID ${categoryId}:`,
            error
          );
        }
        document.body.removeChild(confirmationBox); // Remove the confirmation box after the action is done
      }, 1000); // Delay deletion by 1 second (1000ms)
    };

    // Handle Cancel button click
    document.getElementById("cancelButton").onclick = () => {
      document.body.removeChild(confirmationBox); // Just remove the confirmation box on cancel
    };
  };

  const closeEditForm = () => {
    setEditingCategory(null); // Close the edit form
  };

  const closeAddForm = () => {
    setAddingCategory(false); // Close the add category form
  };

  const refreshCategories = () => {
    fetchCategories(); // Refresh categories after update
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View and manage the list of categories.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button
        onClick={() => setAddingCategory(true)} // Open Add Category form
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        <EditIcon className="mr-2" /> Add Category
      </Button>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <img src={category.image} alt={category.name} width="50" />
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleEditCategory(category)}
                      className="p-1"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(category.id)}
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
      {editingCategory && (
        <EditCategory
          category={editingCategory}
          onClose={closeEditForm}
          onUpdate={refreshCategories}
        />
      )}
      {addingCategory && (
        <AddCategory
          onClose={closeAddForm}
          onCategoryAdded={refreshCategories}
        />
      )}
    </div>
  );
};

export default ManageCategories;
