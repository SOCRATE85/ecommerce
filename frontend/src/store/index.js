import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import {
  productSlice,
  adminProductSlice,
  productDetailSlice,
  newProductSlice,
  deleteProductSlice,
  updateProductSlice,
  deleteReviewSlice,
  newReviewSlice,
  productReviewSlice,
} from "./reducers/productReducer";
import {
  addUserSlice,
  allUsersSlice,
  userDetailsSlice,
  userSlice,
} from "./reducers/userReducer";
import { profileSlice } from "./reducers/profileReducer";
import { forgetPasswordSlice } from "./reducers/forgotPasswordReducer";
import { cartSlice } from "./reducers/cartReducer";
import {
  allOrdersSlice,
  createOrderSlice,
  updateOrderSlice,
  myOrdersSlice,
  orderDetailsSlice,
} from "./reducers/orderReducer";
import {
  createCategorySlice,
  categoriesSlice,
  deleteCategorySlice,
  categoryDetailsSlice,
  updateCategorySlice,
  filterSortingSlice,
  categoryTreeSlice,
} from "./reducers/categoryReducer";
import {
  addAddressSlice,
  updateAddressSlice,
  addressSlice,
  addressesSlice,
  deleteAddressSlice,
} from "./reducers/addressReducer";
import {
  createAttributeSlice,
  attributesSlice,
  deleteAttributeSlice,
  attributeDetailSlice,
  updateAttributeSlice,
} from "./reducers/attributeReducer";
import {
  attributeSetDetailsSlice,
  attributeSetsSlice,
  createAttributeSetSlice,
  deleteAttributeSetSlice,
  updateAttributeSetSlice,
} from "./reducers/attributesetsReducer";
import { getSettingsSlice, settingsSlice } from "./reducers/settingsReducer";
import {
  blogCategorySlice,
  blogCategoriesSlice,
  deleteBlogCategorySlice,
  createBlogCategorySlice,
  updateBlogCategorySlice,
} from "./reducers/blogCategoryReducer";
import {
  listAllBlogSlice,
  newBlogSlice,
  blogDetailSlice,
  updateBlogSlice,
  deleteBlogSlice,
} from "./reducers/blogReducer";
import { deleteFileSlice, uploadFileSlice } from "./reducers/uploadReducer";
import {
  addSliderSlice,
  updateSliderSlice,
  sliderSlice,
  slidersSlice,
  deleteSliderSlice,
} from "./reducers/sliderReducer";
import {
  addBannerSlice,
  updateBannerSlice,
  bannerSlice,
  bannersSlice,
  deleteBannerSlice,
} from "./reducers/bannerReducer";

const reducer = combineReducers({
  addUser: addUserSlice.reducer,
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  allUsers: allUsersSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  forgetpassword: forgetPasswordSlice.reducer,
  cart: cartSlice.reducer,
  newOrder: createOrderSlice.reducer,
  myOrders: myOrdersSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  allOrders: allOrdersSlice.reducer,
  updateOrder: updateOrderSlice.reducer,
  products: productSlice.reducer,
  adminProduct: adminProductSlice.reducer,
  productDetails: productDetailSlice.reducer,
  newReview: newReviewSlice.reducer,
  review: deleteReviewSlice.reducer,
  allReviews: productReviewSlice.reducer,
  newProduct: newProductSlice.reducer,
  deleteProduct: deleteProductSlice.reducer,
  updateProduct: updateProductSlice.reducer,
  createCategory: createCategorySlice.reducer,
  categories: categoriesSlice.reducer,
  categoryTree: categoryTreeSlice.reducer,
  deleteCategory: deleteCategorySlice.reducer,
  filterSorting: filterSortingSlice.reducer,
  categoryDetails: categoryDetailsSlice.reducer,
  updateCategory: updateCategorySlice.reducer,
  createAttribute: createAttributeSlice.reducer,
  attributes: attributesSlice.reducer,
  deleteAttribute: deleteAttributeSlice.reducer,
  attributeDetails: attributeDetailSlice.reducer,
  updateAttribute: updateAttributeSlice.reducer,
  createAttributeset: createAttributeSetSlice.reducer,
  updateAttributeset: updateAttributeSetSlice.reducer,
  deleteAttributeset: deleteAttributeSetSlice.reducer,
  attributesetDetails: attributeSetDetailsSlice.reducer,
  attributesets: attributeSetsSlice.reducer,
  settings: settingsSlice.reducer,
  getSettings: getSettingsSlice.reducer,
  addAddress: addAddressSlice.reducer,
  updateAddress: updateAddressSlice.reducer,
  address: addressSlice.reducer,
  addresses: addressesSlice.reducer,
  deleteAddress: deleteAddressSlice.reducer,
  createBlogCategory: createBlogCategorySlice.reducer,
  updateBlogCategory: updateBlogCategorySlice.reducer,
  blogCategories: blogCategoriesSlice.reducer,
  blogCategory: blogCategorySlice.reducer,
  deleteBlogCategory: deleteBlogCategorySlice.reducer,
  createBlog: newBlogSlice.reducer,
  updateBlog: updateBlogSlice.reducer,
  blogDetail: blogDetailSlice.reducer,
  blogs: listAllBlogSlice.reducer,
  deleteBlog: deleteBlogSlice.reducer,
  uploadImage: uploadFileSlice.reducer,
  deleteImage: deleteFileSlice.reducer,
  addBanner: addBannerSlice.reducer,
  updateBanner: updateBannerSlice.reducer,
  banner: bannerSlice.reducer,
  banners: bannersSlice.reducer,
  deleteBanner: deleteBannerSlice.reducer,
  addSlider: addSliderSlice.reducer,
  updateSlider: updateSliderSlice.reducer,
  slider: sliderSlice.reducer,
  sliders: slidersSlice.reducer,
  deleteSlider: deleteSliderSlice.reducer,
});

const initialStore = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo")).shippingAddress
      : {},
    billingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo")).billingAddress
      : {},
    shippingSameAsBilling: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo")).shippingSameAsBilling
      : {},
  },
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialStore,
});

setupListeners(store.dispatch);

export default store;
export * from "./actions/clearformAction";
export * from "./actions/productAction";
export const { updateProductReset } = updateProductSlice.actions;
export const { deleteProductReset } = deleteProductSlice.actions;
export const { reserAddNewProduct } = newProductSlice.actions;
export const { deleteReviewReset } = deleteReviewSlice.actions;
export const { newReviewReset } = newReviewSlice.actions;

export * from "./actions/categoryAction";
export const { newCategoryReset } = createCategorySlice.actions;
export const { deleteCategoryReset } = deleteCategorySlice.actions;
export const { updateCategoryReset } = updateCategorySlice.actions;

export * from "./actions/addressAction";
export const { updateAddressReset } = updateAddressSlice.actions;
export const { addNewAddressReset } = addAddressSlice.actions;
export const { deleteAddressReset } = deleteAddressSlice.actions;

export * from "./actions/attributeAction";
export const { newAttributeReset } = createAttributeSlice.actions;
export const { deleteAttributeReset } = deleteAttributeSlice.actions;
export const { updateAttributeReset } = updateAttributeSlice.actions;

export * from "./actions/attributesetAction";
export const { createAttributeSetReset } = createAttributeSetSlice.actions;
export const { updateAttributeSetReset } = updateAttributeSetSlice.actions;
export const { deleteAttributeSetReset } = deleteAttributeSetSlice.actions;

export * from "./actions/userAction";
export const {
  updatePasswordReset,
  updateProfileReset,
  updateUserReset,
  deleteUserReset,
} = profileSlice.actions;
export const { addUserReset } = addUserSlice.actions;

export * from "./actions/blogCategoryAction";
export const { createBlogCategoryReset } = createBlogCategorySlice.actions;
export const { updateBlogCategoryReset } = updateBlogCategorySlice.actions;
export const { deleteBlogCategoryReset } = deleteBlogCategorySlice.actions;

export * from "./actions/blogAction";
export const { createBlogReset } = newBlogSlice.actions;
export const { updateBlogReset } = updateBlogSlice.actions;
export const { deleteBlogReset } = deleteBlogSlice.actions;

export * from "./actions/uploadAction";
export const { deleteFilesReset } = deleteFileSlice.actions;

export * from "./actions/bannerAction";
export const { addBannerReset } = addBannerSlice.actions;
export const { updateBannerReset } = updateBannerSlice.actions;
export const { deleteBannerReset } = deleteBannerSlice.actions;

export * from "./actions/sliderAction";
export const { addNewSliderReset } = addSliderSlice.actions;
export const { updateSliderReset } = updateSliderSlice.actions;
export const { deleteSliderReset } = deleteSliderSlice.actions;

export * from "./actions/settingsAction";
export const { createSettingsReset } = settingsSlice.actions;

export * from "./actions/cartAction";
export * from "./actions/orderAction";
export const { updateOrderReset, deleteOrderReset } = updateOrderSlice.actions;
