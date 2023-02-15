import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { removeItemFromcartAfterOrderSuccess } from '../../store/actions/cartAction';
import { clearErrors, createOrder } from '../../store/actions/orderAction';
import { CreditCardOutlined, EventOutlined,VpnKeyOutlined } from "@mui/icons-material";

import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { getValue } from "../../common/attribute";

const Payment = () => {
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const { shippingInfo, cartItems } = useSelector( state => state.cart);
    const { user } = useSelector( state => state.user );
    const { error } = useSelector( state => state.newOrder );
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const paymentData = { amount : Math.round(orderInfo.totalPrice * 100)};
    
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert ]);

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            
            const { data } = await axios.post("/api/v1/payment/process", paymentData , config);
            const client_secret = data.client_secret;
            if(!stripe || !elements ) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            });
            if(result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    let items = [];
                    for(let key in cartItems) {
                        const productData = cartItems[key].product.data;
                        items.push({
                            name: getValue("name", productData),
                            price: getValue("price", productData),
                            quantity: cartItems[key].quantity,
                            images: getValue("images", productData)[0],
                            product: cartItems[key].product._id,
                        });
                    }
                    order.orderItems = items;
                    dispatch(createOrder(order));
                    dispatch(removeItemFromcartAfterOrderSuccess());
                    navigate("/success");
                }else{
                    alert.error("There's is some issue while processing payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error("There are some error in submit an order.");
        }
    }

    return <>
        <MetaData title={"Payment"} />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={submitHandler}>
                <Typography>Card Information</Typography>
                <div>
                    <CreditCardOutlined />
                    <CardNumberElement className="paymentInput" />
                </div>
                <div>
                    <EventOutlined />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyOutlined />
                    <CardCvcElement className="paymentInput" />
                </div>
                <div>
                    <input 
                        type={"submit"} 
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`} 
                        ref={payBtn} className="button" 
                    />
                </div>
            </form>
        </div>
    </>
}

export default Payment;
