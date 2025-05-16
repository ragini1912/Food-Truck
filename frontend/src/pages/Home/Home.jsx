import React from "react";
import "./Home.css";
import CateringCards from "../../components/CateringCards/CateringCards";
import HeroSection from "../../components/HeroSection/HeroSection";
import FoodCategories from "../../components/FoodCategories/FoodCategories";
import CateringCuisines from "../../components/CateringCuisines/CateringCuisines";
import PizzaMenu from "../../components/PizzaMenu/PizzaMenu";
import CustomerTestimonials from "../../components/CustomerTestimonials/CustomerTestimonials";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";

const Home = () => {
  return (
    <div>
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

export default Home;
