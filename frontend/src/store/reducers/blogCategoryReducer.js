import {
    CREATE_BLOG_CATEGORY_REQUEST,
    CREATE_BLOG_CATEGORY_SUCCESS,
    CREATE_BLOG_CATEGORY_FAIL,
    CREATE_BLOG_CATEGORY_RESET,
    UPDATE_BLOG_CATEGORY_REQUEST,
    UPDATE_BLOG_CATEGORY_SUCCESS,
    UPDATE_BLOG_CATEGORY_FAIL,
    UPDATE_BLOG_CATEGORY_RESET,
    DETAIL_BLOG_CATEGORY_REQUEST,
    DETAIL_BLOG_CATEGORY_SUCCESS,
    DETAIL_BLOG_CATEGORY_FAIL,
    ALL_BLOG_CATEGORY_REQUEST,
    ALL_BLOG_CATEGORY_SUCCESS,
    ALL_BLOG_CATEGORY_FAIL,
    DELETE_BLOG_CATEGORY_REQUEST,
    DELETE_BLOG_CATEGORY_SUCCESS,
    DELETE_BLOG_CATEGORY_FAIL,
    DELETE_BLOG_CATEGORY_RESET,
    CLEAR_ERRORS
} from '../contants/blogCategoryContent';

export const createBlogCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BLOG_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_BLOG_CATEGORY_SUCCESS:
            return {
                ...state,
                blogcategory: action.payload.blogcategory,
                success: action.payload.success
            }
        case CREATE_BLOG_CATEGORY_FAIL:
            return {
                ...state,
                loading: false
            }
        case CREATE_BLOG_CATEGORY_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const updateBlogCategoryReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_BLOG_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_BLOG_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_BLOG_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_BLOG_CATEGORY_RESET:
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

export const blogCategoriesReducer = (state = { blogcategories:[] }, action) => {
    switch (action.type) {
        case ALL_BLOG_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ALL_BLOG_CATEGORY_SUCCESS: 
            return {
                ...state,
                loading: false,
                blogcategories: action.payload
            }
        case ALL_BLOG_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
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

export const blogCategoryReducer = (state={ blogcategory:{} }, action) => {
    switch (action.type) {
        case DETAIL_BLOG_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DETAIL_BLOG_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                blogcategory: action.payload
            }
        case DETAIL_BLOG_CATEGORY_FAIL:
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

export const deleteBlogCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BLOG_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_BLOG_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_BLOG_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_BLOG_CATEGORY_RESET:
            return {
                ...state,
                isDeleted: false
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