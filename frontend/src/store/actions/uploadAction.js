import { 
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAIL
} from "../contants/uploadContant";
import axios from 'axios';

// uploadFiles
export const uploadFiles = (fileData) => async (dispatch) => {
    try {
        dispatch({type: UPLOAD_FILE_REQUEST});
        const config = { headers: { "Content-Type": "multipart/form-data" }
        };
        const { data } = await axios.post("/api/v1/admin/upload", fileData, config);
        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data.images });
    } catch (error) {
        dispatch({
            type: UPLOAD_FILE_FAIL,
            payload: error.response.data.message
        });
    }
}

// deleteFiles
export const deleteFiles = (fileData) => async (dispatch) => {
    try {
        dispatch({type: DELETE_FILE_REQUEST});
        const config = { headers: { "Content-Type": "application/json" }
        };
        const { data } = await axios.post("/api/v1/login",fileData, config);
        dispatch({ type: DELETE_FILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_FILE_FAIL,
            payload: error.response.data.message
        });
    }
}
