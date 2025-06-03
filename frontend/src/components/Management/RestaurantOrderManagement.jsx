import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChefHat,
  Phone,
  MapPin,
  DollarSign,
  User,
  Calendar,
  Filter,
  Search,
  Truck,
  Package,
} from "lucide-react";

const RestaurantOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

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

    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, activeTab, searchTerm]);

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-2">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {order.customerName}
              </h3>
              <p className="text-sm text-gray-500">{order.id}</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(
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
              <span className="text-sm">{order.phone}</span>
            </div>
            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{order.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {order.orderTime} • {order.estimatedTime}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-bold text-lg text-green-600">
                  ₹{order.total}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {order.orderType === "delivery" ? (
                  <>
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600">Delivery</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-600">Pickup</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Payment: {order.paymentMethod}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {order.status === "pending" && (
            <>
              <button
                onClick={() => updateOrderStatus(order.id, "preparing")}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ChefHat className="w-4 h-4" />
                <span>Start Preparing</span>
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "cancelled")}
                className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          )}
          {order.status === "preparing" && (
            <button
              onClick={() => updateOrderStatus(order.id, "ready")}
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Ready</span>
            </button>
          )}
          {order.status === "ready" && (
            <button
              onClick={() => updateOrderStatus(order.id, "delivered")}
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Order Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your restaurant orders efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                <span className="text-2xl font-bold text-purple-600">
                  {orders.length}
                </span>
                <span className="text-gray-600 ml-2">Total Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
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
                className={`flex-1 sm:flex-none px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.key ? "bg-white/20" : "bg-gray-200"
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600">
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
  );
};

export default RestaurantOrderManagement;
