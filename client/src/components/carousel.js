import React from 'react';
import Slider from 'react-animated-slider';
import { withRouter } from 'react-router';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../css/slider-animations.css';
import '../css/stylesheets.css';
const Carousel = props => {
    const handleClick = () => {
        if (global.auth.getUser() !== null) {
            props.history.push('/' + global.auth.getUser().id);
        } else {
            props.history.push('/template');
        }
    };

    const slides = [
        {
            title: 'Beautiful Portfolio Websites',
            button: 'Explore',
            image: 'https://i.imgur.com/YYEM6z9.jpg',
        },
        {
            title: 'Free with Creative Cloud',
            button: 'Explore',
            image:
                'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        },
        {
            title: 'Free with Creative Cloud',
            button: 'Explore',
            image:
                'https://images.unsplash.com/photo-1515169974372-0a322886d279?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1288&q=80',
        },
    ];

    return (
        <div>
            <Slider className="slider-wrapper">
                {slides.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{
                            background: `url('${item.image}') no-repeat center center`,
                        }}
                    >
                        <div className="inner">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <button onClick={handleClick.bind(this)}>

                                {item.button}</button>

                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    );
};

export default withRouter(Carousel);
