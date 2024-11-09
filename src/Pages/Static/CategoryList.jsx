import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { server } from "../../main.jsx";

export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/getAll`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/coursesList?category=${categoryId}`);
  };

  if (isLoading) return <div>Loading Categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-secondary rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
      <ul className="space-y-2">
        <li>
          <button
            className="w-full text-left p-2 rounded hover:bg-accent/10"
            onClick={() => handleCategoryClick("all")}
          >
            All Categories
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className="w-full text-left p-4 rounded-lg shadow-md hover:bg-accent/10"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg dark:text-gray-300">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(category.createdAt), "dd MMM yyyy")}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
                {category.description}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
