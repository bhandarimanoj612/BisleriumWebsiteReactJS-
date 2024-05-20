// UpdateProfile.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    profileImg: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7097/api/UserProfileControllers/users/GetUserDetailsByUserIdAsync/${userId}`
        );
        const userData = response.data;
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          profileImg: userData.profileImg,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const { firstName, lastName, address, profileImg } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://localhost:7097/api/UserProfileControllers/users/UpdateUserProfile/${userId}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
