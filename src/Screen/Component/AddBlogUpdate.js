import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const AddBlogUpdate = ({ isOpen, onClose, blogToUpdate }) => {
  const { user, token, userName, profileImg } = useAuth();
  const [updatedBlogData, setUpdatedBlogData] = useState({
    title: "",
    body: "",
    image: null,
  });
  console.log("userName ", userName);
  console.log("profileImg ", profileImg);
  console.log("profileImg ", token);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlogData({ ...updatedBlogData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUpdatedBlogData({ ...updatedBlogData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", updatedBlogData.title);
      formData.append("body", updatedBlogData.body);
      formData.append("userName", user ? userName : "");
      formData.append("userProfile", user ? profileImg : "");
      formData.append("file", updatedBlogData.image);

      const response = await axios.put(
        `https://localhost:7097/api/BlogPost/${blogToUpdate.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully");

        onClose();
      } else {
        toast.error("Error updating blog");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating blog");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={updatedBlogData.title}
              onChange={handleInputChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              name="body"
              value={updatedBlogData.body}
              onChange={handleInputChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Blog
            </button>
            <button
              onClick={onClose}
              className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogUpdate;
