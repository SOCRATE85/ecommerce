import axios from "axios";
import { thunkError } from './clearformAction';
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all attributes
export const getAttributeSets = createAsyncThunk("attributesets/getAttributeSets", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/admin/attributesets");
        return data;
    } catch (error) {
       return thunkError(error, thunkAPI); 
    }
});

// get all attributes
export const getAttributeSetDetails = createAsyncThunk("attributeset/getAttributeSetDetails", async (attributeSetId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/attributeset/${attributeSetId}`);
        return data.attributeset;
    } catch (error) {
        return thunkError(error, thunkAPI); 
    }
});

// create new attribute set
export const createAttributeSet = createAsyncThunk("attributeset/createAttributeSet", async (attributesetData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/admin/attributeset/new", attributesetData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// create new attribute set
export const updateAttributeSet = createAsyncThunk("attributeset/updateAttributeSet", async ({attributesetData, attribuetsetId}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/attributeset/${attribuetsetId}`, attributesetData, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//delete attribute set
export const deleteAttributeSet = createAsyncThunk("attributeset/deleteAttributeSet", async (attribuetsetId, thunkAPI) => {
    try {        
        const { data } = await axios.delete(`/api/v1/admin/attributeset/${attribuetsetId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
