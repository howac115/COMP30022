import React, { Component } from "react";
import "../Homepage/style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../components/card";
import faker from "faker";

class Experience extends Component {
  render() {
    const texts = ["Lorem ipsum1", "Lorem ipsum2", "Lorem ipsum3"];
    const fakerData = Array(3)
      .fill(0)
      .map((item, index) => {
        return {
          title: texts[index],
          content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda aliquam dolor alias iste autem, quaerat magni unde accusantium qui fugaplaceat quidem quo pariatur, voluptatum, ea sequi? Corporis, explicaboquisquam dolor placeat praesentium nesciunt mollitia quos nobis natusvoluptatum asperiores!",
        };
      });
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };
    return (
      <div id="home-experience" className="bg-dark">
        <div className="experience-img"></div>
        <div className="experience-card">
          <Carousel
            responsive={responsive}
            ssr
            showDots
            infinite="false"
            containerClass="container-with-dots"
            itemClass="card-item"
          >
            {fakerData.map((card) => {
              return <Card title={card.title} content={card.content} />;
            })}
          </Carousel>
        </div>
        <div className="experience-bottom-content">
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            aliquam dolor alias iste autem, quaerat magni unde accusantium qui
            fuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,
            explicabo quisquam dolor placeat praesentium nesciunt mollitia quos
            nobis natus voluptatum asperiores!
          </p>
        </div>
        <div className="experience-bottom-grid">
          <img className="experience-bottom-item" src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt={faker.image.people()}></img>
          <img className="experience-bottom-item" src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt={faker.image.people()}></img>
          <img className="experience-bottom-item" src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt={faker.image.people()}></img>
        </div>
      </div>
    );
  }
}

export default Experience;
