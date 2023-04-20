import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkError } from "./clearformAction";

export const createBlog = createAsyncThunk("blog/createBlog", async (blogData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post('/api/v1/admin/blog/new', blogData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateBlog = createAsyncThunk("blog/updateBlog", async ({blogData, blogId}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/blog/${blogId}`, blogData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getBlog = createAsyncThunk("blog/getBlog", async (blogId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/blog/${blogId}`);
        return data.blog;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllBlog = createAsyncThunk("blogs/getAllBlog", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/admin/blogs");
        return data.blogs;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (blogId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/blog/${blogId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
