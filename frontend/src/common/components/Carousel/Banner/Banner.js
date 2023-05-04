import React from "react";
import { Carousel } from 'react-responsive-carousel';
import './carousel.min.css';

const Banner = (props) => {
    return (
        <Carousel {...props}>{props.children}</Carousel>
    );
}

export default Banner;
