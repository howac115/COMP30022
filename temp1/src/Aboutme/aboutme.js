import React from 'react';
import Info from "../Homepage/Info";
import '../Homepage/style.css';

const Abt = props => {
  return (
    <section>
      <Info />
      <Info />
      <Info />
      <div id="aboutFile">
        <div class="ui placeholder segment">
          <div class="ui two column stackable center aligned grid">
            <div class="ui vertical divider">Or</div>
            <div class="middle aligned row">
              <div class="column">
                <div class="ui icon header">
                  <i class="search icon"></i>
          Find Documents
        </div>
                <div class="field">
                  <div class="ui search">
                    <div class="ui icon input">
                      <input class="prompt" type="text" placeholder="Search documents..." />
                      <i class="search icon"></i>
                    </div>
                    <div class="results"></div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="ui icon header">
                  <i class="pdf file outline icon"></i>
                Upload documents.
        </div>
                <div class="ui primary button">Add Document</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Abt;