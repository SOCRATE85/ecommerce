import React, { useEffect, useState } from 'react';
import webFont from 'webfontloader';
import { useLocation, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Product/Search';
import ProductDetails from './components/Product/ProductDetails';
import LoginSignUp from './components/User/LoginSignUp';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import Orders from './components/Order/Orders';
import OrderDetails from './components/Order/OrderDetails';

import Dashboard from './components/Admin/Dashboard';
import {AddAttribute, Attributes, EditAttribute} from './components/Admin/Attributes';
import {AddAttributeSet, AttributeSet, EditAttributeSet} from './components/Admin/AttributeSet';
import {AddBlogCategory, ListBlogCategory, UpdateBlogCategory } from './components/Admin/Blogcategory'
 import {ListBlogs, AddNewBlog, UpdateBlog} from './components/Admin/Blogs';
import {NewCategory, CategoryList, UpdateCategory} from './components/Admin/Category';
import {NewProduct, ProductList, UpdateProduct} from './components/Admin/Product';
import {OrderList, ProcessOrder} from './components/Admin/Order';
import {Users, UpdateUser, AddUserInAdmin} from './components/Admin/User';

import Reviews from './components/Admin/Reviews';
import Settings from './components/Admin/Settings';

import {AddSlider, ListSliders, UpdateSlider} from './components/Admin/Sliders';
import {ListBanners, AddBanner, UpdateBanner} from './components/Admin/Banners';

import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';
import store, { loadUser, getCategoryForFrontEnd, getAllCategoriesForFrontEnd, fetchProducts } from './store';
import ProtectedRoute from './components/Route/ProtectedRoute';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Contact from './components/Contact/Contact';
import Category from './components/Category/Category';
import './App.css';

import { FrontLayout, AdminLayout, Loader } from './components/layout';

function App() {
  const [stripeApikey, setStripeApikey] = useState("");
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApikey(data.stripeApiKey);
    } catch (error) {}      
  }
 
  useEffect(() => {
    const onLoad = async () => {
      try {
          webFont.load({
            families: ["Roboto", "Drold Sans", "Chilanka"]
          });

          await store.dispatch(loadUser());
          await store.dispatch(getCategoryForFrontEnd());
          await store.dispatch(getAllCategoriesForFrontEnd());
          await store.dispatch(fetchProducts());
          setCategory(store.getState().categories.categories);
          setProducts(store.getState().products.products);
          getStripeApiKey();
      } catch (error) {}          
    }
    window.addEventListener("load",onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
    }
  }, []);
  
  //To disable th write click on page
  //window.addEventListener("contextmenu", (e) => e.preventDefault());

  if(category.length === 0 || !products) {
    return <Loader />
  }

  return (
    <>
      {location.pathname.indexOf("admin") === -1 ? <FrontLayout>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contacts" element={<Contact />} />
        {
          products.length > 0 && products.map((product) => {
                  return <Route 
                      key={product._id}
                      path={`/${product.url_key}`}
                      element={<ProductDetails productId={product._id} />} 
                    />
              })
        }
        <Route path="/search" element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/password/forget' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/me/update' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />      
        { stripeApikey && <Route path='/process/payment' element={
                  <Elements stripe={loadStripe(stripeApikey)}>
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  </Elements> 
                } 
            />
        }
        <Route path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} /> 
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        {
          category.length > 0 && category.map((_category) => {
            return <Route 
                      key={_category._id}
                      path={`/${_category.slug}`} 
                      element={<Category categoryId={_category._id} />} 
                    />
          })
        }
      </FrontLayout>
      :<AdminLayout>
        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path='/admin/categories' element={<ProtectedRoute isAdmin={true}><CategoryList /></ProtectedRoute>} />
        <Route path='/admin/category/new' element={<ProtectedRoute isAdmin={true}><NewCategory /></ProtectedRoute>} />
        <Route path='/admin/category/:id' element={<ProtectedRoute isAdmin={true}><UpdateCategory /></ProtectedRoute>} />
        <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
        <Route path='/admin/product/new' element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
        <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
        <Route path='/admin/attributes' element={<ProtectedRoute isAdmin={true}><Attributes /></ProtectedRoute>} />
        <Route path='/admin/attribute/new' element={<ProtectedRoute isAdmin={true}><AddAttribute /></ProtectedRoute>} />
        <Route path='/admin/attribute/:id' element={<ProtectedRoute isAdmin={true}><EditAttribute /></ProtectedRoute>} />
        <Route path='/admin/attributeset/new' element={<ProtectedRoute isAdmin={true}><AddAttributeSet /></ProtectedRoute>} />
        <Route path='/admin/attributeset/:id' element={<ProtectedRoute isAdmin={true}><EditAttributeSet /></ProtectedRoute>} />
        <Route path='/admin/attributesets' element={<ProtectedRoute isAdmin={true}><AttributeSet /></ProtectedRoute>} />
        <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
        <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
        <Route path='/admin/user/new' element={<ProtectedRoute isAdmin={true}><AddUserInAdmin /></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><Users /></ProtectedRoute>} />
        <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
        <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><Reviews /></ProtectedRoute>} />
        
        <Route path='/admin/blogs' element={<ProtectedRoute isAdmin={true}><ListBlogs /></ProtectedRoute>} />
        <Route path='/admin/blog/new' element={<ProtectedRoute isAdmin={true}><AddNewBlog /></ProtectedRoute>} />
        <Route path='/admin/blog/:id' element={<ProtectedRoute isAdmin={true}><UpdateBlog /></ProtectedRoute>} />
        <Route path='/admin/blog/categories' element={<ProtectedRoute isAdmin={true}><ListBlogCategory /></ProtectedRoute>} />
        <Route path='/admin/blog/category/new' element={<ProtectedRoute isAdmin={true}><AddBlogCategory /></ProtectedRoute>} />
        <Route path='/admin/blog/category/:id' element={<ProtectedRoute isAdmin={true}><UpdateBlogCategory /></ProtectedRoute>} />
        
        <Route path='/admin/slider/new' element={<ProtectedRoute isAdmin={true}><AddSlider /></ProtectedRoute>} />
        <Route path='/admin/slider/:id' element={<ProtectedRoute isAdmin={true}><UpdateSlider /></ProtectedRoute>} />
        <Route path='/admin/sliders' element={<ProtectedRoute isAdmin={true}><ListSliders /></ProtectedRoute>} />
        <Route path='/admin/banner/new' element={<ProtectedRoute isAdmin={true}><AddBanner /></ProtectedRoute>} />
        <Route path='/admin/banners' element={<ProtectedRoute isAdmin={true}><ListBanners /></ProtectedRoute>} />
        <Route path='/admin/banner/:id' element={<ProtectedRoute isAdmin={true}><UpdateBanner /></ProtectedRoute>} />
        
        <Route path='/admin/settings' element={<ProtectedRoute isAdmin={true}><Settings /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </AdminLayout>}
    </>
  );
}

export default App;
