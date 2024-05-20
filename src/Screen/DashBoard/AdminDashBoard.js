import React, { useState, useEffect } from "react";
import { IoBarChartOutline } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const AdminDashboard = () => {
  const { user, token, userName, profileImg } = useAuth();

  console.log("Bearer", `${user ? token : ""}`);
  console.log("Bearer", `${user ? userName : ""}`);
  console.log("profileImg", `${user ? profileImg : ""}`);
  const [allTimeStats, setAllTimeStats] = useState({
    totalBlogPosts: 0,
    totalUpvotes: 0,
    totalDownvotes: 0,
    totalComments: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState({
    totalBlogPosts: 0,
    totalUpvotes: 0,
    totalDownvotes: 0,
    totalComments: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch all-time stats from backend
    async function fetchAllTimeStats() {
      try {
        const response = await axios.get(
          "https://localhost:7097/api/Dashboard/counts/alltime",
          {
            headers: {
              Authorization: `Bearer ${user ? token : ""}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAllTimeStats(response.data);
      } catch (error) {
        console.error("Error fetching all-time stats:", error);
      }
    }
    fetchAllTimeStats();
  }, []);

  useEffect(() => {
    // Fetch monthly stats from backend
    async function fetchMonthlyStats(year, month) {
      try {
        const response = await axios.get(
          `https://localhost:7097/api/Dashboard/counts/${year}/${month}`,
          {
            headers: {
              Authorization: `Bearer ${user ? token : ""}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMonthlyStats(response.data);
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    }
    fetchMonthlyStats(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="bg-gray-800 min-h-screen py-8 w-full mt-28">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 flex items-center text-white">
            <IoBarChartOutline className="mr-2 text-white" /> Admin Dashboard
          </h1>

          {/* All-time Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">All-Time Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Total Blog Posts"
                value={allTimeStats.totalBlogPosts}
              />
              <StatCard
                label="Total Upvotes"
                value={allTimeStats.totalUpvotes}
              />
              <StatCard
                label="Total Downvotes"
                value={allTimeStats.totalDownvotes}
              />
              <StatCard
                label="Total Comments"
                value={allTimeStats.totalComments}
              />
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Monthly Stats</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="month" className="mr-3 font-semibold">
                Select Month:
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="year" className="mr-3 font-semibold">
                Select Year:
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option
                    key={selectedYear - 2 + i}
                    value={selectedYear - 2 + i}
                  >
                    {selectedYear - 2 + i}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <StatCard
                label="Total Blog Posts"
                value={monthlyStats.totalBlogPosts}
              />
              <StatCard
                label="Total Upvotes"
                value={monthlyStats.totalUpvotes}
              />
              <StatCard
                label="Total Downvotes"
                value={monthlyStats.totalDownvotes}
              />
              <StatCard
                label="Total Comments"
                value={monthlyStats.totalComments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-gray-200 rounded-lg ">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="text-xl">{value}</p>
    </div>
  );
};

export default AdminDashboard;
