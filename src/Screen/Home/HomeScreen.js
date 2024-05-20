import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
// import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PushNotification from "../Component/PushNotification";

const HomeScreen = ({ selectedItem }) => {
  const { user, token, userName, profileImg, role } = useAuth();
  const [posts, setPosts] = useState([]);
  // const [notification, setNotification] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // Default sort by recency
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showToast = (message, type) => {
    toast(message, { type });
  };

  const fetchPosts = async () => {
    // console.log("Bearer", `${user ? token : ""}`);
    // console.log("Bearer", `${user ? userName : ""}`);
    // console.log("profileImg", `${user ? profileImg : ""}`);
    // console.log("role", `${user ? role : ""}`);
    try {
      const response = await axios.get(
        `https://localhost:7097/api/BlogPost/All?sortBy=${sortBy}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );

      // Filter out deleted blog posts
      const filteredPosts = response.data.$values.filter(
        (post) => !post.isDeleted
      );

      // Set the filtered posts in the state
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, page, pageSize, user]);

  const handleVote = async (postId, voteType) => {
    try {
      await axios.post(
        `https://localhost:7097/api/BlogReaction/reaction?blogPostId=${postId}&userName=${
          user ? user.userName : ""
        }&Content=${voteType}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      showToast("Reaction added successfully", "success");
      // Assuming the vote is successful, update the UI by fetching the latest posts
      fetchPosts();
    } catch (error) {
      console.error("Error voting post:", error);
      showToast("Error to adding reaction", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 mt-40 mb-40">
      <div> {/* <PushNotification /> */}</div>
      {/* {notification && <div>{notification}</div>} */}
      <h1 className="text-3xl mb-4">{selectedItem}</h1>
      {/* Sorting and Pagination Controls */}
      <div className="flex items-center justify-center mb-4">
        <label className="mr-2 text-white">Sort By:</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-4"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="random">Random</option>
          <option value="recency">Recent</option>
        </select>
        <label className="mr-2 text-white">Page Size:</label>
        <input
          type="number"
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-20 mr-4"
          value={pageSize}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 1) {
              setPageSize(value);
            }
          }}
        />
      </div>
      {/* Display blog posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg mb-8 p-6 w-full md:w-4/5 lg:w-3/4 shadow-lg"
        >
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  src={`https://localhost:7097/Resources/${post.userProfile}`}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm text-gray-600 font-bold">
                    {post.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created Date: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            {post.lastUpdateDate && post.lastUpdateDate > post.createdAt && (
              <div>
                <p className="text-xs text-gray-500">
                  Last Updated: {new Date(post.lastUpdateDate).toLocaleString()}
                </p>
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-800">{post.body}</p>
          {/* Display image from backend */}
          {post.imageUrl && (
            <img
              src={`https://localhost:7097/Resources/${post.imageUrl}`}
              alt={post.title}
              className="mt-4 rounded"
            />
          )}
          <div className="flex justify-between items-center mt-4">
            {/* Display total upvotes and downvotes */}
            <div className="flex items-center">
              <button
                className="text-gray-500  "
                onClick={() => handleVote(post.id, "upvote")}
              >
                <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
              </button>
              <span className="text-gray-600">{post.totalUpVotes}</span>
              <span className="text-gray-500 mx-4">
                Total: {post.totalReaction}
              </span>
              <span className="text-gray-600">{post.totalDownVotes}</span>
              <button
                className="text-gray-500 "
                onClick={() => handleVote(post.id, "downvote")}
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
              </button>
            </div>
            {/* Link to view comments for the post */}
            <Link
              to={{
                pathname: `/post/comments/${post.id}`,
                state: { postId: post.id, authToken: user ? user.token : "" },
              }}
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded flex items-center"
            >
              <FontAwesomeIcon
                icon={faComment}
                className="text-gray-500 mr-2 text-lg hover:text-gray-700"
              />
              View Comments
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
