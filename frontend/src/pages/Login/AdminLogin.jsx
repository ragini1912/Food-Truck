import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Shield,
  ArrowRight,
  MessageSquare,
  Timer,
  Sparkles,
} from "lucide-react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [formData, setFormData] = useState({
    phone: "",
    otp: ["", "", "", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Create refs for OTP inputs
  const otpRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
    setMounted(true);
  }, []);

  // Handle OTP timer
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpTimer]);

  // Handle redirect after successful login
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/admin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const validatePhone = (phone) => {
    // Indian phone number validation (10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone) {
      return "Phone number is required";
    }
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  };

  const validateOtp = (otp) => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return "Please enter a valid 6-digit OTP";
    }
    if (!/^\d{6}$/.test(otpString)) {
      return "OTP must contain only digits";
    }
    return "";
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phone: value });
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleOtpChange = (index, value) => {
    // Allow only digits
    const newValue = value.replace(/\D/g, "");
    if (newValue.length > 1) return;

    const newOtp = [...formData.otp];
    newOtp[index] = newValue;
    setFormData({ ...formData, otp: newOtp });

    // Clear OTP error if exists
    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }

    // Auto-focus next input if value is entered
    if (newValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace") {
      if (!formData.otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSendOtp = () => {
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors({ ...errors, phone: phoneError });
      return;
    }

    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setStep("otp");
      setOtpTimer(60);
      setCanResendOtp(false);
      setIsLoading(false);
      setErrors({});

      // Focus first OTP input
      otpRefs.current[0]?.focus();
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const otpError = validateOtp(formData.otp);
    if (otpError) {
      setErrors({ ...errors, otp: otpError });
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      const enteredOtp = formData.otp.join("");
      // Demo mode: Accept 123456 as valid OTP for phone 9876543210
      if (
        (formData.phone === "9876543210" && enteredOtp === "123456") ||
        enteredOtp === "123456" // For demo, accept 123456 for any number
      ) {
        setIsLoggedIn(true);
      } else {
        setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!canResendOtp) return;

    setIsLoading(true);

    // Simulate API call to resend OTP
    setTimeout(() => {
      setOtpTimer(60);
      setCanResendOtp(false);
      setIsLoading(false);
      setErrors({});

      // Focus first OTP input
      otpRefs.current[0]?.focus();
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep("phone");
    setFormData({ phone: "", otp: ["", "", "", "", "", ""] });
    setErrors({});
    setOtpTimer(0);
    setCanResendOtp(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center border border-white/20 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-white/80 mb-2">
            You have successfully logged in to the admin panel.
          </p>
          <p className="text-white/60 text-sm mb-8">
            Phone: +91 {formData.phone}
          </p>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            <p className="text-white font-medium">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <h1 className="text-3xl font-bold text-white ml-3">
              Food Truck <span className="text-teal-300">Admin</span>
            </h1>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl mb-4 shadow-lg">
                {step === "phone" ? (
                  <Phone className="w-8 h-8 text-white" />
                ) : (
                  <Shield className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {step === "phone" ? "Admin Login" : "Verify OTP"}
              </h2>
              <p className="text-white/80">
                {step === "phone"
                  ? "Enter your phone number to continue"
                  : `We've sent a verification code to +91 ${formData.phone}`}
              </p>
            </div>

            {/* Phone Step */}
            {step === "phone" && (
              <div className="space-y-6">
                <div>
                  <label className="text-white/90 text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                      <span className="text-white/70 font-medium">+91</span>
                      <div className="w-px h-5 bg-white/30"></div>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter admin phone"
                      className={`w-full pl-16 pr-4 py-4 bg-white/10 border-2 rounded-xl focus:outline-none focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 ${
                        errors.phone ? "border-red-400" : "border-white/30"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center space-x-2 text-red-300 text-sm mt-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
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

                <div className="text-center text-white/60 text-sm">
                  <p>Demo: Use phone 9876543210</p>
                </div>
              </div>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="space-y-6">
                <div>
                  <label className="text-white/90 text-sm font-medium mb-4 block text-center">
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
                        className={`w-12 h-14 text-center text-xl font-bold bg-white/10 border-2 rounded-lg focus:outline-none focus:bg-white/20 transition-all duration-300 text-white ${
                          errors.otp ? "border-red-400" : "border-white/30"
                        }`}
                        maxLength="1"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <div className="flex items-center justify-center space-x-2 text-red-300 text-sm mt-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{errors.otp}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">
                    {otpTimer > 0 ? `${otpTimer}s remaining` : "Time expired"}
                  </span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Verify & Login</span>
                      </>
                    )}
                  </button>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleBackToPhone}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                    >
                      ← Change number
                    </button>

                    <button
                      onClick={handleResendOtp}
                      disabled={!canResendOtp || isLoading}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-300 disabled:text-white/40 disabled:cursor-not-allowed"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <div className="text-center text-white/60 text-sm">
                  <p>Demo: Use OTP 123456</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-white/60 text-sm">
            <p>Food Truck Admin Panel © 2023</p>
            <p>Secure login with OTP verification</p>
          </div>
        </div>
      </div>
    </>
  );
}
