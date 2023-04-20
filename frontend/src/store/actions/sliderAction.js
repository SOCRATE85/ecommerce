import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkError } from "./clearformAction";

export const addNewSlider = createAsyncThunk("slider/addNewSlider", async (slider, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/slider/new", slider, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateSlider = createAsyncThunk("slider/updateSlider", async ({sliderId, slider}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/slider/${sliderId}`, slider, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteSlider = createAsyncThunk("slider/deleteSlider", async (sliderId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/slider/${sliderId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllSlider = createAsyncThunk("sliders/getAllSlider", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/sliders`);
        return data.sliders;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getSlider = createAsyncThunk("slider/getSlider", async (sliderId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/slider/${sliderId}`);
        return data.slider;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
