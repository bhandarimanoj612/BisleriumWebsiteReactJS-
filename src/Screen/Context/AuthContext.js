import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUsername] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      let storedToken = await AsyncStorage.getItem("token");
      let userData = await AsyncStorage.getItem("userData");

      if (!storedToken || !userData) {
        storedToken = token;
        userData = user ? JSON.stringify(user) : null;
      }

      if (userData && storedToken) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setToken(storedToken);
        setUserID(parsedUserData.id);
        setProfileImg(parsedUserData.profileImg);
        setEmail(parsedUserData.email);
        setUsername(parsedUserData.userName);
        setRole(
          parsedUserData.roles && parsedUserData.roles.$values
            ? parsedUserData.roles.$values[0]
            : null
        ); // Set role
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const login = async (userData, token) => {
    try {
      setUser(userData);
      setToken(token);
      setUserID(userData.id);
      setProfileImg(userData.profileImg);
      setEmail(userData.email);
      setUsername(userData.userName);
      setRole(
        userData.roles && userData.roles.$values
          ? userData.roles.$values[0]
          : null
      ); // Set role
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setUserID(null);
      setProfileImg(null);
      setEmail(null);
      setUsername(null);
      setRole(null); // Reset role
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userID,
        profileImg,
        email,
        userName,
        role, // Include role in context
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
