import { 
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    REMOVE_CART_ITEM_AFTER_ORDER_PLACE,
    VALIDATE_ADDRESS_REQUEST,
    VALIDATE_ADDRESS_SUCCESS,
    VALIDATE_ADDRESS_FAIL
} from "../contants/cartConstant";

export const cartReducer = (state = { cartItems: [], shippingInfo: {}}, action) => {
    switch (action.type) {
        case VALIDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case VALIDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case VALIDATE_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i=> i.product._id === item.product._id);
            
            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product._id === isItemExist.product ? item : i )
                };
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                };
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product._id !== action.payload)
            };
        case REMOVE_CART_ITEM_AFTER_ORDER_PLACE:
            return {
                ...state,
                cartItems: []
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state
    }
}