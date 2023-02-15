import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, newProductReducer, deleteProductReducer, updateProductReducer, reviewReducer, productReviewsReducer } from './reducers/productReducer';
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
import { listAllBlogReducer, newBlogeducer } from './reducers/blogReducer';

const reducer = combineReducers({
    products: productReducer,
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
    blogs: listAllBlogReducer
});

const initialStore = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
};
const middleware = [thunk];

const store = createStore(reducer, initialStore, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
