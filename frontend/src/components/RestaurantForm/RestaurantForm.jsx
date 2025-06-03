import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Upload,
  Camera,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const RestaurantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",

    // Location Details
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Restaurant Details
    cuisineType: "",
    restaurantType: "",
    seatingCapacity: "",

    // Business Information
    gstNumber: "",
    fssaiLicense: "",
    establishedYear: "",

    // Operating Hours
    openingTime: "",
    closingTime: "",
    workingDays: [],

    // Additional Details
    specialities: "",
    description: "",
    averagePrice: "",

    // Documents
    restaurantImages: [],
    menuImages: [],
    licenseDocuments: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cuisineOptions = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Italian",
    "Continental",
    "Mexican",
    "Thai",
    "Japanese",
    "Mediterranean",
    "Fast Food",
    "Street Food",
    "Bakery",
    "Desserts",
    "Multi-Cuisine",
  ];

  const restaurantTypes = [
    "Fine Dining",
    "Casual Dining",
    "Quick Service",
    "Food Truck",
    "Cafe",
    "Bar & Grill",
    "Buffet",
    "Cloud Kitchen",
  ];

  const workingDaysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.restaurantName.trim())
          newErrors.restaurantName = "Restaurant name is required";
        if (!formData.ownerName.trim())
          newErrors.ownerName = "Owner name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        if (formData.phone && !/^\d{10}$/.test(formData.phone))
          newErrors.phone = "Phone number must be 10 digits";
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
        break;
      case 3:
        if (!formData.cuisineType)
          newErrors.cuisineType = "Cuisine type is required";
        if (!formData.restaurantType)
          newErrors.restaurantType = "Restaurant type is required";
        if (!formData.seatingCapacity)
          newErrors.seatingCapacity = "Seating capacity is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Restaurant registration submitted successfully!");
      console.log("Form Data:", formData);
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormInput = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
    icon: Icon,
    ...props
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
            errors[name] ? "border-red-500 ring-2 ring-red-200" : ""
          }`}
          {...props}
        />
      </div>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4" />
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  const FormSelect = ({
    label,
    name,
    options,
    required = false,
    placeholder,
    icon: Icon,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${
            errors[name] ? "border-red-500 ring-2 ring-red-200" : ""
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4" />
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {step < currentStep ? <Check className="h-5 w-5" /> : step}
          </motion.div>
          {step < 5 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step < currentStep
                  ? "bg-orange-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <ChefHat className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Basic Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's start with your restaurant details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Restaurant Name"
                name="restaurantName"
                required
                placeholder="Enter restaurant name"
                icon={ChefHat}
              />
              <FormInput
                label="Owner Name"
                name="ownerName"
                required
                placeholder="Enter owner name"
              />
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                required
                placeholder="Enter email address"
                icon={Mail}
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                required
                placeholder="Enter 10-digit phone number"
                icon={Phone}
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Location Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Where is your restaurant located?
              </p>
            </div>

            <div className="space-y-6">
              <FormInput
                label="Full Address"
                name="address"
                required
                placeholder="Enter complete address"
                icon={MapPin}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  label="City"
                  name="city"
                  required
                  placeholder="Enter city"
                />
                <FormInput
                  label="State"
                  name="state"
                  required
                  placeholder="Enter state"
                />
                <FormInput
                  label="Pincode"
                  name="pincode"
                  type="number"
                  required
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Star className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Restaurant Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your restaurant
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Cuisine Type"
                name="cuisineType"
                options={cuisineOptions}
                required
                placeholder="Select cuisine type"
                icon={ChefHat}
              />
              <FormSelect
                label="Restaurant Type"
                name="restaurantType"
                options={restaurantTypes}
                required
                placeholder="Select restaurant type"
                icon={Star}
              />
              <FormInput
                label="Seating Capacity"
                name="seatingCapacity"
                type="number"
                required
                placeholder="Enter seating capacity"
                icon={Users}
              />
              <FormInput
                label="Average Price per Person"
                name="averagePrice"
                type="number"
                placeholder="Enter average price (₹)"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Restaurant Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describe your restaurant, ambiance, and unique features..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Business Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Operating hours and business details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Opening Time"
                name="openingTime"
                type="time"
                placeholder="Select opening time"
                icon={Clock}
              />
              <FormInput
                label="Closing Time"
                name="closingTime"
                type="time"
                placeholder="Select closing time"
                icon={Clock}
              />
              <FormInput
                label="GST Number"
                name="gstNumber"
                placeholder="Enter GST number"
              />
              <FormInput
                label="FSSAI License"
                name="fssaiLicense"
                placeholder="Enter FSSAI license number"
              />
              <FormInput
                label="Established Year"
                name="establishedYear"
                type="number"
                placeholder="Enter establishment year"
              />
              <FormInput
                label="Specialities"
                name="specialities"
                placeholder="Enter your signature dishes"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Working Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {workingDaysOptions.map((day) => (
                  <label
                    key={day}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.workingDays.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                      className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Upload className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Final Review
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Review your information before submitting
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Restaurant:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.restaurantName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Owner:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.ownerName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Email:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.email}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Phone:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.phone}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Location:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.city}, {formData.state}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Cuisine:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {formData.cuisineType}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-orange-500"
              />
              <span>
                I agree to the terms and conditions and privacy policy
              </span>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Restaurant Registration
            </h1>
            <p className="text-orange-100 text-center mt-2">
              Join our platform and grow your business
            </p>
          </div>

          <div className="p-8">
            <StepIndicator />

            <div onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Previous
                  </motion.button>
                )}

                <div className="ml-auto">
                  {currentStep < 5 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center gap-2 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <Check className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantForm;
