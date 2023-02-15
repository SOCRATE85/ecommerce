import axios from "axios";
import { 
    CREATE_SETTING_REQUEST, 
    CREATE_SETTING_SUCCESS, 
    CREATE_SETTING_FAIL,
    GET_SETTING_REQUEST,
    GET_SETTING_SUCCESS,
    GET_SETTING_FAIL,
    CLEAR_ERRORS
} from '../contants/settingsConstent';

export const createUpdateSettings = (settingData) => async dispatch => {
    try {
        dispatch({ type: CREATE_SETTING_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/v1/admin/setting/new", settingData, config);
        dispatch({ type: CREATE_SETTING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ 
            type: CREATE_SETTING_FAIL, 
            payload: error.response.data.message 
        });
    }
}

export const getAllSettings = () => async dispatch => {
    try {
        dispatch({ type: GET_SETTING_REQUEST });
        const {data} = await axios.post("/api/v1/admin/settings");
        dispatch({ type: GET_SETTING_SUCCESS, payload: data.settings });
    } catch (error) {
        dispatch({ 
            type: GET_SETTING_FAIL, 
            payload: error.response.data.message 
        });
    }
}

//clear all errors
export const clearErrors = () => async (dispatch) => { 
    dispatch({
        type: CLEAR_ERRORS
    });
};