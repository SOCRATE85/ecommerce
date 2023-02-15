import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationItem.css";

const NavigationItem = (props) => {
    const [ hoverClass, setHoverClass ] = useState(false);
    
    const showHideMenuItem = () => {
        setHoverClass(prev => !prev);
    }
    
    if(props.mode === 'sidebar') {
        return (<li className={props.className}>
            <div className="link">
                <Link to={props.url}>{props.title}</Link>
                {props.icon && <div className="icons" onClick={showHideMenuItem}>{props.icon}</div>}
            </div>
            {
                props.children && 
                <div className={`dropdown ${props.childNumber}${hoverClass ? " hoverClass" : ""}`}>
                    <ul>{props.children}</ul>
                </div>
            }
        </li>);
    }

    return (<li className={props.className}>
        <div className="link" onMouseOver={showHideMenuItem} onMouseOut={showHideMenuItem}>
            <Link to={props.url}>{props.title}</Link>
            {props.icon && <div className="icons">{props.icon}</div>}
        </div>
        {
            props.children && 
            <div className={`dropdown ${props.childNumber}${hoverClass ? " hoverClass" : ""}`}>
                <ul>{props.children}</ul>
            </div>
        }
    </li>);
}

export default NavigationItem;
