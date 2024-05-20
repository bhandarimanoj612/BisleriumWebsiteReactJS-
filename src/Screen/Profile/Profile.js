import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: "",
    lastName: "",
    address: "",
    username: "",
    profileImg: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const { user, logout, token, userName, profileImg, userID } = useAuth();

  console.log("Bearer", `${user ? token : ""}`);
  console.log("Bearer", `${user ? userName : ""}`);
  console.log("profileImg", `${user ? profileImg : ""}`);
  console.log("userID", `${user ? userID : ""}`);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7097/api/UserProfileControllers/users/GetByUserName/${
            user ? userName : ""
          }`
        );
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `https://localhost:7097/api/UserProfileControllers/users/UpdateUsers/${
          user ? userID : ""
        }`,
        updatedProfile // Send updatedProfile data in the request body
      );
      const response = await axios.get(
        `https://localhost:7097/api/UserProfileControllers/users/GetByUserId/${
          user ? userID : ""
        }`
      );
      setUserDetails(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `https://localhost:7097/api/UserProfileControllers/DeleteUser?userId=${
          user ? userID : ""
        }`
      );
      // Redirect to the home page
      toast.success("Successfully deleted");
      // Redirect to the home page
      navigate("/");
      // Clear AsyncStorage
      AsyncStorage.clear();
      // Call logout function from AuthContext to update user state
      logout();

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen flex justify-center items-center">
      {userDetails && (
        <div className="text-center">
          <div className="flex flex-row">
            <img
              src={`https://localhost:7097/Resources/${userDetails.profileImg}`}
              alt={userDetails.profileImg}
              className="w-40 h-40 rounded-full ml-20 mb-4"
            />

            <Link
              to={`/profile/profileImage`}
              className="ml-5 font-bold text-red-400 rounded flex items-center font-mono  hover:text-red-600"
            >
              Edit
            </Link>
          </div>

          <div className="bg-gray-600 p-4 rounded-lg">
            <h2 className="text-md font-mono mb-2">
              UserName: {userDetails.userName}
            </h2>
            <h2 className="text-md font-mono mb-2">
              FirstName: {userDetails.firstName}
            </h2>
            <h2 className="text-md font-mono mb-2">
              LastName: {userDetails.lastName}
            </h2>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">About Me</p>
            <p className="text-lg font-semibold mb-2">
              Created date: {new Date(userDetails.createdAt).toLocaleString()}
            </p>
            <p>{userDetails.email}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Roles</h3>
            <ul>
              {userDetails.roles.$values.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 ml-8">
            {editMode ? (
              <div className="mt-8">
                <input
                  type="text"
                  name="username"
                  value={updatedProfile.username}
                  onChange={handleChange}
                  placeholder="New Username"
                  className="mr-2 text-black"
                />
                <input
                  type="text"
                  name="firstName"
                  value={updatedProfile.firstName}
                  onChange={handleChange}
                  placeholder="New First Name"
                  className="mr-2 text-black"
                />
                <input
                  type="text"
                  name="lastName"
                  value={updatedProfile.lastName}
                  onChange={handleChange}
                  placeholder="New Last Name"
                  className="mr-2 text-black"
                />
                <input
                  type="text"
                  name="address"
                  value={updatedProfile.address}
                  onChange={handleChange}
                  placeholder="New Address"
                  className="mr-2 text-black"
                />
                {/* <input
                  type="text"
                  name="profileImg"
                  value={updatedProfile.profileImg}
                  onChange={handleChange}
                  placeholder="New Profile Image URL"
                  className="mr-2 text-black"
                /> */}
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={handleDeleteProfile}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
