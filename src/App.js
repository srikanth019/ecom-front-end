import React from 'react';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
    // errorElement: <h1>
    //   Page not found!
    // </h1>,
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
])

function App () {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
