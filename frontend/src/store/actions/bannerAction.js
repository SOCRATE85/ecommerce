import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkError } from "./clearformAction";

export const addNewBanner = createAsyncThunk("banner/addNewBanner", async (banner, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/banner/new", banner, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateBanner = createAsyncThunk("banner/updateBanner", async ({bannerId, banner}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/banner/${bannerId}`, banner, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteBanner = createAsyncThunk("banner/deleteBanner", async (bannerId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/banner/${bannerId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllBanner = createAsyncThunk("banners/getAllBanner", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/banners`);
        return data.banners;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getBanner =  createAsyncThunk("banner/getBanner", async (bannerId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/banner/${bannerId}`);
        return data.banner;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
