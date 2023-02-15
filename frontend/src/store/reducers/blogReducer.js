import {
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    CREATE_BLOG_RESET,
    LIST_BLOG_REQUEST,
    LIST_BLOG_SUCCESS,
    LIST_BLOG_FAIL,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    DELETE_BLOG_RESET,
    CLEAR_ERRORS
 } from "../contants/blogContent";

export const newBlogeducer = (state = { blog: {}}, action ) => {
    switch(action.type){
        case CREATE_BLOG_REQUEST:
            return {
                loading: true,
                ...state
            };
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                success: action.payload.success
            };
        case CREATE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_BLOG_RESET:
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
 
export const listAllBlogReducer = (state={blogs:[]}, action) => {
    switch (action.type) {
        case LIST_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            }
        case LIST_BLOG_FAIL:
            return {
                ...state,
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

export const deleteBlogReducer = (state={}, action) => {
    switch (action.type) {
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_BLOG_SUCCESS: 
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_BLOG_RESET:
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
