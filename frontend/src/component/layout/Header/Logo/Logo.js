import React from "react";
import { Link } from "react-router-dom";
import LogoImage from '../../../../images/logo.png';

const Logo = () => {
    return <div className="w-48 h-14 mx-auto md:mx-0">
        <Link to={'/'} className="md:flex">
            <img src={LogoImage} alt="" className="h-14 object-center" />
        </Link>
    </div>
}

export default Logo;
