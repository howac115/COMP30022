import React from "react";

import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

function AboutPage(props) {

  return(
      <div>
          <Hero title={props.title} />

          <p>Write something here</p>
      </div>
  );

}

export default AboutPage;
