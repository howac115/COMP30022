import React from 'react';
import MainScreen from "../Homepage/MainScreen";
import Contact from "../ContactMe/Contact";
import Achievement from "../Achievement/achivement"
import Experience from "../Experience/experience"
import { Route, Link } from 'react-router-dom'

import './style.css';

const toolbar = () => (

  <div id="navbar" className="container">
    <h1 className="logo"><a href="/">EX-Profilio</a></h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/achivement">Achievement</Link>
      </li>
      <li>
        <Link to="/experience">Experience</Link>
      </li>
      <li>
        <Link to="/contact">Contact me</Link>
      </li>

    </ul>

    <Route path='/' exact component={MainScreen} />
    <Route path='/contact' component={Contact} />
    <Route path='/achivement' component={Achievement} />
    <Route path='/experience' component={Experience} />


  </div>

);

export default toolbar;
