import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    productDetails,
    createProduct
} from '../actions/productAction';
import {
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS 
} from '../contants/productConstant';

const productInitialState = {
    products: []
};

const productDetailsInitialState = {
    product: {}
};

const productSlice = createSlice({
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
                state.error = action.error.message;
        });
    }
});

export const productReducer = productSlice.reducer;

const adminProductSlice = createSlice({
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
                state.error = action.error.message;
        });
    }
});

export const adminProductReducer = adminProductSlice.reducer;

const deleteProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
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
                state.error = action.error.message;
        });
    }
});

export const deleteProductReducer = deleteProductSlice.reducer;

const updateProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
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
                state.error = action.error.message;
        });
    }
});

export const updateProductReducer = updateProductSlice.reducer;

const newProductSlice = createSlice({
    name: "product",
    initialState: { product:{} },
    reducers: {},
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
            state.error = action.error.message;
        });
    }
});

export const newProductReducer = newProductSlice.reducer;

const productDetailSlice = createSlice({
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
                state.error = action.error.message;
        });
    }
});

export const productDetailsReducer = productDetailSlice.reducer;

export const productReviewsReducer = (state = { reviews: []}, action ) => {
    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload
            };
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    } 
}

export const reviewReducer = (state = {}, action ) => {
    switch(action.type){
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_REVIEW_RESET: 
            return {
                ...state,
                isDeleted: false
            };
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    } 
}