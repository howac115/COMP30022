import React from "react";

const Card = ({ title, content }) => (
  <div style={{ width: "100%", height: "100%", position: 'relative', textAlign: 'center' }}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

export default Card;
