import { useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DashboardOutlined, PersonOutline, ExitToAppOutlined, ListAltOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from '../../../store/actions/userAction';
import "./UserOption.css";

const UserOption = ({ user }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(status => status.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
     
    const dashboard = () => {
        navigate("/admin/dashboard");
    }

    const orders = () => {
        navigate('/orders');
    }

    const account = () => {
        navigate("/account");
    }

    const cart = () => {
        navigate("/cart");
    }

    const logoutUser = () => {
        dispatch(logoutuser());
        alert.success("Logout successfully");
    }

    const options = [
        { icon: <ListAltOutlined />, name: "Order", func: orders },
        { icon: <PersonOutline />, name: "Profile", func: account },
        { icon: <ShoppingCartOutlined style={{color : cartItems.length > 0 ? "tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppOutlined/>, name: "Logout", func: logoutUser }
    ];

    if(user.role === 'admin'){
        options.unshift({ icon: <DashboardOutlined />, name: "Dashboard", func: dashboard });
    }
    
    return <>
        <Backdrop open={open} />
        <SpeedDial 
            ariaLabel="SpeedDial tooltip example" 
            onClose={() => setOpen(false)} 
            onOpen={() => setOpen(true)}
            className="speedDial"
            direction="down"
            open={open}
            icon={<img src={user.avatar.url ? user.avatar.url : "/Profile.png"} className="speedDialIcon" alt="Profile" />}
        >
           {
                options.map((option, index) => {
                    return <SpeedDialAction 
                                key={index} 
                                icon={option.icon} 
                                tooltipTitle={option.name}
                                onClick={option.func}
                                tooltipOpen={window.innerWidth <= 600 ? true : false }
                            />
                })
           }
        </SpeedDial>
    </>
}

export default UserOption;