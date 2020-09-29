import React,{Component} from 'react';
import CTE from "react-click-to-edit";
import faker from "faker";
import Layout from '../../../layout.js';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottomImgUrl:faker.image.people(),
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
    return (
      <div id="contact" className="ui segment">
        <Layout></Layout>
        <div className="column">
          <input id="myInput"
            type="file"
            ref={(ref) => this.upload = ref}
            style={{display: 'none'}}
            onChange={this.onChangeFile.bind(this)}
          />
          {/* <img class="ui medium circular image" src={faker.image.people()} alt="./facepic.jpeg" /> */}
          <img onClick={()=>{this.upload.click()}} class="ui medium circular image" src={this.state.bottomImgUrl} alt="./facepic.jpeg"></img>
          <h4 class="ui horizontal divider header">
            <i class="address card outline icon"></i>
                  Contact Detail
            </h4>
          <table class="ui definition table">
            <tbody>
              <tr>
                <td class="two wide column">Name</td>
                <td>
                  <CTE 
                  wrapperClass="td-content"
                  textClass="td-content-text"
                  initialValue={"Xiao Ming"}
                  >
                  </CTE>
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>
                  <CTE 
                  wrapperClass="td-content"
                  textClass="td-content-text"
                  initialValue={"12345678"}
                  >
                  </CTE>
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  <CTE 
                  wrapperClass="td-content"
                  textClass="td-content-text"
                  initialValue={faker.address.streetAddress()}
                  >
                  </CTE>
                </td>
              </tr>
              <tr>
                <td class="two wide column">Email</td>
                <td>
                  <CTE 
                  wrapperClass="td-content"
                  textClass="td-content-text"
                  initialValue={faker.internet.email()}
                  >
                  </CTE>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Contact;