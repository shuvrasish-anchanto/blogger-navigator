import React, { useState } from "react";
import Page from "../Page/Page";

export default function Pages() {
  const [pages, setPages] = useState([]);
  return (
    <div>
      {pages.map((page) => {
        return <Page page={page} setPages={setPages} />;
      })}
    </div>
  );
}
