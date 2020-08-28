
import ReactDOM from "react-dom";
import React from "react";
import Toolbar from "./Toolbar";
import Info from "./Info";
import Footer from "./Footer";


const App = () => {
  return (
    <div >
      <Toolbar />
      <Info />
      <Footer />
    </div>
  );
};




ReactDOM.render(<App />, document.querySelector('#root'));
