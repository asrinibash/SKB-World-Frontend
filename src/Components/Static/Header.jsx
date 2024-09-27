import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX, FiUser } from "react-icons/fi";
import skbcompany from "../../assets/skbcompany.png";
import { useRecoilValue } from "recoil";
import { userAuthState } from "../../Recoil/User/UserAuthState";
import { useUserAuthentication } from "../../Recoil/User/useUserAuthentication";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { server } from "../../main";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./Ui/DropdownMenu";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authState = useRecoilValue(userAuthState);
  const { logout } = useUserAuthentication();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const navLinkClasses = `text-sm font-medium transition duration-300 relative 
    before:content-[''] before:absolute before:-bottom-1 before:left-1/2 
    before:w-0 before:h-0.5 ${
      darkMode ? "before:bg-accent" : "before:bg-accent"
    } 
    before:transition-all before:duration-150 hover:before:w-full hover:before:left-0`;

  const mobileNavLinkClasses = `block py-2 text-sm font-medium transition duration-300`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userAuthState");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        const userId = decodedToken.userId;

        if (!userId) {
          console.error("User ID is undefined");
          return;
        }

        const response = await axios.get(`${server}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authState.isAuthenticated) {
      fetchUserData();
    }
  }, [authState.isAuthenticated]);

  const handleProfileClick = () => {
    navigate("/user/profile");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link to="/" className="flex-shrink-0">
          <img
            src={skbcompany}
            alt="Company Logo"
            className="w-full h-full max-w-60 md:max-w-60"
          />
        </Link>

        <nav className="hidden md:flex flex-grow justify-center pr-24 space-x-6">
          {["Home", "About", "Courses", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={navLinkClasses}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative ">
                  <button
                    className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <FiUser />
                  </button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/downloaded-courses")}
                >
                  Downloaded Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/support")}>
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogoutClick}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/user/login">
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-accent text-accent-foreground px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent/80 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Signup
              </button>
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2.5 rounded-full inline-flex items-center justify-center border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-input shadow-lg">
          <nav className="container mx-auto flex flex-col px-4 py-2">
            {["Home", "About", "Courses", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={mobileNavLinkClasses}
                onClick={toggleMobileMenu}
              >
                {item}
              </Link>
            ))}
            {authState.isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className={mobileNavLinkClasses}
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/downloaded-courses"
                  className={mobileNavLinkClasses}
                  onClick={toggleMobileMenu}
                >
                  Downloaded Courses
                </Link>
                <Link
                  to="/settings"
                  className={mobileNavLinkClasses}
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                <Link
                  to="/support"
                  className={mobileNavLinkClasses}
                  onClick={toggleMobileMenu}
                >
                  Support
                </Link>
                <button
                  onClick={() => {
                    handleLogoutClick();
                    toggleMobileMenu();
                  }}
                  className={`${mobileNavLinkClasses} text-left text-red-600`}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
