import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Screen/Component/Navbar";
import HomeScreen from "./Screen/Home/HomeScreen";
import Sidebar from "./Screen/Component/Sidebar";
import Popular from "./Screen/Home/Popular";
import All from "./Screen/Home/All";
// import PostComments from "./Screen/Home/PostComments";
import EditBlog from "./Screen/Home/EditBlog";
import Auth from "./Screen/Auth/Auth";
import Register from "./Screen/Auth/Register";
import OTPVerification from "./Screen/Auth/OTPVerification";
import PostComments from "./Screen/Home/PostComments";
import AdminDashBoard from "./Screen/DashBoard/AdminDashBoard";
import AssignRole from "./Screen/DashBoard/AssignRole";
import BlogDashBoard from "./Screen/DashBoard/BlogDashBoard";
import Profile from "./Screen/Profile/Profile";
import UpdateProfile from "./Screen/Profile/UpdateProfile";
import ForgetPassword from "./Screen/Auth/ForgetPassword";
import ResetPassword from "./Screen/Auth/ResetPassword";
import History from "./Screen/Home/History";
import CommentHistory from "./Screen/Home/CommentHistory";
import ProfileImage from "./Screen/Profile/ProfileImage";
import SearchScreen from "./Screen/Home/SearchScreen";

// import BlogComments from "./Screen/Home/BlogComments";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 bg-gray-800">
          <Sidebar />
          <div className="flex-1 flex justify-center items-center">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/otp-Verification" element={<OTPVerification />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/all" element={<All />} />
              <Route path="/adminDashboard" element={<AdminDashBoard />} />
              <Route path="/assignRole" element={<AssignRole />} />
              <Route path="/BlogDashBoard" element={<BlogDashBoard />} />
              <Route path="/post/comments/:postId" element={<PostComments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/profileImage" element={<ProfileImage />} />
              <Route path="/history" element={<History />} />
              <Route path="/comments-history" element={<CommentHistory />} />
              <Route
                path="/profile/UpdateProfile/:profileId"
                element={<UpdateProfile />}
              />
              {/* above postcomments is working fine for working purpose i need it to work poperly */}
              {/* <Route path="/post/comments/:postId" element={<BlogComments />} /> */}
              <Route path="/post/editBlog" element={<EditBlog />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
