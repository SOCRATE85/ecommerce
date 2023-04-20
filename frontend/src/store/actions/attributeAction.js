import axios from "axios";
import { thunkError } from './clearformAction';
import { createAsyncThunk } from "@reduxjs/toolkit";

// add new attribute
export const createAttribute = createAsyncThunk("attribute/createAttribute", async (attributeData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };        
        const { data } = await axios.post(`/api/v1/admin/attribute/new`, attributeData, config);
        return data
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get all attributes
export const getAllAttributes = createAsyncThunk("attributes/getAllAttributes", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/admin/attributes");
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//get attribute details by Id
export const getAttribute = createAsyncThunk("attribute/getAttribute", async (attributeId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/attribute/${attributeId}`);
        return data.attribute;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// update attribute
export const updateAttribute = createAsyncThunk("attribute/updateAttribute", async ({attributeId, attributeData}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/attribute/${attributeId}`, attributeData, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// update attribute
export const deleteAttribute = createAsyncThunk("attribute/deleteAttribute", async (attributeId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/attribute/${attributeId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
