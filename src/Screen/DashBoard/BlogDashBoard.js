import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [blogPosts, setBlogPosts] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch top 10 blog posts
        const blogResponse = await axios.get(
          `https://localhost:7097/api/BlogPost/top10bymonthyear/${year}/${month}`
        );
        setBlogPosts(blogResponse.data.$values);

        // Fetch top 10 bloggers
        const bloggerResponse = await axios.get(
          `https://localhost:7097/api/BlogPost/top10Bloggersbymonthyear/${year}/${month}`
        );
        setBloggers(bloggerResponse.data.$values);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="bg-gray-800 min-h-screen py-8 w-full mt-28">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-white">Blog Dashboard</h1>

          <div className="flex justify-between mb-4">
            <div className="w-1/3">
              <label className="block mb-2 font-semibold text-white">
                Select Year:
              </label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                value={year}
                onChange={handleYearChange}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option
                    key={new Date().getFullYear() - 2 + i}
                    value={new Date().getFullYear() - 2 + i}
                  >
                    {new Date().getFullYear() - 2 + i}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label className="block mb-2 font-semibold text-white">
                Select Month:
              </label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                value={month}
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex justify-between ">
              <div className="w-1/2 bg-white rounded-xl p-6 mr-2">
                {blogPosts.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold mb-2">
                      Top 10 Blog Posts
                    </h2>
                    <ul>
                      {blogPosts.map((blog) => (
                        <li key={blog.id} className="flex items-center mb-4">
                          <img
                            src={`https://localhost:7097/Resources/${blog.imageUrl}`}
                            alt={blog.title}
                            className="rounded-full w-12 h-12 mr-3"
                          />
                          <div>
                            <strong>{blog.title}</strong> by {blog.userName}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="w-1/2 bg-white rounded-xl p-6 ml-2">
                {bloggers.length > 0 && (
                  <>
                    <h2 className="text-lg font-semibold mb-2">
                      Top 10 Bloggers
                    </h2>
                    {/* <ul> */}
                    {/* {bloggers.map((blogger) => (
                        <li key={blogger.id} className="flex items-center mb-4">
                          <img
                            src={`https://localhost:7097/Resources/${blogger.userProfile}`}
                            alt={blogger.userProfile}
                            className="rounded-full w-12 h-12 mr-3"
                          />
                          <div>{blogger.userName}</div>
                        </li> */}

                    {/* ))} */}
                    {/* </ul> */}
                    {/* below code will show multiple username which is more at top once if it is same  */}
                    <ul>
                      {bloggers.map((blogger, index) => {
                        const count = bloggers.filter(
                          (b) => b.userName === blogger.userName
                        ).length;
                        const isFirstOccurrence =
                          bloggers.findIndex(
                            (b) => b.userName === blogger.userName
                          ) === index;
                        if (isFirstOccurrence) {
                          return (
                            <li
                              key={blogger.id}
                              className="flex items-center mb-4"
                            >
                              <img
                                src={`https://localhost:7097/Resources/${blogger.userProfile}`}
                                alt={blogger.userProfile}
                                className="rounded-full w-12 h-12 mr-3"
                              />
                              <div>{blogger.userName}</div>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
