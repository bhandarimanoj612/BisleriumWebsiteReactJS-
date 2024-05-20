import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddBlogModal from "../Component/AddBlogModal";
import AddBlogUpdate from "../Component/AddBlogUpdate";
import { useAuth } from "../Context/AuthContext";

const EditBlog = () => {
  const { user, token, userName } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [blogToUpdate, setBlogToUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    console.log("userName ", userName);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    console.log(`Bearer ${user ? token : ""}`);
    try {
      const response = await axios.get(
        `https://localhost:7097/api/BlogPost/blogByUserName?username=${
          user ? userName : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      setBlogs(response.data.$values);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7097/api/BlogPost/${id}`, {
        headers: {
          Authorization: `Bearer ${user ? token : ""}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setBlogToUpdate(null);
  };

  const handleOpenUpdateModal = (blog) => {
    setBlogToUpdate(blog);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setBlogToUpdate(null);
  };

  return (
    <div className="container ml-64 ">
      <div className="container mx-auto px-20">
        {" "}
        {/* Increase px value */}
        <div className="flex justify-between mb-4 items-end">
          <h1 className="text-white text-xl ml-4">Blog</h1>
          <button
            onClick={handleOpenAddModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Blog
          </button>
        </div>
        <AddBlogModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAddBlog={fetchBlogs}
        />
        <AddBlogUpdate
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onUpdateBlog={fetchBlogs}
          blogToUpdate={blogToUpdate}
        />
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="font-mono text-md mb-4 bg-gray-100 rounded-lg shadow-md  w-full">
              <tr className=" font-semibold mb-8 bg-gray-100 rounded-lg shadow-md p-4  border-dark-800">
                <th className="border px-1 py-1">Image</th>
                <th className="border px-1 py-1 flex items-center">
                  <span className="font-medium">Title</span> {/* Title */}
                </th>
                <th className="border px-1 py-1">Body</th>
                <th className="border px-1 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="text-center">
                  <td className="border px-1 py-1 font-light text-xs">
                    <img
                      src={`https://localhost:7097/Resources/${blog.imageUrl}`}
                      alt={blog.title}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  </td>
                  <td className="border px-1 py-1 font-light text-xs text-white">
                    {blog.title}
                  </td>
                  <td className="border px-1 py-1 font-light text-xs text-white">
                    {blog.body}
                  </td>
                  <td className="border px-1 py-1 font-light text-xs">
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-500 text-white px-1 py-1 rounded mx-1 hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button
                      onClick={() => handleOpenUpdateModal(blog)}
                      className="bg-[#2A3288] text-white px-1 py-1 rounded mx-1 hover:bg-blue-800"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
