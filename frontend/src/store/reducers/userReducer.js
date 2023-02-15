import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    CLEAR_ERRORS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "../contants/userContant";

const userInitialState = {};
export const userReducer = (state = userInitialState, action ) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            };
        case LOGOUT_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload  
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

const allUsersInitialState = { users: []};
export const allUsersReducer = (state = allUsersInitialState, action ) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case ALL_USERS_FAIL:
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

const userDetailInitialState = { user: {}};
export const userDetailsReducer = (state = userDetailInitialState, action ) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case USER_DETAILS_FAIL:
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