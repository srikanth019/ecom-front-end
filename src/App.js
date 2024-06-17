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
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/admin/AdminHome';
import AdminProductDetailPage from './pages/admin/AdminProductDetailPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,

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
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),

  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
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

// Utility function to wrap routes with a component

// const wrapRoutes = (routes, Wrapper) => routes.map(route => ({
//   ...route,
//   element: <Wrapper>{route.element}</Wrapper>,
// }));

// // Define protected routes
// const endUserRoutes = [
//   { path: "/", element: <Home /> },
//   { path: "/cart", element: <CartPage /> },
//   { path: "/checkout", element: <Checkout /> },
//   { path: "/product-detail/:id", element: <ProductDetailPage /> },
//   { path: "/order-success/:id", element: <OrderSuccessPage /> },
//   { path: "/orders", element: <UserOrdersPage /> },
//   { path: "/profile", element: <UserProfilePage /> },
// ];

// // Define admin routes
// const adminRoutes = [
//   { path: "/admin", element: <AdminHome /> },
//   { path: "/admin/product-detail/:id", element: <AdminProductDetailPage /> },
//   { path: "/admin/product-form", element: <AdminProductFormPage /> },
//   { path: "/admin/product-form/edit/:id", element: <AdminProductFormPage /> }
// ];

// // Define public routes
// const publicRoutes = [
//   { path: "/login", element: <LoginPage /> },
//   { path: "/signup", element: <SignupPage /> },
//   { path: "/logout", element: <Logout /> },
//   { path: "/forgot-password", element: <ForgotPassword /> },
//   { path: "*", element: <NotFound /> },
// ];

// // Combine all routes
// const routes = [
//   ...wrapRoutes(endUserRoutes, Protected),
//   ...wrapRoutes(adminRoutes, ProtectedAdmin),
//   ...publicRoutes,
// ];

// // Create the router
// const router = createBrowserRouter(routes);

function App () {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);


  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user._id))
      dispatch(fetchLoggedInUserAsync(user._id))

    }
  }, [dispatch, user])


  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;
