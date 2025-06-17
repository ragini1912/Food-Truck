import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Star,
  ChefHat,
  Utensils,
  Heart,
  Search,
  Quote,
  User,
  Calendar,
  ThumbsUp,
  Eye,
  Grid3x3,
  List,
  Play,
  X,
  Navigation,
  CreditCard,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantHeroSection = () => {
  const navigate = useNavigate();

  // State from Orders Component
  const [orders, setOrders] = useState([
    {
      id: "#ORD-001",
      customerName: "Sarah Johnson",
      customerPhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      items: [
        {
          name: "Grilled Salmon",
          quantity: 1,
          price: 3500,
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "Garlic Bread",
          quantity: 2,
          price: 675,
          image:
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "Red Wine",
          quantity: 1,
          price: 975,
          image:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
      ],
      total: 5150,
      status: "Preparing",
      time: "2:45 PM",
      estimatedTime: "30 min",
      phone: "+1 987-654-3210",
      address: "Table 12",
      orderType: "Dine-in",
      paymentMethod: "Cash",
    },
    {
      id: "#ORD-002",
      customerName: "Emma Davis",
      customerPhoto:
        "https://images.unsplash.com/photo-1573497019940-1c28b88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      items: [
        {
          name: "Chicken Alfredo",
          quantity: 1,
          price: 1725,
          image:
            "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "Bruschetta",
          quantity: 1,
          price: 750,
          image:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "Iced Tea",
          quantity: 2,
          price: 450,
          image:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
      ],
      total: 2925,
      status: "Ready",
      time: "3:15 PM",
      estimatedTime: "10 min",
      phone: "+1 456-789-0123",
      address: "456 Pine Avenue, Westside",
      orderType: "Pickup",
      paymentMethod: "Debit Card",
    },
    {
      id: "#ORD-003",
      customerName: "Michael Chen",
      customerPhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      items: [
        {
          name: "Beef Burger",
          quantity: 1,
          price: 1425,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "French Fries",
          quantity: 1,
          price: 525,
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080e4b3f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
        {
          name: "Coca-Cola",
          quantity: 1,
          price: 225,
          image:
            "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
        },
      ],
      total: 2175,
      status: "Pending",
      time: "3:30 PM",
      estimatedTime: "40 min",
      phone: "+1 321-098-7654",
      address: "789 Elm Street, Eastside",
      orderType: "Delivery",
      paymentMethod: "UPI",
    },
  ]);

  // State from Menu/Reviews Component
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [viewMode, setViewMode] = useState("grid");
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedItems, setLikedItems] = useState(new Set());
  const [itemsPerReviewSlide, setItemsPerReviewSlide] = useState(3);

  const categories = [
    {
      name: "All Items",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=150&q=80",
      count: 45,
    },
    {
      name: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1546069901-d9c5e0c7197d?ixlib=rb-4.0.3&auto=format&fit=crop&w=234&h=234&q=80",
      count: 8,
    },
    {
      name: "Main Course",
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
      count: 12,
    },
    {
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
      count: 6,
    },
    {
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1571066811602-716837d9302b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
      count: 8,
    },
    {
      name: "Pasta",
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=234&q=80",
      count: 5,
    },
    {
      name: "Seafood",
      image:
        "https://images.unsplash.com/photo-1511690656952-343557f1970f?ixlib=rb-4.0.3&auto=format&fit=crop&w=234&h=234&q=80",
      count: 7,
    },
    {
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1563729781350-7d31b6e9b9b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      count: 6,
    },
    {
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=234&q=80",
      count: 10,
    },
    {
      name: "Salads",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=234&h=234&q=80",
      count: 4,
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Chicken Dumplings",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1563379091513-25e2363e6301?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Appetizers",
      description: "Steamed chicken dumplings with ginger soy sauce",
      rating: 4.8,
      reviews: 245,
      isVeg: false,
      isSpicy: true,
      cookTime: "15 min",
    },
    {
      id: 2,
      name: "Egg Roll",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Appetizers",
      description: "Crispy golden egg rolls with sweet chili sauce",
      rating: 4.6,
      reviews: 189,
      isVeg: true,
      isSpicy: false,
      cookTime: "10 min",
    },
    {
      id: 3,
      name: "Fried Cheese Wonton",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Appetizers",
      description: "Crispy wontons filled with cream cheese",
      rating: 4.7,
      reviews: 156,
      isVeg: true,
      isSpicy: false,
      cookTime: "12 min",
    },
    {
      id: 4,
      name: "Vegetable Dumplings",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Appetizers",
      description: "Fresh vegetable dumplings with sesame oil",
      rating: 4.5,
      reviews: 203,
      isVeg: true,
      isSpicy: false,
      cookTime: "15 min",
    },
    {
      id: 5,
      name: "Classic Beef Burger",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Burgers",
      description: "Juicy beef patty with lettuce, tomato, and special sauce",
      rating: 4.9,
      reviews: 312,
      isVeg: false,
      isSpicy: false,
      cookTime: "20 min",
    },
    {
      id: 6,
      name: "Cheese Deluxe Burger",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Burgers",
      description: "Double cheese burger with crispy bacon",
      rating: 4.8,
      reviews: 267,
      isVeg: false,
      isSpicy: false,
      cookTime: "22 min",
    },
    {
      id: 7,
      name: "BBQ Bacon Burger",
      price: 580,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Burgers",
      description: "Smoky BBQ burger with crispy bacon and onion rings",
      rating: 4.7,
      reviews: 225,
      isVeg: false,
      isSpicy: true,
      cookTime: "25 min",
    },
    {
      id: 8,
      name: "Mushroom Swiss Burger",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      category: "Burgers",
      description: "Grilled mushrooms with Swiss cheese and truffle aioli",
      rating: 4.6,
      reviews: 145,
      isVeg: true,
      isSpicy: false,
      cookTime: "18 min",
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      date: "2024-05-15",
      review:
        "Absolutely amazing experience! The food was exceptional, service was top-notch, and the ambiance was perfect for our anniversary dinner. Will definitely be back!",
      dishes: ["Grilled Salmon", "Pasta Carbonara", "Tiramisu"],
      likes: 42,
      helpful: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 4,
      date: "2024-05-10",
      review:
        "Great food and atmosphere. The steak was cooked perfectly, and the wine selection was impressive. Only minor issue was the wait time, but overall excellent!",
      dishes: ["Ribeye Steak", "Caesar Salad"],
      likes: 28,
      helpful: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 3,
      date: "2024-05-05",
      review:
        "Food was decent but nothing special. Service could be improved - had to ask multiple times for water refills. The atmosphere was lovely, though.",
      dishes: ["Fish Tacos", "Margarita"],
      likes: 15,
      helpful: false,
    },
    {
      id: "4",
      name: "David Thompson",
      image:
        "https://images.unsplash.com/photo-150703321169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      date: "2024-04-28",
      review:
        "Outstanding dining experience! Every dish was crafted with care and attention to detail. The chef's special was phenomenal. Highly recommend!",
      dishes: ["Chef's Special", "Truffle Risotto", "Chocolate Soufflé"],
      likes: 56,
      helpful: true,
    },
    {
      id: "5",
      name: "Lisa Wang",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 4,
      date: "2024-04-22",
      review:
        "Lovely restaurant with great ambiance. The pasta was delicious, and the portions were generous. Staff was friendly and attentive throughout our meal.",
      dishes: ["Penne Arrabbiata", "Garlic Bread", "House Wine"],
      likes: 33,
      helpful: true,
    },
    {
      id: "6",
      name: "James Wilson",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      date: "2024-04-18",
      review:
        "Perfect spot for a business dinner. The private dining area was excellent, food quality was top-notch, and service was professional. Will return soon!",
      dishes: ["Seafood Platter", "Prime Rib", "Crème Brûlée"],
      likes: 47,
      helpful: true,
    },
  ];

  // Orders Handlers
  const getStatusColor = (status) => {
    if (!status || typeof status !== "string") {
      console.warn(`Invalid status: ${status}. Defaulting to gray.`);
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "preparing":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ready":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewAllOrders = () => {
    navigate("/restaurant/order-manage");
  };

  const getOrderTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "delivery":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "pickup":
        return <User className="w-4 h-4 text-purple-400" />;
      case "dine-in":
        return <Utensils className="w-4 h-4 text-green-600" />;
      default:
        return <Utensils className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleStartPreparing = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Preparing" } : order
      )
    );
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const handleTrackOrder = (orderId) => {
    alert(`Opening order tracking for ${orderId}`);
  };

  // Menu/Reviews Handlers
  const getItemsPerReviewSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // sm: 1 review per slide
      if (window.innerWidth < 1024) return 2; // md: 2 reviews per slide
      return 3; // lg: 3 reviews
    }
    return 3; // default
  };

  const handleViewAllMenu = () => {
    navigate("/restaurant/menu");
  };

  const handleViewAllReviews = () => {
    navigate("/restaurant/review");
  };

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerReviewSlide(getItemsPerReviewSlide());
      setCurrentReviewSlide(0); // Reset to first review slide on resize
    };

    setItemsPerReviewSlide(getItemsPerReviewSlide());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewSlide(
        (prevSlide) =>
          (prevSlide + 1) %
          Math.max(1, reviews.length - itemsPerReviewSlide + 1)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length, itemsPerReviewSlide]);

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All Items" ||
        item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedItems = filteredItems.slice(0, 8);

  const toggleLike = (itemId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i <= Math.floor(rating) - 1
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 -right-4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-4 w-64 sm:w-96 h-64 sm:h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Restaurant Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 sm:mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <ChefHat className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
            Bella Vista
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Premium Italian Restaurant • Order Management & Menu
          </p>

          {/* Restaurant Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                4.9
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Average Rating
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Downtown
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Prime Location
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                25 min
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">Avg Delivery</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <Utensils className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  New Orders
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Manage incoming orders efficiently
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-orange-200 shadow-lg">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">
                Live Updates
              </span>
            </div>
          </div>

          {/* Order Cards */}
          <div className="space-y-2 sm:space-y-4 mb-8 sm:mb-12">
            {orders.map((order) => (
              <div key={order.id} className="group">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-8">
                    {/* Order Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 lg:mb-0">
                        <div className="relative">
                          <img
                            src={order.customerPhoto}
                            alt={order.customerName}
                            className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl object-cover border-2 border-orange-200 shadow-md"
                            loading="lazy"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 sm:w-6 h-5 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {order.customerName}
                          </h3>
                          <p className="text-gray-500 font-medium text-sm sm:text-base">
                            {order.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-4">
                        <span
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status || "Unknown"}
                        </span>
                        <div
                          className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 ${
                            order.orderType.toLowerCase() === "delivery"
                              ? "bg-blue-50 border-blue-200"
                              : order.orderType.toLowerCase() === "pickup"
                              ? "bg-purple-50 border-purple-200"
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          {getOrderTypeIcon(order.orderType)}
                          <span className="text-xs sm:text-sm font-bold text-gray-700">
                            {order.orderType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {order.phone}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-red-500 mt-0.5" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {order.address}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {order.time} • {order.estimatedTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            Payment: {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-2 sm:space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-xl shadow-lg"
                                loading="lazy"
                              />
                              <div>
                                <span className="text-gray-800 font-semibold text-base sm:text-lg block">
                                  {item.name}
                                </span>
                                <span className="text-gray-600 text-xs sm:text-sm">
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="text-base sm:text-lg font-bold text-gray-900">
                              ₹{item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total and Actions */}
                    <div className="border-t-2 border-gray-100 pt-4 sm:pt-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 sm:space-y-4 lg:space-y-0">
                        <div className="text-2xl sm:text-3xl font-bold text-green-600">
                          ₹{order.total.toFixed(2)}
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
                          {order.status?.toLowerCase() === "pending" && (
                            <button
                              onClick={() => handleStartPreparing(order.id)}
                              className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto box-border"
                              aria-label={`Start preparing order ${order.id}`}
                            >
                              <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                              <span>Start Preparing</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto box-border"
                            aria-label={`Cancel order ${order.id}`}
                          >
                            <X className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span>Cancel</span>
                          </button>
                          {order.orderType.toLowerCase() === "delivery" && (
                            <button
                              onClick={() => handleTrackOrder(order.id)}
                              className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto box-border"
                              aria-label={`Track order ${order.id}`}
                            >
                              <Navigation className="w-4 sm:w-5 h-4 sm:h-5" />
                              <span>Track</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Orders Button */}
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={handleViewAllOrders}
              className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:from-orange-700 hover:to-red-700 transform hover:scale-105 shadow-2xl hover:shadow-orange-600/25"
              aria-label="View all orders"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-2 sm:space-x-3">
                <Utensils className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View All Orders</span>
              </span>
            </button>
          </div>

          {/* Menu Section */}
          <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                  <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Our Menu
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg text-center">
                    Discover our carefully crafted dishes
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-white rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200 text-sm sm:text-base"
                    aria-label="Search dishes"
                  />
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Slider */}
            <div className="bg-white border-b border-gray-200 py-3 sm:py-4 mb-6 sm:mb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div
                  className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex-shrink-0 flex flex-col items-center space-y-1 sm:space-y-2 p-3 sm:p-4 rounded-xl transition-all duration-200 min-w-[100px] sm:min-w-[120px] relative overflow-hidden ${
                        selectedCategory === category.name
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm border border-gray-200"
                      }`}
                      aria-label={`Select ${category.name} category`}
                    >
                      <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden mb-1">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 ${
                            selectedCategory === category.name
                              ? "bg-white bg-opacity-20"
                              : "bg-black bg-opacity-0 hover:bg-opacity-10"
                          } transition-all duration-200`}
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                        {category.name} ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div
              className={`grid gap-4 sm:gap-6 mb-6 sm:mb-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-40 sm:w-48 flex-shrink-0" : ""
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                        viewMode === "list"
                          ? "w-full h-full"
                          : "w-full h-40 sm:h-48"
                      }`}
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                      aria-label={
                        likedItems.has(item.id)
                          ? `Unlike ${item.name}`
                          : `Like ${item.name}`
                      }
                    >
                      <Heart
                        className={`w-4 sm:w-5 h-4 sm:h-5 ${
                          likedItems.has(item.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex space-x-1 sm:space-x-2">
                      {item.isVeg && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                          VEG
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                          🌶️ SPICY
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 sm:p-6 ${
                      viewMode === "list" ? "flex-1" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(item.rating)}
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">
                          {item.rating} ({item.reviews})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-500">
                        <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                          {item.cookTime}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between ${
                        viewMode === "list" ? "mt-3 sm:mt-4" : ""
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-bold text-green-600">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Menu Button */}
            <div className="text-center">
              <button
                onClick={handleViewAllMenu}
                className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:from-orange-700 hover:to-red-600 transform hover:scale-105 shadow-2xl hover:shadow-orange-600/25"
                aria-label="View all menu items"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2 sm:space-x-3">
                  <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                  <span>View All Items</span>
                </span>
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <Quote className="w-6 sm:w-8 h-6 sm:h-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  What our guests are saying
                </p>
              </div>
            </div>

            {/* Reviews Slider */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentReviewSlide * (100 / itemsPerReviewSlide)
                    }%)`,
                  }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className={`flex-shrink-0 px-1 sm:px-2 ${
                        itemsPerReviewSlide === 1
                          ? "w-full"
                          : itemsPerReviewSlide === 2
                          ? "w-1/2"
                          : "w-1/3"
                      }`}
                    >
                      <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-orange-200 mr-2"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                {review.name}
                              </h4>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              {renderStars(review.rating)}
                              <span className="text-xs sm:text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="mb-2 sm:mb-2">
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {review.review}
                          </p>
                        </div>

                        {/* Ordered Dishes */}
                        <div className="items mb-3 sm:mb-4">
                          <h5 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                            Ordered Items:
                          </h5>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {review.dishes.map((dish, index) => (
                              <span
                                key={index}
                                className="px-1.5 sm:px-2 py-2 sm:py-2 bg-gray-50 text-orange-600 text-[10px] sm:text-xs font-semibold rounded-full"
                              >
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Review Actions */}
                        <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-gray-200">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              className="flex items-center space-x-0.5 sm:space-x-1 text-gray-500 hover:text-orange-500 transition-colors duration-200"
                              aria-label={`Like review by ${review.name}`}
                            >
                              <ThumbsUp className="w-3 sm:w-4 h-3 sm:h-4" />
                              <span className="text-[10px] sm:text-xs">
                                {review.likes}
                              </span>
                            </button>
                            {review?.helpful && (
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-600 text-[10px] sm:text-xs font-semibold rounded-full">
                                Helpful
                              </span>
                            )}
                          </div>
                          <button
                            className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-semibold"
                            aria-label={`Reply to review by ${review.name}`}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View All Reviews Button */}
            <div className="text-center mt-8 sm:mt-12">
              <button
                onClick={handleViewAllReviews}
                className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:from-orange-700 hover:to-red-600 transform hover:scale-105 shadow-lg hover:shadow-orange-600/25 transition-all duration-300"
                aria-label="View all reviews"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-300"></span>
                <span className="relative flex items-center space-x-2 sm:space-x-3">
                  <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                  <span>View All Reviews</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeroSection;
