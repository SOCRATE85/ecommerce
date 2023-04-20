import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import { forgotPassword, resetPassword } from '../actions/userAction';

export const forgetPasswordSlice = createSlice({
    name: "password",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        // forget passord
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // reset password
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
