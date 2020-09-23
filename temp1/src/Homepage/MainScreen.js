import React, { Component } from "react";
import CTE from "react-click-to-edit";
import './style.css';


class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottomImgUrl: require("./photo-1554415707-6e8cfc93fe23.jpeg"),
      bottomImgDisplay: "block",
      bottomVideoUrl: "",
      bottomVideoDisplay: "none"
    }
  }

  getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL !== undefined) {
      url = window.createOjcectURL(file);
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    if (file !== undefined) {
      console.log(file);
      if (file.type.indexOf("image") !== -1) {
        var url = this.getObjectURL(file);
        this.setState({
          bottomImgDisplay: "block",
          bottomImgUrl: url,
          bottomVideoUrl: "",
          bottomVideoDisplay: "none"
        });
      }
      else if (file.type.indexOf("video") !== -1) {
        var url = this.getObjectURL(file);
        this.setState({
          bottomImgDisplay: "none",
          bottomImgUrl: "",
          bottomVideoUrl: url,
          bottomVideoDisplay: "block"
        });
      }
    }
  }

  render() {
    return (
      <div id="showcase">
        <div className="container">

          <div className="showcase-content">
            {/* <div className="showcase-wel"><span className="text-primary">Nice</span> to meet you</div> */}
            <div className="showcase-wel">
              <CTE
                wrapperClass="top-content-left"
                textClass="top-content-text-left"
                initialValue={"Nice"}
              >
              </CTE>
              <CTE
                wrapperClass="top-content-right"
                textClass="top-content-text-right"
                initialValue={"to meet you"}
              >
              </CTE>
            </div>
            <div>
              <CTE
                wrapperClass="top-content"
                textClass="lead"
                initialValue={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eligendi laboriosam. Repellendus officia harum eaque."}
              />
            </div>
            <div><a href="/achivement" className="btn btn-light">About me</a></div>
          </div>

          <input id="myInput"
            type="file"
            ref={(ref) => this.upload = ref}
            style={{ display: 'none' }}
            onChange={this.onChangeFile.bind(this)}
          />
          <div className="showcase-bottom-img" onClick={() => { this.upload.click() }}>
            <img src={this.state.bottomImgUrl} style={{ display: this.state.bottomImgDisplay }}></img>
            <video autoplay="autoPlay" src={this.state.bottomVideoUrl} style={{ display: this.state.bottomVideoDisplay }}></video>
          </div>
          <div className="showcase-bottom-content">
            <div>
              <CTE
                wrapperClass="bottom-content-left"
                textClass="bottom-content-text-left"
                initialValue={"The Summary"}
              >
              </CTE>
              <CTE
                wrapperClass="bottom-content-right"
                textClass="bottom-content-text-right"
                initialValue={" Of Myself"}
              >
              </CTE>
            </div>
            {/* <h2><span className="text-primary">The Summary</span> Of Myself</h2> */}
            <CTE
              wrapperClass="bottom-content"
              textClass="lead"
              initialValue={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda aliquam dolor alias iste autem, quaerat magni unde accusantium quifuga placeat quidem quo pariatur, voluptatum, ea sequi? Corporis,explicabo quisquam dolor placeat praesentium nesciunt mollitia quosnobis natus voluptatum asperiores!"}
            />
            <a href="/experience" className="btn btn-light">Read More</a>

          </div>
        </div>
      </div>
    );
  }

}
export default Screen;
