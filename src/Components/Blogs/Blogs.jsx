import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "../Blog/Blog";

export default function Blogs({ token }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/blogger/v3/users/self/blogs?key=${process.env.REACT_APP_BLOGGER_API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        setBlogs(res.data.items);
      })
      .then(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      {!loading &&
        blogs.map((blog) => {
          return (
            <Blog key={blog.id} blog={blog} blogId={blog.id} token={token} />
          );
        })}
    </div>
  );
}
