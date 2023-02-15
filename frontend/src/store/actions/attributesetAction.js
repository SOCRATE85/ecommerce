import axios from "axios";
import { 
    ALL_ATTRIBUTESET_REQUEST, 
    ALL_ATTRIBUTESET_SUCCESS, 
    ALL_ATTRIBUTESET_FAIL,
    NEW_ATTRIBUTESET_REQUEST,
    NEW_ATTRIBUTESET_SUCCESS,
    NEW_ATTRIBUTESET_FAIL,
    CLEAR_ERRORS,
    DELETE_ATTRIBUTESET_REQUEST,
    DELETE_ATTRIBUTESET_SUCCESS,
    DELETE_ATTRIBUTESET_FAIL,
    ATTRIBUTESET_DETAILS_REQUEST,
    ATTRIBUTESET_DETAILS_SUCCESS,
    ATTRIBUTESET_DETAILS_FAIL,
    UPDATE_ATTRIBUTESET_REQUEST,
    UPDATE_ATTRIBUTESET_SUCCESS,
    UPDATE_ATTRIBUTESET_FAIL
} from '../contants/attributesetContant';

// get all attributes
export const getAttributesets = () => async dispatch => {
    try {
        dispatch({ type: ALL_ATTRIBUTESET_REQUEST });
        const { data } = await axios.get("/api/v1/admin/attributesets");
        dispatch({ type: ALL_ATTRIBUTESET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: ALL_ATTRIBUTESET_FAIL, payload: error.response.data.message});
    }
}

// get all attributes
export const getAttributesetDetails = (attributeSetId) => async dispatch => {
    try {
        dispatch({ type: ATTRIBUTESET_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/attributeset/${attributeSetId}`);
        dispatch({ type: ATTRIBUTESET_DETAILS_SUCCESS, payload: data.attributeset});
    } catch (error) {
        dispatch({ type: ATTRIBUTESET_DETAILS_FAIL, payload: error.response.data.message});
    }
}

// create new attribute set
export const createAttributeSets = (attributesetData) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: NEW_ATTRIBUTESET_REQUEST });
        const { data } = await axios.post("/api/v1/admin/attributeset/new", attributesetData, config);
        dispatch({ type: NEW_ATTRIBUTESET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: NEW_ATTRIBUTESET_FAIL, payload: error.response.data.message});  
    }
}

// create new attribute set
export const updateAttributeSet = (attributesetData, attribuetsetId) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        dispatch({ type: UPDATE_ATTRIBUTESET_REQUEST });
        const { data } = await axios.put(`/api/v1/admin/attributeset/${attribuetsetId}`, attributesetData, config);
        dispatch({ type: UPDATE_ATTRIBUTESET_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({ type: UPDATE_ATTRIBUTESET_FAIL, payload: error.response.data.message});  
    }
}

//delete attribute set
export const deleteAttributeset = (attribuetsetId) => async dispatch => {
    try {
        dispatch({ type: DELETE_ATTRIBUTESET_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/attributeset/${attribuetsetId}`);
        dispatch({ type: DELETE_ATTRIBUTESET_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({ type: DELETE_ATTRIBUTESET_FAIL, payload: error.response.data.message});
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};