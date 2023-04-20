import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import { login, register, loadUser, logoutuser, getAllUsers, getUserDetails, addUser } from '../actions/userAction';

export const addUserSlice = createSlice({
    name: "user",
    initialState: {user:{}},
    reducers: {
        addUserReset: (state) => {
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.success = action.payload.success;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(login.rejected,(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        });
        //register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(register.rejected,(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        });
        //loading user
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(loadUser.rejected,(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        });
        //logout user
        builder.addCase(logoutuser.fulfilled, (state, _) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
        builder.addCase(logoutuser.rejected,(state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        });
        //clear error
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const allUsersSlice = createSlice({
    name: "user",
    initialState:  {users: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            state.success = action.payload.success;
        });
        builder.addCase(getAllUsers.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const userDetailsSlice = createSlice({
    name: "user",
    initialState: {user: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserDetails.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
