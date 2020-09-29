import React from 'react';
import Toolbar from "./Homepage/Toolbar";
import Footer from "./Homepage/Footer";
import Layout from '../../layout.js';
import './Homepage/style.css';

function Template() {
  return (
    <div className="template">
      <Layout></Layout>
      <Toolbar></Toolbar>
      <Footer></Footer>
    </div>
  );
}

export default Template;
