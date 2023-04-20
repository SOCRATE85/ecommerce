import { createAction } from '@reduxjs/toolkit';

//clear all errors
export const clearErrors = createAction("all/clearErrors");
export const thunkError = (error, thunkAPI) => {
    if(error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
    } else {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
}
