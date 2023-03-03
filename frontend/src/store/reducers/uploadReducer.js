import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAIL,
    CLEAR_ERRORS,
} from "../contants/uploadContant";

export const deleteReducer = (state = {}, action ) => {
    switch (action.type) {
        case DELETE_FILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_FILE_FAIL:
            return {
                ...state, 
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const uploadReducer = (state = { images: []}, action ) => {
    switch (action.type) {
        case UPLOAD_FILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                images: action.payload
            };
        case UPLOAD_FILE_FAIL:
            return {
                ...state, 
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}