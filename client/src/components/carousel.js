import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../css/slider-animations.css';
import '../css/stylesheets.css';
const Carousel = props => {
    const slides = [
        {
            //description: 'We could provide a wonderful opportunity for you to create your first awsone e-Portfolio, or you could also have totoal different experience from before to create your own e-Portfolio. Besides if you have no idear how to start, Do not worry ! You could find many excellent template designed by other people on ExPortfolio!'
            title: "Beautiful Portfolio Websites",
            //title: 'What can you do on ExPortfolio ?',
            image: 'https://i.imgur.com/YYEM6z9.jpg',
        },
        {
            title: "Free with Creative Cloud",
            //title: 'How could you organise your Portfolio ?',
            //description:
            //    '1. Convey necessary details like your skills and abilities; 2. Affirm the above with relevant experience; 3. Display examples of work in each area of importance like photos, illustrations and videos; 4. Show your personality and style. Be creative! (Ps: If you want to know more about how to use our website, there is a chat box AI on the right corner， try to play with that!)',
            image:
                'https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        },
        {
            title: "Free with Creative Cloud",
            //title: 'Why do we need a Portfolio',
            //description:
            //    'Opportunities are reserved for those who are prepared ! Portfolios are a great way to demonstrate your competencies, to show yourselft, let other people to know your ability. ',
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
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
