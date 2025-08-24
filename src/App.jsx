import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import NoPage from './pages/nopage/NoPage';
import ProductInfo from './pages/productinfo/ProductInfo';
import CartPage from './pages/cartpage/CartPage';
import AllProduct from './pages/allproduct/AllProduct';
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login';
import UserDashboard from './pages/user/UserDashboard';
import Admin from './pages/Admin/Admin';
import AddProductPage from './pages/Admin/AddProductPage';
import UpdateProductPage from './pages/Admin/UpdateProductPage';
import CategoryPage from './pages/category/CategoryPage';
import MyState from './context/myState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForAdmin } from './protectedroute/ProtectedRouteForAdmin';
import ProtectedRouteForUser from './protectedroute/ProtectedRouteForUser';
import Lenis from '@studio-freight/lenis';

// ScrollToTop component to reset Lenis scroll on route change
const ScrollToTop = ({ lenis }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenis.current) {
      lenis.current.scrollTo(0, { immediate: true }); // scroll to top immediately
    }
  }, [pathname, lenis]);

  return null;
};

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,   // lower = faster
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <MyState>
      <Router>
        {/* ScrollToTop resets Lenis scroll on route change */}
        <ScrollToTop lenis={lenisRef} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/ProductInfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route
            path="/userdashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRouteForAdmin>
                <Admin />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
