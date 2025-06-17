import React, { useState } from "react";
import {
  Star,
  Leaf,
  ArrowLeft,
  Info,
  X,
  Upload,
  TrendingUp,
  MessageSquare,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedItem = location.state?.item;

  const [item, setItem] = useState({
    id: passedItem?.id || "item_001",
    name: passedItem?.name || "Deluxe Chicken Burger",
    description:
      passedItem?.description ||
      "A mouth-watering chicken burger with fresh lettuce, tomatoes, and our special sauce served with crispy fries.",
    restaurant: passedItem?.restaurant || "Spice Valley Restaurant",
    price: passedItem?.price || 299.0,
    final_price: passedItem?.final_price || passedItem?.price || 239.2,
    discount_percentile: passedItem?.discount_percentile || 20,
    image:
      passedItem?.image ||
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    stock: passedItem?.stock || 15,
    availability: passedItem?.availability ?? true,
    rating: passedItem?.rating || 4.5,
    total_reviews: passedItem?.total_reviews || 128,
    isVegetarian: passedItem?.isVegetarian ?? false,
    isSpicy: passedItem?.isSpicy ?? true,
    category: passedItem?.category || "cat_003",
    category_name: passedItem?.category_name || "Flame Grill Burgers",
    tags: passedItem?.tags || "burger, chicken, spicy",
    prepTime: passedItem?.prepTime || 15,
    calories: passedItem?.calories || 650,
    ingredients: passedItem?.ingredients || "",
    serving_size: passedItem?.serving_size || "",
    allergens: passedItem?.allergens || "",
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [orderStats] = useState({
    totalOrders: 156,
    thisMonth: 23,
    lastMonth: 19,
    revenue: 15600,
    averageOrderValue: 100,
  });

  const [reviews] = useState([
    {
      id: 1,
      customerName: "Rahul Sharma",
      rating: 5,
      comment:
        "Absolutely delicious! The flavors were perfect and the portion size was generous.",
      date: "2025-06-10",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      customerName: "Priya",
      rating: 4,
      comment:
        "Good taste but took a bit longer to prepare. Overall satisfied with the quality.",
      date: "2025-06-08",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      rating: 5,
      comment: "Best dish I've ordered from here! Will definitely order again.",
      date: "2025-06-05",
      helpful: 15,
      verified: false,
    },
    {
      id: 4,
      customerName: "Sneha",
      rating: "3",
      comment: "It was okay, but expected better presentation.",
      date: "2020",
      helpful: 5,
      verified: true,
    },
  ]);

  const categories = [
    { id: "cat_001", name: "All Items" },
    { id: "cat_002", name: "Appetizers" },
    { id: "cat_003", name: "Flame Grill Burgers" },
    { id: "cat_004", name: "Veggie & Plant Based Burgers" },
    { id: "cat_005", name: "Sandwich from the Grill" },
    { id: "cat_006", name: "Hot Chicken Entrees" },
    { id: "cat_007", name: "Beef Entrees" },
    { id: "cat_008", name: "Seafood Entrees" },
    { id: "cat_009", name: "House Special Salads" },
    { id: "cat_010", name: "Pizza & Italian" },
    { id: "cat_011", name: "Asian Cuisine" },
    { id: "cat_012", name: "Mexican Specialties" },
    { id: "cat_013", name: "Desserts" },
    { id: "cat_014", name: "Beverages" },
    { id: "cat_015", name: "Breakfast" },
  ];

  const openModal = () => {
    setFormData({
      id: item.id,
      category: item.category,
      category_name: item.category_name,
      name: item.name,
      description: item.description,
      restaurant: item.restaurant,
      price: item.price,
      final_price: item.final_price || item.price,
      discount_percentile: item.discount_percentile || 0,
      image: item.image,
      stock: item.stock || 10,
      availability: item.availability,
      average_rating: item.rating || 0,
      total_reviews: item.total_reviews || 0,
      isVegetarian: item.isVegetarian,
      isSpicy: item.isSpicy,
      tags: item.tags || "",
      prepTime: item.prepTime || 0,
      calories: item.calories || 0,
      ingredients: item || "",
      serving_size: item.serving_size || "",
      allergens: "" || "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "price" || name === "discount_percentile") {
        const price = parseFloat(updated.price) || 0;
        const discount = parseFloat(updated.discount_percentile) || 0;
        updated.final_price =
          discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price;
      }
      return updated;
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (item) => item.id === selectedCategoryId
    );
    setFormData((prev) => ({
      ...prev,
      category: selectedCategoryId,
      category_name: selectedCategory
        ? selectedCategory.name
        : prev.category_name,
    }));
  };

  const handleSave = () => {
    const updatedData = { ...formData };
    if (imageFile) {
      updatedData.image = imagePreview;
    }

    setItem(updatedData);

    console.log("Saved item details:", updatedData);
    console.log("Image file:", imageFile);

    alert("Item updated successfully!");
    setShowModal(false);
  };

  const closeModal = () => {
    setFormData(null);
    setImageFile(null);
    setImagePreview(null);
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <style>
        {`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hidden {
            scrollbar-width: none;
          }
        `}
      </style>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gray-50 scrollbar-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/restaurant/menu")}
            className="flex items-center text-orange-600 font-semibold mb-6 hover:text-orange-700 transition-colors duration-200 text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Menu
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {item.discount_percentile > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.discount_percentile}% OFF
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center">
                  {item.isVegetarian ? (
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 border-2 border-red-500 rounded-sm bg-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                {!item.availability && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                    <span className="text-white font-bold text-xl">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.rating} ({item.total_reviews || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  {item.discount_percentile > 0 ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{parseFloat(item.final_price).toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{parseFloat(item.price).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">
                      ₹{parseFloat(item.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                  <div>Stock: {item.stock || 10}</div>
                  <div>Category: {item.category_name}</div>
                  <div>Prep Time: {item.prepTime || 0} mins</div>
                  <div>Calories: {item.calories || 0} kcal</div>
                </div>
                {item.ingredients && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Ingredients:
                    </h4>
                    <p className="text-sm text-gray-600">{item.ingredients}</p>
                  </div>
                )}
                {item.allergens && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Allergens:
                    </h4>
                    <p className="text-sm text-red-600">{item.allergens}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={openModal}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Info className="w-5 h-5" />
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {orderStats.totalOrders}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orderStats.thisMonth}
                  </p>
                  <p className="text-xs text-gray-500">
                    +{orderStats.thisMonth - orderStats.lastMonth} from last
                    month
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{orderStats.revenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Order Value</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{orderStats.averageOrderValue}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-800">
                Customer Reviews
              </h3>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-800">
                            {review.customerName}
                          </p>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 ml-13">{review.comment}</p>
                  <div className="flex items-center gap-4 ml-13">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && formData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-hidden p-6 mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Item Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <label className="cursor-pointer text-orange-600 hover:text-orange-700 transition-colors">
                          Upload an image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories
                    .filter((cat) => cat.id !== "cat_001")
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount_percentile"
                    value={formData.discount_percentile}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {formData.discount_percentile > 0 && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Final Price: </span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{parseFloat(formData.final_price).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (mins)
                  </label>
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Available
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Vegetarian
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isSpicy"
                    checked={formData.isSpicy}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Spicy</label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Serving Size
                  </label>
                  <input
                    type="text"
                    name="serving_size"
                    value={formData.serving_size}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 1 serving, 200g"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., spicy, vegetarian, appetizer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ingredients
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  placeholder="List ingredients..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allergens
                </label>
                <input
                  type="text"
                  name="allergens"
                  value={formData.allergens}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., nuts, dairy, gluten"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
