import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPlus,
  faUser,
  faHistory,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext"; // Import useAuth hook
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { notification } from "antd";
import PushNotification from "./PushNotification";

const Navbar = () => {
  const { user, logout, profileImg } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  useEffect(() => {
    const loggedIn = user !== null;
    if (loggedIn && location.pathname === "/login") {
      navigate("/");
      window.location.reload();
    }
  }, [user, location, navigate]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const userDataJSON = JSON.parse(userData);
          setUserName(userDataJSON.userName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileDropdown(false);
    setNotificationsCount(0); // Reset notification count when opening notifications
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowProfileDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    setNotificationsCount(0); // Reset notification count when notifications are clicked
    // Additional logic if needed when notifications are clicked
  };

  return (
    <header className="bg-gray-900 text-white py-4 border-b border-gray-400 fixed top-0 left-0 w-full z-10">
      <PushNotification
        setNotifications={setNotifications}
        setNotificationCount={setNotificationsCount}
      />
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold ml-10">
          Bislerium Website
        </Link>
        <div className="flex items-center">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
            />
          </form>
        </div>
        <div className="header-right flex items-center ml-52">
          {!user && (
            <Link
              to="/login"
              title="Login"
              className="px-4 py-2 bg-gray-900 rounded-full text-white font-semibold ml-4 hover:bg-gray-600 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faUser} className="p-1 h-5" />
            </Link>
          )}
          {user && (
            <>
              <Link
                to="/post/editBlog"
                title="Edit Blog"
                className="px-4 py-2 bg-green-500 rounded-lg text-white font-semibold ml-4 hover:bg-green-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Manage
              </Link>
              <div className="relative ml-4" ref={profileRef}>
                <button
                  title="Profile"
                  onClick={toggleProfileDropdown}
                  className="p-1 rounded-full bg-gray-900  text-white font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center"
                >
                  <img
                    src={`https://localhost:7097/Resources/${profileImg}`}
                    alt={profileImg}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="m-1">
                    <h1>Welcome</h1>
                    <h1>{user ? user.firstName : ""}</h1>
                  </div>
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0  w-48 bg-gray-700 rounded-lg shadow-lg mt-7">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      Settings
                    </Link>
                    <Link
                      to="/history"
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faHistory} className="mr-2" />
                      History
                    </Link>
                    <Link
                      to="/"
                      onClick={logout}
                      className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative " ref={notificationRef}>
                <button
                  title="Notifications"
                  onClick={toggleNotifications}
                  className="p-1 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-600 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faBell} className="p-1 h-5" />
                  {notificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationsCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 w-80 bg-gray-700 rounded-lg shadow-lg mt-7">
                    <div className="p-4 border-b border-gray-600">
                      <h2 className="text-lg font-semibold text-white">
                        Notifications
                      </h2>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-gray-300">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="p-4 border-b border-gray-600 text-white notification-scrollview"
                          onClick={handleNotificationClick}
                        >
                          <h2 className="text-sm text-gray-300">
                            {notification}
                          </h2>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
