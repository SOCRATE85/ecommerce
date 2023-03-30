import { 
    ADD_SLIDER_REQUEST,
    ADD_SLIDER_SUCCESS,
    ADD_SLIDER_FAIL,
    ADD_SLIDER_RESET,
    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_FAIL,
    UPDATE_SLIDER_RESET,
    DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_FAIL,
    DELETE_SLIDER_RESET,
    ALL_SLIDER_REQUEST,
    ALL_SLIDER_SUCCESS,
    ALL_SLIDER_FAIL,
    GET_SLIDER_REQUEST,
    GET_SLIDER_SUCCESS,
    GET_SLIDER_FAIL,
    CLEAR_ERRORS 
} from '../contants/sliderContant';

export const addSliderReducer = (state = {slider:{}}, action) => {
    switch (action.type) {
        case ADD_SLIDER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ADD_SLIDER_SUCCESS:
            return {
                loading: false,
                slider: action.payload.slider,
                success: action.payload.success
            };
        case ADD_SLIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_SLIDER_RESET:
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

export const updateSliderReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_SLIDER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case UPDATE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_SLIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_SLIDER_RESET:
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

export const sliderReducer = (state={slider:{}}, action) => {
    switch (action.type) {
        case GET_SLIDER_REQUEST:
            return {
                ...state,
                loading: true,
                slider: {}
            }
        case GET_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                slider: action.payload
            }
        case GET_SLIDER_FAIL:
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

export const slidersReducer = (state={sliders:[]}, action) => {
    switch (action.type) {
        case ALL_SLIDER_REQUEST:
            return {
                ...state,
                loading: true,
                sliders: []
            }
        case ALL_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                sliders: action.payload
            }
        case ALL_SLIDER_FAIL:
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

export const deleteSliderReducer = (state={}, action) => {
    switch (action.type) {
        case DELETE_SLIDER_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_SLIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_SLIDER_RESET:
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