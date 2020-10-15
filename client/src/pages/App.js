import React from 'react';
import Layout from '../layout.js';
import Carousel from '../components/carousel.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homePage.css'
import { Button } from 'antd';

class App extends React.Component {
    componentDidMount() {
        document.title = 'ExPortfolio';
    }
    render() {
        return (
            <div className="App">
                <Layout />
                <Carousel />
                <div className="grid-wrapper">
                    <div className="section-1-top title">See what's possible ExPortfolio</div>
                    <div className="section-1-top content">
                        <div>Create a simple, fully responsive one page site. Ideal for a personal landing page or digital business card. You can always add additional pages if desired.</div>
                        <div>Creatives around the world use ExPortfolio to showcase their work. See some examples below.</div>
                        <div className="helightText">See some examples below.</div>
                        <Button></Button>
                    </div>
                    
                    <div className="section-2-left title">What do you want to create?</div>
                    <div className="section-2-left content">
                        <div>1. Convey necessary details like your skills and abilities; 2. Affirm the above with relevant experience; 3. Display examples of work in each area of importance like photos, illustrations and videos; 4. Show your personality and style. Be creative! (Ps: If you want to know more about how to use our website, there is a chat box AI on the right corner， try to play with that!)</div>
                    </div>

                    <div className="section-2-right title">Why do we need a Portfolio?</div>
                    <div className="section-2-right content">
                        Opportunities are reserved for those who are prepared ! Portfolios are a great way to demonstrate your competencies, to show yourselft, let other people to know your ability.
                    </div>
                </div>
                <div className="bottom">
                    About Us
                </div>
            </div>
        );
    }
}

export default App;
