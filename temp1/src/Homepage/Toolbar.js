import React from 'react';
import MainScreen from "../Homepage/MainScreen";
import Contact from "../ContactMe/Contact";
import Abt from "../Aboutme/aboutme";
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
        <Link to="/aboutme">About me</Link>
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
      <li>
        <Link to="/edit">Edit</Link>
      </li>
    </ul>

    <Route path='/' exact component={MainScreen} />
    <Route path='/aboutme' component={Abt} />
    <Route path='/contact' component={Contact} />
    <Route path='/achivement' component={Achievement} />
    <Route path='/experience' component={Experience} />
    <Route path='/edit' component={MainScreen} />

  </div>

);

export default toolbar;
