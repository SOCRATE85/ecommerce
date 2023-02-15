import { 
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_FRONTEND_REQUEST,
    ALL_CATEGORY_FRONTEND_SUCCESS,
    ALL_CATEGORY_FRONTEND_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,
    CATEGORY_FILTER_REQUEST,
    CATEGORY_FILTER_SUCCESS,
    CATEGORY_FILTER_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_INADMIN_REQUEST,
    CATEGORY_DETAILS_INADMIN_SUCCESS,
    CATEGORY_DETAILS_INADMIN_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    LOAD_CATEGORY_FRONTEND_REQUEST,
    LOAD_CATEGORY_FRONTEND_SUCCESS,
    LOAD_CATEGORY_FRONTEND_FAIL,
    CLEAR_ERRORS
} from '../contants/categoryConstant';

export const categoryTreeReducer = (state = { categories: []}, action ) => {
    switch(action.type){
        case LOAD_CATEGORY_FRONTEND_REQUEST:
            return {
                ...state,
                loading: true,
                categories: []
            };
        case LOAD_CATEGORY_FRONTEND_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
        case LOAD_CATEGORY_FRONTEND_FAIL:
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

export const categoriesReducer = (state = { categories: []}, action ) => {
    switch(action.type){
        case ALL_CATEGORY_REQUEST:
        case ALL_CATEGORY_FRONTEND_REQUEST:
            return {
                ...state,
                loading: true,
                categories: []
            };
        case ALL_CATEGORY_SUCCESS:
        case ALL_CATEGORY_FRONTEND_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
        case ALL_CATEGORY_FAIL:
        case ALL_CATEGORY_FRONTEND_FAIL:
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

export const filterSortingReducer = (state = { filtersorting:[], settings: []}, action) => {
    switch (action.type) {
        case CATEGORY_FILTER_REQUEST:
            return {
                ...state,
                loading: true,
                filtersorting: [],
                settings: []
            };
        case CATEGORY_FILTER_SUCCESS:
            return {
                ...state,
                loading: false,
                filtersorting: action.payload.filtersorting,
                settings: action.payload.settings
            };
        case CATEGORY_FILTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const categoryDetailsReducer = (state = {category: {}, products: []}, action ) => {
    switch(action.type){
        case CATEGORY_DETAILS_REQUEST:
        case CATEGORY_DETAILS_INADMIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CATEGORY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload.category,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                from: action.payload.from,
                to: action.payload.to
            };
        case CATEGORY_DETAILS_INADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            };
        case CATEGORY_DETAILS_FAIL:
        case CATEGORY_DETAILS_INADMIN_FAIL:
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

export const createCategoryReducer = ( state = { category: {}}, action ) => {    
    switch(action.type){
        case NEW_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload.category,
                success: action.payload.success
            };
        case NEW_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_CATEGORY_RESET:
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

export const deleteCategoryReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_CATEGORY_RESET:
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

export const updateCategoryReducer = (state = {}, action ) => {
    switch(action.type){
        case UPDATE_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_CATEGORY_RESET:
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
