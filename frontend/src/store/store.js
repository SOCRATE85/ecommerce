import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { 
    productReducer,
    adminProductReducer,
    productDetailsReducer,
    newProductReducer,
    deleteProductReducer,
    updateProductReducer,
    reviewReducer,
    productReviewsReducer
} from './reducers/productReducer';
import { allUsersReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { profileReducer } from './reducers/profileReducer';
import { forgotPasswordReducer } from './reducers/forgotPasswordReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, orderReducer, updateOrderReducer } from './reducers/orderReducer';
import { myordersReducer } from './reducers/myordersReducer';
import { orderdetailsReducer } from './reducers/orderdetailsReducer';
import { newReviewReducer } from './reducers/newReviewReducer';
import { 
    createCategoryReducer, 
    categoriesReducer, 
    deleteCategoryReducer, 
    categoryDetailsReducer,
    updateCategoryReducer,
    filterSortingReducer,
    categoryTreeReducer
} from './reducers/categoryReducer';
import {
    addAddressReducer,
    updateAddressReducer,
    addressReducer,
    addressesReducer,
    deleteAddressReducer
} from './reducers/addressReducer';
import { createAttributeReducer, attributesReducer, deleteAttributeReducer, attributeDetailsReducer, updateAttributeReducer } from './reducers/attributeReducer';
import { attributesetDetailsReducer, attributesetReducer, createAttributesetReducer, deleteAttributesetReducer, updateAttributesetReducer } from "./reducers/attributesetsReducer";
import { getSettingsReducer, settingsReducer } from './reducers/settingsReducer';
import {
    blogCategoryReducer,
    blogCategoriesReducer,
    deleteBlogCategoryReducer,
    createBlogCategoryReducer,
    updateBlogCategoryReducer
} from './reducers/blogCategoryReducer';
import { listAllBlogReducer, newBlogeducer, blogDetailReducer, updateBlogReducer } from './reducers/blogReducer';
import { deleteReducer, uploadReducer } from './reducers/uploadReducer';
import {
    addSliderReducer,
    updateSliderReducer,
    sliderReducer,
    slidersReducer,
    deleteSliderReducer
} from './reducers/sliderReducer';
import {
    addBannerReducer,
    updateBannerReducer,
    bannerReducer,
    bannersReducer,
    deleteBannerReducer
} from './reducers/bannerReducer';

const reducer = combineReducers({
    products: productReducer,
    adminProduct: adminProductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgetpassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myordersReducer,
    orderDetails: orderdetailsReducer,
    allOrders: allOrdersReducer,
    updateOrder: updateOrderReducer,
    newReview: newReviewReducer,
    review: reviewReducer,
    allReviews: productReviewsReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    createCategory: createCategoryReducer,
    categories: categoriesReducer,
    categoryTree: categoryTreeReducer,
    deleteCategory: deleteCategoryReducer,
    filterSorting: filterSortingReducer,
    categoryDetails: categoryDetailsReducer,
    updateCategory: updateCategoryReducer,
    createAttribute: createAttributeReducer,
    attributes: attributesReducer,
    deleteAttribute: deleteAttributeReducer,
    attributeDetails: attributeDetailsReducer,
    updateAttribute: updateAttributeReducer,
    createAttributeset: createAttributesetReducer,
    updateAttributeset: updateAttributesetReducer,
    deleteAttributeset: deleteAttributesetReducer,
    attributesetDetails: attributesetDetailsReducer,
    attributesets: attributesetReducer,
    settings: settingsReducer,
    getSettings: getSettingsReducer,
    addAddress: addAddressReducer,
    updateAddress: updateAddressReducer,
    address: addressReducer,
    addresses: addressesReducer,
    deleteAddress: deleteAddressReducer,
    createBlogCategory: createBlogCategoryReducer,
    updateBlogCategory: updateBlogCategoryReducer,
    blogCategories: blogCategoriesReducer,
    blogCategory: blogCategoryReducer,
    deleteBlogCategory: deleteBlogCategoryReducer,
    createBlog: newBlogeducer,
    updateBlog: updateBlogReducer,
    blogDetail: blogDetailReducer,
    blogs: listAllBlogReducer,
    uploadImage: uploadReducer,
    deleteImage: deleteReducer,
    addBanner: addBannerReducer,
    updateBanner: updateBannerReducer,
    banner: bannerReducer,
    banners: bannersReducer,
    deleteBanner: deleteBannerReducer,
    addSlider: addSliderReducer,
    updateSlider: updateSliderReducer,
    slider: sliderReducer,
    sliders: slidersReducer,
    deleteSlider: deleteSliderReducer
});

const initialStore = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialStore
})

export default store;
