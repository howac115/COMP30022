import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Info from './components/Info/Info';


/*import { withRouter } from 'react-router-dom';
import { Button } from 'antd';*/


/*class Demo extends React.Component{
  handleClick(event){
    this.props.history.push("/register");
  }
  render(){
    return(
      <div>
         <Button onclick={this.handleClick}>click me!</Button>
     </div>
    );
  }
}
export default withRouter(Demo);
*/

class App extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Toolbar />
        <Info />
        <main >

        </main>

      </div>
    );
  }
}



export default App;
