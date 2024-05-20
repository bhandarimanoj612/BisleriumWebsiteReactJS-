import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7097/api/Auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      toast.success("Navigate to reset password screen");
      // Redirect to the reset password page with email as state
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setMessage("Error: Failed to send reset password OTP.");
      toast.error("Error: Failed to send reset password OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-md  px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl mb-4 font-bold">Forget Password</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset OTP
            </button>
          </div>
          <p className="text-red-500 text-xs italic mt-4">{message}</p>
          <div className="mt-4">
            <Link
              to={`/login`}
              className="text-green-400 hover:text-green-700 font-bold cursor-pointer"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
