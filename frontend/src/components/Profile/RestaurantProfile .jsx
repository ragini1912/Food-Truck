import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Star,
  Upload,
  Edit3,
  Save,
  X,
  Check,
} from "lucide-react";

const RestaurantProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "Bella Vista Restaurant",
    email: "contact@bellavista.com",
    phone: "+91 98765 43210",
    website: "www.bellavista.com",
    address: "123 Culinary Street, Food District, Mumbai 400001",
    description:
      "Experience authentic Italian cuisine with a modern twist in our elegant dining space.",
    cuisine: "Italian",
    priceRange: "₹₹₹",
    openingHours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM",
    },
    capacity: "120",
    rating: "4.8",
    totalReviews: "1,247",
    established: "2015",
    specialties: ["Pasta", "Pizza", "Wine Selection", "Desserts"],
    amenities: ["WiFi", "Parking", "Outdoor Seating", "Private Dining"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
      // toast.success('Profile updated successfully!');
    } catch (error) {
      // toast.error('Failed to update profile');
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const FormField = ({
    label,
    name,
    type = "text",
    value,
    placeholder,
    required = false,
    className = "",
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={!isEditing}
          rows={4}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none ${
            !isEditing ? "bg-gray-50" : "bg-white"
          } ${className}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={!isEditing}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            !isEditing ? "bg-gray-50" : "bg-white"
          } ${className}`}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header - Height decreased from h-48 sm:h-64 to h-40 sm:h-48 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-40 sm:h-48 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            {isEditing && (
              <label className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-opacity-30 transition-all duration-200">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="relative px-6 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white shadow-xl overflow-hidden border-4 border-white">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Restaurant"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl sm:text-3xl">
                          {formData.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                    {formData.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{formData.rating}</span>
                      <span>({formData.totalReviews} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{formData.cuisine}</span>
                    <span>•</span>
                    <span>{formData.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 sm:mt-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Save className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-lg">
          <TabButton id="basic" label="Basic Info" icon={Edit3} />
          <TabButton id="contact" label="Contact" icon={Phone} />
          <TabButton id="hours" label="Hours" icon={Clock} />
          <TabButton id="details" label="Details" icon={Star} />
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Restaurant Name"
                  name="name"
                  value={formData.name}
                  placeholder="Enter restaurant name"
                  required
                />
                <FormField
                  label="Cuisine Type"
                  name="cuisine"
                  value={formData.cuisine}
                  placeholder="e.g., Italian, Mexican, Asian"
                />
                <FormField
                  label="Price Range"
                  name="priceRange"
                  value={formData.priceRange}
                  placeholder="e.g., ₹, ₹₹, ₹₹₹, ₹₹₹₹"
                />
                <FormField
                  label="Seating Capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  placeholder="Number of seats"
                />
                <FormField
                  label="Year Established"
                  name="established"
                  type="number"
                  value={formData.established}
                  placeholder="e.g., 2015"
                />
              </div>
              <div className="mt-6">
                <FormField
                  label="Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  placeholder="Describe your restaurant's atmosphere and specialties"
                />
              </div>
            </div>
          )}

          {/* Contact Information */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="restaurant@example.com"
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  placeholder="+91 98765 43210"
                  required
                />
                <FormField
                  label="Website"
                  name="website"
                  type="url"
                  value={formData.website}
                  placeholder="www.restaurant.com"
                />
              </div>
              <div className="mt-6">
                <FormField
                  label="Address"
                  name="address"
                  type="textarea"
                  value={formData.address}
                  placeholder="Full restaurant address"
                  required
                />
              </div>
            </div>
          )}

          {/* Operating Hours */}
          {activeTab === "hours" && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Operating Hours
              </h2>
              <div className="space-y-4">
                {Object.entries(formData.openingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <label className="w-24 text-sm font-semibold text-gray-700 capitalize">
                      {day}
                    </label>
                    <input
                      type="text"
                      name={`openingHours.${day}`}
                      value={hours}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="e.g., 9:00 AM - 10:00 PM"
                      className={`flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          {activeTab === "details" && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      {formData.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {formData.totalReviews}
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {formData.capacity}
                    </div>
                    <div className="text-sm text-gray-600">Capacity</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
