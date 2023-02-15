import { 
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL, 
    CLEAR_ERRORS 
} from '../contants/productConstant';

export const newReviewReducer = (state = {}, action ) => {
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_REVIEW_RESET:
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
