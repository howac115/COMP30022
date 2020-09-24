import React from 'react';
import { useSpring, animated } from 'react-spring';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function CardInfo(props) {

    const style = useSpring({opacity: 1, from: {opacity: 0}});
    //console.log("props is: ", props);
    return(
        <div className="g-card-info" style={style}>
            
            <Link className="home-link" to={props.path}>
                <p className="g-card-title">{props.title} </p>
            </Link>
            <p className="g-card-sub-title">{props.subTitle}</p>
        </div>
        
    );

}

export default CardInfo;