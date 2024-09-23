/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { adminAuthState } from "../../Recoil/Admin/AdminAuthState";
import { server } from "../../main";
import { Sheet, SheetTrigger, SheetContent } from "./Ui/Sheet";
import { Button } from "./Ui/Button";
import { jwtDecode } from "jwt-decode";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "./Ui/Breadcrumb";
import { Input } from "./Ui/Input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./Ui/DropdownMenu";
import { Bell, Search } from "lucide-react";
import { FiSun, FiMoon } from "react-icons/fi";
import defaultAvatar from "../../assets/skbcompany2.png";
import { ThemeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [adminData, setAdminData] = useState(null);
  const auth = useRecoilValue(adminAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminAuthState");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const adminId = decodedToken.adminId;

          if (!adminId) {
            console.error("Admin ID is undefined");
            return;
          }

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
      } else {
        console.log("No token found.");
      }
    };

    fetchAdminData(); // Initial fetch

    const intervalId = setInterval(fetchAdminData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [auth]);

  const handleProfileClick = () => {
    navigate("/admin/secure/profile");
  };

  const handleLogoutClick = () => {
    // Clear local storage and cookies
    localStorage.clear(); // Clear all local storage
    // Optionally clear cookies if needed (this depends on how your cookies are set)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to login or home page (adjust the path as needed)
    navigate("/admin/secure/login"); // or navigate("/"); for home page
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="grid gap-6 text-lg font-medium">
              {/* Add navigation items here */}
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/"> Admin Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full min-w-[200px] rounded-full bg-muted pl-8 md:w-[300px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative h-8 w-8 rounded-full cursor-pointer">
              <img
                src={user?.profileImage || defaultAvatar}
                alt="User Avatar"
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
        <div
          size="icon"
          variant="ghost"
          className="m-2 p-2 rounded cursor-pointer bg-background hover:bg-secondary"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
