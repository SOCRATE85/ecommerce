import React from "react";
import './DrawerToggle.css';

const DrawerToggle = (props) => {
    return <div className="hamburger-menu" onClick={props.clicked}>
        <div></div>
    </div>
}

export default DrawerToggle;
