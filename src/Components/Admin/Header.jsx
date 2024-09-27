import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../../main";
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
import logo from "../../assets/skbcompany.png";
import {
  FiSun,
  FiMoon,
  FiUser,
  FiBell,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { Badge } from "./Ui/Badge";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [adminData, setAdminData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin/secure/profile");
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminAuthToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

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
    };

    fetchAdminData();

    const intervalId = setInterval(fetchAdminData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/admin/secure/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-background border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-12 w-42" />
            </Link>
          </div>

          <span className="text-lg font-bold text-primary">
            Admin Dashboard
          </span>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <span className="text-sm font-medium hidden md:inline-block">
                {adminData?.name || "Admin"}
              </span>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                 <FiUser/>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {adminData?.name || "Admin"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {adminData?.email || "admin@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                  <FiUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                  <FiSettings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin/help")}>
                  <FiHelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
