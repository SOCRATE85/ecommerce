import { 
    CREATE_SETTING_REQUEST, 
    CREATE_SETTING_SUCCESS, 
    CREATE_SETTING_FAIL,
    CREATE_SETTING_RESET,

    GET_SETTING_REQUEST,
    GET_SETTING_SUCCESS,
    GET_SETTING_FAIL,
    CLEAR_ERRORS
} from '../contants/settingsConstent';

export const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_SETTING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            };
        case CREATE_SETTING_FAIL:
            return {
                ...state, 
                loading: false,
                error: action.payload
            };
        case CREATE_SETTING_RESET:
            return {
                ...state,
                success: false
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

export const getSettingsReducer = (state = {settings: []}, action) => {
    switch (action.type) {
        case GET_SETTING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                settings: action.payload
            };
        case GET_SETTING_FAIL:
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
