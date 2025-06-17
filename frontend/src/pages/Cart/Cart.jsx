import React, { useState } from "react";
import {
  Home,
  User,
  MapPin,
  CreditCard,
  CheckCircle,
  Minus,
  Plus,
  Clock,
  Edit3,
  Building2,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Wallet,
  Truck,
  Check,
  X,
  Timer,
  Package,
} from "lucide-react";
import UserNavbar from "../../components/Navbar/UserNavbar";

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    wallet: false,
    delivery: false,
  });
  const [cardDetails, setCardDetails] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Ultimate Loaded Nacho Fiesta",
      description: "Hot Nacho Chips",
      price: 20,
      quantity: 2,
      serves: 1,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Smoked Salmon Bagel",
      description: "Smoked Biscuit",
      price: 40,
      quantity: 1,
      serves: 2,
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Cranberry Club Sandwich",
      description: "Vegetables",
      price: 50,
      quantity: 1,
      serves: 3,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    },
  ]);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "",
      address: "93, Songbird Cir, Blackville, South Carolina, USA-29817",
      phone: "+33 (907) 555-0101",
    },
    {
      id: 2,
      type: "Office",
      name: "",
      address: "13th St, matrail Cir, Vitactail Beige, New York, USA-10011",
      phone: "+33 (907) 555-1235",
    },
    {
      id: 3,
      type: "Other",
      name: "Smith Jones",
      address: "703, W 156th St, Cross Road, Elizabeth Barcus Way, USA-95540",
      phone: "+33 (907) 555-3456",
    },
  ]);
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: "Mastercard", number: "**** **** 4586", expiry: "12/24" },
    { id: 2, type: "Mastercard", number: "**** **** 4586", expiry: "12/24" },
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    address: "",
    phone: "",
  });

  const steps = [
    { icon: User, label: "Account", key: "account" },
    { icon: MapPin, label: "Address", key: "address" },
    { icon: CreditCard, label: "Payment", key: "payment" },
    { icon: CheckCircle, label: "Confirm", key: "confirm" },
  ];

  const handleSignIn = () => {
    window.location.href = "/login";
  };

  const handleAddAddressNavigation = () => {
    setCurrentStep(1);
  };

  const updateQuantity = (id, change) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 10;
  const deliveryFee = 25;
  const total = subtotal - discount + deliveryFee;

  const handleStepClick = (index) => {
    if (index === 0) {
      setSelectedAddress(null);
      setPaymentMethod(null);
    }
    if (index === 2 && !selectedAddress) {
      alert("Please select an address first.");
      return;
    }
    if (index === 3 && (!selectedAddress || !paymentMethod)) {
      alert("Please complete address and payment steps.");
      return;
    }
    setCurrentStep(index);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedAddress) {
      alert("Please select an address.");
      return;
    }
    if (currentStep === 2 && !paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!selectedAddress) {
      setCurrentStep(1);
      return;
    }
    if (!paymentMethod) {
      setCurrentStep(2);
      return;
    }
    setCurrentStep(3);
  };

  const handleTrackOrder = () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please complete all previous steps.");
      return;
    }
    setShowOrderTracking(true);
    setCurrentStep(4);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleOpenAddressModal = (address = null) => {
    setEditingAddress(address);
    setNewAddress(
      address
        ? { ...address }
        : { type: "Home", name: "", address: "", phone: "" }
    );
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
    setNewAddress({ type: "Home", name: "", address: "", phone: "" });
  };

  const handleSaveAddress = () => {
    if (!newAddress.address || !newAddress.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr
        )
      );
      if (selectedAddress?.id === editingAddress.id) {
        setSelectedAddress({ ...newAddress, id: editingAddress.id });
      }
    } else {
      const newId = addresses.length + 1;
      setAddresses((prev) => [...prev, { ...newAddress, id: newId }]);
    }
    handleCloseAddressModal();
  };

  const handleSaveCard = () => {
    if (
      !cardDetails.number ||
      !cardDetails.holder ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all card details.");
      return;
    }
    const maskedNumber = `**** **** ${cardDetails.number.slice(-4)}`;
    const newCard = {
      id: savedCards.length + 1,
      type: "Mastercard",
      number: maskedNumber,
      expiry: cardDetails.expiry,
    };
    setSavedCards((prev) => [...prev, newCard]);
    setPaymentMethod(`card-${newCard.id}`);
    setCardDetails({ number: "", holder: "", expiry: "", cvv: "" });
    setShowCardForm(false);
  };

  const handleChangeAddress = () => {
    setCurrentStep(1);
  };

  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <div className="relative">
          <button
            onClick={handleCloseAddressModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <select
                value={newAddress.type}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, type: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (Optional)
              </label>
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
                placeholder="Enter name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                placeholder="Enter full address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleCloseAddressModal}
              className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderTracking = ({ setShowOrderTracking }) => {
    const [trackingStatus] = useState([
      {
        id: 1,
        status: "Order Placed",
        time: "10:30 AM",
        completed: true,
        icon: CheckCircle,
      },
      {
        id: 2,
        status: "Preparing",
        time: "10:45 AM",
        completed: true,
        icon: Timer,
      },
      {
        id: 3,
        status: "Out for Delivery",
        time: "11:15 AM",
        completed: false,
        icon: Truck,
      },
      {
        id: 4,
        status: "Delivered",
        time: "Expected 11:30 AM",
        completed: false,
        icon: Package,
      },
    ]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600">Order ID: #FD12345</p>
                <p className="text-sm text-gray-500">
                  Estimated delivery: 25-30 minutes
                </p>
              </div>

              <div className="space-y-6">
                {trackingStatus.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p
                          className={`font-semibold ${
                            item.completed ? "text-gray-800" : "text-gray-400"
                          }`}
                        >
                          {item.status}
                        </p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                      {index < trackingStatus.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-8 ${
                            trackingStatus[index + 1].completed
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowOrderTracking(false);
                    setCurrentStep(0);
                    setSelectedAddress(null);
                    setPaymentMethod(null);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Account
        return (
          <div className="bg-white rounded-3xl shadow-xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 text-center py-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl mb-6 shadow-2xl">
                <div className="text-6xl">🍕</div>
              </div>

              <div className="flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-gray-600">
                  Estimated delivery: 25-30 mins
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">Account</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                To place your order now, log in to your existing account or sign
                up
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignIn}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  Sign In
                </button>
                <button
                  onClick={handleAddAddressNavigation}
                  className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-md font-semibold hover:bg-orange-50 transition-all duration-200"
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        );

      case 1: // Address
        return (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Select Saved Address
            </h3>
            <p className="text-gray-600 mb-6">
              You've added some addresses before. You can select one below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedAddress?.id === address.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {address.type === "Home" && (
                        <Home className="w-5 h-5 text-orange-500 mr-2" />
                      )}
                      {address.type === "Office" && (
                        <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                      )}
                      {address.type === "Other" && (
                        <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                      )}
                      <span className="font-semibold text-gray-800">
                        {address.type}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAddressModal(address);
                      }}
                      className="text-orange-500 hover:text-orange-600 transition-colors flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      <span className="text-sm">Edit</span>
                    </button>
                  </div>

                  {address.name && (
                    <div className="flex items-center mb-2">
                      <UserCheck className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {address.name}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 text-sm mb-3">
                    {address.address}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{address.phone}</p>

                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      selectedAddress?.id === address.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    {selectedAddress?.id === address.id
                      ? "Selected"
                      : "Deliver Here"}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => handleOpenAddressModal()}
                className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-md font-semibold hover:bg-orange-50 transition-all duration-200"
              >
                Add New Address
              </button>
            </div>

            {selectedAddress && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>
        );

      case 2: // Payment
        return (
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Deliver to: {selectedAddress?.type || "Not selected"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedAddress?.address || "Please select an address"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleChangeAddress}
                  className="text-orange-500 font-medium hover:text-orange-600"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Choose Payment Method
              </h3>
              <p className="text-gray-600 mb-6">
                Select your preferred payment option
              </p>

              {/* Credit/Debit Card Section */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors"
                  onClick={() => setShowCardForm(!showCardForm)}
                >
                  <span className="font-semibold text-gray-800">
                    Credit / Debit Card
                  </span>
                  {showCardForm ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {showCardForm && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your card number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            number: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter cardholder name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={cardDetails.holder}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            holder: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exp. Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiry: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveCard}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                    >
                      Save Card
                    </button>
                  </div>
                )}

                {/* Saved Cards */}
                <div className="mt-4 space-y-3">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === `card-${card.id}`
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(`card-${card.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {card.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              {card.number} • Exp: {card.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-orange-500 hover:text-orange-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {paymentMethod === `card-${card.id}` && (
                            <CheckCircle className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wallet Section */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors"
                  onClick={() => toggleSection("wallet")}
                >
                  <div className="flex items-center">
                    <Wallet className="w-6 h-6 text-gray-600 mr-3" />
                    <span className="font-semibold text-gray-800">Wallet</span>
                  </div>
                  {expandedSections.wallet ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {expandedSections.wallet && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Available Balance:</span>
                      <span className="text-xl font-bold text-green-600">
                        ₹150.00
                      </span>
                    </div>
                    <button
                      className={`w-full py-3 rounded-md font-semibold transition-all duration-200 ${
                        paymentMethod === "wallet"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("wallet")}
                    >
                      Use Wallet
                    </button>
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  paymentMethod === "cod"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">₹</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      Cash on Delivery
                    </span>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleNextStep}
                  disabled={!paymentMethod}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50"
                >
                  Continue to Confirm
                </button>
              </div>
            </div>
          </div>
        );

      case 3: // Confirm
        return (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Order Confirmation
              </h3>
              <p className="text-gray-600">
                Please review your order details before confirming
              </p>
            </div>

            <div className="space-y-6">
              {/* Delivery Address */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                  Delivery Address
                </h4>
                {selectedAddress ? (
                  <div>
                    <p className="font-medium text-gray-800">
                      {selectedAddress.type}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedAddress.address}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedAddress.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No address selected</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
                  Payment Method
                </h4>
                <p className="text-gray-600">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "wallet"
                    ? "Wallet"
                    : paymentMethod?.startsWith("card-")
                    ? "Credit/Debit Card"
                    : "Not selected"}
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 text-orange-500 mr-2" />
                  Order Summary
                </h4>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="text-gray-800">₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery Time */}
              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-orange-500 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Estimated Delivery Time
                    </p>
                    <p className="text-orange-600">25-30 minutes</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-md font-semibold hover:bg-orange-50 transition-all duration-200"
                >
                  Back to Payment
                </button>
                <button
                  onClick={handleTrackOrder}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        );

      case 4: // Order Tracking
        return <OrderTracking setShowOrderTracking={setShowOrderTracking} />;
      default:
        return null;
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Shopping Cart
              </h1>
              <div className="flex items-center space-x-2 text-sm">
                <Home className="w-4 h-4" />
                <span>Home</span>
                <span>/</span>
                <span className="text-orange-400">Cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Steps and Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                      <React.Fragment key={step.key}>
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => handleStepClick(index)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                              isActive
                                ? "bg-orange-500 text-white shadow-lg transform scale-110"
                                : isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                            }`}
                            disabled={index > currentStep}
                          >
                            {isCompleted ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <Icon className="w-6 h-6" />
                            )}
                          </button>
                          <span
                            className={`text-sm font-medium ${
                              isActive
                                ? "text-orange-600"
                                : isCompleted
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-4 rounded-full transition-all duration-200 ${
                              index < currentStep
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Step Content */}
              {renderStepContent()}
              {showAddressModal && <AddressModal />}
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Minus className="w-3 h-3 text-orange-600" />
                            </button>
                            <span className="mx-2 font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Plus className="w-3 h-3 text-orange-600" />
                            </button>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charge</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount (10%)</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-600">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center mb-4">
                      <Timer className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-gray-600">
                        Estimated delivery: 25-30 mins
                      </span>
                    </div>

                    {currentStep < 3 ? (
                      <button
                        onClick={handleCheckout}
                        disabled={orderItems.length === 0}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Checkout
                      </button>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-green-600 font-semibold">
                          Order Confirmed!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
