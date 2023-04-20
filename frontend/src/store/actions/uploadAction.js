import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { thunkError } from "./clearformAction";

// uploadFiles
export const uploadFiles = createAsyncThunk("upload/uploadFiles", async (fileData, thunkAPI) => {
    try {
        const config = {headers:{ "Content-Type": "multipart/form-data"}};
        const { data } = await axios.post("/api/v1/admin/upload", fileData, config);
        return data.images;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// deleteFiles
export const deleteFiles = createAsyncThunk("upload/deleteFiles", async (fileData, thunkAPI) => {
    try {
        const config = {headers:{ "Content-Type": "multipart/form-data"}};
        const { data } = await axios.post("/api/v1/admin/upload", fileData, config);
        return data.images;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
