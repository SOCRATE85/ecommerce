import { createSlice } from '@reduxjs/toolkit';
import { clearErrors } from '../actions/clearformAction';
import { 
    createCategory,
    updateCategory,
    getAllCategories,
    getAllCategoriesForFrontEnd,
    getCategoryForFrontEnd,
    deleteCategory,
    getFilterAndSorting,
    getCategoryDetails,
    getCategoryDetailsForFrontEnd,
    getCategoryFilterDetailsForFrontEnd
} from '../actions/categoryAction';

export const categoryTreeSlice = createSlice({
    name: "categories",
    initialState: {categories: []},
    extraReducers: (builder) => {
        builder.addCase(getCategoryForFrontEnd.pending, (state) => {
            state.loading = true;
            state.categories = [];
        });
        builder.addCase(getCategoryForFrontEnd.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        });
        builder.addCase(getCategoryForFrontEnd.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {categories: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true;
            state.categories = [];
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        });
        builder.addCase(getAllCategories.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllCategoriesForFrontEnd.pending, (state) => {
            state.loading = true;
            state.categories = [];
        });
        builder.addCase(getAllCategoriesForFrontEnd.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        });
        builder.addCase(getAllCategoriesForFrontEnd.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const filterSortingSlice = createSlice({
    name: "categories",
    initialState: {filtersorting:[], settings: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFilterAndSorting.pending, (state) => {
            state.loading = true;
            state.filtersorting = [];
            state.settings = [];
        });
        builder.addCase(getFilterAndSorting.fulfilled, (state, action) => {
            state.loading = false;
            state.filtersorting = action.payload.filtersorting;
            state.settings = action.payload.settings;
        });
        builder.addCase(getFilterAndSorting.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const categoryDetailsSlice = createSlice({
    name: "category",
    initialState: {category: {}, products: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategoryDetailsForFrontEnd.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryDetailsForFrontEnd.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.from = action.payload.from;
            state.to = action.payload.to;
        });
        builder.addCase(getCategoryDetailsForFrontEnd.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getCategoryFilterDetailsForFrontEnd.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryFilterDetailsForFrontEnd.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.from = action.payload.from;
            state.to = action.payload.to;
        });
        builder.addCase(getCategoryFilterDetailsForFrontEnd.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getCategoryDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
        });
        builder.addCase(getCategoryDetails.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const createCategorySlice = createSlice({
    name: 'category',
    initialState: {category: {}},
    reducers: {
        newCategoryReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
            state.success = action.payload.success;
        });
        builder.addCase(createCategory.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteCategorySlice = createSlice({
    name: "category",
    initialState: {},
    reducers: {
        deleteCategoryReset: (state) =>{
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteCategory.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateCategorySlice = createSlice({
    name: "category",
    initialState: {},
    reducers: {
        updateCategoryReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateCategory.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
