import { createSlice } from '@reduxjs/toolkit';
import { createUpdateSettings, getAllSettings } from '../actions/settingsAction';
import { clearErrors } from '../actions/clearformAction';

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {},
    reducers: {
        createSettingsReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUpdateSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createUpdateSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        });
        builder.addCase(createUpdateSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
            state.loading = false;
        });
    }
});

export const getSettingsSlice = createSlice({
    name: "settings",
    initialState: {settings: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSettings.pending, () => {

        });
        builder.addCase(getAllSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.settings = action.payload;
        });
        builder.addCase(getAllSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

