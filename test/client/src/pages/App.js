import React from 'react';
import Layout from '../layout.js';
import Carousel from '../components/carousel.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    componentDidMount() {
        document.title = 'ExPortfolio';
    }
    render() {
        return (
            <div className="App">
                <Layout />
                <Carousel />
            </div>
        );
    }
}

export default App;
