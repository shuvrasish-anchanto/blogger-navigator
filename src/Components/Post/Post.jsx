import axios from "axios";
import React, { useState } from "react";
import Comments from "../Comments/Comments";

export default function Post({ post, blogId, setPosts, posts, token }) {
  const [label, setLabel] = useState("Hide");
  const deletePost = () => {
    const postId = post.id;
    axios
      .delete(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        // console.log(res);
        let newPosts = [...posts];
        newPosts.forEach((postData, index) => {
          if (postData.id === postId) {
            newPosts.splice(index, 1);
          }
        });
        setPosts(newPosts);
        setLabel("View Full Post");
      });
  };
  const togglePost = () => {
    if (label === "Hide") {
      setLabel("View Full Post");
    } else {
      setLabel("Hide");
    }
  };
  return (
    <div>
      <div className="card p-5 m-3">
        <h3>{post.title}</h3>
        <div id="accordion">
          <div className="card p-3">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  onClick={togglePost}
                >
                  {label}
                </button>
                <span> </span>

                <button className="btn btn-danger" onClick={() => deletePost()}>
                  Delete
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <Comments postId={post.id} blogId={blogId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
