import React, { useRef, useState} from "react";
import { Link } from "react-router-dom";
import "./NavigationItem.css";

const NavigationItem = (props) => {
    const ref = useRef(null);
    const childRef = useRef(null);
    const [classes, setClasses] = useState(["dropdown", props.childNumber]);
    
    const onMouseHover = () => {
        if(childRef) {
           if(parseInt(window.innerWidth) < parseInt(childRef.current?.getBoundingClientRect().right)) {
                const _classes = [...classes];
                _classes.push("reverse");
                setClasses(_classes);
            }            
        }
    }

    return (<li className={props.className}>
        <Link ref={ref} onMouseOver={onMouseHover} to={props.url}>{props.title}{props.icon}</Link>
        {
            props.children && 
            <div ref={childRef} className={classes.join(" ")}>
                <ul>{props.children}</ul>
            </div>
        }
    </li>);
}

export default NavigationItem;
