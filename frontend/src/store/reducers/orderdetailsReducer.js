import { 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    CLEAR_ERRORS 
} from "../contants/orderConstant";

export const orderdetailsReducer = (state = {order:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_DETAILS_FAIL: 
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
