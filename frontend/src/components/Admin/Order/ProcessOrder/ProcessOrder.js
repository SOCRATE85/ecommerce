import { Button, Typography } from "@mui/material";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors, updateOrder, updateOrderReset } from '../../../../store';
import Loader from '../../../layout/Loader/Loader';
import { FormContainer } from "../../../../common/components/FormContainer";
import { useAlert } from "react-alert";
import "./ProcessOrder.css";
import { AccountTreeOutlined } from "@mui/icons-material";

const ProcessOrder = () => {
    const alert = useAlert();
    const params = useParams();
    const dispatch = useDispatch();
    const [ status, setStatus ] = useState("");
    const { order, error, loading } = useSelector( state => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector( state => state.updateOrder );

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(myForm, params.id));
    }

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    },[alert, error, dispatch]);

    useEffect(() => {
        if(updateError) {
            alert.error(updateError.error);
            dispatch(clearErrors());
        }
    },[alert, updateError, dispatch]);

    useEffect(() => {
        if(isUpdated) {
            alert.success("Order updated successfully");
            dispatch(updateOrderReset());
        }
        dispatch(getOrderDetails(params.id));  
    },[alert, dispatch, isUpdated, params.id]);

    return (<FormContainer pagetitle={"Process Order"}>
        {loading ? <Loader /> : <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid" }}>
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name: </p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone: </p>
                            <span>{ order.shippingInfo && order.shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address: </p>
                            <span>
                                {order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                            </span>
                        </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p className={
                                order.paymentInfo &&
                                order.paymentInfo.status === 'succeeded' 
                                ? "greenColor"
                                : "redColor"
                            }>
                                {
                                    order.paymentInfo && order.paymentInfo.status === "succeeded"
                                    ? "PAID"
                                    : "NOT PAID"
                                }
                            </p>
                        </div>
                        <div>
                            <p>Amount: </p>
                            <span>{ order.totalPrice && order.totalPrice }</span>
                        </div>
                    </div>
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p className={
                                order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"
                            }>
                                { order.orderStatus && order.orderStatus }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items: </Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            order.orderItems &&
                            order.orderItems.map((item) => {
                                return <div key={item.product}>
                                    <img src={item.images} alt="Product"/>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>
                                        {item.quantity} X {item.price} = {" "}
                                        <b>${item.quantity * item.price}</b>
                                    </span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            { /* */}
            <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block "}}>
                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                    <Typography>Process Order</Typography>
                    <div>
                        <AccountTreeOutlined />
                        <select onChange={(e) => setStatus(e.target.value)}>
                            <option value={""}>Choose Category</option>
                            {order.orderStatus === "Processing" && <option value={"Shipped"}>Shipped</option>}
                            {order.orderStatus === "Shipped" && <option value={"Delivered"}>Delivered</option>}
                        </select>
                    </div>
                    <Button id="createProductBtn" type="submit" disabled={loading ? true : false || status === '' ? true : false}>Process</Button>
                </form>
            </div>
        </div>}
    </FormContainer>);
}

export default ProcessOrder;
