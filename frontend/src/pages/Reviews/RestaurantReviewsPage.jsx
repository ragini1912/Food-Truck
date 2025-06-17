import React, { useEffect, useState } from "react";
import {
  Star,
  MessageCircle,
  Send,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  MoreVertical,
  Reply,
  Heart,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RestaurantReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [responseText, setResponseText] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});
  const [filterRating, setFilterRating] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch reviews (mock API call)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const mockReviews = [
          {
            id: 1,
            customerName: "Sarah Johnson",
            rating: 5,
            comment:
              "Absolutely amazing experience! The food was exceptional, service was top-notch, and the ambiance was perfect for our anniversary dinner. Will definitely be coming back!",
            date: "2024-05-28",
            response: null,
            likes: 12,
            orderItems: ["Grilled Salmon", "Pasta Carbonara", "Tiramisu"],
          },
          {
            id: 2,
            customerName: "Michael Chen",
            rating: 4,
            comment:
              "Great food and atmosphere. The steak was cooked perfectly and the wine selection is impressive. Only minor issue was the wait time, but overall excellent.",
            date: "2024-05-25",
            response:
              "Thank you for your feedback! We're working on reducing wait times.",
            likes: 8,
            orderItems: ["Ribeye Steak", "Caesar Salad"],
          },
          {
            id: 3,
            customerName: "Emily Rodriguez",
            rating: 3,
            comment:
              "Food was decent but nothing special. Service could be improved - had to ask multiple times for water refills.",
            date: "2024-05-22",
            response: null,
            likes: 3,
            orderItems: ["Fish Tacos", "Margarita"],
          },
          {
            id: 4,
            customerName: "David Wilson",
            rating: 5,
            comment:
              "Outstanding! Every dish was a masterpiece. The chef clearly knows what they're doing. This is now my favorite restaurant.",
            date: "2024-05-20",
            response: "We're thrilled you enjoyed your experience! Thank you!",
            likes: 15,
            orderItems: ["Beef Wellington", "Chocolate Soufflé"],
          },
          {
            id: 5,
            customerName: "Lisa Thompson",
            rating: 2,
            comment:
              "Disappointed with the quality. The pasta was overcooked and the sauce was bland. Expected much better based on the reviews.",
            date: "2024-05-18",
            response: null,
            likes: 1,
            orderItems: ["Fettuccine Alfredo", "Garlic Bread"],
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setReviews(mockReviews);
        setFilteredReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (review) => new Date(review.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (review) => new Date(review.date) <= new Date(endDate)
      );
    }

    // Sort reviews
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [reviews, filterRating, searchTerm, sortBy, startDate, endDate]);

  const handleResponseSubmit = async (reviewId) => {
    const response = responseText[reviewId];
    if (!response?.trim()) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, response } : review
        )
      );
      setResponseText((prev) => ({ ...prev, [reviewId]: "" }));
      setExpandedReviews((prev) => ({ ...prev, [reviewId]: false }));
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const toggleExpanded = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleLikeReview = (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              likes: review.likes + (likedReviews[reviewId] ? -1 : 1),
            }
          : review
      )
    );
  };

  const handleMoreOptions = (reviewId) => {
    console.log(`More options for review ${reviewId}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600 bg-green-50";
    if (rating >= 3) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return Object.entries(distribution).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Error Loading Reviews
          </h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  const ratingDistribution = getRatingDistribution();

  const chartData = {
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    datasets: [
      {
        label: "Number of Reviews",
        data: [
          ratingDistribution.find((d) => d.rating === 5)?.count || 0,
          ratingDistribution.find((d) => d.rating === 4)?.count || 0,
          ratingDistribution.find((d) => d.rating === 3)?.count || 0,
          ratingDistribution.find((d) => d.rating === 2)?.count || 0,
          ratingDistribution.find((d) => d.rating === 1)?.count || 0,
        ],
        backgroundColor: [
          "#10B981",
          "#F59E0B",
          "#FBBF24",
          "#EF4444",
          "#DC2626",
        ],
        borderColor: ["#059669", "#D97706", "#F59E0B", "#DC2626", "#B91C1C"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Reviews",
        },
      },
      x: {
        title: {
          display: true,
          text: "Rating",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-in">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customer Reviews
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage and respond to customer feedback to build stronger
              relationships
            </p>
          </div>

          {/* Stats Cards and Rating Distribution */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Reviews
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reviews.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Average Rating
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {getAverageRating()}
                      </p>
                      <div className="flex">
                        {renderStars(Math.round(getAverageRating()))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Response Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        (reviews.filter((r) => r.response).length /
                          reviews.length) *
                          100
                      )}
                      %
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Reply className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      5-Star Reviews
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {ratingDistribution.find((d) => d.rating === 5)?.count ||
                        0}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Distribution Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg animate-slide-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Rating Distribution
              </h3>
              <div className="h-48">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg animate-slide-in">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full sm:w-auto flex items-center gap-2 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">Filters</span>
                    {showFilters ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 space-y-4 animate-slide-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 animate-slide-in">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              filteredReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6 sm:p-8">
                    {/* Review Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                console.log(
                                  `View profile: ${review.customerName}`
                                )
                              }
                              className="flex items-center gap-1 font-semibold text-gray-900 text-lg hover:text-blue-600 transition-colors duration-200"
                            >
                              <User className="w-4 h-4" />
                              {review.customerName}
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                                review.rating
                              )}`}
                            >
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {formatDate(review.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <button
                            onClick={() => handleLikeReview(review.id)}
                            className="flex items-center gap-1 focus:outline-none"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                likedReviews[review.id]
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-500"
                              } transition-colors duration-200`}
                            />
                            <span className="text-sm">{review.likes}</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleMoreOptions(review.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-6">
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {review.comment}
                      </p>

                      {review.orderItems && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Order Items:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {review.orderItems.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Existing Response */}
                    {review.response && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2">
                          <Reply className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">
                            Your Response
                          </span>
                        </div>
                        <p className="text-blue-800">{review.response}</p>
                      </div>
                    )}

                    {/* Response Form */}
                    {!review.response && (
                      <div className="border-t border-gray-100 pt-6">
                        <button
                          onClick={() => toggleExpanded(review.id)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors duration-200"
                        >
                          <Reply className="w-4 h-4" />
                          Respond to this review
                          {expandedReviews[review.id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {expandedReviews[review.id] && (
                          <div className="space-y-4 animate-fade-in">
                            <textarea
                              value={responseText[review.id] || ""}
                              onChange={(e) =>
                                setResponseText({
                                  ...responseText,
                                  [review.id]: e.target.value,
                                })
                              }
                              placeholder="Write a thoughtful response to this customer..."
                              className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                              rows="4"
                            />
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                              <button
                                onClick={() => handleResponseSubmit(review.id)}
                                disabled={!responseText[review.id]?.trim()}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                              >
                                <Send className="w-4 h-4" />
                                Send Response
                              </button>
                              <button
                                onClick={() => toggleExpanded(review.id)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <style>
          {`
          .animate-slide-in {
            animation: slideIn 0.6s ease-out forwards;
          }

          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default RestaurantReviewsPage;
