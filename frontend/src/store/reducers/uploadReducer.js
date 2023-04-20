import { createSlice } from "@reduxjs/toolkit";
import { uploadFiles, deleteFiles } from '../actions/uploadAction';
import { clearErrors } from "../actions/clearformAction";

export const uploadFileSlice = createSlice({
    name: "upload",
    initialState: {},
    reducers: {images: []},
    extraReducers: (builder) => {
        builder.addCase(uploadFiles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadFiles.fulfilled, (state, action) => {
            state.loading = false;
            state.images = action.payload;
        });
        builder.addCase(uploadFiles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const deleteFileSlice = createSlice({
    name: "upload",
    initialState: {},
    reducers: {
        deleteFilesReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteFiles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteFiles.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteFiles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
