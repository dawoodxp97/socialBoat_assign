import React from "react";
import "../styles/Tag.css";
function Tag({ tg }) {
  return (
    <div className="tag">
      <span>{tg}</span>
    </div>
  );
}

export default Tag;
