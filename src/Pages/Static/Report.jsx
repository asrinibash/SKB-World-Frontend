import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Don't forget to install this package
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Report = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("USER");
  const [generatedById, setGeneratedById] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // UseEffect to get user data from the token
  useEffect(() => {
    const token = localStorage.getItem("userAuthState"); // Retrieve the token from localStorage
    if (token) {
      try {
        const userData = jwtDecode(token); // Decode the token
        console.log("User Data:", userData); // Print the user data to console
        setGeneratedById(userData.userId); // Set the generatedById to the userId from the token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for token presence
    const token = localStorage.getItem("userAuthState");
    if (!token) {
      // Redirect to login if not logged in
      navigate("/user/login");
      return;
    }

    const data = {
      title,
      description,
      reportType,
      generatedById,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/report",
        data
      );
      console.log("Report created successfully:", response.data);

      // Reset the form fields
      setTitle("");
      setDescription("");
      setReportType("USER"); // Reset to the default value
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Create Report</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="reportType">
          Report Type
        </label>
        <select
          id="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="USER">User</option>
          <option value="COURSE">Course</option>
          <option value="ORDER">Order</option>
          <option value="SUBSCRIPTION">Subscription</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className=" text-sm font-medium mb-1 hidden"
          htmlFor="generatedById"
        >
          Generated By ID
        </label>
        <input
          type="text"
          id="generatedById"
          value={generatedById}
          readOnly // Make the input read-only
          className="w-full p-2 border border-gray-300 rounded hidden bg-gray-200"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-primary text-white rounded hover:bg-green-600"
      >
        Submit Report
      </button>
    </form>
  );
};

export default Report;