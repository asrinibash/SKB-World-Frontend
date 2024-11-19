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
import skbImage from "../../assets/skbcompany2.png";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false); // Manage Add Category form visibility
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(""); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [categoriesPerPage] = useState(10); // Categories to show per page

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(""); // Reset error before fetching new data
    try {
      const response = await axios.get(`${server}/category/getAll`);
      setCategories(response.data);
    } catch (error) {
      setError("Error fetching contacts. Please try again."); // Set error message
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

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

  // Handling page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          {loading ? (
            <div className="flex justify-center items-center mt-4 mb-4 p-10 sm:p-20 md:p-20">
              <div className="relative flex justify-center items-center h-14 w-14">
                <div className="absolute animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-500"></div>
                <img
                  src={skbImage}
                  alt="Avatar thinking"
                  className="rounded-full h-10 w-10 z-8" // image inside spinner, smaller than the spinner
                />
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p> // Display error message
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL No.</TableHead> {/* Added SL No column */}
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Total Courses</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCategories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {index + 1 + (currentPage - 1) * categoriesPerPage}
                    </TableCell>{" "}
                    {/* SL No */}
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <img
                        src={category.image}
                        alt={category.name}
                        width="50"
                      />
                    </TableCell>
                    <TableCell>{category.courses.length}</TableCell>{" "}
                    {/* Count of courses */}
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
          )}
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 mb-4 space-x-3">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
        >
          &lt; Previous
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-primary text-white p-3 rounded-lg"
                : "bg-white text-gray-700 p-3 rounded-lg hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastCategory >= categories.length}
          className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default ManageCategories;
