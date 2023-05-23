import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import {
    validateAddress,
    loadCartItems,
    addItemsToCart,
    updateItemsInCart,
    removeItemFromcart,
    removeItemFromcartAfterOrderSuccess,
    saveShippingInfo,
    loadShippingAndBillingAddress
} from '../actions/cartAction';

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingInfo: {},
        billingInfo: {},
        shippingSameAsBilling: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateItemsInCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateItemsInCart.fulfilled, (state, action) => {
            state.loading = false;
            const id = action.payload.id;
            const quantity = action.payload.quantity;
            const cartItems = [...state.cartItems];
            let cartItem = [];
            for(let key in cartItems) {
                if(cartItems[key].product._id === id) {
                    cartItem.push({
                        product: cartItems[key].product,
                        quantity: quantity
                    })
                } else {
                    cartItem.push(cartItems[key]);
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItem));
            state.cartItems = cartItem;
        });
        builder.addCase(updateItemsInCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(loadCartItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
        });
        builder.addCase(loadCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(loadShippingAndBillingAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadShippingAndBillingAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.shippingInfo = action.payload.shippingAddress;
            state.billingInfo = action.payload.billingAddress;
            state.shippingSameAsBilling = action.payload.shippingSameAsBilling;
        });
        builder.addCase(loadShippingAndBillingAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });
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
                const _tempCartItems = state.cartItems.map((i) => i.product._id === isItemExist.product ? item : i );
                return {
                    ...state,
                    cartItems: _tempCartItems
                };
            }else{
                const _tempCartItems = [...state.cartItems, item];
                localStorage.setItem("cartItems", JSON.stringify(_tempCartItems));
                return {
                    ...state,
                    cartItems: _tempCartItems
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
            state.loading = false;
            const remaingItems = state.cartItems.filter((i) => i.product._id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(remaingItems));
            state.cartItems = remaingItems;
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
            state.shippingInfo = action.payload.shippingAddress;
            state.billingInfo = action.payload.billingAddress;
            state.shippingSameAsBilling = action.payload.shippingSameAsBilling;
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
