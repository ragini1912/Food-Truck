import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Star,
  Clock,
  ChefHat,
  Search,
  Grid,
  List,
} from "lucide-react";

const RestaurantMenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Truffle Risotto",
      price: 28.99,
      description:
        "Creamy arborio rice with black truffle, parmesan cheese, and fresh herbs",
      category: "Main Course",
      availability: true,
      prepTime: 25,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 420,
    },
    {
      id: 2,
      name: "Grilled Salmon",
      price: 32.5,
      description:
        "Atlantic salmon with lemon herb butter, roasted vegetables, and quinoa",
      category: "Main Course",
      availability: true,
      prepTime: 18,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      isVegetarian: false,
      isSpicy: false,
      calories: 380,
    },
    {
      id: 3,
      name: "Chocolate Soufflé",
      price: 14.99,
      description:
        "Rich dark chocolate soufflé with vanilla ice cream and berry compote",
      category: "Dessert",
      availability: false,
      prepTime: 35,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 320,
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Appetizer",
    availability: true,
    prepTime: "",
    image: "",
    isVegetarian: false,
    isSpicy: false,
    calories: "",
  });

  const categories = [
    "All",
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Salad",
    "Soup",
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "Appetizer",
      availability: true,
      prepTime: "",
      image: "",
      isVegetarian: false,
      isSpicy: false,
      calories: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill in required fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      prepTime: parseInt(formData.prepTime) || 15,
      calories: parseInt(formData.calories) || 0,
      rating: 0,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    };

    setMenuItems((prev) => [...prev, newItem]);
    resetForm();
    setShowAddForm(false);
  };

  const handleEditItem = (id) => {
    const item = menuItems.find((item) => item.id === id);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      availability: item.availability,
      prepTime: item.prepTime.toString(),
      image: item.image,
      isVegetarian: item.isVegetarian,
      isSpicy: item.isSpicy,
      calories: item.calories.toString(),
    });
    setIsEditing(id);
  };

  const handleUpdateItem = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill in required fields");
      return;
    }

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === isEditing
          ? {
              ...item,
              ...formData,
              price: parseFloat(formData.price),
              prepTime: parseInt(formData.prepTime) || 15,
              calories: parseInt(formData.calories) || 0,
            }
          : item
      )
    );
    setIsEditing(null);
    resetForm();
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, availability: !item.availability } : item
      )
    );
  };

  const filteredAndSortedItems = menuItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || item.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "prepTime":
          return a.prepTime - b.prepTime;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Menu Management
                </h1>
                <p className="text-purple-200">
                  Manage your restaurant's delicious offerings
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add New Item
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-800">
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="name" className="bg-slate-800">
                  Sort by Name
                </option>
                <option value="price" className="bg-slate-800">
                  Sort by Price
                </option>
                <option value="rating" className="bg-slate-800">
                  Sort by Rating
                </option>
                <option value="prepTime" className="bg-slate-800">
                  Sort by Prep Time
                </option>
              </select>

              <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "text-purple-300 hover:text-white"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : "text-purple-300 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredAndSortedItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl ${
                viewMode === "list" ? "flex flex-col md:flex-row" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative ${
                  viewMode === "list" ? "md:w-48 h-48 md:h-auto" : "h-48"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isVegetarian && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Veg
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Spicy
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`w-4 h-4 rounded-full border-2 border-white ${
                      item.availability ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={item.availability ? "Available" : "Unavailable"}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.name}
                    </h3>
                    <span className="text-orange-400 text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      <span className="text-lg font-semibold text-orange-500">
                        ₹{item.price}
                      </span>
                    </div>
                    {item.rating > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-purple-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.prepTime} min</span>
                  </div>
                  {item.calories > 0 && (
                    <div className="flex items-center gap-1">
                      <span>{item.calories} cal</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditItem(item.id)}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-purple-300 text-lg">No menu items found</div>
            <p className="text-purple-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddForm || isEditing) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setIsEditing(null);
                    resetForm();
                  }}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Item name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Price (₹)"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-800">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Prep Time (minutes)
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      value={formData.calories}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Describe your delicious dish..."
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                    />
                    <span>Available</span>
                  </label>

                  <label className="flex items-center gap-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="isVegetarian"
                      checked={formData.isVegetarian}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                    />
                    <span>Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSpicy"
                      checked={formData.isSpicy}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500 focus:ring-offset-0"
                    />
                    <span>Spicy</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setIsEditing(null);
                      resetForm();
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={isEditing ? handleUpdateItem : handleAddItem}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {isEditing ? "Update Item" : "Add Item"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuManagement;
