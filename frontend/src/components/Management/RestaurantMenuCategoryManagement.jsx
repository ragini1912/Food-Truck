import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Star,
  Clock,
  Search,
  Grid,
  List,
  SortAsc,
  Eye,
  EyeOff,
  Utensils,
} from "lucide-react";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";
import { useNavigate } from "react-router-dom";

const RestaurantMenuCategoryManagement = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("cat_001");
  const [activeSection, setActiveSection] = useState("menu"); // New state for section toggle
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Truffle Risotto",
      price: 28.99,
      description:
        "Creamy arborio rice with black truffle, parmesan cheese, and fresh herbs",
      category: "cat_002",
      category_name: "Appetizers",
      availability: true,
      prepTime: 25,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 420,
      restaurant: "rest_001",
    },
    {
      id: 2,
      name: "Grilled Salmon",
      price: 32.5,
      description:
        "Atlantic salmon with lemon herb butter, roasted vegetables, and quinoa",
      category: "cat_008",
      category_name: "Seafood Entrees",
      availability: true,
      prepTime: 18,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      isVegetarian: false,
      isSpicy: false,
      calories: 380,
      restaurant: "rest_001",
    },
    {
      id: 3,
      name: "Chocolate Soufflé",
      price: 14.99,
      description:
        "Rich dark chocolate soufflé with vanilla ice cream and berry compote",
      category: "cat_013",
      category_name: "Desserts",
      availability: false,
      prepTime: 35,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 320,
      restaurant: "rest_001",
    },
    {
      id: 4,
      name: "Caesar Salad Supreme",
      price: 16.5,
      description:
        "Crisp romaine lettuce with house-made croutons, parmesan, and caesar dressing",
      category: "cat_009",
      category_name: "House Special Salads",
      availability: true,
      prepTime: 10,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 280,
      restaurant: "rest_001",
    },
    {
      id: 5,
      name: "Spicy Buffalo Wings",
      price: 19.99,
      description:
        "Crispy chicken wings tossed in spicy buffalo sauce with celery and blue cheese",
      category: "cat_002",
      category_name: "Appetizers",
      availability: true,
      prepTime: 15,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1527477396643-1b834ec1d5d9?w=400&h=300&fit=crop",
      isVegetarian: false,
      isSpicy: true,
      calories: 450,
      restaurant: "rest_001",
    },
    {
      id: 6,
      name: "Mushroom Soup",
      price: 12.99,
      description:
        "Creamy wild mushroom soup with herbs and a touch of truffle oil",
      category: "cat_016",
      category_name: "Soups",
      availability: true,
      prepTime: 12,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 220,
      restaurant: "rest_001",
    },
    {
      id: 7,
      name: "Fresh Orange Juice",
      price: 6.99,
      description: "Freshly squeezed orange juice with pulp, served chilled",
      category: "cat_014",
      category_name: "Beverages",
      availability: true,
      prepTime: 3,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 120,
      restaurant: "rest_001",
    },
    {
      id: 8,
      name: "BBQ Beef Ribs",
      price: 42.99,
      description:
        "Slow-cooked beef ribs with house BBQ sauce, coleslaw, and fries",
      category: "cat_007",
      category_name: "Beef Entrees",
      availability: true,
      prepTime: 45,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      isVegetarian: false,
      isSpicy: true,
      calories: 680,
      restaurant: "rest_001",
    },
    {
      id: 9,
      name: "Tiramisu Classic",
      price: 11.99,
      description:
        "Traditional Italian tiramisu with coffee-soaked ladyfingers and mascarpone",
      category: "cat_013",
      category_name: "Desserts",
      availability: true,
      prepTime: 20,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1571876427200-d0ac98ea607d?w=400&h=300&fit=crop",
      isVegetarian: true,
      isSpicy: false,
      calories: 340,
      restaurant: "rest_001",
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: "cat_001",
      name: "All Items",
      description: "View all menu items",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_002",
      name: "Appetizers",
      description: "Delicious starters to begin your meal",
      image:
        "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_003",
      name: "Flame Grill Burgers",
      description: "Juicy burgers grilled to perfection",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_004",
      name: "Veggie & Plant Based Burgers",
      description: "Healthy plant-based burger options",
      image:
        "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_005",
      name: "Sandwich from the Grill",
      description: "Grilled sandwiches with premium ingredients",
      image:
        "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_006",
      name: "Hot Chicken Entrees",
      description: "Spicy and flavorful chicken dishes",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_007",
      name: "Beef Entrees",
      description: "Premium beef cuts and preparations",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_008",
      name: "Seafood Entrees",
      description: "Fresh seafood dishes",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_009",
      name: "House Special Salads",
      description: "Fresh and healthy salad combinations",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_010",
      name: "Pizza & Italian",
      description: "Authentic Italian cuisine",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_011",
      name: "Asian Cuisine",
      description: "Traditional Asian flavors",
      image:
        "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_012",
      name: "Mexican Specialties",
      description: "Spicy Mexican favorites",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_013",
      name: "Desserts",
      description: "Sweet treats to end your meal",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_014",
      name: "Beverages",
      description: "Refreshing drinks and beverages",
      image:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_015",
      name: "Breakfast",
      description: "Start your day right with our breakfast menu",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=150&h=150&fit=crop&crop=center",
    },
    {
      id: "cat_016",
      name: "Soups",
      description: "Warm and comforting soup selections",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150&h=150&fit=crop&crop=center",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [itemImageFile, setItemImageFile] = useState(null); // New state for item image upload
  const [categoryImageFile, setCategoryImageFile] = useState(null); // New state for category image upload

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "cat_002",
    category_name: "Appetizers",
    availability: true,
    prepTime: "",
    image: "",
    isVegetarian: false,
    isSpicy: false,
    calories: "",
    final_price: "",
    discount_percentile: "",
    stock: "",
    average_rating: null,
    total_reviews: null,
    tags: "",
    restaurant: "rest_001",
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "cat_002",
      category_name: "Appetizers",
      availability: true,
      prepTime: "",
      image: "",
      isVegetarian: false,
      isSpicy: false,
      calories: "",
      final_price: "",
      discount_percentile: "",
      stock: "",
      average_rating: null,
      total_reviews: null,
      tags: "",
      restaurant: "rest_001",
    });
    setItemImageFile(null); // Reset item image file
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      description: "",
      image: "",
    });
    setCategoryImageFile(null); // Reset category image file
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "category") {
        const category = categories.find((cat) => cat.id === value);
        updated.category_name = category ? category.name : "";
      }
      if (name === "price" || name === "discount_percentile") {
        const price = parseFloat(updated.price) || 0;
        const discount = parseFloat(updated.discount_percentile) || 0;
        updated.final_price =
          discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price;
      }
      return updated;
    });
  };

  const handleItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const closeItemModal = () => {
    setShowAddForm(false);
    setIsEditing(null);
    resetForm();
  };

  const closeCategoryModal = () => {
    setShowAddCategoryForm(false);
    setIsEditingCategory(null);
    resetCategoryForm();
  };

  const handleItemOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeItemModal();
    }
  };

  const handleCategoryOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCategoryModal();
    }
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in required fields (Name, Price, Category)");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      final_price:
        parseFloat(formData.final_price) || parseFloat(formData.price),
      prepTime: parseInt(formData.prepTime) || 15,
      calories: parseInt(formData.calories) || 0,
      stock: parseInt(formData.stock) || 10,
      rating: parseFloat(formData.average_rating) || 0,
      total_reviews: parseInt(formData.total_reviews) || 0,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      tags: formData.tags || formData.name.toLowerCase().replace(/\s+/g, ","),
      restaurant: "rest_001",
    };

    setMenuItems((prev) => [...prev, newItem]);
    closeItemModal();
  };

  const handleEditItem = (id) => {
    const item = menuItems.find((item) => item.id === id);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      category_name: item.category_name,
      availability: item.availability,
      prepTime: item.prepTime.toString(),
      image: item.image,
      isVegetarian: item.isVegetarian,
      isSpicy: item.isSpicy,
      calories: item.calories.toString(),
      final_price: item.final_price
        ? item.final_price.toString()
        : item.price.toString(),
      discount_percentile: item.discount_percentile
        ? item.discount_percentile.toString()
        : "0",
      stock: item.stock ? item.stock.toString() : "10",
      average_rating: item.rating ? item.rating.toString() : "0",
      total_reviews: item.total_reviews ? item.total_reviews.toString() : "0",
      tags: item.tags || "",
      restaurant: item.restaurant,
    });
    setItemImageFile(null); // Reset image file for edit
    setIsEditing(id);
    setShowAddForm(true);
  };

  const handleUpdateItem = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in required fields (Name, Price, Category)");
      return;
    }

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === isEditing
          ? {
              ...item,
              ...formData,
              price: parseFloat(formData.price),
              final_price:
                parseFloat(formData.final_price) || parseFloat(formData.price),
              prepTime: parseInt(formData.prepTime) || 15,
              calories: parseInt(formData.calories) || 0,
              stock: parseInt(formData.stock) || 10,
              rating: parseFloat(formData.average_rating) || 0,
              total_reviews: parseInt(formData.total_reviews) || 0,
            }
          : item
      )
    );
    closeItemModal();
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

  const handleAddCategory = () => {
    if (!categoryFormData.name) {
      alert("Category name is required");
      return;
    }

    const newCategory = {
      id: `cat_${Date.now()}`,
      name: categoryFormData.name,
      description:
        categoryFormData.description ||
        `Explore our ${categoryFormData.name} offerings`,
      image:
        categoryFormData.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop",
    };

    setCategories((prev) => [...prev, newCategory]);
    closeCategoryModal();
  };

  const handleEditCategory = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setCategoryFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setCategoryImageFile(null); // Reset image file for edit
    setIsEditingCategory(id);
    setShowAddCategoryForm(true);
  };

  const handleUpdateCategory = () => {
    if (!categoryFormData.name) {
      alert("Category name is required");
      return;
    }

    const updatedCategory = {
      id: isEditingCategory,
      name: categoryFormData.name,
      description: categoryFormData.description,
      image: categoryFormData.image,
    };

    setCategories((prev) =>
      prev.map((cat) => (cat.id === isEditingCategory ? updatedCategory : cat))
    );
    setMenuItems((prev) =>
      prev.map((item) =>
        item.category === isEditingCategory
          ? { ...item, category_name: categoryFormData.name }
          : item
      )
    );
    closeCategoryModal();
  };

  const handleDeleteCategory = (id) => {
    if (id === "cat_001") {
      alert("Cannot delete 'All Items' category");
      return;
    }
    if (menuItems.some((item) => item.category === id)) {
      alert("Cannot delete category with associated items");
      return;
    }
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const filteredAndSortedItems = menuItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesActiveCategory =
        activeCategory === "cat_001" || item.category === activeCategory;
      return matchesSearch && matchesActiveCategory;
    })
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
    <>
      <style jsx>{`
        /* Hide scrollbar for WebKit browsers (Chrome, Safari, Edge) */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for Firefox */
        .scrollbar-hidden {
          scrollbar-width: none;
        }
      `}</style>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 scrollbar-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-orange-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Menu Category Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage your restaurant's delicious offerings
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    resetForm();
                  }}
                  className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <Plus className="w-6 h-6" />
                  Add New Item
                </button>
                <button
                  onClick={() => {
                    setShowAddCategoryForm(true);
                    resetCategoryForm();
                  }}
                  className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <Utensils className="w-6 h-6" />
                  Add New Category
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Slider */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-orange-200 py-4 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-200 min-w-[120px] relative overflow-hidden ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 shadow-sm border border-gray-100"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 ${
                        activeCategory === category.id
                          ? "bg-white bg-opacity-20"
                          : "bg-black bg-opacity-0 hover:bg-opacity-10"
                      } transition-all duration-200`}
                    />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Sort Bar */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-orange-200 shadow-lg">
            <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-4 flex-nowrap">
              <div className="relative w-full sm:flex-1 lg:flex-1 lg:max-w-none flex-shrink-0">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-4 w-full sm:w-auto lg:w-auto flex-shrink-0">
                <div className="relative w-full sm:w-[50%] lg:w-56">
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-8 py-4 bg-white/90 border-2 border-orange-200 rounded-2xl text-gray-800 appearance-none focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%23f97316%22 class=%22w-5 h-5%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 0 010-1.414z%22 clip-rule=%22evenodd%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="prepTime">Sort by Prep Time</option>
                  </select>
                </div>

                <div className="hidden sm:flex w-full sm:w-auto lg:w-28 bg-white/90 rounded-2xl p-2.5 border-2 border-orange-200 shadow-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-[50%] p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-[50%] p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex w-full sm:w-auto lg:w-56 bg-white/90 rounded-2xl p-2.5 border-2 border-orange-200 shadow-md">
                  <button
                    onClick={() => setActiveSection("menu")}
                    className={`w-[50%] p-3 rounded-lg transition-all duration-300 ${
                      activeSection === "menu"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    Menu
                  </button>
                  <button
                    onClick={() => setActiveSection("category")}
                    className={`w-[50%] p-3 rounded-lg transition-all duration-300 ${
                      activeSection === "category"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    Category
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Rendering of Sections */}
          {activeSection === "menu" && (
            <>
              {/* Menu Items Grid/List */}
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Manage Menu
              </h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {filteredAndSortedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl shadow-lg ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    } ${!item.availability ? "opacity-75" : ""}`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "md:w-56 h-56 md:h-auto" : "h-56"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.isVegetarian && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Vegetarian
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Spicy 🌶️
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                            item.availability
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                          title={
                            item.availability
                              ? "Available - Click to disable"
                              : "Unavailable - Click to enable"
                          }
                        >
                          {item.availability ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {item.category_name}
                          </span>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-3xl font-bold text-gray-800 mb-1">
                            <span className="text-orange-600">
                              ₹
                              {item.final_price
                                ? item.final_price.toFixed(2)
                                : item.price.toFixed(2)}
                            </span>
                          </div>
                          {item.rating > 0 && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-5 h-5 fill-current" />
                              <span className="text-sm font-semibold text-gray-700">
                                {item.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <span className="font-medium">
                            {item.prepTime} min
                          </span>
                        </div>
                        {item.calories > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 flex items-center justify-center text-red-500 font-bold">
                              🔥
                            </span>
                            <span className="font-medium">
                              {item.calories} cal
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Edit3 className="w-5 h-5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Trash2 className="w-5 h-5" />
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/restaurant/item/${item.id}`, {
                              state: { item },
                            })
                          }
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Plus className="w-5 h-5" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedItems.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-500 text-2xl font-semibold mb-2">
                    No menu items found
                  </div>
                  <p className="text-gray-400 text-lg">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </>
          )}

          {activeSection === "category" && (
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Manage Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .filter((cat) => cat.id !== "cat_001")
                  .map((category) => (
                    <div
                      key={category.id}
                      className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEditCategory(category.id)}
                          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Add/Edit Item Modal */}
          {(showAddForm || isEditing) && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={handleItemOverlayClick}
            >
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
                    </h2>
                    <button
                      onClick={closeItemModal}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300"
                    >
                      <X className="w-7 h-7" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="Enter dish name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
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
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
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
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="Enter discount percentage"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Final Price
                        </label>
                        <input
                          type="number"
                          name="final_price"
                          value={formData.final_price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="Calculated automatically"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
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

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Prep Time (minutes)
                        </label>
                        <input
                          type="number"
                          name="prepTime"
                          value={formData.prepTime}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Calories
                        </label>
                        <input
                          type="number"
                          name="calories"
                          value={formData.calories}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleItemImageChange}
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-3">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                          placeholder="e.g., spicy, vegetarian, appetizer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-3">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-4 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300 resize-none"
                        placeholder="Describe your delicious dish..."
                      />
                    </div>

                    <div className="flex flex-wrap gap-8">
                      <label className="flex items-center gap-3 text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="availability"
                          checked={formData.availability}
                          onChange={handleInputChange}
                          className="w-6 h-6 rounded-lg border-2 border-orange-200 text-orange-400 focus:ring-orange-300 focus:ring-offset-0"
                        />
                        <span className="font-semibold">Available</span>
                      </label>

                      <label className="flex items-center gap-3 text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isVegetarian"
                          checked={formData.isVegetarian}
                          onChange={handleInputChange}
                          className="w-6 h-6 rounded-lg border-2 border-orange-200 text-green-400 focus:ring-green-300 focus:ring-offset-0"
                        />
                        <span className="font-semibold">Vegetarian</span>
                      </label>

                      <label className="flex items-center gap-3 text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isSpicy"
                          checked={formData.isSpicy}
                          onChange={handleInputChange}
                          className="w-6 h-6 rounded-lg border-2 border-orange-200 text-red-400 focus:ring-red-300 focus:ring-offset-0"
                        />
                        <span className="font-semibold">Spicy</span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={closeItemModal}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={isEditing ? handleUpdateItem : handleAddItem}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Save className="w-6 h-6" />
                        {isEditing ? "Update Item" : "Add Item"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add/Edit Category Modal */}
          {showAddCategoryForm && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={handleCategoryOverlayClick}
            >
              <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {isEditingCategory ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button
                      onClick={closeCategoryModal}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={categoryFormData.name}
                        onChange={handleCategoryInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                        placeholder="Enter category name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={categoryFormData.description}
                        onChange={handleCategoryInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                        placeholder="Enter category description..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageChange}
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={closeCategoryModal}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={
                          isEditingCategory
                            ? handleUpdateCategory
                            : handleAddCategory
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Save className="w-6 h-6" />
                        {isEditingCategory ? "Update Category" : "Add Category"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenuCategoryManagement;
