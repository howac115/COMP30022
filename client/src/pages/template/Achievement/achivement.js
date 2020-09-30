import React, { Component } from "react";

import "../Homepage/style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "../components/image";
import CTE from "react-click-to-edit";
import Layout from '../../../layout.js';
import {withRouter} from 'react-router-dom';

class Achivement extends Component {

  clickImge(){
    console.log("test");
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    //const { classes } = this.props;
    const images = [
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    ];

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };
    const fakerData = Array(12)
      .fill(0)
      .map((item, index) => {
        return {
          image: images[index],
          headline: "w3js -> web front-end studio",
        };
      });

   
    return (
      <div id="home-achivement">
        <Layout></Layout>
        <div className="achivement-top-img"></div>
        <div className="achivement-top-content">
          <h2>Lorem ipsum dolor</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            aliquam dolor alias iste autem, quaerat magni unde accusantium qui
            fuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,
            explicabo quisquam dolor placeat praesentium nesciunt mollitia quos
            nobis natus voluptatum asperiores!
          </p>
        </div>

        <div className="achivement-top-content">
          <div>
          <CTE 
              wrapperClass="second_title"
              textClass="second_title_text"
              initialValue={"Lorem ipsum"}
              >
          </CTE>
          </div>
          <CTE 
              wrapperClass="second_content"
              textClass="second_content_text"
              initialValue={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda aliquam dolor alias iste autem, quaerat magni unde accusantium quifuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis, explicabo quisquam dolor placeat praesentium nesciunt mollitia quosnobis natus voluptatum asperiores!"}
              >
          </CTE>
        </div>
        <div className="image-slider">
          
          <Carousel
            
            responsive={responsive}
            ssr
            showDots
            infinite
            containerClass="container-with-dots"
            itemClass="image-item"
          >
              {fakerData.slice(0, 5).map((card, index) => {
              return <Image url={card.image} alt={card.headline} onClick={() => {
                const loggedUserId = global.auth.getUser().id;
                const createLink = '/' + loggedUserId + '/temexperience';
                this.nextPath.bind(this);
                this.nextPath(createLink);
              }}/>;
              })}     
          </Carousel>
        </div>
      </div>
    );
  }
}

export default withRouter(Achivement);
