import React from 'react';
import faker from "faker";


const Contact = props => {
  return (
    <div id="contact" className="ui segment">

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

    </div>






  );

}


export default Contact;