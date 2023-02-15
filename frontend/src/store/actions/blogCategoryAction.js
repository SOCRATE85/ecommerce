import axios from "axios";
import {
    CREATE_BLOG_CATEGORY_REQUEST,
    CREATE_BLOG_CATEGORY_SUCCESS,
    CREATE_BLOG_CATEGORY_FAIL,
    UPDATE_BLOG_CATEGORY_REQUEST,
    UPDATE_BLOG_CATEGORY_SUCCESS,
    UPDATE_BLOG_CATEGORY_FAIL,
    DETAIL_BLOG_CATEGORY_REQUEST,
    DETAIL_BLOG_CATEGORY_SUCCESS,
    DETAIL_BLOG_CATEGORY_FAIL,
    ALL_BLOG_CATEGORY_REQUEST,
    ALL_BLOG_CATEGORY_SUCCESS,
    ALL_BLOG_CATEGORY_FAIL,
    DELETE_BLOG_CATEGORY_REQUEST,
    DELETE_BLOG_CATEGORY_SUCCESS,
    DELETE_BLOG_CATEGORY_FAIL,
    CLEAR_ERRORS
} from '../contants/blogCategoryContent';

export const createBlogCategory = (categoryData) => async dispatch => {
    try {
        dispatch({ type: CREATE_BLOG_CATEGORY_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post('/api/v1/admin/blog/category/new', categoryData, config);
        dispatch({ type: CREATE_BLOG_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_BLOG_CATEGORY_FAIL, payload: error.response.data.message });
    }
}

export const updateBlogCategory = (categoryData, categoryId) => async dispatch => {
    try {
        dispatch({ type: UPDATE_BLOG_CATEGORY_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/blog/category/${categoryId}`, categoryData, config);
        dispatch({ type: UPDATE_BLOG_CATEGORY_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_BLOG_CATEGORY_FAIL, payload: error.response.data.message });
    }
}

export const getAllBlogCategories = () => async dispatch => {
    try {
        dispatch({ type: ALL_BLOG_CATEGORY_REQUEST });
        const { data } = await axios.get("/api/v1/admin/blog/categories");
        dispatch({ type: ALL_BLOG_CATEGORY_SUCCESS, payload: data.blogCategories });
    } catch (error) {
        dispatch({ type: ALL_BLOG_CATEGORY_FAIL, payload: error.response.data.message });
    }
}

export const getBlogCategoryDetail = (categoryId) => async dispatch => {
    try {
        dispatch({ type: DETAIL_BLOG_CATEGORY_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/blog/category/${categoryId}`);
        dispatch({ type: DETAIL_BLOG_CATEGORY_SUCCESS, payload: data.blogcategory });
    } catch (error) {
        dispatch({ type: DETAIL_BLOG_CATEGORY_FAIL, payload: error.response.data.message });
    }
}

export const deleteBlogCategory = (categoryId) => async dispatch => {
    try {
        dispatch({ type: DELETE_BLOG_CATEGORY_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/blog/category/${categoryId}`);
        dispatch({ type: DELETE_BLOG_CATEGORY_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: DELETE_BLOG_CATEGORY_FAIL, payload: error.response.data.message });
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};