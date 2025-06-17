import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChefHat,
  Phone,
  MapPin,
  User,
  Calendar,
  Filter,
  Search,
  Truck,
  Package,
} from "lucide-react";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

const RestaurantOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Food item images from Unsplash
  const getFoodImage = (itemName) => {
    const imageMap = {
      "Margherita Pizza":
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop&crop=center",
      "Caesar Salad":
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop&crop=center",
      "Coca Cola":
        "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=300&h=200&fit=crop&crop=center",
      "Chicken Burger":
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&crop=center",
      "French Fries":
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop&crop=center",
      "Spaghetti Carbonara":
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop&crop=center",
      "Garlic Bread":
        "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=300&h=200&fit=crop&crop=center",
      Tiramisu:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop&crop=center",
      "Grilled Salmon":
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop&crop=center",
      "Rice Pilaf":
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop&crop=center",
    };
    return (
      imageMap[itemName] ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center"
    );
  };

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockOrders = [
      {
        id: "#ORD-001",
        customerName: "John Doe",
        phone: "+1 234-567-8900",
        address: "123 Main St, City, State 12345",
        items: [
          { name: "Margherita Pizza", quantity: 2, price: 24.99 },
          { name: "Caesar Salad", quantity: 1, price: 12.99 },
          { name: "Coca Cola", quantity: 2, price: 4.99 },
        ],
        total: 67.96,
        status: "pending",
        orderTime: "2:30 PM",
        estimatedTime: "45 min",
        paymentMethod: "Credit Card",
        orderType: "delivery",
      },
      {
        id: "#ORD-002",
        customerName: "Sarah Johnson",
        phone: "+1 234-567-8901",
        address: "456 Oak Ave, City, State 12345",
        items: [
          { name: "Chicken Burger", quantity: 1, price: 15.99 },
          { name: "French Fries", quantity: 1, price: 6.99 },
        ],
        total: 22.98,
        status: "preparing",
        orderTime: "2:45 PM",
        estimatedTime: "30 min",
        paymentMethod: "Cash",
        orderType: "pickup",
      },
      {
        id: "#ORD-003",
        customerName: "Mike Wilson",
        phone: "+1 234-567-8902",
        address: "789 Pine St, City, State 12345",
        items: [
          { name: "Spaghetti Carbonara", quantity: 1, price: 18.99 },
          { name: "Garlic Bread", quantity: 1, price: 8.99 },
          { name: "Tiramisu", quantity: 1, price: 9.99 },
        ],
        total: 37.97,
        status: "ready",
        orderTime: "1:15 PM",
        estimatedTime: "Ready",
        paymentMethod: "Credit Card",
        orderType: "delivery",
      },
      {
        id: "#ORD-004",
        customerName: "Emily Davis",
        phone: "+1 234-567-8903",
        address: "321 Elm St, City, State 12345",
        items: [
          { name: "Grilled Salmon", quantity: 1, price: 26.99 },
          { name: "Rice Pilaf", quantity: 1, price: 8.99 },
        ],
        total: 35.98,
        status: "delivered",
        orderTime: "12:30 PM",
        estimatedTime: "Completed",
        paymentMethod: "Digital Wallet",
        orderType: "delivery",
      },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filter orders based on status and search
  useEffect(() => {
    let filtered = orders;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "delivered":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "delivered":
        return <Package className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-1.5">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {order.customerName}
              </h3>
              <p className="text-sm text-gray-500">{order.id}</p>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm xs:text-base">{order.phone}</span>
            </div>
            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm xs:text-base line-clamp-2">
                {order.address}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm xs:text-base">
                {order.orderTime} • {order.estimatedTime}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-green-600">
                  ₹{order.total}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {order.orderType === "delivery" ? (
                  <>
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-500">Delivery</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-600">Pickup</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Payment: {order.paymentMethod}
            </div>
          </div>
        </div>

        {/* Items with Images */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-base text-gray-900 mb-3">
            Order Items
          </h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-lg p-3 border-b border-gray-100 last:border-none"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={getFoodImage(item.name)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center";
                    }}
                  />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-base text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-base font-semibold text-gray-900">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {order.status === "pending" && (
            <>
              <button
                onClick={() => updateOrderStatus(order.id, "preparing")}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <ChefHat className="w-4 h-4" />
                <span>Start Preparing</span>
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "cancelled")}
                className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          )}
          {order.status === "preparing" && (
            <button
              onClick={() => updateOrderStatus(order.id, "ready")}
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Ready</span>
            </button>
          )}
          {order.status === "ready" && (
            <button
              onClick={() => updateOrderStatus(order.id, "delivered")}
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
            >
              <Package className="w-4 h-4" />
              <span>Mark Delivered</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const getOrderCount = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Order Management
                </h1>
                <p className="text-gray-600 text-base mt-1">
                  Manage your restaurant orders efficiently
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
                  <span className="text-2xl font-bold text-blue-600">
                    {orders.length}
                  </span>
                  <span className="text-gray-600 text-base ml-2">
                    Total Orders
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1 text-base"
                  aria-label="Filter orders"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10">
                    <div className="py-1">
                      {[
                        { key: "all", label: "All Orders" },
                        { key: "pending", label: "Pending" },
                        { key: "preparing", label: "Preparing" },
                        { key: "ready", label: "Ready" },
                        { key: "delivered", label: "Delivered" },
                      ].map((status) => (
                        <button
                          key={status.key}
                          onClick={() => {
                            setSelectedStatus(status.key);
                            setActiveTab(status.key);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-blue-50 transition-all duration-200 ${
                            selectedStatus === status.key
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {[
                { key: "all", label: "All Orders", count: orders.length },
                {
                  key: "pending",
                  label: "Pending",
                  count: getOrderCount("pending"),
                },
                {
                  key: "preparing",
                  label: "Preparing",
                  count: getOrderCount("preparing"),
                },
                { key: "ready", label: "Ready", count: getOrderCount("ready") },
                {
                  key: "delivered",
                  label: "Delivered",
                  count: getOrderCount("delivered"),
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm font-bold ${
                      activeTab === tab.key ? "bg-white/20" : "bg-blue-100"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orders Grid */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-600 text-base">
                  No orders match your current filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="transform transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <OrderCard order={order} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantOrderManagement;
