import { 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS 
} from '../contants/productConstant';

const productInitialState = {
    products: []
};

const productDetailsInitialState = {
    product: {}
};

export const productReducer = (state = productInitialState, action ) => {
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
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

export const deleteProductReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_PRODUCT_RESET:
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

export const updateProductReducer = (state = {}, action ) => {
    switch(action.type){
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_PRODUCT_RESET:
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

export const newProductReducer = (state = { product: {}}, action ) => {
    switch(action.type){
        case NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                success: action.payload.success
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_PRODUCT_RESET:
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

export const productDetailsReducer = (state = productDetailsInitialState, action ) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
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

export const productReviewsReducer = (state = { reviews: []}, action ) => {
    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload
            };
        case ALL_REVIEW_FAIL:
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

export const reviewReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_REVIEW_RESET: 
            return {
                ...state,
                isDeleted: false
            };
        case DELETE_REVIEW_FAIL:
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