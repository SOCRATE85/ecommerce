import axios from "axios";
import { thunkError } from './clearformAction';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewAddress = createAsyncThunk("address/addNewAddress", async (address, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/address/new", address, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateAddress = createAsyncThunk("address/updateAddress", async ({addressId, address}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/address/${addressId}`, address, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteAddress = createAsyncThunk("address/deleteAddress", async (addressId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/address/${addressId}`);
        return data.success
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllAddress = createAsyncThunk("addresses/getAllAddress", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/addresses`);
        return data.addresses;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAddress = createAsyncThunk("address/getAddress", async (addressId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/address/${addressId}`);
        return data.address;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
