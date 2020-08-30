import React from 'react'
import Header from '../components/header.js'

class App extends React.Component{

    state = {
        username:''
    }

    render(){
        return(
            <div className='App'>
                <Header username={this.state.username}/>
            </div>
        );
    }
}

export default App;
