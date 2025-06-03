import React, { useState, useEffect } from "react";
import {
  ChefHat,
  DollarSign,
  ShoppingBag,
  Clock,
  TrendingUp,
  Users,
  Star,
  Bell,
  Menu,
  X,
  Calendar,
  MapPin,
  Phone,
  Settings,
  BarChart3,
  Package,
  Utensils,
  MessageSquare,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  Target,
  PieChart,
  Activity,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Maximize,
  Camera,
  Share2,
  Heart,
  ThumbsUp,
  MessageCircle,
  Send,
} from "lucide-react";

// New: Modal component for order details and menu editing
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(12);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [liveOrders, setLiveOrders] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("today");
  // New: State for orders, menu items, and modals
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "",
    price: "",
    image: "🍽️",
    status: "active",
  });

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize data
  useEffect(() => {
    // Sample data initialization (same as before)
    setOrders([
      {
        id: "#ORD-001",
        customer: "John Doe",
        items: "Pasta Carbonara, Caesar Salad",
        amount: 450,
        status: "preparing",
        time: "2 min ago",
        priority: "high",
        table: "T-05",
      },
      // ... other orders
    ]);
    setMenuItems([
      {
        id: 1,
        name: "Pasta Carbonara",
        category: "Main Course",
        price: 320,
        orders: 45,
        status: "active",
        rating: 4.8,
        image: "🍝",
        profit: 180,
      },
      // ... other menu items
    ]);
    setTodayNotifications([
      {
        id: 1,
        type: "order",
        message: "New order from Table T-15",
        time: "2 min ago",
        read: false,
      },
      // ... other notifications
    ]);
  }, []);

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newOrder = {
          id: `#ORD-${Math.floor(Math.random() * 1000)}`,
          customer: [
            "John Smith",
            "Sarah Johnson",
            "Mike Wilson",
            "Emma Davis",
          ][Math.floor(Math.random() * 4)],
          items: [
            "Pasta Carbonara",
            "Pizza Margherita",
            "Caesar Salad",
            "Tiramisu",
          ][Math.floor(Math.random() * 4)],
          amount: Math.floor(Math.random() * 800) + 200,
          status: "new",
          time: "Just now",
          priority: "normal",
          table: `T-0${Math.floor(Math.random() * 10)}`,
        };
        setLiveOrders((prev) => [newOrder, ...prev.slice(0, 4)]);
        setOrders((prev) => [newOrder, ...prev]);
        setTodayNotifications((prev) => [
          {
            id: Date.now(),
            type: "order",
            message: `New order from ${newOrder.customer}`,
            time: "Just now",
            read: false,
          },
          ...prev,
        ]);
        setNotifications((prev) => prev + 1);
        if (soundEnabled) {
          console.log("🔔 New order received!");
        }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // New: Dynamic chart data based on period
  const getSalesData = () => {
    const baseData = [
      { name: "Mon", revenue: 15000, orders: 45 },
      { name: "Tue", revenue: 18000, orders: 52 },
      { name: "Wed", revenue: 22000, orders: 61 },
      { name: "Thu", revenue: 19000, orders: 48 },
      { name: "Fri", revenue: 28000, orders: 75 },
      { name: "Sat", revenue: 35000, orders: 89 },
      { name: "Sun", revenue: 32000, orders: 82 },
    ];
    if (chartPeriod === "today") {
      return [{ name: "Today", revenue: 24750, orders: 156 }];
    } else if (chartPeriod === "month") {
      return [
        { name: "Week 1", revenue: 85000, orders: 250 },
        { name: "Week 2", revenue: 95000, orders: 280 },
        { name: "Week 3", revenue: 105000, orders: 310 },
        { name: "Week 4", revenue: 115000, orders: 340 },
      ];
    }
    return baseData; // Default: weekly data
  };

  // New: Order status update
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setLiveOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setTodayNotifications((prev) => [
      {
        id: Date.now(),
        type: "order",
        message: `Order ${orderId} updated to ${newStatus}`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotifications((prev) => prev + 1);
  };

  // New: View order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // New: Menu item CRUD operations
  const handleAddMenuItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...newMenuItem,
      price: parseFloat(newMenuItem.price),
      orders: 0,
      rating: 0,
      profit: newMenuItem.price * 0.6, // Example profit calculation
    };
    setMenuItems((prev) => [...prev, newItem]);
    setNewMenuItem({
      name: "",
      category: "",
      price: "",
      image: "🍽️",
      status: "active",
    });
    setShowMenuModal(false);
    setTodayNotifications((prev) => [
      {
        id: Date.now(),
        type: "menu",
        message: `New menu item "${newItem.name}" added`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotifications((prev) => prev + 1);
  };

  const handleEditMenuItem = (item) => {
    setEditingMenuItem(item);
    setNewMenuItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image,
      status: item.status,
    });
    setShowMenuModal(true);
  };

  const handleUpdateMenuItem = (e) => {
    e.preventDefault();
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingMenuItem.id
          ? {
              ...item,
              ...newMenuItem,
              price: parseFloat(newMenuItem.price),
              profit: parseFloat(newMenuItem.price) * 0.6,
            }
          : item
      )
    );
    setShowMenuModal(false);
    setEditingMenuItem(null);
    setNewMenuItem({
      name: "",
      category: "",
      price: "",
      image: "🍽️",
      status: "active",
    });
    setTodayNotifications((prev) => [
      {
        id: Date.now(),
        type: "menu",
        message: `Menu item "${newMenuItem.name}" updated`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotifications((prev) => prev + 1);
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    setTodayNotifications((prev) => [
      {
        id: Date.now(),
        type: "menu",
        message: `Menu item deleted`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotifications((prev) => prev + 1);
  };

  // New: Notification management
  const handleMarkNotificationRead = (id) => {
    setTodayNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setNotifications((prev) => Math.max(0, prev - 1));
  };

  const handleClearNotifications = () => {
    setTodayNotifications([]);
    setNotifications(0);
  };

  // New: Export data as CSV
  const handleExportData = () => {
    const headers = ["ID,Customer,Items,Amount,Status,Time,Priority,Table"];
    const orderRows = orders.map(
      (order) =>
        `${order.id},${order.customer},"${order.items}",${order.amount},${order.status},${order.time},${order.priority},${order.table}`
    );
    const csvContent = [...headers, ...orderRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // New: Search and filter orders
  const filteredOrders = orders.filter((order) => {
    if (selectedFilter !== "all" && order.status !== selectedFilter)
      return false;
    if (!searchTerm) return true;
    return (
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // New: Search and filter menu items
  const filteredMenuItems = menuItems.filter((item) => {
    if (!searchTerm) return true;
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // New: Refresh dashboard
  const handleRefresh = () => {
    // Simulate data refresh
    setTodayNotifications((prev) => [
      {
        id: Date.now(),
        type: "system",
        message: "Dashboard refreshed",
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotifications((prev) => prev + 1);
  };

  const getStatusColor = (status) => {
    const colors = {
      preparing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      ready: "bg-green-100 text-green-800 border-green-200",
      delivered: "bg-blue-100 text-blue-800 border-blue-200",
      new: "bg-purple-100 text-purple-800 border-purple-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      "low-stock": "bg-red-100 text-red-800 border-red-200",
      active: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-500",
      high: "bg-orange-500",
      normal: "bg-blue-500",
      low: "bg-gray-500",
    };
    return colors[priority] || "bg-gray-500";
  };

  const MetricCard = ({
    icon: Icon,
    title,
    value,
    change,
    color,
    subtitle,
    trend,
  }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 relative`}>
          <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
          {trend && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${change < 0 ? "rotate-180" : ""}`}
            />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3
        className={`text-2xl font-bold mb-1 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </h3>
      <p
        className={`text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className={`text-xs mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  const OrderCard = ({ order }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } rounded-xl p-4 border hover:shadow-md transition-all duration-200 relative overflow-hidden`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(
          order.priority
        )}`}
      ></div>
      <div className="flex items-center justify-between mb-3 ml-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {order.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {order.customer}
            </h4>
            <div className="flex items-center space-x-2">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {order.id}
              </p>
              {order.table && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.table}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              order.status
            )}`}
          >
            <option value="new">New</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex space-x-1">
            <button
              onClick={() => handleViewOrder(order)}
              className={`p-1 rounded hover:${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className={`p-1 rounded hover:${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <p
        className={`text-sm mb-2 ml-3 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {order.items}
      </p>
      <div className="flex items-center justify-between ml-3">
        <span className="font-bold text-green-600">₹{order.amount}</span>
        <span
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {order.time}
        </span>
      </div>
    </div>
  );

  const MenuItem = ({ item }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } rounded-xl p-4 border hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{item.image}</span>
          <div>
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {item.name}
            </h4>
            <div className="flex items-center space-x-2">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.category}
              </p>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span
                  className={`text-xs ml-1 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleEditMenuItem(item)}
            className={`p-1 rounded hover:${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteMenuItem(item.id)}
            className={`p-1 rounded hover:bg-red-100 text-red-600`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-green-600">₹{item.price}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            item.status
          )}`}
        >
          {item.status === "active" ? "Active" : "Low Stock"}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {item.orders} orders
        </span>
        <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Profit: ₹{item.profit}
        </span>
      </div>
    </div>
  );

  const SimpleChart = ({ data, period }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Revenue Trend
        </h3>
        <select
          value={period}
          onChange={(e) => setChartPeriod(e.target.value)}
          className={`px-3 py-1 rounded-lg border text-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="h-48 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg relative group cursor-pointer hover:shadow-lg transition-all duration-200"
              style={{
                height: `${
                  (item.revenue / Math.max(...data.map((d) => d.revenue))) * 100
                }%`,
                minHeight: "20px",
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{item.revenue.toLocaleString()}
              </div>
            </div>
            <span
              className={`text-xs mt-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const sidebarItems = [
    { id: "overview", icon: BarChart3, label: "Overview", badge: null },
    {
      id: "orders",
      icon: ShoppingBag,
      label: "Orders",
      badge: orders.filter((o) => o.status === "pending").length,
    },
    { id: "menu", icon: Utensils, label: "Menu", badge: null },
    { id: "customers", icon: Users, label: "Customers", badge: null },
    { id: "analytics", icon: PieChart, label: "Analytics", badge: null },
    { id: "reviews", icon: MessageSquare, label: "Reviews", badge: 3 },
    { id: "inventory", icon: Package, label: "Inventory", badge: 2 },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ];

  // New: Metrics calculation
  const metrics = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "preparing").length,
    dailyRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
    customersSatisfaction: (
      menuItems.reduce((sum, item) => sum + item.rating, 0) /
      (menuItems.length || 1)
    ).toFixed(1),
    activeMenuItems: menuItems.length,
    totalCustomers: new Set(orders.map((o) => o.customer)).size,
    avgOrderValue: Math.round(
      orders.reduce((sum, o) => sum + o.amount, 0) / (orders.length || 1)
    ),
    completionRate: Math.round(
      (orders.filter((o) => o.status === "delivered").length /
        (orders.length || 1)) *
        100
    ),
    peakHours: "7-9 PM",
    topDish: menuItems.sort((a, b) => b.orders - a.orders)[0]?.name || "N/A",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Bistro Pro
              </span>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-400" : "bg-red-400"
                  } animate-pulse`}
                ></div>
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-lg hover:${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl mb-2 transition-all duration-200 group ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : `${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    } hover:text-gray-900`
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === item.id
                      ? "bg-white bg-opacity-20"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div
            className={`p-3 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Actions
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white hover:bg-gray-50"
                } shadow-sm transition-colors`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white hover:bg-gray-50"
                } shadow-sm transition-colors`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white hover:bg-gray-50"
                } shadow-sm transition-colors`}
              >
                {isOnline ? (
                  <Wifi className="w-4 h-4" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Enhanced Header */}
        <header
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm border-b px-4 lg:px-8 py-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg hover:${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Welcome back, Chef!
                  </p>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search orders, menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-9 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className={`p-2 rounded-xl hover:${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } transition-colors`}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleExportData}
                  className={`p-2 rounded-xl hover:${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } transition-colors`}
                >
                  <Download className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-xl hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } relative transition-colors`}
                  >
                    <Bell className="w-6 h-6" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div
                      className={`absolute right-0 mt-2 w-80 ${
                        darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      } rounded-xl shadow-xl border z-50`}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Notifications
                        </h3>
                        <button
                          onClick={handleClearNotifications}
                          className="text-orange-500 hover:text-orange-600 text-sm"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {todayNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:${
                              darkMode ? "bg-gray-700" : "bg-gray-50"
                            } ${
                              !notif.read
                                ? "bg-blue-50 dark:bg-blue-900 bg-opacity-30"
                                : ""
                            } flex justify-between items-center`}
                          >
                            <div>
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {notif.message}
                              </p>
                              <span
                                className={`text-xs ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {notif.time}
                              </span>
                            </div>
                            {!notif.read && (
                              <button
                                onClick={() =>
                                  handleMarkNotificationRead(notif.id)
                                }
                                className="text-blue-500 hover:text-blue-600 text-xs"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-white font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Modals */}
        <Modal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          title="Order Details"
        >
          {selectedOrder && (
            <div className="space-y-4">
              <p>
                <strong>ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Items:</strong> {selectedOrder.items}
              </p>
              <p>
                <strong>Amount:</strong> ₹{selectedOrder.amount}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Priority:</strong> {selectedOrder.priority}
              </p>
              <p>
                <strong>Table:</strong> {selectedOrder.table}
              </p>
              <p>
                <strong>Time:</strong> {selectedOrder.time}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, "delivered")
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={showMenuModal}
          onClose={() => {
            setShowMenuModal(false);
            setEditingMenuItem(null);
            setNewMenuItem({
              name: "",
              category: "",
              price: "",
              image: "🍽️",
              status: "active",
            });
          }}
          title={editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}
        >
          <form
            onSubmit={
              editingMenuItem ? handleUpdateMenuItem : handleAddMenuItem
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={newMenuItem.name}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  value={newMenuItem.category}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, category: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  value={newMenuItem.price}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, price: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  Image (Emoji)
                </label>
                <input
                  type="text"
                  value={newMenuItem.image}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, image: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  Status
                </label>
                <select
                  value={newMenuItem.status}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, status: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenuModal(false);
                    setEditingMenuItem(null);
                    setNewMenuItem({
                      name: "",
                      category: "",
                      price: "",
                      image: "🍽️",
                      status: "active",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  {editingMenuItem ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </Modal>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {liveOrders.length > 0 && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <span className="font-semibold">
                        Live: New order from {liveOrders[0].customer}
                      </span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                        ₹{liveOrders[0].amount}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewOrder(liveOrders[0])}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Order
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                <MetricCard
                  icon={ShoppingBag}
                  title="Total Orders"
                  value={metrics.totalOrders}
                  change={12}
                  color="bg-blue-500"
                  subtitle="Today"
                  trend={true}
                />
                <MetricCard
                  icon={Clock}
                  title="Pending Orders"
                  value={metrics.pendingOrders}
                  color="bg-yellow-500"
                  subtitle="Needs attention"
                />
                <MetricCard
                  icon={DollarSign}
                  title="Daily Revenue"
                  value={`₹${metrics.dailyRevenue.toLocaleString()}`}
                  change={8}
                  color="bg-green-500"
                  subtitle="vs yesterday"
                />
                <MetricCard
                  icon={Star}
                  title="Satisfaction"
                  value={`${metrics.customersSatisfaction}/5`}
                  change={2}
                  color="bg-purple-500"
                  subtitle="Customer rating"
                />
                <MetricCard
                  icon={Users}
                  title="Total Customers"
                  value={metrics.totalCustomers}
                  change={15}
                  color="bg-pink-500"
                  subtitle="This month"
                />
                <MetricCard
                  icon={Target}
                  title="Avg Order Value"
                  value={`₹${metrics.avgOrderValue}`}
                  change={5}
                  color="bg-indigo-500"
                  subtitle="Per order"
                />
                <MetricCard
                  icon={CheckCircle}
                  title="Completion Rate"
                  value={`${metrics.completionRate}%`}
                  change={3}
                  color="bg-teal-500"
                  subtitle="Orders completed"
                />
                <MetricCard
                  icon={Activity}
                  title="Peak Hours"
                  value={metrics.peakHours}
                  color="bg-orange-500"
                  subtitle="Busiest time"
                />
                <MetricCard
                  icon={Utensils}
                  title="Top Dish"
                  value={metrics.topDish}
                  color="bg-rose-500"
                  subtitle="Most ordered"
                />
                <MetricCard
                  icon={Package}
                  title="Menu Items"
                  value={metrics.activeMenuItems}
                  color="bg-cyan-500"
                  subtitle="Active items"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <SimpleChart data={getSalesData()} period={chartPeriod} />
                </div>

                <div
                  className={`${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-xl p-6 shadow-lg border`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Performance Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Orders Today
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {metrics.totalOrders}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Revenue Goal
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{metrics.dailyRevenue.toLocaleString()}/₹30k
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Customer Satisfaction
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {metrics.customersSatisfaction}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                        style={{ width: "96%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Today's Highlights
                      </span>
                    </div>
                    <ul
                      className={`text-sm space-y-1 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <li>• Peak order time: 7:30 PM</li>
                      <li>• Best seller: {metrics.topDish}</li>
                      <li>• New customer: +{metrics.totalCustomers}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div
                  className={`${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-2xl p-6 shadow-lg border`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Recent Orders
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-2 rounded-lg hover:${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        } transition-colors`}
                      >
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredOrders.slice(0, 6).map((order, index) => (
                      <OrderCard key={index} order={order} />
                    ))}
                  </div>
                </div>

                <div
                  className={`${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  } rounded-2xl p-6 shadow-lg border`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Popular Menu Items
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowMenuModal(true)}
                        className={`p-2 rounded-lg hover:${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        } transition-colors`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                        Manage Menu
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredMenuItems.map((item, index) => (
                      <MenuItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Order Management
                  </h2>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Track and manage all orders
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className={`px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="all">All Orders</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button
                    onClick={() => setShowMenuModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    New Order
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {metrics.pendingOrders}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Preparing
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {orders.filter((o) => o.status === "delivered").length}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Completed
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {orders.filter((o) => o.status === "cancelled").length}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Cancelled
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{metrics.dailyRevenue.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Today's Revenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                } rounded-2xl p-6 shadow-lg border`}
              >
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Menu Management
                  </h2>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Manage your restaurant menu
                  </p>
                </div>
                <button
                  onClick={() => setShowMenuModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Utensils className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {menuItems.length}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Total Items
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {
                          menuItems.filter(
                            (item) => item.status === "low-stock"
                          ).length
                        }
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Low Stock
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {metrics.customersSatisfaction}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Avg Rating
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-4 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {menuItems.reduce((sum, item) => sum + item.orders, 0)}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Total Orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Analytics Dashboard
                </h2>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Detailed insights and reports
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SimpleChart data={getSalesData()} period={chartPeriod} />
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl p-6 shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Top Performing Items
                  </h3>
                  <div className="space-y-3">
                    {filteredMenuItems
                      .sort((a, b) => b.orders - a.orders)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{item.image}</span>
                            <div>
                              <p
                                className={`font-medium ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {item.name}
                              </p>
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {item.orders} orders
                              </p>
                            </div>
                          </div>
                          <span className="text-green-600 font-semibold">
                            ₹{item.profit * item.orders}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {["customers", "reviews", "inventory", "settings"].includes(
            activeTab
          ) && (
            <div
              className={`${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              } rounded-2xl p-6 shadow-lg border`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <div className="text-center py-12">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center`}
                >
                  {activeTab === "customers" && (
                    <Users className="w-8 h-8 text-white" />
                  )}
                  {activeTab === "reviews" && (
                    <MessageSquare className="w-8 h-8 text-white" />
                  )}
                  {activeTab === "inventory" && (
                    <Package className="w-8 h-8 text-white" />
                  )}
                  {activeTab === "settings" && (
                    <Settings className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Module
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-6`}
                >
                  {activeTab === "customers" &&
                    "Customer management features and analytics coming soon..."}
                  {activeTab === "reviews" &&
                    "Review management and response system coming soon..."}
                  {activeTab === "inventory" &&
                    "Inventory tracking and management system coming soon..."}
                  {activeTab === "settings" &&
                    "System settings and configuration options coming soon..."}
                </p>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
