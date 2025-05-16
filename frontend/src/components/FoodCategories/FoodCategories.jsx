import React from "react";
import "./FoodCategories.css";
import burgersImg from "../../assets/images/pizza.png";
import pizzasImg from "../../assets/images/burger.png";
import tacosImg from "../../assets/images/pizza.png";
import icecreamsImg from "../../assets/images/burger.png";
import sandwichesImg from "../../assets/images/pizza.png";
import drinksImg from "../../assets/images/burger.png";
import smoothieImg from "../../assets/images/pizza.png";
import aampannaImg from "../../assets/images/burger.png";
import lassiImg from "../../assets/images/pizza.png";
import pastryImg from "../../assets/images/burger.png";
import shakeImg from "../../assets/images/pizza.png";
import icecreamImg from "../../assets/images/burger.png";

const foodCategories = [
  { id: 1, name: "Burgers", image: burgersImg },
  { id: 2, name: "Pizzas", image: pizzasImg },
  { id: 3, name: "Tacos", image: tacosImg },
  { id: 4, name: "Ice Creams", image: icecreamsImg },
  { id: 5, name: "Sandwiches", image: sandwichesImg },
  { id: 6, name: "Drinks", image: drinksImg },
  { id: 7, name: "Smoothie", image: smoothieImg },
  { id: 8, name: "Aam Panna", image: aampannaImg },
  { id: 9, name: "Lassi", image: lassiImg },
  { id: 10, name: "Pastry", image: pastryImg },
  { id: 11, name: "Shake", image: shakeImg },
  { id: 12, name: "Ice Cream", image: icecreamImg },
];

const splitCategories = (arr) => {
  const half = Math.ceil(arr.length / 2);
  return [arr.slice(0, half), arr.slice(half)];
};

const [row1, row2] = splitCategories(foodCategories);

const FoodCategoryShowcase = () => {
  return (
    <div className="food-category-container">
      <h2 className="category-title">Explore Food Categories</h2>
      <p className="category-subtitle">
        Discover the joy of mobile dining experiences
      </p>
      <div className="category-scroll-rows">
        {[row1, row2].map((row, idx) => (
          <div className="category-scroll-row" key={idx}>
            {row.map((category) => (
              <div className="category-card" key={category.id}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCategoryShowcase;
