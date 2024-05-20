This project is all about reddit clone . I have done my best make it similar to reddit .

1.Authentication and Authorization:

Users can register, login, and perform password reset actions (src/Screen/Auth/*).
Authentication tokens are managed using context (src/Screen/Context/AuthContext.js), indicating a centralized approach to authentication.
-Login
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/07a924d9-2bd3-4ae8-b547-47e4f168277c)
-register
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/4e55a812-43ee-43b1-851f-b59278353057)

-forget password need real email,otp code is send to email and if user verify that otp user can forget their password
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/c00a8ec5-1feb-4a77-a341-1434c2965f2e)

- Home Ui
   ![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/b303f983-afa5-49bb-b4e3-541bb18491d1)

![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/3b6af433-2427-44c2-9b36-b1877a11bb9f)

-comment
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/486e7c22-d771-4e97-bb05-427b3886170c)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/cc1bdd11-b9e2-4c58-97f3-b8ce63ed09cd)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/71d58dfc-0fd5-4c8e-8f38-701591d72209)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/234c834f-fe13-433b-b294-f6c2e8c8e153)

2.Dashboard Functionality:

There seems to be a dashboard for admin users (src/Screen/DashBoard/AdminDashBoard.js), possibly for managing users, roles, and blog posts.
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/c0bb17ed-b6f9-454a-a98a-e4cd1623af2c)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/9f39c1cb-775a-43a7-b4f9-a9e089650728)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/437f290c-3612-4143-8ddf-272528b2e358)


3.Blogging Functionality:

Users can create, edit, and delete blog posts (src/Screen/Home/EditBlog.js).
There's a component for adding and updating blog posts (src/Screen/Component/AddBlogModal.js and src/Screen/Component/AddBlogUpdate.js).
Users can view a list of blog posts (src/Screen/Home/HomeScreen.js) and search for specific posts (src/Screen/Home/SearchScreen.js).
Each post can have comments, which users can view and interact with (src/Screen/Home/PostComments.js).
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/33efaf73-fa05-42af-a6d0-31f7e2a2cf70)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/c3c92963-9d42-487a-a486-356ff7fff4fa)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/4ab78016-d51b-4ecc-a8ba-74bf18d5dec0)


4.User Profile Management:

Users can view and update their profiles (src/Screen/Profile/Profile.js and src/Screen/Profile/UpdateProfile.js).
There's functionality to manage profile images (src/Screen/Profile/ProfileImage.js).
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/a1e51a61-8fd9-42ed-b765-b64aa7bdc117)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/25634a96-fe81-42af-8426-2630c3c88b57)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/4c208755-62e5-4cd1-98f6-85d3e8fd7c78)


5.UI Components:

Navbar (src/Screen/Component/Navbar.js) and sidebar (src/Screen/Component/Sidebar.js) components provide navigation.
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/bf00c7bd-5476-4532-9c76-f05c15e794d2)

6.Push notification functionality (src/Screen/Component/PushNotification.js) suggests real-time communication features.
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/275cc2b9-5f48-45d4-8115-2368794b133c)
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/6eb51292-6ec5-4d5b-8af4-f43b138ffdb1)

7.SignalR Integration:

There's a SignalRService.js file (src/Screen/PushNotification/SignalRService.js), indicating integration with SignalR for real-time communication or push notifications.
Styling and UI:
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/4f1aa598-6880-4fff-b497-5686abd0767d)

8.Tailwind CSS (tailwind.config.js) is used for styling, along with custom CSS files (src/*.css).
Miscellaneous:
![image](https://github.com/bhandarimanoj612/BisleriumWebsiteReactJS-/assets/105379940/31858452-ddd3-4e05-91a4-7f9e5d781730)

There are various utility files and configuration files (public/*, src/index.*) that are essential for setting up the application.
