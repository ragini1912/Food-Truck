import React from "react";
import "./UserHome.css";
import UserNavbar from "../../components/Navbar/UserNavbar";
import HeroSection from "../../components/HeroSection/UserHeroSection";
import CateringCards from "../../components/CateringCards/CateringCards";
import FoodCategories from "../../components/FoodCategories/FoodCategories";
import CateringCuisines from "../../components/CateringCuisines/CateringCuisines";
import PizzaMenu from "../../components/PizzaMenu/PizzaMenu";
import CustomerTestimonials from "../../components/CustomerTestimonials/CustomerTestimonials";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";

const UserHome = () => {
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

export default UserHome;
