import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import { addNewSlider, updateSlider, deleteSlider, getAllSlider, getSlider } from '../actions/sliderAction';

export const addSliderSlice = createSlice({
    name: "slider",
    initialState: {slider: {}},
    reducers: {
        addNewSliderReset: (state) => {
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNewSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.slider = action.payload.slider;
            state.success = action.payload.success;
        });
        builder.addCase(addNewSlider.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateSliderSlice = createSlice({
    name: "slider",
    initialState: {},
    reducers: {
        updateSliderReset: (state) => {
            state.loading = false;
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateSlider.rejected, (state, action) => {
            state.loading = false;
            state.error  = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading  = false;
            state.error = null;
        });
    }
});

export const sliderSlice = createSlice({
    name: "slider",
    initialState: {slider: {}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.slider = action.payload;
        });
        builder.addCase(getSlider.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
            state.loading = false;
        });
    }
});

export const slidersSlice = createSlice({
    name: "sliders",
    initialState: {},
    reducers: {sliders:[]},
    extraReducers: (builder) => {
        builder.addCase(getAllSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.sliders = action.payload;
        });
        builder.addCase(getAllSlider.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
            state.loading = false;
        });
    }
});

export const deleteSliderSlice = createSlice({
    name: "slider",
    initialState: {},
    reducers: {
        deleteSliderReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteSlider.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
