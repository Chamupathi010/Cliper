const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// 🔐 Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔑 OTP Verification
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// 👤 Profile
router.get("/profile", protect, getProfile);

module.exports = router;