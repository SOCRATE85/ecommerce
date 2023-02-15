import { 
    ALL_ATTRIBUTES_REQUEST, 
    ALL_ATTRIBUTES_SUCCESS, 
    ALL_ATTRIBUTES_FAIL,
    ATTRIBUTE_DETAILS_REQUEST,
    ATTRIBUTE_DETAILS_SUCCESS,
    ATTRIBUTE_DETAILS_FAIL,
    NEW_ATTRIBUTE_REQUEST,
    NEW_ATTRIBUTE_SUCCESS,
    NEW_ATTRIBUTE_RESET,
    NEW_ATTRIBUTE_FAIL,
    UPDATE_ATTRIBUTE_REQUEST,
    UPDATE_ATTRIBUTE_SUCCESS,
    UPDATE_ATTRIBUTE_RESET,
    UPDATE_ATTRIBUTE_FAIL,
    DELETE_ATTRIBUTE_REQUEST,
    DELETE_ATTRIBUTE_SUCCESS,
    DELETE_ATTRIBUTE_RESET,
    DELETE_ATTRIBUTE_FAIL,
    CLEAR_ERRORS
} from '../contants/attributeConstant';

export const createAttributeReducer = (state = { attribute:{}}, action) => {
    switch(action.type){
        case NEW_ATTRIBUTE_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                loading: false,
                attribute: action.payload.attribute,
                success: action.payload.success
            };
        case NEW_ATTRIBUTE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_ATTRIBUTE_RESET:
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

export const attributesReducer = (state = { attributes: []}, action ) => {
    switch(action.type){
        case ALL_ATTRIBUTES_REQUEST:
            return {
                ...state,
                loading: true,
                attributes: []
            };
        case ALL_ATTRIBUTES_SUCCESS:
            return {
                ...state,
                loading: false,
                attributes: action.payload.attributes,
            };
        case ALL_ATTRIBUTES_FAIL:
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

export const deleteAttributeReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_ATTRIBUTE_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_ATTRIBUTE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_ATTRIBUTE_RESET:
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

export const attributeDetailsReducer = (state = { attribute: {}}, action ) => {
    switch(action.type){
        case ATTRIBUTE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ATTRIBUTE_DETAILS_SUCCESS:
            return {
                loading: false,
                attribute: action.payload
            };
        case ATTRIBUTE_DETAILS_FAIL:
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

export const updateAttributeReducer = (state = {}, action ) => {
    switch(action.type){
        case UPDATE_ATTRIBUTE_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_ATTRIBUTE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_ATTRIBUTE_RESET:
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