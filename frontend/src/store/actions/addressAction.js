import axios from "axios";
import { 
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAIL,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,
    ALL_ADDRESS_REQUEST,
    ALL_ADDRESS_SUCCESS,
    ALL_ADDRESS_FAIL,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAIL,
    CLEAR_ERRORS 
} from '../contants/addressContant';

export const addNewAddress = (address) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: ADD_ADDRESS_REQUEST});
        const { data } = await axios.post("/api/v1/address/new", address, config);
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAIL, payload: error.response.data.message});
    }
}

export const updateAddress = (addressId, address) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_ADDRESS_REQUEST});
        const { data } = await axios.put(`/api/v1/address/${addressId}`, address, config);
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_ADDRESS_FAIL, payload: error.response.data.message});
    }
}

export const deleteAddress = (addressId) => async dispatch => {
    try {
        dispatch({ type: DELETE_ADDRESS_REQUEST});
        const { data } = await axios.delete(`/api/v1/address/${addressId}`);
        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: DELETE_ADDRESS_FAIL, payload: error.response.data.message});
    }
}

export const getAllAddress = () => async dispatch => {
    try {
        dispatch({ type: ALL_ADDRESS_REQUEST});
        const { data } = await axios.get(`/api/v1/addresses`);
        dispatch({ type: ALL_ADDRESS_SUCCESS, payload: data.addresses });
    } catch (error) {
        dispatch({ type: ALL_ADDRESS_FAIL, payload: error.response.data.message});
    }
}

export const getAddress = (addressId) => async dispatch => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST});
        const { data } = await axios.get(`/api/v1/address/${addressId}`);
        dispatch({ type: GET_ADDRESS_SUCCESS, payload: data.address });
    } catch (error) {
        dispatch({ type: GET_ADDRESS_FAIL, payload: error.response.data.message});
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};
