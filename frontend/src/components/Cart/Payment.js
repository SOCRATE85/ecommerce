import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography, Button } from "@mui/material";
import { useAlert } from "react-alert";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { removeItemFromcartAfterOrderSuccess, clearErrors, createOrder } from '../../store';
import { CreditCardOutlined, EventOutlined,VpnKeyOutlined } from "@mui/icons-material";
import Loader from '../layout/Loader';
import { useNavigate } from "react-router-dom";
import { getValue } from "../../common/attribute";
import "./Payment.css";

const Payment = () => {
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const { shippingInfo, billingInfo, shippingSameAsBilling, cartItems, loading } = useSelector( state => state.cart);
    const { user } = useSelector( state => state.user );
    const { error } = useSelector( state => state.newOrder );
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const paymentData = { amount : Math.round(orderInfo.totalPrice * 100)};
    
    const orderData = {
        shippingInfo,
        billingInfo,
        shippingSameAsBilling,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    };

    useEffect(() => {
        if(error) {
            alert.error(error.error);
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
            console.log('result: ', result);
            if(result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === 'succeeded') {
                    orderData.paymentInfo = {
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
                    orderData.orderItems = items;
                    console.log('order: ', orderData);
                    dispatch(createOrder(orderData));
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

    if(loading) {
        return <Loader />
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
                <div className="w-full gap-3 flex justify-center">
                    <input 
                        type={"submit"}
                         id="ActionButton"
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`} 
                        ref={payBtn} className="button" 
                    />
                    <Button id="BackActionButton" type="button" onClick={() => navigate(-1)}>Back</Button>
                </div>
            </form>
        </div>
    </>
}

export default Payment;
