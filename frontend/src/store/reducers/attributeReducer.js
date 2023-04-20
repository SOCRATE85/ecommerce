import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import {
    createAttribute,
    getAllAttributes,
    getAttribute,
    updateAttribute,
    deleteAttribute
} from '../actions/attributeAction';

export const createAttributeSlice = createSlice({
    name: "attribute",
    initialState: {attribute:{}},
    reducers: {
        newAttributeReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAttribute.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAttribute.fulfilled, (state, action) => {
            state.loading = false;
            state.attribute = action.payload.attribute;
            state.success = action.payload.success;
        });
        builder.addCase(createAttribute.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const attributesSlice = createSlice({
    name: "attributes",
    initialState: {attributes: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAttributes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAttributes.fulfilled, (state, action) => {
            state.loading = false;
            state.attributes = action.payload.attributes;
        });
        builder.addCase(getAllAttributes.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteAttributeSlice = createSlice({
    name: "attribute",
    initialState: {},
    reducers: {
        deleteAttributeReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteAttribute.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAttribute.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteAttribute.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const attributeDetailSlice = createSlice({
    name: "attribute",
    initialState: {attribute: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAttribute.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAttribute.fulfilled, (state, action) => {
            state.loading = false;
            state.attribute = action.payload;
        });
        builder.addCase(getAttribute.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateAttributeSlice = createSlice({
    name: "attribute",
    initialState: {},
    reducers: {
        updateAttributeReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateAttribute.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAttribute.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateAttribute.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
