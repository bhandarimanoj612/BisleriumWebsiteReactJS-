This project is all about reddit clone . I have done my best make it similar to reddit clone

1.Authentication and Authorization:

Users can register, login, and perform password reset actions (src/Screen/Auth/*).
Authentication tokens are managed using context (src/Screen/Context/AuthContext.js), indicating a centralized approach to authentication.

2.Dashboard Functionality:

There seems to be a dashboard for admin users (src/Screen/DashBoard/AdminDashBoard.js), possibly for managing users, roles, and blog posts.

3.Blogging Functionality:

Users can create, edit, and delete blog posts (src/Screen/Home/EditBlog.js).
There's a component for adding and updating blog posts (src/Screen/Component/AddBlogModal.js and src/Screen/Component/AddBlogUpdate.js).
Users can view a list of blog posts (src/Screen/Home/HomeScreen.js) and search for specific posts (src/Screen/Home/SearchScreen.js).
Each post can have comments, which users can view and interact with (src/Screen/Home/PostComments.js).

4.User Profile Management:

Users can view and update their profiles (src/Screen/Profile/Profile.js and src/Screen/Profile/UpdateProfile.js).
There's functionality to manage profile images (src/Screen/Profile/ProfileImage.js).

5.UI Components:

Navbar (src/Screen/Component/Navbar.js) and sidebar (src/Screen/Component/Sidebar.js) components provide navigation.

6.Push notification functionality (src/Screen/Component/PushNotification.js) suggests real-time communication features.

7.SignalR Integration:

There's a SignalRService.js file (src/Screen/PushNotification/SignalRService.js), indicating integration with SignalR for real-time communication or push notifications.
Styling and UI:

8.Tailwind CSS (tailwind.config.js) is used for styling, along with custom CSS files (src/*.css).
Miscellaneous:

There are various utility files and configuration files (public/*, src/index.*) that are essential for setting up the application.
