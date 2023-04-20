import { createSlice } from "@reduxjs/toolkit";
import { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog } from "../actions/blogAction";
import { clearErrors } from "../actions/clearformAction";

export const newBlogSlice = createSlice({
    name: "blog",
    initialState: {blog:{}},
    reducers: {
        createBlogReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
            state.success = action.payload.success;
        });
        builder.addCase(createBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateBlogSlice = createSlice({
    name: "blog",
    initialState: {},
    reducers: {
        updateBlogReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const blogDetailSlice = createSlice({
    name: "blog",
    initialState: {blog:{}},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.blog = action.payload;
        });
        builder.addCase(getBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const listAllBlogSlice = createSlice({
    name: "blogs",
    initialState: {blogs:[]},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload;
        });
        builder.addCase(getAllBlog.rejected, (state, action) => {
            state.error = action.payload
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteBlogSlice = createSlice({
    name: "blog",
    initialState: {},
    reducers: {
        deleteBlogReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        });
        builder.addCase(deleteBlog.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
