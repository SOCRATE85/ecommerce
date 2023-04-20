import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkError } from "./clearformAction";

export const createUpdateSettings = createAsyncThunk("settings/createUpdateSettings", async (settingData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/admin/setting/new", settingData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllSettings = createAsyncThunk("settings/getAllSettings", async (_, thunkAPI) => {
    try {
        const {data} = await axios.post("/api/v1/admin/settings");
        return data.settings;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
