import React from "react";
import Blogs from "../Blogs/Blogs";
import "./Home.css";

export default function Home({ idToken }) {
  return (
    <div className="main">
      <Blogs token={idToken} />
    </div>
  );
}
