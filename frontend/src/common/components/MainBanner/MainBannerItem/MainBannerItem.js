import React from "react";
import { Link } from 'react-router-dom';

const MainBannerItem = (props) => {
    return <div className="w-full h-full relative">
        <Link to={props.link} className="block">
            {props.banner.images.map((image, _index) => {
                return <img src={image} key={_index} alt={props.alt} className="w-full inline-block"/>
            })}
        </Link>
        <p className="h-10 top-5 left-0 text-white bg-none text-xl opacity-100 ml-8 w-80 justify-center items-center flex absolute bg-slate-300 rounded-sm">{props.legend}</p>
    </div>
}

export default MainBannerItem;
