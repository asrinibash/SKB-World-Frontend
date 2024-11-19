/* eslint-disable no-unused-vars */
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
import { Button } from "@radix-ui/themes";
import { server } from "../../main"; // Ensure server URL is correct

const ManageOrder = () => {
  const [users, setUsers] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(""); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 10; // Number of items per page

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(""); // Reset error before fetching new data
    try {
      const response = await axios.get(`${server}/user/getAlls`);
      setUsers(response.data); // Set fetched orders in state
    } catch (error) {
      setError("Error fetching orders. Please try again."); // Set error message
      console.error("Error fetching orders:", error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Pagination handlers
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View and manage the list of orders.
          </CardDescription>
        </CardHeader>
      </Card>

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
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SL No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, userIndex) =>
                      user.orders.length > 0 ? (
                        user.orders.map((order, orderIndex) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              {startIndex + userIndex + 1 + orderIndex}
                            </TableCell>
                            <TableCell>{user.name || "N/A"}</TableCell>
                            <TableCell>{order.course?.name || "N/A"}</TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {order.paymentMethod || "N/A"}
                            </TableCell>
                            <TableCell>{order.amount || "N/A"}</TableCell>
                            <TableCell>
                              {new Date(user.createdAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow key={user.id}>
                          <TableCell>{startIndex + userIndex + 1}</TableCell>
                          <TableCell>{user.name || "N/A"}</TableCell>
                          <TableCell colSpan={6}>No orders available</TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>No orders available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

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
                    onClick={() => handlePageChange(index + 1)}
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
                  disabled={currentPage === totalPages}
                  className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
                >
                  Next &gt;
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageOrder;
