import React from "react";
import "../styles/Card.css";
import Tag from "./Tag";

function Card({ url, heading, tags }) {
  const allTags = tags.map((tag) => <Tag tg={tag} />);
  const title = heading.split(":");
  return (
    <div key={heading} className="card_container">
      <p>
        <strong>Heading: </strong> {title[0]}
      </p>
      <div className="video_box">
        <video controls>
          <source src={url} type="video/mp4" />
        </video>
      </div>
      <div>
        <strong>Tags: </strong>
        {allTags}
      </div>
    </div>
  );
}

export default Card;
