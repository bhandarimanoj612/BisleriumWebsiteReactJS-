import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7097/api/Auth/register",
        {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: password,
          address: address,
        }
      );

      // Display success message
      toast.success(response.data);

      // Navigate to OTP verification screen after successful registration
      navigate("/otp-verification", { state: { email: email } }); // Pass email as state
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        // Display error message if there's a validation error
        toast.error(error.response.data);
      } else {
        // Display generic error message for other errors
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-1/3 mt-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleRegister}
          className="bg-white rounded-3xl w-full px-8 pt-6 pb-8 mb-4 mt-20"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold pr-20 pt-3 pb-3  pl-20 ml-16   rounded-xl justify-center flex items-center focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="flex flex-row mt-10 ml-5">
            <p>Already have Account</p>
            <Link
              to={`/login`}
              className="  ml-5  font-bold text-green-500 rounded flex items-center"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
