/* eslint-disable no-unused-vars */
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
import { Button } from "@radix-ui/themes";
import { server } from "../../main"; // Ensure server URL is correct

const ManageOrder = () => {
  const [users, setUsers] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(""); // State to handle errors

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
            <p>Loading orders...</p> // Show loading message when data is being fetched
          ) : error ? (
            <p className="text-red-500">{error}</p> // Display error message
          ) : (
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
                {users.length > 0 ? (
                  users.map((user, userIndex) =>
                    user.orders.length > 0 ? (
                      user.orders.map((order, orderIndex) => (
                        <TableRow key={order.id}>
                          <TableCell>{userIndex + 1}</TableCell>
                          <TableCell>{user.name || "N/A"}</TableCell>
                          <TableCell>{order.courseId || "N/A"}</TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>{order.paymentMethod || "N/A"}</TableCell>
                          <TableCell>{order.amount || "N/A"}</TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow key={user.id}>
                        <TableCell>{userIndex + 1}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageOrder;
