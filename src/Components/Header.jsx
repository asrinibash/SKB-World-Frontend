import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClasses = `text-sm font-medium transition duration-300 relative 
    before:content-[''] before:absolute before:-bottom-1 before:left-1/2 
    before:w-0 before:h-0.5 ${darkMode ? "before:bg-white" : "before:bg-black"} 
    before:transition-all before:duration-150 hover:before:w-full hover:before:left-0`;

  const mobileNavLinkClasses = `block py-2 text-sm font-medium transition duration-300`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="container sticky top-0 z-50 bg-background mx-auto flex items-center justify-between py-4 px-4 md:px-6">
      <Link to="/">
        <h1 className="text-gray-600 font-semibold hover:text-gray-400 hover:underline underline-offset-4">
          SKB World
        </h1>
      </Link>

      <nav className="hidden md:flex space-x-6">
        {["Home", "About", "Courses", "Contact"].map((item) => (
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
        <Link to="/signup">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-input shadow-lg">
          <nav className="flex flex-col px-4 py-2">
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