import React from 'react';

const Image = ({ onClick, url, alt }) => (
  <img onClick={onClick} draggable={false} style={{ width: '100%', height: '100%',position: 'relative'}} src={url} alt={alt} />
)

export default Image;
