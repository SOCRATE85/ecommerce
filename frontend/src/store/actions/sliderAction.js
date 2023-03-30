import axios from "axios";
import { 
    ADD_SLIDER_REQUEST,
    ADD_SLIDER_SUCCESS,
    ADD_SLIDER_FAIL,
    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_FAIL,
    DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_FAIL,
    ALL_SLIDER_REQUEST,
    ALL_SLIDER_SUCCESS,
    ALL_SLIDER_FAIL,
    GET_SLIDER_REQUEST,
    GET_SLIDER_SUCCESS,
    GET_SLIDER_FAIL,
    CLEAR_ERRORS 
} from '../contants/sliderContant';

export const addNewSlider = (slider) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: ADD_SLIDER_REQUEST});
        const { data } = await axios.post("/api/v1/slider/new", slider, config);
        dispatch({ type: ADD_SLIDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_SLIDER_FAIL, payload: error.response.data.message});
    }
}

export const updateSlider = (sliderId, slider) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_SLIDER_REQUEST});
        const { data } = await axios.put(`/api/v1/slider/${sliderId}`, slider, config);
        dispatch({ type: UPDATE_SLIDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_SLIDER_FAIL, payload: error.response.data.message});
    }
}

export const deleteSlider = (sliderId) => async dispatch => {
    try {
        dispatch({ type: DELETE_SLIDER_REQUEST});
        const { data } = await axios.delete(`/api/v1/slider/${sliderId}`);
        dispatch({ type: DELETE_SLIDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: DELETE_SLIDER_FAIL, payload: error.response.data.message});
    }
}

export const getAllSlider = () => async dispatch => {
    try {
        dispatch({ type: ALL_SLIDER_REQUEST});
        const { data } = await axios.get(`/api/v1/sliders`);
        dispatch({ type: ALL_SLIDER_SUCCESS, payload: data.sliders });
    } catch (error) {
        dispatch({ type: ALL_SLIDER_FAIL, payload: error.response.data.message});
    }
}

export const getSlider = (sliderId) => async dispatch => {
    try {
        dispatch({ type: GET_SLIDER_REQUEST});
        const { data } = await axios.get(`/api/v1/slider/${sliderId}`);
        dispatch({ type: GET_SLIDER_SUCCESS, payload: data.slider });
    } catch (error) {
        dispatch({ type: GET_SLIDER_FAIL, payload: error.response.data.message});
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};
