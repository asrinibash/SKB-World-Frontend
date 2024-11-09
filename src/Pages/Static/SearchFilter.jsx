import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchFilter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // Internal search
    } else {
      navigate(`/buyCourse?search=${searchTerm}`); // External search
    }
  };

  // Handle key down events in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="flex justify-center items-center my-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Add key down event handler
        placeholder="Search courses"
        aria-label="Search courses"
        className="p-1 border border-gray-300 dark:border-gray-600 rounded-sm w-48 text-sm focus:border-blue-500 focus:outline-none transition-colors dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={handleSearch}
        className="ml-1 px-2 py-1 bg-green-600 text-white text-sm rounded-sm hover:bg-green-500 transition-colors dark:bg-green-500 dark:hover:bg-green-400"
      >
        Search
      </button>
    </div>
  );
}

SearchFilter.propTypes = {
  onSearch: PropTypes.func, // Define onSearch as an optional function
};
