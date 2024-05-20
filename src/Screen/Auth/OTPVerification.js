import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const location = useLocation();
  const [otp, setOTP] = useState("");
  const email = location.state?.email; // Retrieve email from location state
  const navigate = useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7097/api/Auth/verify-otp",
        {
          email: email,
          otp: otp,
        }
      );

      // Display success message
      toast.success(response.data);

      // Redirect to the login page after successful OTP verification
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        // Display error message if OTP is invalid
        toast.error(error.response.data);
      } else {
        // Display generic error message for other errors
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleVerifyOTP}
          className="bg-white rounded-3xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter OTP sent to {email}
            </label>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
