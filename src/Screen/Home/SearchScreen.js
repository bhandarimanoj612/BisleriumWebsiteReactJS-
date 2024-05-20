import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
const SearchScreen = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const { user, token } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("recency"); // Default sort by recency
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7097/api/BlogPost/AllSearch?sortBy=${sortBy}&page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`,
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
      setSearchResults(filteredPosts);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, sortBy, page, pageSize, user, token]);

  const showToast = (message, type) => {
    toast(message, { type });
  };
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
      fetchSearchResults();
    } catch (error) {
      console.error("Error voting post:", error);
      showToast("Error to adding reaction", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 mt-40 mb-40">
      <h1 className="text-xl mb-4 text-white">
        Search Results for "{searchQuery}"
      </h1>
      {/* Render sorting and pagination controls */}
      <div className="flex items-center justify-center mb-4">
        <label className="mr-2 text-white">Sort By:</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-4"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recency">Recent</option>
          <option value="popularity">Popularity</option>
          <option value="random">Random</option>
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
      {/* Render search results */}
      {searchResults.map((result) => (
        <div
          key={result.id}
          className="bg-white rounded-lg mb-8 p-6 w-full md:w-4/5 lg:w-3/4 shadow-lg"
        >
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  src={`https://localhost:7097/Resources/${result.userProfile}`}
                  alt={result.userName}
                  className="w-10 h-10 rounded-full mr-2"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">
                  {result.userName}
                </p>
                <p className="text-xs text-gray-500">
                  Created Date: {new Date(result.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {/* Render last update date if available */}
            {result.lastUpdateDate &&
              result.lastUpdateDate > result.createdAt && (
                <div>
                  <p className="text-xs text-gray-500">
                    Last Updated:
                    {new Date(result.lastUpdateDate).toLocaleString()}
                  </p>
                </div>
              )}
          </div>
          <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
          <p className="text-gray-800">{result.body}</p>
          {/* Render image from backend if available */}
          {result.imageUrl && (
            <img
              src={`https://localhost:7097/Resources/${result.imageUrl}`}
              alt={result.title}
              className="mt-4 rounded"
            />
          )}
          <div className="flex justify-between items-center mt-4">
            {/* Render total upvotes and downvotes */}
            <div className="flex items-center">
              {/* Render upvote button */}
              <button
                className="text-gray-500  "
                onClick={() => handleVote(result.id, "upvote")}
              >
                <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
              </button>
              <span className="text-gray-600">{result.totalUpVotes}</span>
              <span className="text-gray-500 mx-4">
                Total: {result.totalReaction}
              </span>
              <span className="text-gray-600">{result.totalDownVotes}</span>
              {/* Render downvote button */}
              <button
                className="text-gray-500 "
                onClick={() => handleVote(result.id, "downvote")}
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
              </button>
            </div>
            {/*  link to view comments for the post */}
            <Link
              to={{
                pathname: `/post/comments/${result.id}`,
                state: { postId: result.id, authToken: user ? user.token : "" },
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

export default SearchScreen;
