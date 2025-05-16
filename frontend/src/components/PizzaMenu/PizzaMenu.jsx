import React from "react";
import "./PizzaMenu.css";
import spicyPizza1 from "../../assets/images/pizza1.png";
import spicyPizza2 from "../../assets/images/pizza2.png";
import spicyPizza3 from "../../assets/images/pizza3.png";

const PizzaMenu = () => {
  const pizzaItems = [
    {
      id: 1,
      title: "Italian Spicy Pizza",
      originalPrice: "$11.00",
      discountedPrice: "$10.00",
      description:
        "Donce et mûn maximus, congue est estoum mattis nunc. Passerint quam quis quam versandis iringlia. Nordu vestibulum.",
      image: spicyPizza1,
    },
    {
      id: 2,
      title: "Italian Spicy Pizza",
      originalPrice: "$13.00",
      discountedPrice: "$12.05",
      description:
        "Moris elementum bibendum enim non sollicitudin. Cras mattis sem sol mi fuschosis losvest at lorem sem. Nordu convallis.",
      image: spicyPizza2,
    },
    {
      id: 3,
      title: "Italian Spicy Pizza",
      originalPrice: "$10.00",
      discountedPrice: "$12.00",
      description:
        "Curabitur non ex losvest. Isenterent lectus ut, viverra enim. Aliquam finibus justo eget isolata commodo. Curabitur venenatis eget.",
      image: spicyPizza3,
    },
  ];

  return (
    <div className="pizza-menu-container">
      <div className="head-section">
        <div className="bg-pizza-burger">
          <h1>
            Enjoy Your Favorite Pizza
            <br />
            at An <span>Affordable</span> Price
          </h1>
        </div>
      </div>

      <div className="pizza-items">
        {pizzaItems.map((item) => (
          <div className="pizza-card" key={item.id}>
            <h3>{item.title}</h3>
            <div className="price">
              <span className="discounted-price">{item.discountedPrice}</span>
              <span className="original-price">{item.originalPrice}</span>
            </div>
            <div className="pizza-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="pizza-details">
              <p className="description">{item.description}</p>
              <button className="order-btn">Place Your Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaMenu;
