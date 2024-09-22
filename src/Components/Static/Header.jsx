import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import skbcompany from "../../assets/skbcompany.png";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClasses = `text-sm font-medium transition duration-300 relative 
    before:content-[''] before:absolute before:-bottom-1 before:left-1/2 
    before:w-0 before:h-0.5 ${
      darkMode ? "before:bg-accent" : "before:bg-accent"
    } 
    before:transition-all before:duration-150 hover:before:w-full hover:before:left-0`;

  const mobileNavLinkClasses = `block py-2 text-sm font-medium transition duration-300`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
          <Link to="/user/login">
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-accent text-accent-foreground px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent/80 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Signup
            </button>
          </Link>

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
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
