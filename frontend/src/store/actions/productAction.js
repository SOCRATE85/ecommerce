import axios from 'axios';
import { thunkError } from './clearformAction';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", async (_, thunkAPI) => {
     try {
        const { data } = await axios.get(`/api/v1/products`);
        return data;
      } catch (error) {
        return thunkError(error, thunkAPI);
      }
});

// GET ALL ADMIN PRODUCTS
export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts", async (_, thunkAPI) => {
     try {
        const { data } = await axios.get(`/api/v1/admin/products`);
        return data;
      } catch (error) {
        return thunkError(error, thunkAPI);
      }
});

// GET PRODUCT Details
export const productDetails = createAsyncThunk(
    "product/productDetails", async (productId, thunkAPI) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${productId}`);
            return  data.product
        } catch (error) {
            return thunkError(error, thunkAPI);
        }
    }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct", async (productId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// Create new product
export const createProduct = createAsyncThunk(
    "product/createProduct", async(productData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
            return data;
        } catch (error) {
           return thunkError(error, thunkAPI);
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct", async (formdata, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(`/api/v1/admin/product/${formdata.productId}`, formdata.productData, config);
            return data.success;
        } catch (error) {
            return thunkError(error, thunkAPI);
        }
});

// Create new review
export const newReview = createAsyncThunk(
    "product/createReview", async (reviewData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/review`, reviewData, config); 
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

// get all review
export const getAllReviews = createAsyncThunk(
    "product/getAllReviews", async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
            return data.reviews;
        } catch (error) {
            return thunkError(error, thunkAPI);
        }
});

// delete review of product
export const deleteReview = createAsyncThunk(
    "product/deleteReview", async (reviewId, productId, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
            return data.success;
        } catch (error) {
            return thunkError(error, thunkAPI);
        }
});
