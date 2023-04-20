import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import { updatePassword, updateProfile, updateUser, deleteUser } from '../actions/userAction';

export const profileSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        updatePasswordReset: (state) => {
            state.isUpdated = false;
        },
        updateProfileReset: (state) => {
            state.isUpdated = false;
        },
        updateUserReset: (state) => {
            state.isUpdated = false;
        },
        deleteUserReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        //update password
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //update profile
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // update user
        builder.addCase(updateUser.pending, (state) => {
            state.loading = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
