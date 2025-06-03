import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Shield,
  ArrowRight,
  Check,
  AlertCircle,
  Timer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/Navbar/UserNavbar";

// Simple Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center space-x-2">
      <Check className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

const UserLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone"); // 'phone' or 'otp'
  const [formData, setFormData] = useState({
    phone: "",
    otp: ["", "", "", "", "", ""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigate to home when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setShowToast(true);
      // Short delay for better UX
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  // OTP Timer effect
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    } else if (otpTimer === 0 && step === "otp") {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer, step]);

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Format as +91 XXXXX XXXXX
    if (phoneNumber.length <= 10) {
      return phoneNumber.replace(/(\d{5})(\d{5})/, "$1 $2");
    }
    return phoneNumber.slice(0, 10).replace(/(\d{5})(\d{5})/, "$1 $2");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formattedPhone = formatPhoneNumber(value);

    setFormData((prev) => ({
      ...prev,
      phone: formattedPhone,
    }));

    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...formData.otp];
    newOtp[index] = value.slice(-1); // Only take the last digit

    setFormData((prev) => ({
      ...prev,
      otp: newOtp,
    }));

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const validatePhone = () => {
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!phoneDigits) {
      setErrors({ phone: "Phone number is required" });
      return false;
    }

    if (phoneDigits.length !== 10) {
      setErrors({ phone: "Please enter a valid 10-digit phone number" });
      return false;
    }

    if (!phoneDigits.match(/^[6-9]\d{9}$/)) {
      setErrors({ phone: "Please enter a valid Indian mobile number" });
      return false;
    }

    setErrors({});
    return true;
  };

  const validateOtp = () => {
    const otpString = formData.otp.join("");

    if (otpString.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP" });
      return false;
    }

    if (!/^\d{6}$/.test(otpString)) {
      setErrors({ otp: "OTP must contain only numbers" });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhone()) return;

    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setStep("otp");
      setOtpTimer(30); // 30 seconds timer
      setCanResendOtp(false);
      setIsLoading(false);

      // Focus first OTP input
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;

    setIsLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      const otpString = formData.otp.join("");

      // Demo: Accept OTP 123456
      if (otpString === "123456") {
        setIsLoggedIn(true);
      } else {
        setErrors({
          otp: "Invalid OTP. Try 123456 for demo",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOtp = async () => {
    if (!canResendOtp) return;

    setIsLoading(true);
    setFormData((prev) => ({ ...prev, otp: ["", "", "", "", "", ""] }));

    // Simulate API call to resend OTP
    setTimeout(() => {
      setOtpTimer(30);
      setCanResendOtp(false);
      setIsLoading(false);
      setErrors({});

      // Focus first OTP input
      otpRefs.current[0]?.focus();
    }, 1000);
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setFormData((prev) => ({ ...prev, otp: ["", "", "", "", "", ""] }));
    setErrors({});
    setOtpTimer(0);
    setCanResendOtp(false);
  };

  if (isLoggedIn) {
    return (
      <>
        <UserNavbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
          {showToast && (
            <Toast
              message="Login successful!"
              onClose={() => setShowToast(false)}
            />
          )}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center border border-white/20 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-2">
              You have successfully logged in.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Phone: +91 {formData.phone}
            </p>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mr-3"></div>
              <p className="text-gray-700 font-medium">
                Redirecting to home...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Floating particles */}
        {mounted &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-5xl">🚚</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent ml-3">
              Food Truck
            </h1>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                {step === "phone" ? (
                  <Phone className="w-8 h-8 text-white" />
                ) : (
                  <Shield className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                {step === "phone" ? "User Login" : "Verify OTP"}
              </h2>
              <p className="text-gray-600">
                {step === "phone"
                  ? "Enter your phone number to continue"
                  : `We've sent a verification code to +91 ${formData.phone}`}
              </p>
            </div>

            {/* Phone Step */}
            {step === "phone" && (
              <div className="space-y-6">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                      <span className="text-gray-500 font-medium">+91</span>
                      <div className="w-px h-5 bg-gray-300"></div>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter phone number"
                      className={`w-full pl-16 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-orange-200 focus:border-orange-500"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center text-gray-500 text-sm">
                  <p>Demo: Use any valid 10-digit phone number</p>
                </div>
              </div>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="space-y-6">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-4 block text-center">
                    Enter 6-digit verification code
                  </label>
                  <div className="flex justify-between mb-2">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-12 h-14 text-center text-xl font-bold bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition-all duration-300 ${
                          errors.otp
                            ? "border-red-300 focus:border-red-500"
                            : "border-orange-200 focus:border-orange-500 focus:scale-110"
                        }`}
                        maxLength="1"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <div className="flex items-center justify-center space-x-2 text-red-500 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.otp}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">
                    {otpTimer > 0 ? `${otpTimer}s remaining` : "Time expired"}
                  </span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Verify & Login</span>
                      </>
                    )}
                  </button>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleBackToPhone}
                      className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300"
                    >
                      ← Change number
                    </button>

                    <button
                      onClick={handleResendOtp}
                      disabled={!canResendOtp || isLoading}
                      className="text-orange-600 hover:text-orange-700 text-sm transition-colors duration-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-sm">
                  <p>Demo: Use OTP 123456</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="text-2xl mr-2">🚚</div>
              <p className="text-orange-800 text-sm font-medium">
                Demo Instructions:
              </p>
            </div>
            <p className="text-orange-600 text-xs">
              Enter any 10-digit number starting with 6-9, then use OTP:{" "}
              <strong>123456</strong>
            </p>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Food Truck User Login © 2023</p>
            <p>Secure login with OTP verification</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default UserLogin;
