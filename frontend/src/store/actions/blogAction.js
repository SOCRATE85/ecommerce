import axios from "axios";
import {
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    LIST_BLOG_REQUEST,
    LIST_BLOG_SUCCESS,
    LIST_BLOG_FAIL,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    CLEAR_ERRORS
} from "../contants/blogContent";

export const createBlog = (blogData) => async dispatch => {
    try {
        dispatch({ type: CREATE_BLOG_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post('/api/v1/admin/blog/new', blogData, config);
        dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_BLOG_FAIL, payload: error.response.data.message });
    }
}

export const getAllBlog = () => async dispatch => {
    try {
        dispatch({ type: LIST_BLOG_REQUEST });
        const { data } = await axios.get("/api/v1/admin/blogs");
        dispatch({ type: LIST_BLOG_SUCCESS, payload: data.blogs });
    } catch (error) {
        dispatch({ type: LIST_BLOG_FAIL, payload: error.response.data.message });
    }
}

export const deleteBlog = (id) => async dispatch => {
    try {
        dispatch({ type: DELETE_BLOG_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/blog/${id}`);
        dispatch({ type: DELETE_BLOG_SUCCESS, payload: data.blogs });
    } catch (error) {
        dispatch({ type: DELETE_BLOG_FAIL, payload: error.response.data.message });
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};