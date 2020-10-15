import React from 'react';
import Layout from '../layout.js';
import Carousel from '../components/carousel.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homePage.css';
import '../css/stylesheets.css';
import { EditOutlined } from '@ant-design/icons';
import { ShareAltOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';

class App extends React.Component {
    componentDidMount() {
        document.title = 'ExPortfolio';
    }

    handleClick = () => {
        if (global.auth.getUser() !== null) {
            this.props.history.push('/' + global.auth.getUser().id);
        } else {
            this.props.history.push('/template');
        }
    };

    render() {
        return (
            <div className="App">
                <Layout />
                <Carousel />
                <div className="grid-wrapper">
                    <div className="section-1-top title">
                        See what's possible ExPortfolio
                    </div>
                    <div className="section-1-top content">
                        <div>
                            Create a simple, fully responsive one page site.
                            Ideal for a personal landing page or digital
                            business card. You can always add additional pages
                            if desired.
                            <br />
                            Creatives around the world use ExPortfolio to
                            showcase their work. See some examples below.
                        </div>
                        <div className="helightText">
                            See some examples below.
                        </div>
                        <br />
                        <button
                            className="icon"
                            onClick={this.handleClick}
                        >
                            Start

                        </button>
                    </div>
                    <div className="section-2">
                        <img
                            src={[require('../css/image/social_media.png')]}
                            alt=""
                        />
                    </div>
                    <div className="section-3-left title">
                        What do you want to create?
                    </div>
                    <div className="section-3-left content">
                        1.Convey your necessary skills andcapabilities; <br />
                        2.Show your experience; <br />
                        3.Attach videos and images; <br />
                        4.Show your personality and style. Be creative!
                    </div>
                    <div className="section-2"></div>
                    <div className="section-3-right title">
                        Why do we need a Portfolio?
                    </div>
                    <div className="section-3-right content">
                        Opportunities are reserved for those who are prepared !{' '}
                        <br />
                        Portfolios are a great way to demonstrate your
                        competencies, to show yourself.
                        <br />
                        Let other people to know your ability.
                    </div>
                    <div className="section-4">
                        <img
                            src={[require('../css/image/meeting.jpg')]}
                            alt=""
                        />
                    </div>
                </div>
                <div className="step-wrapper">
                    <div className="step-main-title">
                        Show your work in minutes
                    </div>
                    <div className="step-1">
                        <EditOutlined style={{ fontSize: '40px' }} />
                        <div className="step-title">Create</div>
                        <div className="step-content">
                            Whether you want to showcase your work in a
                            portfolio website, or create a single-page website,
                            we've got you covered.
                        </div>
                    </div>
                    <div className="step-2">
                        <ProfileOutlined style={{ fontSize: '40px' }} />
                        <div className="step-title">Template</div>
                        <div className="step-content">
                            Don’t know HTML or CSS? No problem. With
                            ExPortfolio, our easy-to-customize themes are the
                            most beautiful way to present your work online.
                        </div>
                    </div>
                    <div className="step-3">
                        <ShareAltOutlined style={{ fontSize: '40px' }} />
                        <div className="step-title">Share</div>
                        <div className="step-content">
                            Share your portfolio to the world. Click share to
                            give everyone access.
                        </div>
                    </div>
                </div>

                <div className="text-bottom">
                    <div className="text-bottom-title">It's all free !!</div>
                    <div className="text-bottom-content">
                        <div>
                            ExPortfolio is included for free with a full accuess
                            to ceating your own portfolio.
                        </div>
                        <div>
                            Don't have one yet? Register and get access to
                            ExPortfolio!
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <br />
                    <br />© 2020, Bounty Programmers.
                </div>
            </div>
        );
    }
}

export default App;
