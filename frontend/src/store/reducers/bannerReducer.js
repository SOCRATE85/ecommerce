import { 
    ADD_BANNER_REQUEST,
    ADD_BANNER_SUCCESS,
    ADD_BANNER_FAIL,
    ADD_BANNER_RESET,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,
    UPDATE_BANNER_RESET,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    DELETE_BANNER_RESET,
    ALL_BANNER_REQUEST,
    ALL_BANNER_SUCCESS,
    ALL_BANNER_FAIL,
    GET_BANNER_REQUEST,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAIL,
    CLEAR_ERRORS 
} from '../contants/bannerContant';

export const addBannerReducer = (state = {banner:{}}, action) => {
    switch (action.type) {
        case ADD_BANNER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ADD_BANNER_SUCCESS:
            return {
                loading: false,
                banner: action.payload.banner,
                success: action.payload.success
            };
        case ADD_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_BANNER_RESET:
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

export const updateBannerReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_BANNER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_BANNER_RESET:
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

export const bannerReducer = (state={banner:{}}, action) => {
    switch (action.type) {
        case GET_BANNER_REQUEST:
            return {
                ...state,
                loading: true,
                banner: {}
            }
        case GET_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banner: action.payload
            }
        case GET_BANNER_FAIL:
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

export const bannersReducer = (state={banners:[]}, action) => {
    switch (action.type) {
        case ALL_BANNER_REQUEST:
            return {
                ...state,
                loading: true,
                banners: []
            }
        case ALL_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banners: action.payload
            }
        case ALL_BANNER_FAIL:
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

export const deleteBannerReducer = (state={}, action) => {
    switch (action.type) {
        case DELETE_BANNER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_BANNER_RESET:
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