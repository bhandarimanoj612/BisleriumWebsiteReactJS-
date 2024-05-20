import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Auth = () => {
  const { user, logout } = useAuth(); // Get user data from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7097/api/Auth/login",
        {
          userName: email,
          password: password,
        }
      );

      const userData = response.data.userInfo;
      const token = response.data.newToken;
      console.log("userdata", response.data.userInfo);
      console.log("token", response.data.newToken);
      // Store user data and token in local storage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("token", token);
      // Display success message
      toast.success("Login successful!");
      // Redirect to the home page
      navigate("/");

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        // Display error message if username or password is incorrect
        toast.error("User not found. Please check your credentials.");
      } else if (error.response && error.response.status === 401) {
        // Display error message if password is incorrect
        toast.error("Incorrect password. Please try again.");
      } else {
        // Display generic error message for other errors
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-6">
      <div className="w-96 h-96 mt-6">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              UserName
            </label>
            <input
              type="text"
              placeholder="UserName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Use conditional rendering to toggle password visibility
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 pl-20 pr-20 ml-2 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <Link
              to={`/forget-password`}
              className="ml-5 font-bold text-red-400 rounded flex items-center font-mono  hover:text-red-600"
            >
              Forget Password
            </Link>
          </div>
          <div className="flex flex-row mt-10">
            <p>Don't have Account</p>
            <Link
              to={`/register`}
              className="ml-5 font-bold text-green-500 rounded flex items-center"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
