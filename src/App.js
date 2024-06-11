import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/AuthSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import NotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import { fetchLoggedInUserAsync } from './features/user/UserSlice';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPassword from './features/auth/components/ForgotPassword';
import Logout from './features/auth/components/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: '/product-detail/:id',
    element: <Protected><ProductDetailPage /></Protected>
  },
  {
    path: '/order-success/:id',
    element: <Protected><OrderSuccessPage /></Protected>
  },
  {
    path: '/orders',
    element: <Protected><UserOrdersPage /></Protected>
  },
  {
    path: '/profile',
    element: (
      <Protected><UserProfilePage /></Protected>
    ),
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "*",
    element: <NotFound />
  },
])

function App () {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
