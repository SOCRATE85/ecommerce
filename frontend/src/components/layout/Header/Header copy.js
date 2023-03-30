import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import SideDrawer from './SideDrawer/SideDrawer';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from './Logo/Logo';
import "./header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false,
            searchBoxOpen: false,
            innerWidth: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ innerWidth: window.innerWidth });
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    
    closeOpenHandler = () => {
        if(this.state.showSideDrawer) {
            this.sideDrawerCloseHandler();
        }else {
            this.sideDrawerOpenHandler();
        }
    }

    render(){
        const items = [
            {
                title: "Contact us",
                url:"/contacts"
            },
            {
                title: "About Us",
                url: "/about-us"
            },
            {
                title: this.props.isAuthenticated ? <></> : "Sign In",
                url: this.props.isAuthenticated ? <></> : "/login"
            }       
        ];

        return (<div className="header bg-white flex justify-between items-center box-border z-10 relative text-black spacing-x-20">
            {this.state.innerWidth < 768 && <>
                <input type={"checkbox"} name="check" id="check" checked={this.state.showSideDrawer ? true : false} onChange={this.closeOpenHandler} />
                <div className='hamburger-menu-container'>
                    <DrawerToggle clicked={this.closeOpenHandler} />
                </div>
                <SideDrawer
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerCloseHandler}
                    items={items}
                />
            </>}        
            <Logo />
            {this.state.innerWidth > 768 && <nav className='DesktopOnly z-11'>
                <NavigationItems items={items} />
            </nav>}
        </div>)
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.user.isAuthenticated }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default Header;