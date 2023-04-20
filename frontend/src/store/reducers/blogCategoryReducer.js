import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import { createBlogCategory, deleteBlogCategory, updateBlogCategory, getAllBlogCategories, getBlogCategoryDetail } from '../actions/blogCategoryAction';

export const createBlogCategorySlice = createSlice({
    name: "blogcategory",
    initialState: {},
    reducers: {
        createBlogCategoryReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBlogCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBlogCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.blogcategory = action.payload.blogcategory;
                state.success = action.payload.success;
        });
        builder.addCase(createBlogCategory.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateBlogCategorySlice = createSlice({
    name: "blogcategory",
    initialState: {},
    reducers: {
        updateBlogCategoryReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateBlogCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
        });
        builder.addCase(updateBlogCategory.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const blogCategoriesSlice = createSlice({
    name: "blogcategories",
    initialState: {blogcategories:[]},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBlogCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBlogCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.blogcategories = action.payload;
        });
        builder.addCase(getAllBlogCategories.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const blogCategorySlice = createSlice({
    name: "blogcategory",
    initialState: {blogcategory:{}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogCategoryDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBlogCategoryDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.blogcategory = action.payload;
        });
        builder.addCase(getBlogCategoryDetail.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteBlogCategorySlice = createSlice({
    name: "blogcategory",
    initialState: {},
    reducers: {
        deleteBlogCategoryReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBlogCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        });
        builder.addCase(deleteBlogCategory.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
