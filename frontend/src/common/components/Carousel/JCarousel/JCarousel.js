import React from 'react';
import Carousel from "react-multi-carousel";

const JCarousel = ({ children }) => {
    return (
        <Carousel>
           {children}
        </Carousel>
    );
}

export default JCarousel;