import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS 
} from '../contants/productConstant';

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", async (_, thunkAPI) => {
     try {
        const { data } = await axios.get(`/api/v1/products`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
});

// GET ALL ADMIN PRODUCTS
export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts", async (_, thunkAPI) => {
     try {
        const { data } = await axios.get(`/api/v1/admin/products`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
});

// GET PRODUCT Details
export const productDetails = createAsyncThunk(
    "product/productDetails", async (productId, thunkAPI) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${productId}`);
        return  data.product
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
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
        return thunkAPI.rejectWithValue({ error: error.message });
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
           return thunkAPI.rejectWithValue({ error: error.message }); 
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct", async (productId, productData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(`/api/v1/admin/product/${productId}`, productData, config);
            return data.success;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
});

// Create new review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: NEW_REVIEW_REQUEST });
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);        
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
    }catch(error) {
        dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
    }
};

// get all review
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ 
            type: ALL_REVIEW_REQUEST 
        });
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);        
        dispatch({ 
            type: ALL_REVIEW_SUCCESS, 
            payload: data.reviews 
        });
    }catch(error) {
        dispatch({ 
            type: ALL_REVIEW_FAIL, 
            payload: error.response.data.message 
        });
    }
};

// delete review of product
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ 
            type: DELETE_REVIEW_REQUEST 
        });
        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);        
        dispatch({ 
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success 
        });
    }catch(error) {
        dispatch({ 
            type: DELETE_REVIEW_FAIL, 
            payload: error.response.data.message 
        });
    }
};

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};