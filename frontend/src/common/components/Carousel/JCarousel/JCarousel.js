import React, { lazy, Suspense } from 'react';
//import Carousel from "react-multi-carousel";
//import Carousel from "react-material-ui-carousel";

const Banner = lazy(() => import('../Banner'));

const bannerCmp = '<Banner>dsfgddgfgdsgdsg</Banner>';

const Abc = ({bannerCmp})=>{
    return <div dangerouslySetInnerHTML={{__html: bannerCmp.replace(/"/g, '&quot;')}}></div>
}

const JCarousel = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Abc bannerCmp={bannerCmp} />
        </Suspense>
    );
}

export default JCarousel;