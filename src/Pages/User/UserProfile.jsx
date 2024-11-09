/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main";
import { jwtDecode } from "jwt-decode";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../Recoil/User/UserAuthState";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../Components/Admin/Ui/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../Components/Admin/Ui/Tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../Components/Admin/Ui/Table";

import { Button } from "../../Components/Admin/Ui/Button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../Components/User/Avatar";
import Header from "../../Components/Static/Header";
// import { Navigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authState = useRecoilValue(userAuthState);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("userAuthState");

      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        if (!userId) {
          setError("User ID is undefined");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${server}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(
          "An error occurred while fetching user data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (authState.isAuthenticated) {
      fetchUserData();
    }
  }, [authState.isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <strong>Subscription Status:</strong>{" "}
                  {user.isSubscribed ? "Active" : "Inactive"}
                </div>
                {user.isSubscribed && (
                  <div>
                    <strong>Subscription Ends:</strong>{" "}
                    {new Date(user.subscriptionEnd).toLocaleDateString()}
                  </div>
                )}
                <div>
                  <strong>Account Status:</strong> {user.userStatus}
                </div>
                <div>
                  <strong>Member Since:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>

                <div className=" flex items-end justify-end">
                  <Button
                    onClick={() => navigate("/user/update-profile")}
                    className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Component Code */}
          <Tabs defaultValue="purchased-courses">
            <TabsList>
              <TabsTrigger value="purchased-courses">
                Purchased Courses
              </TabsTrigger>
              <TabsTrigger value="download-history">
                Download History
              </TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="report-status">Report Status</TabsTrigger>
            </TabsList>

            <TabsContent value="purchased-courses">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Purchased Courses</CardTitle>
                  <CardDescription>Courses you have purchased</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Purchase Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!user.purchasedCourses
                        ? []
                        : user.purchasedCourses.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>{course.course.name}</TableCell>
                              <TableCell>
                                {new Date(
                                  course.purchaseDate
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{course.status}</TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="download-history">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Download History</CardTitle>
                  <CardDescription>
                    Your course download history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.downloadHistory ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Download Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(user.downloadHistory).map(
                          ([courseId, date]) => (
                            <TableRow key={courseId}>
                              <TableCell>{courseId}</TableCell>
                              <TableCell>
                                {new Date(date).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No download history available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Your order history</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!user.orders
                        ? []
                        : user.orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{order.status}</TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="report-status">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Report Status</CardTitle>
                  <CardDescription>
                    Your reports and their statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead>Report Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(user.Report || []).map((report) => (
                        <TableRow key={report.id} className="hover:bg-gray-100">
                          <TableCell>{report.title}</TableCell>
                          <TableCell>{report.reportType}</TableCell>
                          <TableCell>{report.status}</TableCell>
                          <TableCell>
                            <span className="text-xs">
                              {report.createdAt
                                ? format(
                                    new Date(report.updatedAt),
                                    "EEE MMM dd, yyyy h:mm a"
                                  )
                                : "Date not available"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
