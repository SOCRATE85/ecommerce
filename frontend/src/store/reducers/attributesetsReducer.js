import { 
    ALL_ATTRIBUTESET_REQUEST, 
    ALL_ATTRIBUTESET_SUCCESS, 
    ALL_ATTRIBUTESET_FAIL,
    NEW_ATTRIBUTESET_REQUEST,
    NEW_ATTRIBUTESET_SUCCESS,
    NEW_ATTRIBUTESET_FAIL,
    NEW_ATTRIBUTESET_RESET,
    ATTRIBUTESET_DETAILS_REQUEST,
    ATTRIBUTESET_DETAILS_SUCCESS,
    ATTRIBUTESET_DETAILS_FAIL,
    UPDATE_ATTRIBUTESET_REQUEST,
    UPDATE_ATTRIBUTESET_SUCCESS,
    UPDATE_ATTRIBUTESET_FAIL,
    UPDATE_ATTRIBUTESET_RESET,
    DELETE_ATTRIBUTESET_REQUEST,
    DELETE_ATTRIBUTESET_SUCCESS,
    DELETE_ATTRIBUTESET_RESET,
    DELETE_ATTRIBUTESET_FAIL,
    CLEAR_ERRORS
} from '../contants/attributesetContant';

export const createAttributesetReducer = (state = { attributeset:{}}, action) => {
    switch(action.type){
        case NEW_ATTRIBUTESET_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_ATTRIBUTESET_SUCCESS:
            return {
                ...state,
                loading: false,
                attributeset: action.payload.attributeset,
                success: action.payload.success
            };
        case NEW_ATTRIBUTESET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_ATTRIBUTESET_RESET:
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

export const attributesetReducer = (state = { attributesets: []}, action ) => {
    switch(action.type){
        case ALL_ATTRIBUTESET_REQUEST:
            return {
                ...state,
                loading: true,
                attributesets: []
            };
        case ALL_ATTRIBUTESET_SUCCESS:
            return {
                ...state,
                loading: false,
                attributesets: action.payload.attributesets,
            };
        case ALL_ATTRIBUTESET_FAIL:
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

export const attributesetDetailsReducer = (state = { attributeset: {}}, action ) => {
    switch(action.type){
        case ATTRIBUTESET_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ATTRIBUTESET_DETAILS_SUCCESS:
            return {
                loading: false,
                attributeset: action.payload
            };
        case ATTRIBUTESET_DETAILS_FAIL:
            return {
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

export const deleteAttributesetReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_ATTRIBUTESET_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_ATTRIBUTESET_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_ATTRIBUTESET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_ATTRIBUTESET_RESET:
            return {
                ...state,
                isDeleted: false
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

export const updateAttributesetReducer = (state = {}, action ) => {
    switch(action.type){
        case UPDATE_ATTRIBUTESET_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_ATTRIBUTESET_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_ATTRIBUTESET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_ATTRIBUTESET_RESET:
            return {
                ...state,
                isUpdated: false
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