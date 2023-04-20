import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import { validateAddress, addItemsToCart, removeItemFromcart, removeItemFromcartAfterOrderSuccess, saveShippingInfo } from '../actions/cartAction';

export const cartSlice = createSlice({
    name: "cart",
    initialState: {cartItems: [], shippingInfo: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(validateAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(validateAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        });
        builder.addCase(validateAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addItemsToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addItemsToCart.fulfilled, (state, action) => {
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
        });
        builder.addCase(addItemsToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(removeItemFromcart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeItemFromcart.fulfilled, (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product._id !== action.payload)
        });
        builder.addCase(removeItemFromcart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(removeItemFromcartAfterOrderSuccess.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeItemFromcartAfterOrderSuccess.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        });
        builder.addCase(removeItemFromcartAfterOrderSuccess.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(saveShippingInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveShippingInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.shippingInfo = action.payload;
        });
        builder.addCase(saveShippingInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
