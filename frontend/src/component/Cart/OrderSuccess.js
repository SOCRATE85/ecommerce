import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./OrderSuccess.css";
const OrderSuccess = () => {
    return <div className="orderSuccess">
        <CheckCircleOutline />
        <Typography>Your order has been placed successfully</Typography>
        <Link to={`/orders`}>View Your Orders</Link>
    </div>
}

export default OrderSuccess;
