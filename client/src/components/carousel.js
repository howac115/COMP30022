import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "../css/slider-animations.css";
import "../css/stylesheets.css";

const Carousel = props => {

    const slides = [
        {
            title: "Collection of your works",
            description:
                "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
            button: "Read More",
            image: "https://i.imgur.com/YYEM6z9.jpg"
        },
        {
            title: "Mark moments of highlight",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
            button: "Discover",
            image: "https://images.unsplash.com/photo-1514996937319-344454492b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
            title: "Your online gallery",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
            button: "Explore now",
            image: "https://images.unsplash.com/photo-1515169974372-0a322886d279?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1288&q=80"
        }
    ];

    return (
        <div>
            <Slider className="slider-wrapper">
                {slides.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{ background: `url('${item.image}') no-repeat center center` }}
                    >
                        <div className="inner">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <button>{item.button}</button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
