import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../layout.js';
import Carousel from '../components/carousel.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homePage.css';
import '../css/stylesheets.css';
import {Row, Col} from 'antd';
import {
    ProfileOutlined,
    EditOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';

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
                <Row justify="center" style={{textAlign: 'center'}}>
                    <Col>
                        <div className="title">
                            See what's possible ExPortfolio
                        </div>
                        <div>
                            Create a simple, fully responsive one page site.
                            Ideal for a personal landing page or digital
                            business card. You can always add additional pages
                            if desired.
                            <br />
                            Creatives around the world use ExPortfolio to
                            showcase their work.
                        </div>
                        <div>
                            Click <b>Start </b> to view our fantastic template.
                        </div>
                        <br />
                        <button className="icon" onClick={this.handleClick}>
                            Start
                        </button>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <img
                            className="homepage-img"
                            src={[require('../css/image/social_media.png')]}
                            alt=""
                        />
                    </Col>
                </Row>
                <Row style={{textAlign: 'center'}}>
                    <Col span="12">
                        <div className="title">What do you want to create?</div>
                        <div>
                            1.Convey your necessary skills andcapabilities;
                            <br />
                            2.Show your experience; <br />
                            3.Attach videos and images; <br />
                            4.Show your personality and style. Be creative!
                        </div>
                    </Col>
                    <Col span="12">
                        <div className="title">Why do we need a Portfolio?</div>
                        <div>
                            Opportunities are reserved for those who are
                            prepared!
                            <br />
                            Portfolios are a great way to demonstrate your
                            competencies, to show yourself.
                            <br />
                            Let other people to know your ability.
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <img
                            className="homepage-img"
                            src={[require('../css/image/meeting.jpg')]}
                            alt=""
                        />
                    </Col>
                </Row>
                <Row justify="center" style={{backgroundColor: '#00b0ff'}}>
                    <div className="step-main-title">
                        Show your work in minutes
                    </div>
                </Row>
                <Row
                    justify="center"
                    style={{textAlign: 'center', backgroundColor: '#00b0ff'}}
                >
                    <Col span="8">
                        <EditOutlined style={{fontSize: '40px'}} />
                        <div className="step-title">Create</div>
                        <div>
                            Whether you want to showcase your work in a
                            portfolio website, or create a single-page website,
                            we've got you covered.
                        </div>
                    </Col>
                    <Col span="8">
                        <ProfileOutlined style={{fontSize: '40px'}} />
                        <div className="step-title">Template</div>
                        <div>
                            Don’t know HTML or CSS? No problem. With
                            ExPortfolio, our easy-to-customize themes are the
                            most beautiful way to present your work online.
                            <br />
                            <br />
                        </div>
                    </Col>
                    <Col span="8">
                        <ShareAltOutlined style={{fontSize: '40px'}} />
                        <div className="step-title">Share</div>
                        <div>Share your portfolio to the world. </div>
                        <div> Click share to give everyone access.</div>
                    </Col>
                </Row>

                <Row justify="center" style={{textAlign: 'center'}}>
                    <Col>
                        <div className="title">It's all free !!</div>
                        <div className="text-bottom-content">
                            <div>
                                ExPortfolio is included for free with a full
                                accuess to ceating your own portfolio.
                            </div>
                            <div>Don't have one yet?</div>
                            <div>
                                <Link to="../Register">
                                    <i>Register</i>
                                </Link>{' '}
                                and get access to ExPortfolio!
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <img
                            className="homepage-img"
                            src={[require('../css/image/portfolio.png')]}
                            alt=""
                        />
                    </Col>
                </Row>
                <div className="bottom">
                    <br />© 2020, Bounty Programmers. All Right Reserved.
                </div>
            </div>
        );
    }
}

export default App;
