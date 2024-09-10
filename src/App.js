import React, { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useSelector, useDispatch} from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchProductByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/Ordersuccess';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHome from './pages/AdminHome';
import ProtectedAdmin from './features/auth/components/Protectedadmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';
import StripeCheckout from './pages/StripeCheckout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
              <Home></Home>
             </Protected>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path:"/signup",
    element:<SignUpPage></SignUpPage>
  },
  {
    path:"/cart",
    element:<Protected><CartPage></CartPage></Protected>
  },
  {path:"/checkout",
   element:<Protected><Checkout></Checkout></Protected>
  },
  {
    path: "/stripeCheckout",
    element: <StripeCheckout></StripeCheckout>,
  },
  {
    path:"/product-detail/:id",
    element:<Protected><ProductDetailPage></ProductDetailPage></Protected>
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/order',
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path:"/myOrders",
    element:<Protected><UserOrdersPage></UserOrdersPage></Protected>
  },
  {
    path:"/orderSuccess/:id",
    element:<OrderSuccess></OrderSuccess>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path:"/profile",
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path:"*",
    element:<PageNotFound></PageNotFound>
  }
]);

function App() {
  const dispatch = useDispatch();
  const userLogged=useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked);
  useEffect(() => { 
    console.log("user checked",userChecked);
    dispatch(checkAuthAsync()) }, [dispatch])
  
  useEffect(()=>{
    if(userLogged!=null){
      dispatch(fetchProductByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,userLogged])
  
  return (
    <div className="App">
      { userChecked &&
      <RouterProvider router={router} />
      }
    </div>
  );
}

export default App;
