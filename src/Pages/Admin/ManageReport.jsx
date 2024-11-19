/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../Components/Admin/Ui/Tabs"; // Import Tabs, TabsContent, TabsList, TabsTrigger
import { Card } from "@radix-ui/themes";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../Components/Admin/Ui/Card";
import { Table } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../Components/Admin/Ui/Table";
import { server } from "../../main";
import skbImage from "../../assets/skbcompany2.png";
const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10; // Display 10 reports per page
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(""); // State to handle errors

  // Fetch data from the API
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    setError(""); // Reset error before fetching new data

    axios
      .get(`${server}/report`)
      .then((response) => {
        console.log("Fetched Reports Data:", response.data); // Logging response for debugging
        setReports(response.data); // Set reports data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching reports:", error);
      });
  }, []);

  const handleStatusChange = (reportId, newStatus) => {
    axios
      .patch(`${server}/report/${reportId}/status`, { status: newStatus })
      .then((response) => {
        console.log("Updated Report Status:", response.data);
        // Update the report status in the state without re-fetching all data
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId ? { ...report, status: newStatus } : report
          )
        );
      })
      .catch((error) => {
        console.error("Error updating report status:", error);
      });
  };

  // Get current reports for the page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  return (
    <Tabs defaultValue="report-status">
      {/* Tabs List to navigate between different sections */}
      <TabsContent value="report-status">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Report Status</CardTitle>
            <CardDescription>Your reports and their statuses</CardDescription>
          </CardHeader>

          <div className="overflow-x-auto">
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
              <table className="min-w-full table-auto">
                <thead>
                  <TableRow>
                    <TableHead>Sl No</TableHead> {/* Serial Number Column */}
                    <TableHead>User</TableHead>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Date Updated</TableHead>
                  </TableRow>
                </thead>

                <tbody>
                  {currentReports.length > 0 ? (
                    currentReports.map((report, index) => (
                      <TableRow key={report.id}>
                        <TableCell>{indexOfFirstReport + index + 1}</TableCell>{" "}
                        {/* Serial Number */}
                        <TableCell>{report.generatedBy.name}</TableCell>{" "}
                        {/* Accessing the username */}
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell className="text-sm">
                          {report.reportType}
                        </TableCell>
                        <TableCell>
                          <select
                            className="text-sm dark:bg-green-950"
                            value={report.status}
                            onChange={(e) =>
                              handleStatusChange(report.id, e.target.value)
                            }
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="FAILED">FAILED</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs">
                            {report.createdAt
                              ? format(
                                  new Date(report.createdAt),
                                  "EEE MMM dd, yyyy h:mm a"
                                )
                              : "Date not available"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs">
                            {report.updatedAt
                              ? format(
                                  new Date(report.updatedAt),
                                  "EEE MMM dd, yyyy h:mm a"
                                )
                              : "Date not available"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>No reports available</TableCell>
                    </TableRow>
                  )}
                </tbody>
              </table>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-md mx-1 ${
                    currentPage === index + 1 ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ManageReports;
