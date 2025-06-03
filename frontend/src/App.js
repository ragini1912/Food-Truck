import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserHome from "./pages/Home/UserHome";
import UserLogin from "./pages/Login/UserLogin";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import "./App.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import UserRestaurantPage from "./components/RestaurantPage/UserRestaurantPage";
import OrderTracking from "./pages/Cart/OrderTracking";
import Cart from "./pages/Cart/Cart";
import UserProfile from "./components/Profile/UserProfile";
import AdminHome from "./pages/Home/AdminHome";
import AdminLogin from "./pages/Login/AdminLogin";
import RestaurantForm from "./components/RestaurantForm/RestaurantForm";
import RestaurantHeroSection from "./components/HeroSection/RestaurantHeroSection";
import RestaurantLogin from "./pages/Login/RestaurantLogin";
import RestaurantProfile from "./components/Profile/RestaurantProfile .jsx";
import RestaurantDashboard from "./components/RestaurantDashboard/RestaurantDashboard";
import RestaurantMenuManagement from "./components/Management/RestaurantMenuManagement";
import RestaurantOrderManagement from "./components/Management/RestaurantOrderManagement";
import FoodTruckManagement from "./components/Management/FoodTruckManagement";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<UserHome />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="order-tracking" element={<OrderTracking />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="user-restaurant" element={<UserRestaurantPage />} />
          </Route>
          <Route path="admin">
            <Route index element={<AdminHome />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          <Route>
            <Route path="restaurant">
              <Route index element={<RestaurantHeroSection />} />
              <Route path="login" element={<RestaurantLogin />} />
              <Route path="form" element={<RestaurantForm />} />
              <Route path="profile" element={<RestaurantProfile />} />
              <Route path="dashboard" element={<RestaurantDashboard />} />
              <Route
                path="menu-manage"
                element={<RestaurantMenuManagement />}
              />
              <Route
                path="order-manage"
                element={<RestaurantOrderManagement />}
              />
              <Route path="truck-manage" element={<FoodTruckManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
