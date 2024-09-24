import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";
import { server } from "../../main"; // Make sure to import the correct server URL
import { ThemeContext } from "../../Context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./Ui/DropdownMenu";
import defaultAvatar from "../../assets/skbcompany2.png";
import { FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin/secure/profile");
  };

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

  const handleLogoutClick = () => {
    // Clear local storage and cookies on logout
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/admin/secure/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        {/* Admin Data Display */}
        <p className="font-medium">Welcome, {adminData?.name || "Admin"}!</p>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative h-8 w-8 rounded-full cursor-pointer">
              <img
                src={adminData?.profileImage || defaultAvatar}
                alt="Admin Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {adminData?.name || "Guest User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {adminData?.email || "guest@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleLogoutClick}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={toggleDarkMode} className="p-2.5 rounded-full">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
