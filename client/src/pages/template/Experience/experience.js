import React, { Component } from "react";
import "../Homepage/style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../components/card";
import faker from "faker";
import CTE from "react-click-to-edit";
import Layout from '../../../layout.js';

class Experience extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottomImgUrl:require("../Homepage/photo-1554415707-6e8cfc93fe23.jpeg"),
      bottomImgDisplay:"block",
      bottomVideoUrl:"",
      bottomVideoDisplay:"none"
    }
  }

  getObjectURL(file) { 
    var url = null; 
    if (window.createObjcectURL != undefined) { 
        url = window.createOjcectURL(file); 
    } else if (window.URL != undefined) { 
        url = window.URL.createObjectURL(file); 
    } else if (window.webkitURL != undefined) { 
        url = window.webkitURL.createObjectURL(file); 
    } 
    return url; 
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    if (file != undefined) {
      console.log(file);
      if (file.type.indexOf("image") != -1) {
        var url = this.getObjectURL(file);
        this.setState({
          bottomImgDisplay: "block",
          bottomImgUrl:url,
          bottomVideoUrl:"",
          bottomVideoDisplay:"none"
        });
      } 
      else if (file.type.indexOf("video") != -1) {
        var url = this.getObjectURL(file);
        this.setState({
          bottomImgDisplay: "none",
          bottomImgUrl:"",
          bottomVideoUrl:url,
          bottomVideoDisplay:"block"
        });
      }
    }
  }

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
      <div id="home-experience">
          <Layout></Layout>
          <input id="myInput"
            type="file"
            ref={(ref) => this.upload = ref}
            style={{display: 'none'}}
            onChange={this.onChangeFile.bind(this)}
          />
        <div className="experience-img" onClick={()=>{this.upload.click()}}>
          <img src={this.state.bottomImgUrl} style={{display: this.state.bottomImgDisplay}}></img>
          <video autoplay="autoplay" src={this.state.bottomVideoUrl} style={{display: this.state.bottomVideoDisplay}}></video>
        </div>
        <div className="experience-card">
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
        {/* <div className="experience-card">
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
        </div> */}
        {/* <div className="experience-bottom-content">
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            aliquam dolor alias iste autem, quaerat magni unde accusantium qui
            fuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,
            explicabo quisquam dolor placeat praesentium nesciunt mollitia quos
            nobis natus voluptatum asperiores!
          </p>
        </div> */}
        <div className="experience-bottom-content">
          <div>
          <CTE 
              wrapperClass="bottom_title"
              textClass="bottom_title_text"
              initialValue={"Lorem ipsum"}
              >
          </CTE>
          </div>
          <CTE 
              wrapperClass="bottom_content"
              textClass="bottom_content_text"
              initialValue={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda aliquam dolor alias iste autem, quaerat magni unde accusantium quifuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis, explicabo quisquam dolor placeat praesentium nesciunt mollitia quosnobis natus voluptatum asperiores!"}
              >
          </CTE>
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
