import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/header.js'
import Layout from '../layout.js';

class App extends React.Component {

  render() {
    return (
      <div className='App'>
        <Layout/>
      </div>
    );
  }
}

export default App;
