import React, { useState, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  AlertTriangle,
  Info,
  Gift,
  Star,
  Clock,
  MapPin,
  Utensils,
  Sparkles,
  Heart,
  TrendingUp,
  Filter,
} from "lucide-react";
import UserNavbar from "../Navbar/UserNavbar";

const UserNotification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Delivered!",
      message:
        "Your order from Pizza Palace has been delivered. Enjoy your meal!",
      time: "2 minutes ago",
      read: false,
      icon: <Utensils className="w-5 h-5" />,
      action: "Rate Order",
      priority: "high",
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Offer Just for You!",
      message: "Get 30% off on your next order from your favorite restaurants",
      time: "1 hour ago",
      read: false,
      icon: <Gift className="w-5 h-5" />,
      action: "View Offers",
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "New Restaurant Added",
      message: "Spice Garden is now available in your area. Order now!",
      time: "3 hours ago",
      read: true,
      icon: <Star className="w-5 h-5" />,
      action: "Explore",
      priority: "low",
    },
    {
      id: 4,
      type: "warning",
      title: "Delivery Delayed",
      message:
        "Your order might be delayed by 10-15 minutes due to high demand",
      time: "5 hours ago",
      read: true,
      icon: <Clock className="w-5 h-5" />,
      action: "Track Order",
      priority: "high",
    },
    {
      id: 5,
      type: "location",
      title: "Location Services",
      message: "Enable location to discover restaurants near you",
      time: "1 day ago",
      read: false,
      icon: <MapPin className="w-5 h-5" />,
      action: "Enable",
      priority: "medium",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [animatedItems, setAnimatedItems] = useState(new Set());

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    // Animate items on mount
    const timer = setTimeout(() => {
      setAnimatedItems(new Set(notifications.map((n) => n.id)));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getNotificationStyle = (type, read, priority) => {
    const baseStyle =
      "relative overflow-hidden transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 group";

    if (!read) {
      switch (type) {
        case "order":
          return `${baseStyle} bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-200/50 shadow-lg backdrop-blur-sm`;
        case "promotion":
          return `${baseStyle} bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border border-purple-200/50 shadow-lg backdrop-blur-sm`;
        case "warning":
          return `${baseStyle} bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/50 shadow-lg backdrop-blur-sm`;
        case "info":
          return `${baseStyle} bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 border border-blue-200/50 shadow-lg backdrop-blur-sm`;
        case "location":
          return `${baseStyle} bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border border-red-200/50 shadow-lg backdrop-blur-sm`;
        default:
          return `${baseStyle} bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 border border-gray-200/50 shadow-lg backdrop-blur-sm`;
      }
    }
    return `${baseStyle} bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 shadow-md opacity-75 hover:opacity-90`;
  };

  const getIconStyle = (type, read) => {
    const baseStyle = "relative overflow-hidden backdrop-blur-sm";

    if (!read) {
      switch (type) {
        case "order":
          return `${baseStyle} text-emerald-700 bg-gradient-to-br from-emerald-100 to-green-200 shadow-inner`;
        case "promotion":
          return `${baseStyle} text-purple-700 bg-gradient-to-br from-purple-100 to-pink-200 shadow-inner`;
        case "warning":
          return `${baseStyle} text-amber-700 bg-gradient-to-br from-amber-100 to-orange-200 shadow-inner`;
        case "info":
          return `${baseStyle} text-blue-700 bg-gradient-to-br from-blue-100 to-cyan-200 shadow-inner`;
        case "location":
          return `${baseStyle} text-red-700 bg-gradient-to-br from-red-100 to-pink-200 shadow-inner`;
        default:
          return `${baseStyle} text-gray-700 bg-gradient-to-br from-gray-100 to-slate-200 shadow-inner`;
      }
    }
    return `${baseStyle} text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100`;
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-200";
      case "medium":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-200";
      case "low":
        return "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-200";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "order", label: "Orders" },
    { value: "promotion", label: "Offers" },
    { value: "info", label: "Info" },
    { value: "warning", label: "Alerts" },
    { value: "location", label: "Location" },
  ];

  return (
    <>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            display: none;
          }
          .custom-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/50 relative overflow-hidden">
        <UserNavbar />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        <div className="relative z-10 p-4">
          {/* Header */}
          <div className="max-w-[1280px] mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 relative overflow-hidden">
              {/* Header Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                      Notifications
                    </h1>
                    {unreadCount > 0 && (
                      <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg animate-bounce">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <div className="flex items-center space-x-2 flex-1 sm:flex-none">
                      <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm w-full sm:w-auto"
                      >
                        {filterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="relative p-2 sm:p-4 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                    >
                      <Bell className="w-5 h-5 sm:w-6 h-6 group-hover:animate-pulse" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-red-800 text-[10px] sm:text-xs font-bold rounded-full min-w-[20px] sm:min-w-[24px] h-5 sm:h-6 flex items-center justify-center animate-pulse shadow-lg">
                          {unreadCount}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-3 sm:p-4 border border-emerald-200/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-emerald-500 rounded-lg">
                        <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-emerald-800 font-semibold text-sm sm:text-base">
                          {notifications.length}
                        </p>
                        <p className="text-emerald-600 text-xs sm:text-sm">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-3 sm:p-4 border border-orange-200/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-orange-500 rounded-lg">
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-orange-800 font-semibold text-sm sm:text-base">
                          {unreadCount}
                        </p>
                        <p className="text-orange-600 text-xs sm:text-sm">
                          Unread
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-3 sm:p-4 border border-purple-200/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-purple-500 rounded-lg">
                        <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-800 font-semibold text-sm sm:text-base">
                          {
                            notifications.filter((n) => n.type === "promotion")
                              .length
                          }
                        </p>
                        <p className="text-purple-600 text-xs sm:text-sm">
                          Offers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {notifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={markAllAsRead}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                    >
                      <Check className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
                      Mark All Read
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                    >
                      <X className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-w-[1280px] mx-auto space-y-4 sm:space-y-6">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-16 text-center border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-100/50"></div>
                <div className="relative z-10">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-gray-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
                    <Bell className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                    All caught up!
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-lg">
                    No notifications to show. Check back later for updates.
                  </p>
                </div>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`${getNotificationStyle(
                    notification.type,
                    notification.read,
                    notification.priority
                  )} rounded-3xl p-4 sm:p-6 cursor-pointer transform transition-all duration-500 ${
                    animatedItems.has(notification.id)
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  {/* Priority Indicator */}
                  {!notification.read && notification.priority === "high" && (
                    <div
                      className={`absolute top-0 left-0 w-full h-1 ${getPriorityIndicator(
                        notification.priority
                      )} rounded-t-3xl`}
                    ></div>
                  )}

                  <div className="flex items-start gap-4 sm:gap-6">
                    <div
                      className={`p-3 sm:p-4 rounded-2xl ${getIconStyle(
                        notification.type,
                        notification.read
                      )} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {notification.icon}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                            <h3
                              className={`font-bold text-base sm:text-xl ${
                                notification.read
                                  ? "text-gray-600"
                                  : "text-gray-900"
                              } group-hover:text-gray-800 transition-colors`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse shadow-lg"></div>
                                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 animate-pulse" />
                              </div>
                            )}
                          </div>

                          <p
                            className={`text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 ${
                              notification.read
                                ? "text-gray-500"
                                : "text-gray-700"
                            } group-hover:text-gray-600 transition-colors`}
                          >
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                notification.read
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              } bg-white/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}
                            >
                              {notification.time}
                            </span>

                            {notification.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="px-3 sm:px-5 py-1 sm:py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                              >
                                {notification.action}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group/delete"
                          >
                            <X className="w-4 sm:w-5 h-4 sm:h-5 group-hover/delete:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-3xl transition-opacity duration-300"></div>

                  {/* Glow Effect for Unread */}
                  {!notification.read && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotification;
