import { useEffect, useState } from 'react';
import webFont from 'webfontloader';
import { useLocation, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import Search from './component/Product/Search';
import ProductDetails from './component/Product/ProductDetails';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import EditProfile from './component/User/EditProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import Orders from './component/Order/Orders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import CategoryList from './component/Admin/CategoryList';
import NewCategory from './component/Admin/NewCategory';
import UpdateCategory from './component/Admin/UpdateCategory';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import Attributes from './component/Admin/Attributes';
import EditAttribute from './component/Admin/EditAttribute';
import AddAttribute from './component/Admin/AddAttribute';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UpdateUser from './component/Admin/UpdateUser';
import Users from './component/Admin/Users';
import Reviews from './component/Admin/Reviews';
import Settings from './component/Admin/Settings';
import About from './component/layout/About/About';
import NotFound from './component/layout/NotFound/NotFound';
import store from './store/store';
import { loadUser } from './store/actions/userAction';
import { getCategoryForFrontEnd, getAllCategoriesForFrontEnd } from './store/actions/categoryAction';
import { getProducts } from './store/actions/productAction';
import ProtectedRoute from './component/Route/ProtectedRoute';
import './App.css';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Contact from './component/layout/Contact/Contact';
import Category from './component/Category/Category';
import Loader from './component/layout/Loader/Loader';
import AttributeSet from './component/Admin/AttributeSet';
import AddAttributeSet from "./component/Admin/AddAttributeSet";
import EditAttributeSet from "./component/Admin/EditAttributeSet";
import ManageBlogCategory from './component/Admin/ManageBlogCategory';
import NewBlogCategory from './component/Admin/NewBlogCategory';
import UpdateBlogCategory from './component/Admin/UpdateBlogCategory';
import Blogs from "./component/Admin/Blogs";
import NewBlog from './component/Admin/NewBlog';
import UpdateBlog from './component/Admin/UpdateBlog';

import { FrontLayout } from './component/layout/FrontLayout';
import { AdminLayout } from './component/layout/AdminLayout';

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
          await store.dispatch(getProducts());
          setCategory(await store.getState().categories.categories);
          setProducts(await store.getState().products.products);
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
        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><Users /></ProtectedRoute>} />
        <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
        <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><Reviews /></ProtectedRoute>} />
        <Route path='/admin/blogs' element={<ProtectedRoute isAdmin={true}><Blogs /></ProtectedRoute>} />
        <Route path='/admin/blog/new' element={<ProtectedRoute isAdmin={true}><NewBlog /></ProtectedRoute>} />
        <Route path='/admin/blog/:id' element={<ProtectedRoute isAdmin={true}><UpdateBlog /></ProtectedRoute>} />
        <Route path='/admin/blog/categories' element={<ProtectedRoute isAdmin={true}><ManageBlogCategory /></ProtectedRoute>} />
        <Route path='/admin/blog/category/new' element={<ProtectedRoute isAdmin={true}><NewBlogCategory /></ProtectedRoute>} />
        <Route path='/admin/blog/category/:id' element={<ProtectedRoute isAdmin={true}><UpdateBlogCategory /></ProtectedRoute>} />
        <Route path='/admin/settings' element={<ProtectedRoute isAdmin={true}><Settings /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </AdminLayout>}
    </>
  );
}

export default App;
