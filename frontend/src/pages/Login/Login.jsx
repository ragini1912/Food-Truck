import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();

  const showMessage = (msg) => {
    setSnackbarMsg(msg);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(mobile))
      return showMessage("Enter valid 10-digit number.");
    showMessage(`OTP sent to ${mobile}`);
    setStep(2);
    setResendTimer(30);
  };

  useEffect(() => {
    if (step === 2 && resendTimer > 0) {
      const interval = setInterval(
        () => setResendTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [resendTimer, step]);

  const handleVerifyOtp = () => {
    if (!/^\d{4,6}$/.test(otp)) return showMessage("Enter a valid OTP.");

    // Dummy logic
    if (mobile === "9999999999" && otp === "123456") {
      localStorage.setItem("authToken", "admin-token");
      localStorage.setItem("role", "admin");
      showMessage("Admin login successful!");
      setTimeout(() => navigate("/admin"), 1000);
    } else if (mobile === "8888888888" && otp === "654321") {
      localStorage.setItem("authToken", "user-token");
      localStorage.setItem("role", "user");
      showMessage("User login successful!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      showMessage("Invalid OTP or mobile number.");
    }
  };

  const handleClose = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    const handleEsc = (e) => e.keyCode === 27 && handleClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  return (
    <div className="login-wrapper" onClick={handleClose}>
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-login-button" onClick={handleClose}>
          &times;
        </button>
        <h2 className="login-title">Login / Register</h2>
        {step === 1 ? (
          <>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="login-input"
              maxLength={10}
            />
            <button onClick={handleSendOtp} className="login-button login-send">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="login-input"
              maxLength={6}
            />
            <button
              onClick={handleVerifyOtp}
              className="login-button login-verify"
            >
              Verify OTP
            </button>
            <button
              className="resend-button"
              onClick={handleSendOtp}
              disabled={resendTimer > 0}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
            </button>
          </>
        )}

        {/* Snackbar */}
        <div className={`snackbar ${showSnackbar ? "show" : ""}`}>
          {snackbarMsg}
        </div>
      </div>
    </div>
  );
};

export default Login;
