import axios from 'axios';
import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_FRONTEND_REQUEST,
    ALL_CATEGORY_FRONTEND_SUCCESS,
    ALL_CATEGORY_FRONTEND_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_INADMIN_REQUEST,
    CATEGORY_DETAILS_INADMIN_SUCCESS,
    CATEGORY_DETAILS_INADMIN_FAIL,
    CATEGORY_FILTER_REQUEST,
    CATEGORY_FILTER_SUCCESS,
    CATEGORY_FILTER_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    LOAD_CATEGORY_FRONTEND_REQUEST,
    LOAD_CATEGORY_FRONTEND_SUCCESS,
    LOAD_CATEGORY_FRONTEND_FAIL,
    CLEAR_ERRORS
} from '../contants/categoryConstant';

// get categiry tree for frontend
export const getCategoryForFrontEnd = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_CATEGORY_FRONTEND_REQUEST });
        const { data } = await axios.get("/api/v1/categorytree");
        dispatch({ type: LOAD_CATEGORY_FRONTEND_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: LOAD_CATEGORY_FRONTEND_FAIL, payload: error.response.data.message});
    }
}

// get all admin categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });
        const { data } = await axios.get("/api/v1/admin/categories");
        dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data});
    } catch (error) {
       dispatch({ type: ALL_CATEGORY_FAIL, payload: error.response.data.message}); 
    }
}

// get all admin categories
export const getAllCategoriesForFrontEnd = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_FRONTEND_REQUEST });
        const { data } = await axios.get("/api/v1/categories");
        dispatch({ type: ALL_CATEGORY_FRONTEND_SUCCESS, payload: data});
    } catch (error) {
       dispatch({ type: ALL_CATEGORY_FRONTEND_FAIL, payload: error.response.data.message}); 
    }
}

// add new category item
export const createCategory = (categoryData) => async (dispatch) => {
    try{
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: NEW_CATEGORY_REQUEST});
        const { data } = await axios.post(`/api/v1/admin/category/new`, categoryData, config);
        dispatch({ type: NEW_CATEGORY_SUCCESS, payload: data});
    }catch (error) {
        dispatch({ type: NEW_CATEGORY_FAIL, payload: error.response.data.message});
    }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
    try{
        dispatch({ type: DELETE_CATEGORY_REQUEST});
        const { data } = await axios.delete(`/api/v1/admin/category/${categoryId}`);
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.success});
    }catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAIL, payload: error.response.data.message});
    }
}

// get category details
export const getCategoryDetails = (categoryId) => async (dispatch) => {
    try{
        dispatch({ type: CATEGORY_DETAILS_INADMIN_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/category/${categoryId}`);
        dispatch({ type: CATEGORY_DETAILS_INADMIN_SUCCESS, payload: data.category });
    }catch (error) {
        dispatch({ type: CATEGORY_DETAILS_INADMIN_FAIL, payload: error.response.data.message });
    }
}

// get category details
export const getFilterAndSorting = (categoryId) => async (dispatch) => {
    try{
        dispatch({ type: CATEGORY_FILTER_REQUEST});
        let link = `/api/v1/filtersorting/${categoryId}`;
        const { data } = await axios.get(link);
        dispatch({ type: CATEGORY_FILTER_SUCCESS, payload: data });
    }catch (error) {
        dispatch({ type: CATEGORY_FILTER_FAIL, payload: error.response.data.message});
    }
}

// get category details
export const getCategoryDetailsForFrontEnd = (categoryId, currentPage = 1, filterValues, numofProduct = 8) => async (dispatch) => {
    try{
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
        dispatch({ type: CATEGORY_DETAILS_REQUEST});
        let link = '';
        if(params === "") {
            link = `/api/v1/category/${categoryId}?numofProduct=${numofProduct}&page=${currentPage}`;
        } else {
            link = `/api/v1/category/${categoryId}?numofProduct=${numofProduct}&page=${currentPage}&${params}`;
        }
        const { data } = await axios.get(link);
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
    }catch (error) {
        dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.response.data.message});
    }
}

// get filter category details
export const getCategoryFilterDetailsForFrontEnd = (categoryId, currentPage = 1, filterValues, numofProduct = 8) => async (dispatch) => {
    try{
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
        dispatch({ type: CATEGORY_DETAILS_REQUEST});
        let link = '';
        if(params === "") {
            link = `/api/v1/category/${categoryId}?filter=1&numofProduct=${numofProduct}&page=${currentPage}`;
        } else {
            link = `/api/v1/category/${categoryId}?filter=1&numofProduct=${numofProduct}&page=${currentPage}&${params}`;
        }
        const { data } = await axios.get(link);
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
    }catch (error) {
        dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.response.data.message});
    }
}

// update category
export const updateCategory = (categoryData, categoryId) => async (dispatch) => {
   try{
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_CATEGORY_REQUEST});
        const { data } = await axios.put(`/api/v1/admin/category/${categoryId}`, categoryData, config);
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data.success});
    }catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAIL, payload: error.response.data.message});
    } 
}

export const resetForm = () => async (dispatch) => {
    dispatch({ 
        type: NEW_CATEGORY_RESET
    });
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};