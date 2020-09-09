import React from "react";
import './style.css';
import { Link } from 'react-router-dom';

const Screen = props => {
  return (
    <div id="showcase">
      <div className="container">

        <div className="showcase-content">
          <div className="showcase-wel"><span className="text-primary">Nice</span> to meet you</div>
          {/* <h1><span className="text-primary">Nice</span> to meet you</h1> */}
          <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eligendi laboriosam. Repellendus officia harum eaque.</p>
          <div className="btn" ><Link to="/info">About me</Link></div>
        </div>

        <div className="showcase-bottom-img"></div>
        <div className="showcase-bottom-content">
          <h2><span className="text-primary">The Summary</span> Of Myself</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            aliquam dolor alias iste autem, quaerat magni unde accusantium qui
            fuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,
            explicabo quisquam dolor placeat praesentium nesciunt mollitia quos
            nobis natus voluptatum asperiores!
      </p>
          <a href="/experience" className="btn btn-light">Read More</a>

        </div>
      </div>
    </div>
  );
}
export default Screen;