import { 
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAIL,
    ADD_ADDRESS_RESET,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    UPDATE_ADDRESS_RESET,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,
    DELETE_ADDRESS_RESET,
    ALL_ADDRESS_REQUEST,
    ALL_ADDRESS_SUCCESS,
    ALL_ADDRESS_FAIL,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAIL,
    CLEAR_ERRORS 
} from '../contants/addressContant';

export const addAddressReducer = (state = {address:{}}, action) => {
    switch (action.type) {
        case ADD_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ADD_ADDRESS_SUCCESS:
            return {
                loading: false,
                address: action.payload.address,
                success: action.payload.success
            };
        case ADD_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                success: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const updateAddressReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const addressReducer = (state={address:{}}, action) => {
    switch (action.type) {
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                address: {}
            }
        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload
            }
        case GET_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const addressesReducer = (state={addresses:[]}, action) => {
    switch (action.type) {
        case ALL_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                addresses: []
            }
        case ALL_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload
            }
        case ALL_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const deleteAddressReducer = (state={}, action) => {
    switch (action.type) {
        case DELETE_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}