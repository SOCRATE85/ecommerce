import { createSlice } from '@reduxjs/toolkit';
import { getAddress, addNewAddress, updateAddress, deleteAddress, getAllAddress } from '../actions/addressAction';
import { clearErrors } from '../actions/clearformAction';

export const addAddressSlice = createSlice({
    name: "address",
    initialState: {address:{}},
    reducers: {
        addNewAddressReset: (state) => {
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNewAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.address;
            state.success = action.payload.success;
        });
        builder.addCase(addNewAddress.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateAddressSlice = createSlice({
    name: "address",
    initialState: {},
    reducers: {
        updateAddressReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateAddress.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const addressSlice = createSlice({
    name: "address",
    initialState: {address:{}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
        });
        builder.addCase(getAddress.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const addressesSlice = createSlice({
    name: "addresses",
    initialState: {addresses:[]},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
        });
        builder.addCase(getAllAddress.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteAddressSlice = createSlice({
    name: "address",
    initialState: {},
    reducers: {
        deleteAddressReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        });
        builder.addCase(deleteAddress.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
