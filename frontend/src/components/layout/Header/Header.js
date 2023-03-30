import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import SideDrawer from './SideDrawer/SideDrawer';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from './Logo/Logo';
import "./header.css";

const Header = () => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    const updateWindowDimensions = () => {
        setInnerWidth(window.innerWidth);
    }

    const sideDrawerCloseHandler = () => {
       setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
       setShowSideDrawer((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    
    const closeOpenHandler = () => {
        if(showSideDrawer) {
            sideDrawerCloseHandler();
        }else {
            sideDrawerOpenHandler();
        }
    }

    const items = isAuthenticated ? [
        {
            title: "Contact us",
            url:"/contacts"
        },
        {
            title: "About Us",
            url: "/about-us"
        }      
    ] : [
        {
            title: "Contact us",
            url:"/contacts"
        },
        {
            title: "About Us",
            url: "/about-us"
        },
        {
            title: "Sign In",
            url: "/login"
        }       
    ];
    
    return (<div className="header bg-white flex justify-between items-center box-border z-10 relative text-black spacing-x-20">
        {innerWidth < 768 && <>
            <input type={"checkbox"} name="check" id="check" checked={showSideDrawer ? true : false} onChange={closeOpenHandler} />
            <div className='hamburger-menu-container'>
                <DrawerToggle clicked={closeOpenHandler} />
            </div>
            <SideDrawer
                open={showSideDrawer} 
                closed={sideDrawerCloseHandler}
                items={items}
            />
        </>}        
        <Logo />
        {innerWidth > 768 && <nav className='DesktopOnly z-11'>
            <NavigationItems items={items} />
        </nav>}
    </div>)
}

export default Header;