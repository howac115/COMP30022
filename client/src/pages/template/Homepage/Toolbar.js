import React from 'react';
import { Route, Link } from 'react-router-dom'

import './style.css';

const toolbar = () => (

  <div id="navbar" className="container">
    <h1 className="logo"><a href="/">EX-Profilio</a></h1>
    <ul>
      <li>
        <Link to="/templatemain">Home</Link>
      </li>
      <li>
        <Link to="/temachivement">Achievement</Link>
      </li>
      <li>
        <Link to="/temexperience">Experience</Link>
      </li>
      <li>
        <Link to="/temcontact">Contact me</Link>
      </li>
    </ul>
  </div>

);

export default toolbar;
