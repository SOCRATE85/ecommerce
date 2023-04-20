import axios from 'axios';
import { thunkError } from './clearformAction';
import { createAsyncThunk } from '@reduxjs/toolkit';

// get categiry tree for frontend
export const getCategoryForFrontEnd = createAsyncThunk('categories/getCategoryForFrontEnd', async (_, thunkAPI) => {
    try {
       const { data } = await axios.get("/api/v1/categorytree");
       return data; 
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get all admin categories
export const getAllCategories = createAsyncThunk("categories/getAllCategories", async (_, thunkAPI) => {
    try {
       const { data } = await axios.get("/api/v1/admin/categories");
       return data; 
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get all admin categories
export const getAllCategoriesForFrontEnd = createAsyncThunk("categories/getAllCategoriesForFrontEnd", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/api/v1/categories");
        return data;
    } catch (error) {
       return thunkError(error, thunkAPI);
    }
});

// add new category item
export const createCategory = createAsyncThunk('category/createCategory', async (categoryData, thunkAPI) => {
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(`/api/v1/admin/category/new`, categoryData, config);
            return data;
        }catch (error) {
            return thunkError(error, thunkAPI);
        }
    }
);

//delete category
export const deleteCategory = createAsyncThunk("category/deleteCategory", async (categoryId, thunkAPI) => {
    try{
        const { data } = await axios.delete(`/api/v1/admin/category/${categoryId}`);
        return data;
    }catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get category details
export const getCategoryDetails = createAsyncThunk("category/getCategoryDetails", async(categoryId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/category/${categoryId}`);
        return data.category;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get category details
export const getFilterAndSorting = createAsyncThunk("categories/getFilterAndSorting", async(categoryId, thunkAPI) => {
    try {
        let link = `/api/v1/filtersorting/${categoryId}`;
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get category details
export const getCategoryDetailsForFrontEnd = createAsyncThunk('category/getCategoryDetailsForFrontEnd', async({categoryId, currentPage = 1, filterValues, numofProduct = 8}, thunkAPI) => {
    try {
        let params = "";
        if(filterValues !== undefined) {
            for(let key in filterValues) {
                for(let key1 in filterValues[key]) {
                    const flag = key1.split("-");
                    switch (flag[1]) {
                        case 'number':
                            if(filterValues[key][key1].length > 1) {
                                params += `&${flag[0]}[gte]=${filterValues[key][key1][0]}&${flag[0]}[lte]=${filterValues[key][key1][1]}`;
                            } else {
                                params += `&${flag[0]}=${filterValues[key][key1][0]}`;
                            }
                        break;
                        case 'price':
                            if(filterValues[key][key1].length > 1) {
                                params += `&${flag[0]}[gte]=${filterValues[key][key1][0]}&${flag[0]}[lte]=${filterValues[key][key1][1]}`;
                            } else {
                                params += `&${flag[0]}=${filterValues[key][key1][0]}`;
                            }
                        break;
                        case 'select':
                        case 'multiselect':
                        case 'checkbox':
                        case 'radio':
                            if(typeof filterValues[key][key1] === 'string') {
                                params += `&${flag[0]}=${filterValues[key][key1]}`;
                            }
                        break;
                        default:
                        break;
                    } 
                }               
            }
        }
        let link = '';
        if(params === "") {
            link = `/api/v1/category/${categoryId}?numofProduct=${numofProduct}&page=${currentPage}`;
        } else {
            link = `/api/v1/category/${categoryId}?numofProduct=${numofProduct}&page=${currentPage}&${params}`;
        }
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get filter category details
export const getCategoryFilterDetailsForFrontEnd = createAsyncThunk("category/getCategoryFilterDetailsForFrontEnd", async({categoryId, currentPage = 1, filterValues, numofProduct = 8}, thunkAPI) => {
    try {
        let params = "";
        if(filterValues !== undefined) {
            for(let key in filterValues) {
                for(let key1 in filterValues[key]) {
                    const flag = key1.split("-");
                    switch (flag[1]) {
                        case 'number':
                            if(filterValues[key][key1].length > 1) {
                                params += `&${flag[0]}[gte]=${filterValues[key][key1][0]}&${flag[0]}[lte]=${filterValues[key][key1][1]}`;
                            } else {
                                params += `&${flag[0]}=${filterValues[key][key1][0]}`;
                            }
                        break;
                        case 'price':
                            if(filterValues[key][key1].length > 1) {
                                params += `&${flag[0]}[gte]=${filterValues[key][key1][0]}&${flag[0]}[lte]=${filterValues[key][key1][1]}`;
                            } else {
                                params += `&${flag[0]}=${filterValues[key][key1][0]}`;
                            }
                        break;
                        case 'select':
                        case 'multiselect':
                        case 'checkbox':
                        case 'radio':
                            if(typeof filterValues[key][key1] === 'string') {
                                params += `&${flag[0]}=${filterValues[key][key1]}`;
                            }
                        break;
                        default:
                        break;
                    } 
                }               
            }
        }
        let link = '';
        if(params === "") {
            link = `/api/v1/category/${categoryId}?filter=1&numofProduct=${numofProduct}&page=${currentPage}`;
        } else {
            link = `/api/v1/category/${categoryId}?filter=1&numofProduct=${numofProduct}&page=${currentPage}&${params}`;
        }
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// update category
export const updateCategory = createAsyncThunk("category/updateCategory", async({categoryId, categoryData}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/category/${categoryId}`, categoryData, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
