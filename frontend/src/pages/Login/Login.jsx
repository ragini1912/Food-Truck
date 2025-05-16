import React, { useState } from "react";
import api from "../../services/api";
import "./Login.css";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const requestOtp = async () => {
    try {
      const response = await api.post("/api/users/login/", {
        mobile_number: mobile,
      });
      if (response.status === 200) {
        setMessage("OTP sent successfully");
        setStep(2);
      }
    } catch (err) {
      setMessage("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await api.post("/api/users/verify/", {
        mobile_number: mobile,
        otp,
      });
      if (response.status === 200) {
        setMessage("Login successful");
        // Save token, redirect, etc.
      }
    } catch (err) {
      setMessage("Invalid OTP");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {step === 1 ? (
          <>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="login-input"
            />
            <button onClick={requestOtp} className="login-button login-send">
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
            />
            <button onClick={verifyOtp} className="login-button login-verify">
              Verify OTP
            </button>
          </>
        )}
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
