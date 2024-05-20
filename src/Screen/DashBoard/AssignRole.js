import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

const AssignRole = () => {
  const { user, token, userName, profileImg } = useAuth();
  const [usernames, setUsernames] = useState([]);
  const [roles, setRoles] = useState({});
  console.log("token from assign role", `${user ? token : ""}`);
  console.log("token from assign role", `${user ? token : ""}`);
  console.log("token from assign role", `${user ? token : ""}`);

  useEffect(() => {
    fetchUsernames();
  }, []);

  const fetchUsernames = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7097/api/Auth/usernames/AllWithRoles"
      );
      setUsernames(response.data.$values);
      // Initialize roles with current values
      const initialRoles = {};
      response.data.$values.forEach((user) => {
        initialRoles[user.userName] = user.role;
      });
      setRoles(initialRoles);
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

  const handleRoleChange = (e, username) => {
    const newRoles = { ...roles };
    newRoles[username] = e.target.value;
    setRoles(newRoles);
  };

  const handleAssignRole = async (username) => {
    try {
      const response = await axios.post(
        "https://localhost:7097/api/Auth/update-role",
        {
          userName: username,
          newRole: roles[username] === "ADMIN" ? 0 : 1, // Convert role to 1 or 0
        },
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Role assigned successfully");
        // Refresh usernames after role update
        fetchUsernames();
      } else {
        toast.error("Failed to assign role");
      }
    } catch (error) {
      console.error("Error assigning role:", error);
      toast.error("Failed to assign role");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold bg-gray-100 rounded-lg shadow-md p-4 mb-14 mt-4">
        Assign Role
      </h2>

      <table className="table-auto w-full">
        <thead className="font-mono text-md mb-4 bg-gray-100 rounded-lg shadow-md w-full">
          <tr className="font-mono font-semibold mb-8 bg-gray-100 rounded-lg shadow-md p-4 border-dark-800">
            <th className="px-2 py-1">User Name</th>
            <th className="px-2 py-1">Current Role</th>
            <th className="px-2 py-1">Assign New Role</th>
          </tr>
        </thead>
        <tbody>
          {usernames.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="px-2 py-1 text-white">{user.userName}</td>
              <td className="px-2 py-1 text-white">{user.role}</td>
              <td className="px-2 py-1">
                <select
                  className="border p-1 mr-1"
                  value={roles[user.userName]}
                  onChange={(e) => handleRoleChange(e, user.userName)}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="BLOGGERS">Blogger</option>
                  {/* Add more roles as needed */}
                </select>
                <button
                  className="bg-blue-800 text-white px-2 py-1 rounded hover:bg-blue-900"
                  onClick={() => handleAssignRole(user.userName)}
                  disabled={!roles[user.userName]}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRole;
