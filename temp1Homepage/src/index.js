
import ReactDOM from "react-dom";
import React from "react";
import Toolbar from "./Homepage/Toolbar";
import Info from "./Homepage/Info";
import Footer from "./Homepage/Footer";
import MainScreen from "./Homepage/MainScreen";
import Contact from "./ContactMe/Contact";



const App = () => {
  return (/*
    <div >
      <Toolbar />
      <MainScreen />
      <Info />
      <Footer />
    </div> */
    <div>
      <Toolbar />
      <Contact />
      <Footer />
    </div>
  );
};




ReactDOM.render(<App />, document.querySelector('#root'));
