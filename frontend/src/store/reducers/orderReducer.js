import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/clearformAction";
import { createOrder, myOrders, getOrderDetails, getAllOrders, updateOrder, deleteOrder } from '../actions/orderAction';

export const createOrderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const myOrdersSlice = createSlice({
    name: "orders",
    initialState: {orders: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(myOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(myOrders.fulfilled, (state, action) => {
            state.loading  = false;
            state.orders = action.payload;
        });
        builder.addCase(myOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const orderDetailsSlice = createSlice({
    name: "order",
    initialState: {order: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        });
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const allOrdersSlice = createSlice({
    name: "orders",
    initialState: {orders: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateOrderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        updateOrderReset: (state) => {
            state.loading = false;
            state.isUpdated = false;
        },
        deleteOrderReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        })
        builder.addCase(updateOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        })
    }
});
