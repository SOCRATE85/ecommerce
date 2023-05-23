import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { thunkError } from "./clearformAction";

export const validateAddress = createAsyncThunk("cart/validateAddress", async (addresses, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/address/validate", addresses, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const loadCartItems = createAsyncThunk('cart/loadCartItems', async (_, thunkAPI) => {
    try {
        const items = localStorage.getItem("cartItems");
        return items ? JSON.parse(items) : [];
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//Update Cart Items Action
export const updateItemsInCart = createAsyncThunk("cart/updateItemsInCart", async ({id, quantity}, thunkAPI) => {
    try {
        return { id, quantity };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//Add to cart action
export const addItemsToCart = createAsyncThunk("cart/addItemsToCart", async ({id, quantity}, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        return { product: data.product, quantity };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//remove item from cart
export const removeItemFromcart = createAsyncThunk("cart/removeItemFromcart", async (id, thunkAPI) => {
    try {
        return id;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//remove item from cart
export const removeItemFromcartAfterOrderSuccess = createAsyncThunk("cart/removeItemFromcartAfterOrderSuccess", (_, thunkAPI) => {
    try {
        localStorage.setItem("cartItems", "");
        localStorage.setItem("shippingInfo", "");
        return [];
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//load shipping and billing address
export const loadShippingAndBillingAddress = createAsyncThunk("cartd/loadShippingAndBillingAddress", (_, thunkAPI) => {
     try {
        const data = localStorage.getItem("shippingInfo");
        if(data) {
            return JSON.parse(data);
        } else {
            return JSON.parse({});
        }
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//save shipping information
export const saveShippingInfo = createAsyncThunk("cart/saveShippingInfo", (data, thunkAPI) => {
    try {
        localStorage.setItem("shippingInfo", JSON.stringify(data));
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
