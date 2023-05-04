import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkError } from "./clearformAction";
import axios from 'axios';

// user login
export const login = createAsyncThunk("user/login", async ({email, password}, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post("/api/v1/login", { email, password }, config);
        return data.user;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// register user
export const register = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post("/api/v1/register", userData , config);
        return data.user;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//create new user in admin
export const addUser = createAsyncThunk("user/addUser", async (userData, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post("/api/v1/admin/register", userData , config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//Logout User
export const logoutuser = createAsyncThunk("user/logoutuser", async (_, thunkAPI) => {
    try {
        await axios.get('/api/v1/logout');
        return true;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//load user
export const loadUser = createAsyncThunk("user/loadUser", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/me");
        return data.user;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// create new user / register user
export const updateProfile = createAsyncThunk("user/updateProfile", async (userData, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/form-data" }};
        const { data } = await axios.put("/api/v1/me/update", userData , config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// change password
export const updatePassword = createAsyncThunk("user/updatePassword", async(password, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.put("/api/v1/password/update", password , config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

//Forget password
export const forgotPassword = createAsyncThunk("user/forgotPassword", async (email, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post("/api/v1/password/forget", email , config);
        return data.message;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// reset password
export const resetPassword = createAsyncThunk("user/resetPassword", async ({token, password}, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, password , config);
        return data.success;
    } catch (error) {
       return thunkError(error, thunkAPI); 
    }
});

// Get All Users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/admin/users');
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// Get User Details
export const getUserDetails = createAsyncThunk("user/getUserDetails", async (userId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/user/${userId}`);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// update user (admin)
export const updateUser = createAsyncThunk("user/updateUser", async ({userData, userId}, thunkAPI) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.put(`/api/v1/admin/user/${userId}`, userData , config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// delete user (admin)
export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
