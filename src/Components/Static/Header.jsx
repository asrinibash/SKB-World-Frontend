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
import SearchFilter from "../../Pages/Static/SearchFilter";

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
      if (!token) return;
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        if (!userId) return;

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

    if (authState.isAuthenticated) fetchUserData();
  }, [authState.isAuthenticated]);

  const handleProfileClick = () => navigate("/user/profile");
  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link to="/" className="flex-shrink-0">
          <img src={skbcompany} alt="Company Logo" className="w-32 md:w-40" />
        </Link>

        {/* Main Navigation - Hidden on Small Screens */}
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

        {/* Search Filter and Icons */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchFilter />
          </div>
          {authState.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2.5 rounded-full border bg-background text-sm font-medium hover:bg-accent focus:outline-none">
                  <FiUser />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {userData?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
                  onClick={handleLogoutClick}
                  className="text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/user/login">
              <button className="rounded-full border bg-accent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent/80">
                Login
              </button>
            </Link>
          )}

          <Link to="/subscriptions">
            <button className="rounded-full border bg-accent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent/80">
              Choose Plan
            </button>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full border bg-background"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2.5 rounded-full border bg-background"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t shadow-lg">
          <nav className="container mx-auto flex flex-col px-4 py-2 space-y-2">
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
                  className={`${mobileNavLinkClasses} text-red-600`}
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
