import React from "react";
import { Link } from "react-router-dom";

export const SiderbarLinkContainer = ({ url, font, title}) => {
    return (<li className="mx-5 py-2">
        {font}
        <Link className="text-black hover:text-[#ff6347] ml-4 no-underline transition-all duration-500 ease-in-out" to={url}>
            {title}
        </Link>
    </li>);
}