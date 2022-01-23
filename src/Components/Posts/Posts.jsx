import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Posts.css";

export default function Posts({ blogId, token }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [showPosting, setShowPosting] = useState(false);
  const [newPost, setNewPost] = useState({
    kind: "blogger#post",
    blog: {
      id: blogId,
    },
    title: "",
    content: "",
  });

  const openPosts = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const openPostingModal = () => {
    setShowPosting(true);
  };
  const submitPost = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`, //the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setPosts([res.data, ...posts]);
        // console.log(posts);
      })
      .then(() => {
        setNewPost({
          kind: "blogger#post",
          blog: {
            id: blogId,
          },
          title: "",
          content: "",
        });
        setShowPosting(false);
      });
  };
  const titleChange = (e) => {
    setNewPost({
      ...newPost,
      title: e.target.value,
    });
  };
  const contentChange = (e) => {
    setNewPost({
      ...newPost,
      content: e.target.value,
    });
  };
  useEffect(() => {}, [submitPost]);
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${process.env.REACT_APP_BLOGGER_API_KEY}`
      )
      .then((res) => {
        if (res.data.items) {
          setPosts(res.data.items);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={openPosts}>
        Posts
      </button>
      <span> </span>
      <button
        type="button"
        className="btn btn-success"
        onClick={openPostingModal}
      >
        Post +
      </button>
      {showPosting && (
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => titleChange(e)}
              value={newPost.title}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Content</label>
            <textarea
              type="text/html"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => contentChange(e)}
              value={newPost.content}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitPost}
          >
            Submit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowPosting(false)}
          >
            Close
          </button>
        </form>
      )}

      {!loading && show && posts.length > 0 && (
        <div>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                blogId={blogId}
                token={token}
                setPosts={setPosts}
                posts={posts}
              />
            );
          })}
        </div>
      )}
      {show && posts.length === 0 && <p>No Posts to Show!</p>}
    </div>
  );
}
