import React, { useState } from "react";
import { ArrowBack } from '@mui/icons-material';
import { Link } from "react-router-dom";
import "./DrawerNavigationItems.css";

const DrawerNavigationItems = (props) => {
    const [ showChild, setShowChild ] = useState(false);
    return (<li className={props.className}>
        {
            !showChild && <div className="link">
                <Link to={props.url}>{props.title}</Link>
                <div onClick={() => setShowChild(true)} className="icons">{props.icon}</div>{showChild}
            </div>
        }
        {
            showChild && props.children && 
            <div className={`dropdown-item ${props.childNumber}`}>
                <ul>
                    <li className="drawer-child-link" onClick={() => setShowChild(false)}>
                        <span className="back-link"><ArrowBack /> Back {props.title}</span>
                    </li>
                    {props.children}
                </ul>
            </div>
        }
    </li>);
}

export default DrawerNavigationItems;
