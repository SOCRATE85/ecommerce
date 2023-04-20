import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import { addNewBanner, updateBanner, deleteBanner, getAllBanner, getBanner } from '../actions/bannerAction';

export const addBannerSlice = createSlice({
    name: "banner",
    initialState: {},
    reducers: {
        addBannerReset: (state) => {
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewBanner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNewBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banner = action.payload.banner;
            state.success = action.payload.success;
        });
        builder.addCase(addNewBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateBannerSlice = createSlice({
    name: "banner",
    initialState: {},
    reducers: {
        updateBannerReset: (state) => {
            state.loading = false;
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateBanner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const bannerSlice = createSlice({
    name: "banner",
    initialState: {banner:{}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBanner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banner = action.payload;
        });
        builder.addCase(getBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const bannersSlice = createSlice({
    name: "banners",
    initialState: {banners:[]},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBanner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload;
        });
        builder.addCase(getAllBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const deleteBannerSlice = createSlice({
    name: "banner",
    initialState: {},
    reducers: {
        deleteBannerReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBanner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
