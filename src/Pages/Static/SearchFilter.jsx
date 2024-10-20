/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing a search icon from react-icons

export default function SearchFilter({ onSearch, theme = "light" }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search value to parent component
  };

  // Styling based on theme
  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#cccccc",
    },
    dark: {
      backgroundColor: "#2d2d2d",
      color: "#ffffff",
      borderColor: "#444444",
    },
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div
        className="flex items-center border rounded p-2"
        style={{
          ...themeStyles[theme], // Apply theme styles
          maxWidth: "400px", // Control width for small size
        }}
      >
        {/* Search icon */}
        <FaSearch className="text-gray-400 mr-2" size={16} />
        <input
          type="text"
          placeholder="Search courses by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 bg-transparent outline-none"
          style={{
            ...themeStyles[theme], // Apply theme to input
          }}
        />
      </div>
    </div>
  );
}
