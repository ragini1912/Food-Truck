import React, { useState, useEffect } from "react";
// Imports for User Home
import "./Home.css"; // Assuming this is for user home styles
import UserNavbar from "../../components/Navbar/UserNavbar"; // Renamed to avoid conflict
import HeroSection from "../../components/HeroSection/HeroSection";
import CateringCards from "../../components/CateringCards/CateringCards";
import FoodCategories from "../../components/FoodCategories/FoodCategories";
import CateringCuisines from "../../components/CateringCuisines/CateringCuisines";
import PizzaMenu from "../../components/PizzaMenu/PizzaMenu";
import CustomerTestimonials from "../../components/CustomerTestimonials/CustomerTestimonials";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";

// Imports for Admin Home
import AdminSidebar from "../../components/sidebar/Sidebar"; // Renamed to avoid conflict
import AdminNavbar from "../../components/Navbar/AdminNavbar"; // Renamed to avoid conflict
import "./home.scss"; // Assuming this is for admin home styles, might need namespacing or careful management
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

// Placeholder function to check user role - IMPLEMENT THIS ACCORDING TO YOUR AUTH LOGIC
const checkUserRole = () => {
  // Use the same key as set in Login.jsx
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return "admin";
  }
  return "user";
};

const UserHomeContent = () => {
  return (
    <div>
      <UserNavbar />
      <HeroSection />
      <CateringCards />
      <FoodCategories />
      <CateringCuisines />
      <AboutUs />
      <PizzaMenu />
      <CustomerTestimonials />
      <Footer />
    </div>
  );
};

const AdminHomeContent = () => {
  return (
    <div className="home">
      {" "}
      {/* Class from admin's home.scss */}
      <AdminSidebar />
      <div className="homeContainer">
        {" "}
        {/* Class from admin's home.scss */}
        <AdminNavbar />
        <div className="widgets">
          {" "}
          {/* Class from admin's home.scss */}
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          {" "}
          {/* Class from admin's home.scss */}
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          {" "}
          {/* Class from admin's home.scss */}
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [userRole, setUserRole] = useState(null); // 'user', 'admin', or null initially

  useEffect(() => {
    // Determine user role when component mounts
    const role = checkUserRole();
    setUserRole(role);
  }, []);

  if (userRole === null) {
    // Optional: Show a loading spinner or placeholder while checking role
    return <div>Loading...</div>;
  }

  return userRole === "admin" ? <AdminHomeContent /> : <UserHomeContent />;
};

export default Home;
