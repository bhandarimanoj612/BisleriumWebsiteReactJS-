import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProfileImage = () => {
  const [users, setUser] = useState(null);
  const [file, setFile] = useState(null); // State to store the selected file
  const navigate = useNavigate();

  const { user, token, userName, profileImg, userID } = useAuth();

  console.log("Bearer", `${user ? token : ""}`);
  console.log("Bearer", `${user ? userName : ""}`);
  console.log("profileImg", `${user ? profileImg : ""}`);
  console.log("userID", `${user ? userID : ""}`);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7097/api/UserProfileControllers/users/GetAllUser"
        );
        setUser(response.data.$values[0]); // Assuming there's only one user
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleProfileImg = async () => {
    try {
      // Create FormData object to send file
      const formData = new FormData();
      formData.append("file", file);

      // Make separate request for uploading image
      await axios.post(
        `https://localhost:7097/api/UserProfileControllers/upload-image?username=${
          user ? userName : ""
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image uploaded successfully!"); // Show success toast
      // Redirect to the home page
      navigate("/profile");
      window.location.reload(); // Refresh the page after uploading image
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload image."); // Show error toast
    }
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6 text-white">User Image</h1>
      <div className="relative w-96 h-96 mx-auto rounded-full overflow-hidden shadow-lg mb-6">
        <img
          src={`https://localhost:7097/Resources/${profileImg}`}
          alt={profileImg}
          className="object-cover w-full h-full"
        />

        <label
          htmlFor="fileInput"
          className="absolute ml-20 justify-center pl-5 bottom-0 right-0 mb-2 mr-2 cursor-pointer"
        >
          <FaUpload className="text-white text-xl" />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex justify-center ml-5 p-3"
          />
        </label>
      </div>
      <button
        onClick={handleProfileImg}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ProfileImage;
