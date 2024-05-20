import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const { role } = useAuth(); // Get the role from the context

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <aside className="bg-gray-900 text-white w-64 border-r border-gray-800 h-full flex flex-col fixed top-0 left-0">
      <ul className="p-4 flex-1 mt-28">
        <li
          className={`py-2 px-4 ${
            selectedItem === "Home" ? "bg-gray-800" : ""
          }`}
          onClick={() => handleItemClick("Home")}
        >
          <Link to="/" className="block hover:bg-gray-800 py-2 px-4 rounded">
            Home
          </Link>
        </li>
        <li
          className={`py-2 px-4 ${
            selectedItem === "Popular" ? "bg-gray-800" : ""
          }`}
          onClick={() => handleItemClick("Popular")}
        >
          <Link
            to="/popular"
            className="block hover:bg-gray-800 py-2 px-4 rounded"
          >
            Popular
          </Link>
        </li>

        <li
          className={`py-2 px-4 ${selectedItem === "All" ? "bg-gray-800" : ""}`}
          onClick={() => handleItemClick("All")}
        >
          <Link to="/all" className="block hover:bg-gray-800 py-2 px-4 rounded">
            All
          </Link>
        </li>

        <li
          className={`py-2 px-4 ${
            selectedItem === "BlogDashBoard" ? "bg-gray-800" : ""
          }`}
          onClick={() => handleItemClick("BlogDashBoard")}
        >
          <Link
            to="/BlogDashBoard"
            className="block hover:bg-gray-800 py-2 px-4 rounded"
          >
            BlogDashBoard
          </Link>
        </li>
        {role === "ADMIN" && ( // Render the admin-specific items only if the user is an admin
          <>
            <li
              className={`py-2 px-4 ${
                selectedItem === "AdminDashboard" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleItemClick("AdminDashboard")}
            >
              <Link
                to="/adminDashboard"
                className="block hover:bg-gray-800 py-2 px-4 rounded"
              >
                Admin Dashboard
              </Link>
            </li>
            <li
              className={`py-2 px-4 ${
                selectedItem === "AssignRole" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleItemClick("AssignRole")}
            >
              <Link
                to="/assignRole"
                className="block hover:bg-gray-800 py-2 px-4 rounded"
              >
                Assign Role
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
