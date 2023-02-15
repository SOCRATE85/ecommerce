import axios from "axios";
import { 
    ALL_ATTRIBUTES_REQUEST, 
    ALL_ATTRIBUTES_SUCCESS, 
    ALL_ATTRIBUTES_FAIL,
    ATTRIBUTE_DETAILS_REQUEST,
    ATTRIBUTE_DETAILS_SUCCESS,
    ATTRIBUTE_DETAILS_FAIL,
    NEW_ATTRIBUTE_REQUEST,
    NEW_ATTRIBUTE_SUCCESS,
    NEW_ATTRIBUTE_FAIL,
    UPDATE_ATTRIBUTE_REQUEST,
    UPDATE_ATTRIBUTE_SUCCESS,
    UPDATE_ATTRIBUTE_FAIL,
    DELETE_ATTRIBUTE_REQUEST,
    DELETE_ATTRIBUTE_SUCCESS,
    DELETE_ATTRIBUTE_FAIL,
    CLEAR_ERRORS
} from '../contants/attributeConstant';

// add new attribute
export const createAttribute = (attributeData) => async (dispatch) => {
    try{
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: NEW_ATTRIBUTE_REQUEST});
        const { data } = await axios.post(`/api/v1/admin/attribute/new`, attributeData, config);
        dispatch({ type: NEW_ATTRIBUTE_SUCCESS, payload: data});
    }catch (error) {
        dispatch({ type: NEW_ATTRIBUTE_FAIL, payload: error.response.data.message});
    }
}

// get all attributes
export const getAllAttributes = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ATTRIBUTES_REQUEST });
        const { data } = await axios.get("/api/v1/admin/attributes");
        dispatch({ type: ALL_ATTRIBUTES_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: ALL_ATTRIBUTES_FAIL, payload: error.response.data.message});
    }
}

//get attribute details by Id
export const getAttribute = (attributeId) => async(dispatch) => {
    try {
        dispatch({ type: ATTRIBUTE_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/attribute/${attributeId}`);
        dispatch({ type: ATTRIBUTE_DETAILS_SUCCESS, payload: data.attribute});
    } catch (error) {
        dispatch({ type: ATTRIBUTE_DETAILS_FAIL, payload: error.response.data.message});
    }
}

// update attribute
export const updateAttribute = (attributeData, attributeId) => async (dispatch) => {
   try{
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_ATTRIBUTE_REQUEST});
        const { data } = await axios.put(`/api/v1/admin/attribute/${attributeId}`, attributeData, config);
        dispatch({ type: UPDATE_ATTRIBUTE_SUCCESS, payload: data.success});
    }catch (error) {
        dispatch({ type: UPDATE_ATTRIBUTE_FAIL, payload: error.response.data.message});
    }
}

// update attribute
export const deleteAttribute = (attributeId) => async (dispatch) => {
   try{
        dispatch({ type: DELETE_ATTRIBUTE_REQUEST});
        const { data } = await axios.delete(`/api/v1/admin/attribute/${attributeId}`);
        dispatch({ type: DELETE_ATTRIBUTE_SUCCESS, payload: data.success});
    }catch (error) {
        dispatch({ type: DELETE_ATTRIBUTE_FAIL, payload: error.response.data.message});
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};