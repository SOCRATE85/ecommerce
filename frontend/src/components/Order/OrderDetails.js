import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../store";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

import "./OrderDetails.css";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [dispatch, params]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors);
    }
  }, [dispatch, error, alert]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Order #{order && order._id}</Typography>
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{order.user && order.user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }>
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>

            <div>
              <p>Amount:</p>
              <span>{order.totalPrice && order.totalPrice}</span>
            </div>
          </div>

          <Typography>Order Status</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "greenColor"
                    : "redColor"
                }>
                {order.orderStatus && order.orderStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.images} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
          <div>
            <input type={"button"} className="button" value="Back" onClick={() => navigate(-1)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
