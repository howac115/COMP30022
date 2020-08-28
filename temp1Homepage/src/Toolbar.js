import React from 'react';

import './style.css';


const toolbar = () => (
  <header className="toolbar">
    <nav id="navbar">
      <div className="container">
        <h1 className="logo"><a href="/">E-profilio</a></h1>

        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">About me</a></li>
          <li><a href="/">Achievement</a></li>
          <li><a href="/">Experience</a></li>
          <li><a href="/">Contact me</a></li>
        </ul>
      </div>

    </nav>

    <div id="showcase">
      <div className="container">

        <div className="showcase-content">
          <h1><span className="text-primary">Nice</span> to meet you</h1>
          <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eligendi laboriosam. Repellendus officia harum eaque.</p>
          <div className="btn" >About me</div>
        </div>
      </div>
    </div>
  </header >



);

export default toolbar;
