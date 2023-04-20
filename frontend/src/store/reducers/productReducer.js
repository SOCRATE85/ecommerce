import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    productDetails,
    createProduct,
    newReview,
    getAllReviews,
    deleteReview
} from '../actions/productAction';
import { clearErrors } from '../actions/clearformAction';

const productInitialState = {
    products: []
};

const productDetailsInitialState = {
    product: {}
};

export const productSlice = createSlice({
    name: "products",
    initialState: productInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.products = [];
            state.loading = true;
        });
        builder.addCase(
            fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
        });
        builder.addCase(fetchProducts.rejected,(state, action) => {
                state.loading = false;
                state.error = action.error.message;
        });
        builder.addCase(getAdminProducts.pending, (state) => {
            state.products = [];
            state.loading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
        });
        builder.addCase(getAdminProducts.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const adminProductSlice = createSlice({
    name: "products",
    initialState: productInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAdminProducts.pending, (state) => {
            state.products = [];
            state.loading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
        });
        builder.addCase(getAdminProducts.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        deleteProductReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        });
        builder.addCase(
            deleteProduct.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const updateProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        updateProductReset: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
        });
        builder.addCase(updateProduct.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const newProductSlice = createSlice({
    name: "product",
    initialState: { product:{} },
    reducers: {
        reserAddNewProduct: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            state.success = action.payload.success;
        });
        builder.addCase(createProduct.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const productDetailSlice = createSlice({
    name: "product",
    initialState: productDetailsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(productDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
        });
        builder.addCase(productDetails.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const productReviewSlice = createSlice({
    name: "product",
    initialState: { reviews: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
        });
        builder.addCase(getAllReviews.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const reviewSlice = createSlice({
    name: "product",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
        });
        builder.addCase(getAllReviews.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const newReviewSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        newReviewReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newReview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(newReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
        });
        builder.addCase(newReview.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});

export const deleteReviewSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        deleteReviewReset: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
         builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        });
        builder.addCase(deleteReview.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.error = null;
        });
    }
});
