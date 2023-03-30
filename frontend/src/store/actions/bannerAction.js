import axios from "axios";
import { 
    ADD_BANNER_REQUEST,
    ADD_BANNER_SUCCESS,
    ADD_BANNER_FAIL,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    ALL_BANNER_REQUEST,
    ALL_BANNER_SUCCESS,
    ALL_BANNER_FAIL,
    GET_BANNER_REQUEST,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAIL,
    CLEAR_ERRORS
} from '../contants/bannerContant';

export const addNewBanner = (banner) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: ADD_BANNER_REQUEST});
        const { data } = await axios.post("/api/v1/banner/new", banner, config);
        dispatch({ type: ADD_BANNER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_BANNER_FAIL, payload: error.response.data.message});
    }
}

export const updateBanner = (bannerId, banner) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_BANNER_REQUEST});
        const { data } = await axios.put(`/api/v1/banner/${bannerId}`, banner, config);
        dispatch({ type: UPDATE_BANNER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_BANNER_FAIL, payload: error.response.data.message});
    }
}

export const deleteBanner = (bannerId) => async dispatch => {
    try {
        dispatch({ type: DELETE_BANNER_REQUEST});
        const { data } = await axios.delete(`/api/v1/banner/${bannerId}`);
        dispatch({ type: DELETE_BANNER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: DELETE_BANNER_FAIL, payload: error.response.data.message});
    }
}

export const getAllBanner = () => async dispatch => {
    try {
        dispatch({ type: ALL_BANNER_REQUEST});
        const { data } = await axios.get(`/api/v1/banners`);
        dispatch({ type: ALL_BANNER_SUCCESS, payload: data.banners });
    } catch (error) {
        dispatch({ type: ALL_BANNER_FAIL, payload: error.response.data.message});
    }
}

export const getBanner = (bannerId) => async dispatch => {
    try {
        dispatch({ type: GET_BANNER_REQUEST});
        const { data } = await axios.get(`/api/v1/banner/${bannerId}`);
        dispatch({ type: GET_BANNER_SUCCESS, payload: data.banner });
    } catch (error) {
        dispatch({ type: GET_BANNER_FAIL, payload: error.response.data.message});
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};
