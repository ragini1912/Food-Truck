import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Imports
import { DarkModeContext } from "./context/darkModeContext";
import { RestaurantProvider } from "./context/RestaurantContext";

// User Imports
import UserHome from "./pages/Home/UserHome";
import UserLogin from "./pages/Login/UserLogin";
import UserRestaurantPage from "./components/RestaurantPage/UserRestaurantPage";
import UserOrderTracking from "./pages/Cart/UserOrderTracking";
import Cart from "./pages/Cart/Cart";
import UserProfile from "./components/Profile/UserProfile";
import UserFooter from "./components/Footer/UserFooter";
import UserContact from "./pages/Contact/UserContact";
import Notification from "./components/Notifications/UserNotification";

// Admin Imports
import AdminHome from "./pages/Home/AdminHome";
import AdminLogin from "./pages/Login/AdminLogin";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";

// Restaurant Imports
import RestaurantForm from "./components/RestaurantForm/RestaurantForm";
import RestaurantHome from "./pages/Home/RestaurantHome";
import RestaurantLogin from "./pages/Login/RestaurantLogin";
import RestaurantProfile from "./components/Profile/RestaurantProfile ";
import RestaurantDashboard from "./components/RestaurantDashboard/RestaurantDashboard";
import RestaurantMenuCategoryManagement from "./components/Management/RestaurantMenuCategoryManagement";
import RestaurantOrderManagement from "./components/Management/RestaurantOrderManagement";
import RestaurantReviewsPage from "./pages/Reviews/RestaurantReviewsPage";
import RestaurantOrderTracking from "./pages/Cart/RestaurantOrderTracking";
import RestaurantDelivery from "./components/Management/RestaurantDelivery";
import ItemDetails from "./components/Management/ItemDetails";
import RestaurantContact from "./pages/Contact/RestaurantContact";

// Global Styles
import "./style/dark.scss";
import "./App.css";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <RestaurantProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<UserHome />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="order-tracking" element={<UserOrderTracking />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile">
                <Route index element={<UserProfile />} />
                <Route path="orders" element={<UserProfile />} />
                <Route path="settings" element={<UserProfile />} />
                <Route path="logout" element={<UserProfile />} />
              </Route>
              <Route path="footer" element={<UserFooter />} />
              <Route path="contact" element={<UserContact />} />
              <Route path="notification" element={<Notification />} />
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
                  element={
                    <New inputs={productInputs} title="Add New Product" />
                  }
                />
              </Route>
            </Route>
            <Route path="restaurant">
              <Route index element={<RestaurantHome />} />
              <Route path="login" element={<RestaurantLogin />} />
              <Route path="form" element={<RestaurantForm />} />
              <Route path="profile" element={<RestaurantProfile />} />
              <Route path="dashboard" element={<RestaurantDashboard />} />
              <Route
                path="order-manage"
                element={<RestaurantOrderManagement />}
              />
              <Route path="review" element={<RestaurantReviewsPage />} />
              <Route
                path="menu"
                element={<RestaurantMenuCategoryManagement />}
              />
              <Route path="delivery" element={<RestaurantDelivery />} />
              <Route path="contact" element={<RestaurantContact />} />
              <Route
                path="order-tracking"
                element={<RestaurantOrderTracking />}
              />
              <Route path="item/:id" element={<ItemDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RestaurantProvider>
    </div>
  );
}

export default App;
