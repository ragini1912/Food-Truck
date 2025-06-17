import React, { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight, Check, Lock, Utensils, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RestaurantNavbar from "../../components/Navbar/RestaurantNavbar";

// Toast Component
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

export default function RestaurantLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const otpRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0 && step === "otp") {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  useEffect(() => {
    if (isLoggedIn) {
      setShowToast(true);
      const timer = setTimeout(() => {
        navigate("/restaurant"); // Redirect to restaurant home page
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone) return "Phone number is required";
    if (phone.length !== 10) return "Phone number must be 10 digits";
    if (!phoneRegex.test(phone))
      return "Please enter a valid Indian mobile number";
    return "";
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(value);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handlePhoneSubmit(e);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const phoneError = validatePhone(phoneNumber);
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(30);
      setCanResend(false);
      // Focus first OTP input
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && !isLoading && otp.join("").length === 6) {
      handleOtpSubmit(e);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter complete OTP" });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  const handleResendOtp = () => {
    setCanResend(false);
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => {
      alert("OTP resent successfully!");
    }, 500);
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
    setTimer(0);
    setCanResend(false);
    setErrors({});
  };

  if (isLoggedIn) {
    return (
      <>
        <RestaurantNavbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
          {showToast && (
            <Toast
              message="Login successful! Welcome to our restaurant."
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
              Phone: +91 {phoneNumber}
            </p>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mr-3"></div>
              <p className="text-gray-700 font-medium">
                Redirecting to restaurant page...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RestaurantNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
        {showToast && (
          <Toast
            message="Login successful! Welcome to our restaurant."
            onClose={() => setShowToast(false)}
          />
        )}
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
        </div>

        {/* Main container */}
        <div className="relative w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              {step === "phone"
                ? "Enter your phone number to continue"
                : "Enter the OTP sent to your phone"}
            </p>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs font-semibold text-blue-800 mb-1">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-700">
                Phone: <span className="font-mono font-bold">9876543210</span>
              </p>
              <p className="text-xs text-blue-700">
                OTP: <span className="font-mono font-bold">123456</span>
              </p>
            </div>
          </div>

          {/* Login card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            {/* Card decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === "phone"
                      ? "bg-orange-500 text-white shadow-lg scale-110"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {step === "otp" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`w-12 h-1 rounded-full transition-all duration-500 ${
                    step === "otp" ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === "otp"
                      ? "bg-orange-500 text-white shadow-lg scale-110"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Phone number step */}
            {step === "phone" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm font-medium">
                        +91
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      className={`w-full pl-14 pr-4 py-4 bg-gray-50 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-orange-500"
                      }`}
                      placeholder="Enter your mobile number"
                      maxLength="10"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <button
                  onClick={handlePhoneSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* OTP step */}
            {step === "otp" && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">OTP sent to</p>
                  <p className="font-semibold text-gray-900">
                    +91 {phoneNumber}
                  </p>
                  <button
                    onClick={handleBackToPhone}
                    className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors duration-200 mt-1"
                  >
                    Change number
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                      Enter 6-digit OTP
                    </label>
                    <div className="flex justify-between mb-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
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
                      <p className="mt-3 text-sm text-red-600 text-center flex items-center justify-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  {/* Timer and resend */}
                  <div className="text-center">
                    {timer > 0 ? (
                      <p className="text-sm text-gray-600">
                        Resend OTP in{" "}
                        <span className="font-semibold text-orange-600">
                          {timer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-orange-600 text-sm font-semibold hover:text-orange-700 transition-colors duration-200"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleOtpSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Verify & Login</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-1 text-yellow-600 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Trusted by <span className="font-semibold">10,000+</span> food
              lovers
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
