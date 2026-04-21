const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// 🔐 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// 🔢 Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 🟢 REGISTER USER + SEND OTP EMAIL
exports.registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { fullName, email, password, role, studentId, department, year } =
      req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User already exists" });
      }

      // if user exists but not verified, regenerate OTP and resend
      const newOtp = generateOtp();

      existingUser.otp = newOtp;
      existingUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
      await existingUser.save();

      await sendEmail(
        email,
        "Verify Your Email - OTP Code",
        `Your OTP code is ${newOtp}`
      );

      return res.status(200).json({
        message:
          "Account already exists but is not verified. A new OTP has been sent to your email.",
        email: existingUser.email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      studentId,
      department,
      year,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 mins
      isVerified: false,
    });

    // 📧 Send OTP Email
    await sendEmail(
      email,
      "Verify Your Email - OTP Code",
      `Your OTP code is ${otp}`
    );

    console.log("✅ OTP email sent to:", email);

    res.status(201).json({
      message: "Registered successfully. Please verify OTP sent to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟡 VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "Account already verified" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟠 RESEND OTP
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const otp = generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    await sendEmail(
      email,
      "Resend OTP - Email Verification",
      `Your new OTP code is ${otp}`
    );

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔵 LOGIN USER (BLOCK IF NOT VERIFIED)
exports.loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ❌ BLOCK LOGIN IF NOT VERIFIED
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        department: user.department,
        year: user.year,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟣 GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};