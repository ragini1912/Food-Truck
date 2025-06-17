import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  Edit3,
  Plus,
  X,
  Eye,
  EyeOff,
  Trash2,
  Camera,
} from "lucide-react";
import UserNavbar from "../Navbar/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";

export const OrdersTab = ({ orders = [], setShowOrderDetails }) => (
  <div className="w-full max-w-4xl">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
      My Order
    </h1>
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 sm:mb-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-lg md:text-xl shadow-md">
                {order.logo}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base md:text-lg">
                  {order.restaurant}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  Transaction ID: {order.transactionId}
                </p>
                <p className="font-semibold text-green-600 text-sm md:text-base">
                  Total Amount: ₹{order.amount}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                {order.time}
              </p>
              <button
                onClick={() => setShowOrderDetails(order)}
                className="w-full sm:w-auto px-4 md:px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [openFaqs, setOpenFaqs] = useState({});
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
  );
  const [editAddress, setEditAddress] = useState(null);
  const [deleteAddressId, setDeleteAddressId] = useState(null);
  const [deleteCardId, setDeleteCardId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Sample data
  const [userProfile, setUserProfile] = useState({
    name: "Mark Jecno",
    email: "mark.jecno@gmail.com",
    phone: "+1 (892)52 - 95555",
    password: "••••••••",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      label: "Home",
      address: "93 Songbird Cir, Blackville South Carolina, USA-29817",
      phone: "+3 (907) 555-0101",
    },
    {
      id: 2,
      type: "office",
      label: "Office",
      address: "703 Elizabeth Barcus Way, USA-95540",
      phone: "+3 (907) 555-3456",
    },
    {
      id: 3,
      type: "other",
      label: "Smith Jones",
      address: "13th Street 47 W 13th St, New York, USA-10011",
      phone: "+3 (907) 555-1235",
    },
  ]);

  const [cards, setCards] = useState([
    {
      id: 1,
      type: "visa",
      name: "NATHANIEL ELLIS",
      number: "5322 2564 1011 1202",
      expiry: "12/26",
      cvv: "***",
    },
    {
      id: 2,
      type: "mastercard",
      name: "MIKE JONATHAN",
      number: "5322 2564 1011 1234",
      expiry: "11/28",
      cvv: "***",
    },
    {
      id: 3,
      type: "visa",
      name: "JOHN KATHRYN",
      number: "5322 2564 1011 4528",
      expiry: "10/25",
      cvv: "***",
    },
  ]);

  const [settings, setSettings] = useState({
    offerUpdate: true,
    orderUpdate: false,
    newUpdate: true,
  });

  const [orders] = useState([
    {
      id: 1,
      restaurant: "McDonald's",
      transactionId: "#ACB12345458",
      amount: 40.0,
      time: "Today, 3:00 PM",
      logo: "🍟",
      details: {
        items: [
          {
            name: "Mexican Pizza",
            price: 30,
            image:
              "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop",
          },
          {
            name: "Chicken Karahi",
            price: 20,
            image:
              "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop",
          },
        ],
        deliveryCharge: "Free",
        total: 50,
      },
    },
    {
      id: 2,
      restaurant: "Starbucks",
      transactionId: "#ACB12345459",
      amount: 100.0,
      time: "Yesterday, 6:00 PM",
      logo: "☕",
      details: {
        items: [
          {
            name: "Cappuccino",
            price: 45,
            image:
              "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=100&h=100&fit=crop",
          },
          {
            name: "Blueberry Muffin",
            price: 35,
            image:
              "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=100&h=100&fit=crop",
          },
          {
            name: "Americano",
            price: 20,
            image:
              "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=100&h=100&fit=crop",
          },
        ],
        deliveryCharge: "Free",
        total: 100,
      },
    },
    {
      id: 3,
      restaurant: "Pizza Hut",
      transactionId: "#ACB12345678",
      amount: 80.0,
      time: "25 March 2024, 8:00 PM",
      logo: "🍕",
      details: {
        items: [
          {
            name: "Margherita Pizza",
            price: 50,
            image:
              "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=100&h=100&fit=crop",
          },
          {
            name: "Garlic Bread",
            price: 15,
            image:
              "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=100&h=100&fit=crop",
          },
          {
            name: "Coke",
            price: 15,
            image:
              "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
          },
        ],
        deliveryCharge: "Free",
        total: 80,
      },
    },
    {
      id: 4,
      restaurant: "Burger King",
      transactionId: "#ACB12345745",
      amount: 50.0,
      time: "20 March 2024, 9:00 PM",
      logo: "🍔",
      details: {
        items: [
          {
            name: "Whopper",
            price: 35,
            image:
              "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&h=100&fit=crop",
          },
          {
            name: "French Fries",
            price: 10,
            image:
              "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=100&h=100&fit=crop",
          },
          {
            name: "Sprite",
            price: 5,
            image:
              "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=100&h=100&fit=crop",
          },
        ],
        deliveryCharge: "Free",
        total: 50,
      },
    },
  ]);

  // Handle tab switching based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/profile") {
      setActiveTab("profile");
    } else if (path === "/profile/orders") {
      setActiveTab("orders");
    } else if (path === "/profile/settings") {
      setActiveTab("settings");
    } else if (path === "/profile/logout") {
      setShowLogoutModal(true);
      setActiveTab("profile");
      navigate("/profile", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(userProfile[field]);
  };

  const saveEdit = () => {
    if (editingField && editValue.trim()) {
      setUserProfile((prev) => ({ ...prev, [editingField]: editValue }));
      setEditingField(null);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
  };

  const handleDeleteAddress = (id) => {
    setDeleteAddressId(id);
  };

  const confirmDeleteAddress = () => {
    setAddresses((prev) =>
      prev.filter((address) => address.id !== deleteAddressId)
    );
    setDeleteAddressId(null);
  };

  const handleAddCard = () => {
    setShowCardModal(true);
  };

  const handleDeleteCard = (id) => {
    setDeleteCardId(id);
  };

  const confirmDeleteCard = () => {
    setCards((prev) => prev.filter((card) => card.id !== deleteCardId));
    setDeleteCardId(null);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    alert("Logged out successfully!");
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    alert("Account deleted successfully!");
  };

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetProfileImage = () => {
    setProfileImage(
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    );
  };

  const Sidebar = () => (
    <div className="w-full md:w-64 lg:w-80 bg-white shadow-2xl p-4 md:p-8 flex flex-col items-center border-r border-gray-100 min-h-screen">
      <div className="relative mb-6 md:mb-8">
        <div className="w-24 h-16 md:w-32 md:h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
            >
              <Camera size={12} />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
          {userProfile.name}
        </h2>
        <p className="text-gray-500 text-xs md:text-sm">{userProfile.email}</p>
        <button
          onClick={resetProfileImage}
          className="mt-2 text-xs text-orange-500 hover:text-orange-600"
        >
          Reset Profile Picture
        </button>
      </div>

      <nav className="w-full space-y-2">
        {[
          { id: "profile", icon: User, label: "Change Profile" },
          { id: "orders", icon: MapPin, label: "My Order" },
          { id: "addresses", icon: MapPin, label: "Saved Address" },
          { id: "cards", icon: CreditCard, label: "Saved Card" },
          { id: "help", icon: HelpCircle, label: "Help" },
          { id: "settings", icon: Settings, label: "Setting" },
          { id: "logout", icon: LogOut, label: "Log Out" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() =>
              item.id === "logout" ? handleLogout() : setActiveTab(item.id)
            }
            className={`w-full flex items-center space-x-3 px-4 py-3 md:px-6 md:py-4 rounded-xl transition-all duration-300 text-sm md:text-base ${
              activeTab === item.id
                ? "bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 border-l-4 border-orange-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
            }`}
          >
            <item.icon size={16} className="md:w-5 md:h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const ProfileTab = () => (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
        Change Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-6">
        {[
          { icon: "👤", label: "Name", value: userProfile.name, field: "name" },
          {
            icon: "📧",
            label: "Email",
            value: userProfile.email,
            field: "email",
          },
          {
            icon: "📱",
            label: "Phone Number",
            value: userProfile.phone,
            field: "phone",
          },
          {
            icon: "🔒",
            label: "Password",
            value: userProfile.password,
            field: "password",
          },
        ].map((item) => (
          <div
            key={item.field}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 sm:mb-0">
              <span className="text-xl md:text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  {item.label}:
                </p>
                {editingField === item.field ? (
                  <input
                    type={item.field === "password" ? "password" : "text"}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <p
                      className="text-gray-600 text-sm md:text-base"
                      type={
                        item.field === "password" && !showPassword
                          ? "password"
                          : "text"
                      }
                    >
                      {item.value}
                    </p>
                    {item.field === "password" && (
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {editingField === item.field ? (
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={cancelEdit}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit(item.field)}
                className="w-full sm:w-auto px-4 md:px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Change
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const AddressesTab = () => {
    const [editAddressData, setEditAddressData] = useState({
      label: "",
      address: "",
      phone: "",
      type: "",
      city: "",
      country: "",
      zip: "",
    });

    useEffect(() => {
      if (editAddress) {
        setEditAddressData({
          label: editAddress.label,
          address: editAddress.address,
          phone: editAddress.phone,
          type: editAddress.type,
          city: "",
          country: "",
          zip: "",
        });
      }
    }, [editAddress]);

    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const saveEditAddress = () => {
      if (
        editAddressData.label.trim() &&
        editAddressData.address.trim() &&
        editAddressData.phone.trim()
      ) {
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editAddress.id ? { ...addr, ...editAddressData } : addr
          )
        );
        setEditAddress(null);
        setEditAddressData({
          label: "",
          address: "",
          phone: "",
          type: "",
          city: "",
          country: "",
          zip: "",
        });
      }
    };

    return (
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          Saved Address
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl md:text-2xl">
                    {address.type === "home"
                      ? "🏠"
                      : address.type === "office"
                      ? "🏢"
                      : "📍"}
                  </span>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">
                    {address.label}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <Edit3 size={14} className="md:w-4 md:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-2">
                {address.address}
              </p>
              <p className="text-gray-500 text-xs md:text-sm">
                {address.phone}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddAddress}
          className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm md:text-base"
        >
          Add New Address
        </button>

        {/* Edit Address Modal */}
        {editAddress && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setEditAddress(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Edit Address
                </h3>
                <button
                  onClick={() => setEditAddress(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={editAddressData.label}
                    onChange={handleEditChange}
                    placeholder="Enter label (e.g., Home)"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editAddressData.address}
                    onChange={handleEditChange}
                    placeholder="Enter your address"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={editAddressData.phone}
                    onChange={handleEditChange}
                    placeholder="Enter your number"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={editAddressData.city}
                      onChange={handleEditChange}
                      placeholder="Enter your city"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={editAddressData.country}
                      onChange={handleEditChange}
                      placeholder="Enter your country"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      value={editAddressData.type}
                      onChange={handleEditChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Zip
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={editAddressData.zip}
                      onChange={handleEditChange}
                      placeholder="Enter your zip"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setEditAddress(null)}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={saveEditAddress}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all font-medium text-sm md:text-base"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Address Modal */}
        {deleteAddressId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteAddressId(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Delete Address
                </h3>
                <button
                  onClick={() => setDeleteAddressId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Trash2 size={20} className="text-red-500 md:w-6 md:h-6" />
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                  Are you sure you want to delete this address?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setDeleteAddressId(null)}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={confirmDeleteAddress}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm md:text-base"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CardsTab = () => (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
        Saved Card
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`p-4 md:p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300 ${
              card.type === "visa"
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-gray-700 to-gray-900"
            }`}
          >
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="w-6 h-4 md:w-8 md:h-6 bg-yellow-400 rounded"></div>
              <div className="flex space-x-2">
                <div className="text-right">
                  <p className="text-xs opacity-75">EXP</p>
                  <p className="font-bold text-sm md:text-base">
                    {card.expiry}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-red-300 hover:text-red-100"
                >
                  <Trash2 size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>
            <p className="text-base md:text-lg font-mono mb-3 md:mb-4">
              {card.number}
            </p>
            <div className="flex justify-between items-end">
              <p className="font-semibold text-sm md:text-base">{card.name}</p>
              <p className="text-xs md:text-sm">CVV {card.cvv}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddCard}
        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm md:text-base"
      >
        + Add New Card
      </button>

      {/* Delete Card Modal */}
      {deleteCardId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteCardId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Delete Card
              </h3>
              <button
                onClick={() => setDeleteCardId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Trash2 size={20} className="text-red-500 md:w-6 md:h-6" />
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Are you sure you want to delete this card?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDeleteCardId(null)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                >
                  CANCEL
                </button>
                <button
                  onClick={confirmDeleteCard}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm md:text-base"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const HelpTab = () => {
    const faqs = [
      {
        question: "I want to track my order",
        answer:
          "You can track your order by navigating to the 'My Order' tab in your profile. Select the order you wish to track, and click 'Details' to view the current status and estimated delivery time. You’ll also receive real-time updates via email or push notifications if enabled.",
      },
      {
        question: "I want to manage my order",
        answer:
          "To manage your order, go to the 'My Order' tab and select the order. Depending on the order status, you can cancel, modify items, or change the delivery address. Please note that modifications are only available before the order is prepared by the restaurant.",
      },
      {
        question: "I did not receive Instant Cashback",
        answer:
          "If you didn’t receive your Instant Cashback, please ensure the offer was applied at checkout and that your order met the terms (e.g., minimum order value). Contact our support team via the 'Help' section with your transaction ID, and we’ll investigate within 24 hours.",
      },
      {
        question: "I am unable to pay using wallet",
        answer:
          "Ensure your wallet has sufficient balance and is linked to your account. If the issue persists, check for any payment restrictions or try re-linking your wallet in the 'Saved Card' section. For further assistance, reach out to our support team.",
      },
      {
        question: "I want help with returns & refunds",
        answer:
          "For returns or refunds, visit the 'My Order' tab, select the order, and click 'Details.' If eligible, you’ll see an option to initiate a return or request a refund. Our team will process your request within 3-5 business days after verification.",
      },
    ];

    return (
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          FAQ
        </h1>
        <div className="flex items-center justify-center mb-8 md:mb-12">
          <div className="text-center">
            <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-6 md:mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full"></div>
              <div className="absolute inset-4 md:inset-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-4xl md:text-6xl">❓</span>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800 text-sm md:text-base">
                  {faq.question}
                </p>
                <span
                  className={`text-gray-400 text-sm transform transition-transform duration-300 ${
                    openFaqs[index] ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openFaqs[index] && (
                <p className="mt-3 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SettingsTab = () => (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
        Setting
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="space-y-4 md:space-y-6">
          {[
            { key: "offerUpdate", label: "Offer Update" },
            { key: "orderUpdate", label: "Order Update" },
            { key: "newUpdate", label: "New Update" },
          ].map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl"
            >
              <span className="font-medium text-gray-800 text-sm md:text-base">
                {setting.label}
              </span>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [setting.key]: !prev[setting.key],
                  }))
                }
                className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-colors duration-300 ${
                  settings[setting.key] ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    settings[setting.key]
                      ? "translate-x-5 md:translate-x-6"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          Delete Your Account
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-2">
          Hi {userProfile.name}
        </p>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          We are sorry to hear you would like to delete your account.
        </p>
        <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
          <strong>Note:</strong> Deleting your account will permanently remove
          your profile, personal settings, and all other associated information.
          Once your account is deleted, you will be logged out and will be
          unable to log back in.
        </p>
        <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
          If you understand and agree to the above statement, and would still
          like to delete your account, then click below.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 shadow-md hover:shadow-lg font-semibold text-sm md:text-base"
        >
          Delete Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <UserNavbar />
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-black text-white py-3 md:py-4 px-4 md:px-6 shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2 sm:mb-0">
            {activeTab === "profile" && "Profile"}
            {activeTab === "orders" && "My Order"}
            {activeTab === "addresses" && "Saved Address"}
            {activeTab === "cards" && "Saved Card"}
            {activeTab === "help" && "FAQ"}
            {activeTab === "settings" && "Setting"}
          </h1>
          <nav className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
            <span className="text-gray-300">🏠 Home</span>
            <span className="text-gray-300">/</span>
            <span>
              {activeTab === "profile" && "Profile"}
              {activeTab === "orders" && "My Order"}
              {activeTab === "addresses" && "Saved Address"}
              {activeTab === "cards" && "Saved Card"}
              {activeTab === "help" && "FAQ"}
              {activeTab === "settings" && "Setting"}
            </span>
          </nav>
        </div>
      </header>
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              setShowOrderDetails={setShowOrderDetails}
            />
          )}
          {activeTab === "addresses" && <AddressesTab />}
          {activeTab === "cards" && <CardsTab />}
          {activeTab === "help" && <HelpTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
      {/* Order Details Modal */}
      {showOrderDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowOrderDetails(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                Order Details
              </h3>
              <button
                onClick={() => setShowOrderDetails(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl">
                  {showOrderDetails.logo}
                </div>
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-gray-800">
                    {showOrderDetails.restaurant}
                  </h4>
                  <p className="text-sm md:text-base text-gray-500">
                    Transaction ID: {showOrderDetails.transactionId}
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    {showOrderDetails.time}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h5 className="text-base md:text-lg font-semibold text-gray-800">
                  Items
                </h5>
                {showOrderDetails.details.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shadow-sm"
                      />
                      <span className="text-sm md:text-base text-gray-700 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-semibold text-sm md:text-base text-gray-800">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-semibold text-green-600">
                    {showOrderDetails.details.deliveryCharge}
                  </span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold text-gray-800">
                  <span>Grand Total</span>
                  <span>₹{showOrderDetails.details.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Address Modal */}
      {showAddressModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Address Details
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your number"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Zip
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your zip"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all font-medium text-sm md:text-base"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Card Modal */}
      {showCardModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCardModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Add New Card
              </h3>
              <button
                onClick={() => setShowCardModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="Enter card number"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Exp. Date
                  </label>
                  <input
                    type="text"
                    placeholder="dd-mm-yyyy"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your cvv"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowCardModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => setShowCardModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all font-medium text-sm md:text-base"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Account Deletion Request
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Trash2 size={20} className="text-red-500 md:w-6 md:h-6" />
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Please explain your reason for some account before you go. We
                can get better with this knowledge.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                >
                  CANCEL
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm md:text-base"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Logging Out
              </h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <LogOut size={20} className="text-orange-500 md:w-6 md:h-6" />
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Are you Sure, You are logging out.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
                >
                  CANCEL
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all font-medium text-sm md:text-base"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
