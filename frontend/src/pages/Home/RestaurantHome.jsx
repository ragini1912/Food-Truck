import React from "react";
import RestaurantHeroSection from "../../components/HeroSection/RestaurantHeroSection";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";
import RestaurantFooter from "../../components/Footer/RestaurantFooter";

const RestaurantHome = () => {
  return (
    <div>
      <RestaurantNavbar />
      <RestaurantHeroSection />
      <RestaurantFooter />
    </div>
  );
};

export default RestaurantHome;
