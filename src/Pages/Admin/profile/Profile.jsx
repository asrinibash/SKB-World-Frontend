/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { server } from "../../../main";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../../Components/Admin/Ui/Table";
import UpdateProfileForm from "./UpdateProfileForm";
import { EditIcon } from "lucide-react";
import { adminAuthState } from "../../../Recoil/Admin/AdminAuthState";

const Profile = () => {
  const [adminData, setAdminData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const auth = useRecoilValue(adminAuthState);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminAuthToken"); // Ensure you use the correct key

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      try {
        // Decode token to extract adminId
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        const adminId = decodedToken.adminId;

        if (!adminId) {
          console.error("Admin ID is undefined");
          return;
        }

        // Fetch admin data from server using the admin ID
        const response = await axios.get(`${server}/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();

    // Optional: Fetch data every 60 seconds to keep it up to date
    const intervalId = setInterval(fetchAdminData, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleUpdate = (updatedData) => {
    setAdminData((prevData) => ({
      ...prevData,
      name: updatedData.name, // Update only the name
      // Email remains unchanged
    }));
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      {adminData ? (
        <Card className="dark:bg-green-950 dark:text-white">
          <CardContent>
            <Typography variant="h5" component="div">
              {adminData.name}'s Profile
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">{adminData.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">{adminData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">CreatedAt</TableCell>
                  <TableCell align="right">
                    {new Date(adminData.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center bg-green-500 dark:bg-yellow-500 dark:text-white text-white px-4 py-2 rounded-lg border border-yellow-700 hover:bg-yellow-600 transition duration-200 ease-in-out"
            >
              <EditIcon className="mr-2" /> Update Profile
            </Button>
            <UpdateProfileForm
              open={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              adminData={adminData}
              onUpdate={handleUpdate} // Pass the update function
            />
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
