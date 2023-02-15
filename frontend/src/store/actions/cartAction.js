import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    REMOVE_CART_ITEM_AFTER_ORDER_PLACE,
    VALIDATE_ADDRESS_REQUEST,
    VALIDATE_ADDRESS_SUCCESS,
    VALIDATE_ADDRESS_FAIL,
    CLEAR_ERRORS
} from "../contants/cartConstant";
import axios from "axios";

export const validateAddress = (addresses) => async dispatch => {
    try {
         dispatch({ type: VALIDATE_ADDRESS_REQUEST });
         const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post("/api/v1/address/validate", addresses, config);
        dispatch({ type: VALIDATE_ADDRESS_SUCCESS, payload: data.success });
    } catch (error) {
         dispatch({ 
            type: VALIDATE_ADDRESS_FAIL, 
            payload: error.response.data.message 
        });
    }
}

//Add to cart action
export const addItemsToCart = (id, quantity) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product,
            quantity
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//remove item from cart
export const removeItemFromcart = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id});
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//remove item from cart
export const removeItemFromcartAfterOrderSuccess = () => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_AFTER_ORDER_PLACE});
    localStorage.setItem("cartItems", "");
}

//save shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

//Error message
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};