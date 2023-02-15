import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { getValue } from '../../common/attribute';
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems, loading: shippingLoading } = useSelector( state => state.cart );
    const {user, loading: userLoading } = useSelector( state => state.user );
    if(userLoading || shippingLoading || !user){return <></>}

    const subtotal = cartItems.reduce(
        (acc, {quantity, product}) => { 
            return (acc + quantity * getValue("price", product.data));
        },
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }
    
    return <>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Information</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:{" "}</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:{" "}</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:{" "}</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            cartItems && cartItems.map(({ product, quantity}) => {
                                return (<div key={product._id}>
                                    <img 
                                        src={getValue("images", product.data)} 
                                        alt={getValue("name", product.data)} 
                                    />
                                    <Link to={`/${product.url_key}`}>{getValue("name", product.data)}</Link>
                                    <span>{quantity} X ${getValue("price", product.data)}</span> ={" "}
                                    <p>${quantity * getValue("price", product.data)}</p>
                                </div>);
                            })
                        }
                    </div>
                </div>
            </div>
            {" "}
            <div className="orderSummary">
                <Typography>Order Summary</Typography>
                <div>
                    <div>
                        <p>Subtotal: </p>
                        <span>${subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges: </p>
                        <span>${shippingCharges}</span>
                    </div>
                    <div>
                        <p>Tax: </p>
                        <span>${tax}</span>
                    </div>
                </div>

                <div className="orderSummaryTotal">
                    <p><b>Total: </b></p>
                    <span>${totalPrice}</span>
                </div>
                <button className="button" onClick={proceedToPayment}>Procced To Payment</button>
            </div>
        </div>
    </>
}

export default ConfirmOrder;
