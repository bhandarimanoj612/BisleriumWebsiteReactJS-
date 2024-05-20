import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostComments = () => {
  const { user, token, userName, profileImg } = useAuth();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [clickedCommentId, setClickedCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const showToast = (message, type) => {
    toast(message, { type });
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7097/api/BlogPost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7097/api/Comment/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      setComments(response.data.$values);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId, user]);

  useEffect(() => {
    if (comments && comments.length > 0 && post) {
      const userComments = comments.filter(
        (comment) => comment.blogPostId === parseInt(postId)
      );
      setUserComments(userComments);
    }
  }, [comments, post, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:7097/api/Comment/addComments/${postId}`,
        {
          content: newComment,
          userName: `${user ? userName : ""}`,
          userProfile: user ? profileImg : "",
        },
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );

      const updatedComments = response.data.$values;
      setComments(updatedComments);
      setNewComment("");
      setShowAddComment(false);
      showToast("Comment added successfully", "success");
      fetchPost();
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      showToast("Failed to add comment", "error");
    }
  };

  const handleCancel = () => {
    setNewComment("");
    setShowAddComment(false);
  };

  const handleEdit = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (editCommentId === commentId) {
      try {
        await axios.put(
          `https://localhost:7097/api/Comment/${postId}/comments/${commentId}`,
          {
            content: editCommentContent,
            userName: user ? userName : "",
            userProfile: user ? profileImg : "",
          },
          {
            headers: {
              Authorization: `Bearer ${user ? token : ""}`,
            },
          }
        );
        const response = await axios.get(
          `https://localhost:7097/api/Comment/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${user ? token : ""}`,
            },
          }
        );
        setComments(response.data.$values);
        setEditCommentContent("");
        setEditCommentId(null);
        setShowAddComment(false);
        setShowEditDropdown(false);
        showToast("Comment updated successfully", "success");
        fetchPost();
        fetchComments();
      } catch (error) {
        console.error("Error editing comment:", error);
        showToast("Failed to update comment", "error");
      }
    } else {
      setEditCommentId(commentId);
      if (comment) {
        setEditCommentContent(comment.content);
      }
      setShowAddComment(false);
      setShowEditDropdown(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`https://localhost:7097/api/Comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user ? token : ""}`,
        },
      });
      const response = await axios.get(
        `https://localhost:7097/api/Comment/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      setComments(response.data.$values);
      showToast("Comment deleted successfully", "success");
      fetchPost();
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      showToast("Failed to delete comment", "error");
    }
  };

  const handleCommentClick = (commentId) => {
    setClickedCommentId(commentId);
  };

  const toggleDropdown = () => {
    setShowAddComment(false);
    setShowEditDropdown(!showEditDropdown);
  };

  const toggleAddComment = () => {
    setShowEditDropdown(false);
    setShowAddComment(!showAddComment);
  };

  const handleVote = async (commentId, voteType) => {
    try {
      await axios.post(
        `https://localhost:7097/api/CommentReaction/reaction?commentId=${commentId}&userName=${
          user ? userName : ""
        }&Content=${voteType}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user ? token : ""}`,
          },
        }
      );
      showToast("Reaction added successfully", "success");
      fetchComments(); // Refresh comments after vote
    } catch (error) {
      console.error("Error voting post:", error);
      showToast("Error adding reaction", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 mt-32 mb-32 py-8">
      <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg p-6 mb-4">
        {post && (
          <>
            <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
            <p className="text-gray-800">{post.body}</p>
            {post.imageUrl && (
              <img
                src={`https://localhost:7097/Resources/${post.imageUrl}`}
                alt={post.title}
                className="mt-4 rounded"
              />
            )}
          </>
        )}
      </div>
      <div className="w-full md:w-4/5 lg:w-3/4 rounded-lg p-2 mb-4">
        <div className=" bg-gray-700 pl-7 p-1 rounded-lg">
          {post && (
            <div className="flex flex-row ">
              <p className="text-gray-500 items-center mt-3 ml-80">
                Total Comments: {comments && comments.length}
              </p>
            </div>
          )}
        </div>
      </div>
      {showAddComment && (
        <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Add Comment</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full h-24 border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:border-blue-500"
              placeholder="Write your comment here..."
              required
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none"
              >
                Add Comment
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg p-6 mb-4">
        {!showAddComment && (
          <input
            type="text"
            placeholder="Add a comment..."
            onClick={toggleAddComment}
            className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg p-4 mb-4 border border-gray-300 focus:outline-none"
          />
        )}
        <div className="w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {userComments.map((comment) => (
            <div
              key={comment.id}
              className={`relative mb-4 bg-gray-200 p-3 rounded-xl ${
                clickedCommentId === comment.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleCommentClick(comment.id)}
            >
              <div className="flex flex-row justify-between items-center">
                <div>
                  {editCommentId !== comment.id ? (
                    <p>{comment.content}</p>
                  ) : (
                    <textarea
                      value={editCommentContent || comment.content}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      className="w-full h-24 border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:border-blue-500"
                      placeholder="Edit your comment here..."
                      required
                    ></textarea>
                  )}
                </div>
                <div className="flex items-center">
                  <img
                    src={`https://localhost:7097/Resources/${comment.userProfile}`}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full mr-2"
                  />

                  <p className="text-sm text-gray-600 font-bold">
                    {comment.userName}
                  </p>
                </div>

                {clickedCommentId === comment.id && (
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </div>
                    <div
                      className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                        showEditDropdown ? "" : "hidden"
                      }`}
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={() => handleEdit(comment.id)}
                        >
                          {editCommentId === comment.id ? "Save" : "Edit"}
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                          onClick={() => handleDelete(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* reactions */}
              {/* Display total upvotes and downvotes */}
              <div className="flex items-center">
                <button
                  className="text-gray-500  "
                  onClick={() => handleVote(comment.id, "upvote")}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
                </button>
                <span className="text-gray-600">{comment.totalUpVotes}</span>
                <span className="text-gray-500 mx-4">
                  Total: {comment.totalReaction}
                </span>
                <span className="text-gray-600">{comment.totalDownVotes}</span>
                <button
                  className="text-gray-500 "
                  onClick={() => handleVote(comment.id, "downvote")}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
                </button>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Commented on: {new Date(comment.createdAt).toLocaleString()}
                </p>
                {comment.updatedAt &&
                  new Date(comment.updatedAt) > new Date(comment.createdAt) && (
                    <p className="text-gray-500 text-sm">
                      Updated on: {new Date(comment.updatedAt).toLocaleString()}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostComments;
