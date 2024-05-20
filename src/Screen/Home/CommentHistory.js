import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const CommentHistory = () => {
  const [history, setHistory] = useState([]);
  const { user, token, userName, profileImg } = useAuth();

  console.log("Bearer", `${user ? token : ""}`);
  console.log("Bearer", `${user ? userName : ""}`);
  console.log("profileImg", `${user ? profileImg : ""}`);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `https://localhost:7097/api/CommentHistory/${user ? userName : ""}`,
          {
            headers: {
              Authorization: `Bearer ${user ? token : ""}`,
            },
          }
        );
        const data = await response.json();
        setHistory(data.$values || []); // Set history to an empty array if data.$values is undefined
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 mt-40 mb-40">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Comments History</h1>

        <Link
          to={`/history`}
          className="ml-7 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300 "
        >
          Blog Comment History
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Comments</th>
              <th className="px-4 py-2">UserName</th>
              <th className="px-4 py-2">Updated At</th>

              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id} className="border-b">
                <td className="px-4 py-2 text-white">{entry.content}</td>

                <td className="px-4 py-2 text-white">{entry.userName}</td>

                <td className="px-4 py-2 text-white">
                  {new Date(entry.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-white">{entry.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentHistory;
