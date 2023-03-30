import React from "react";
import Backdrop from '../../Backdrop/Backdrop';
import DrawerNavigations from '../DrawerNavigations/DrawerNavigations';
import './SideDrawer.css';
import Logo from "../Logo/Logo";

const SideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];

    if(props.open){
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <Logo />
                <DrawerNavigations items={props.items} mode="sidebar" />
            </div>
        </>
    )
}

export default SideDrawer;
