import axios from "axios";
import { thunkError } from './clearformAction';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlogCategory = createAsyncThunk("blogcategory/createBlogCategory", async (categoryData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post('/api/v1/admin/blog/category/new', categoryData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateBlogCategory  = createAsyncThunk("blogcategory/updateBlogCategory", async ({categoryData, categoryId}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/blog/category/${categoryId}`, categoryData, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllBlogCategories = createAsyncThunk("blogcategories/getAllBlogCategories", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/admin/blog/categories");
        return data.blogCategories;
    } catch (error) {
        return thunkError(error, thunkAPI);      
    }
});

export const getBlogCategoryDetail = createAsyncThunk("blogcategory/getBlogCategoryDetail", async (categoryId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/blog/category/${categoryId}`);
        return data.blogcategory;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteBlogCategory = createAsyncThunk("blogcategory/deleteBlogCategory", async (categoryId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/blog/category/${categoryId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
