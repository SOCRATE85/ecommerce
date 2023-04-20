import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { thunkError } from "./clearformAction";

//Create Order
export const createOrder = createAsyncThunk("order/createOrder", async (order, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//My Orders
export const myOrders = createAsyncThunk("order/myOrders", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/orders/me");
        return data.orders;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//GET ALL Orders (admin)
export const getAllOrders = createAsyncThunk("orders/getAllOrders", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/admin/orders");
        return data.orders;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//Update Order (Admin)
export const updateOrder = createAsyncThunk("order/updateOrder", async ({order, orderId}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/order/${orderId}`, order, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//DELETE Order (Admin)
export const deleteOrder = createAsyncThunk("order/deleteOrder", async (orderId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/order/${orderId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//My Order details
export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (orderId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/order/${orderId}`);
        return data.order;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
