import React from 'react';
import faker from "faker";


const Contact = props => {
  return (
    <div id="contact" className="ui segment">
      <div className="ui two column very relaxed grid">
        <div className="column">
          <img class="ui medium circular image" src={faker.image.people()} alt="./facepic.jpeg" />
          <h4 class="ui horizontal divider header">
            <i class="address card outline icon"></i>
                Contact Detail
          </h4>
          <table class="ui definition table">
            <tbody>
              <tr>
                <td class="two wide column">Name</td>
                <td>Xiao Ming</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>12345678</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{faker.address.streetAddress()}</td>
              </tr>
              <tr>
                <td class="two wide column">Email</td>
                <td>{faker.internet.email()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column">
          <div className="ui inverted segment">
            <div className="ui inverted form">
              <div className="required field">
                <div className="field">
                  <label>First Name</label>
                  <input placeholder="First Name" type="text" />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input placeholder="Last Name" type="text" />
                </div>

                <div className="ui form">
                  <div className="field">
                    <label>Text</label>
                    <textarea type="text" name="msg" placeholder="Leave a message"></textarea>
                  </div>
                </div>
              </div>
              <div className="ui form">
                <div className="inline fields">
                  <label>Phone Number</label>
                  <div className="field">
                    <input type="text" placeholder="(xxx)" />
                  </div>

                </div>
                <div className="ui submit button">Send</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>






  );

}


export default Contact;