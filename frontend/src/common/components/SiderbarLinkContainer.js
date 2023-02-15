import React from "react";
import { Link } from "react-router-dom";

export const SiderbarLinkContainer = ({ url, font, title}) => {
    return (<Link className="text-black hover:text-[#ff6347] px-5 py-3 no-underline transition-all duration-500 ease-in-out" to={url}>
        <p className="text-base flex items-center whitespace-nowrap">
            {font}{title}
        </p>
    </Link>)
}