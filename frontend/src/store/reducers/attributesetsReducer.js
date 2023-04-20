import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import {
    getAttributeSets,
    getAttributeSetDetails,
    createAttributeSet,
    updateAttributeSet,
    deleteAttributeSet
} from '../actions/attributesetAction';

export const createAttributeSetSlice = createSlice({
    name: "attributeset",
    initialState: {attributeset:{}},
    reducers: {
        createAttributeSetReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAttributeSet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAttributeSet.fulfilled, (state, action) => {
            state.loading = false;
            state.attributeset = action.payload.attributeset;
            state.success = action.payload.success;
        });
        builder.addCase(createAttributeSet.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const attributeSetsSlice = createSlice({
    name: "attributesets",
    initialState: {attributesets: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAttributeSets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAttributeSets.fulfilled, (state, action) => {
            state.loading = false;
            state.attributesets = action.payload.attributesets;
        });
        builder.addCase(getAttributeSets.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const attributeSetDetailsSlice = createSlice({
    name: "attributeset",
    initialState: {attributeset: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAttributeSetDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAttributeSetDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.attributeset = action.payload;
        });
        builder.addCase(getAttributeSetDetails.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteAttributeSetSlice = createSlice({
    name: "attributeset",
    initialState: {},
    reducers: {
        deleteAttributeSetReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteAttributeSet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAttributeSet.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteAttributeSet.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateAttributeSetSlice = createSlice({
    name: "attributeset",
    initialState: {},
    reducers: {
        updateAttributeSetReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateAttributeSet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAttributeSet.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateAttributeSet.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
