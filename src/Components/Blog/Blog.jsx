import React from "react";
import Posts from "../Posts/Posts";

export default function Blog({ blog, blogId, token }) {
  return (
    <div className="card p-5 my-2 container blog">
      <div>
        <h2>{blog.name}</h2>
      </div>
      <div className="posts">
        <Posts blogId={blogId} token={token} />
      </div>
    </div>
  );
}
