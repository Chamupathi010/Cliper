const express = require("express");
const router = express.Router();

const {
  createAttendanceSession,
  markAttendance,
  getSessionAttendance,
  downloadAttendanceExcel,
  getMySessions, // ✅ NEW
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// 🟢 Create session (Lecturer/Admin)
router.post(
  "/create",
  protect,
  allowRoles("lecturer", "admin"),
  createAttendanceSession
);

// 🔵 Mark attendance (Student)
router.post(
  "/mark",
  protect,
  allowRoles("student"),
  markAttendance
);

// 🟣 Get all sessions of lecturer (🔥 IMPORTANT FIX)
router.get(
  "/my-sessions",
  protect,
  allowRoles("lecturer", "admin"),
  getMySessions
);

// 🟣 View attendance of a session
router.get(
  "/session/:sessionId",
  protect,
  allowRoles("lecturer", "admin"),
  getSessionAttendance
);

// 📥 Download Excel
router.get(
  "/session/:sessionId/excel",
  protect,
  allowRoles("lecturer", "admin"),
  downloadAttendanceExcel
);

module.exports = router;