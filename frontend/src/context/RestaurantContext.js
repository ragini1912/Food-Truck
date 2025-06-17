import React, { createContext, useState } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantData, setRestaurantData] = useState(null);

  return (
    <RestaurantContext.Provider value={{ restaurantData, setRestaurantData }}>
      {children}
    </RestaurantContext.Provider>
  );
};
