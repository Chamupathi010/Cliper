const QRCode = require("qrcode");
const mongoose = require("mongoose");
const ExcelJS = require("exceljs");

const AttendanceSession = require("../models/AttendanceSession");
const AttendanceRecord = require("../models/AttendanceRecord");

// 🔢 Generate session code
const generateSessionCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};



// 🟢 CREATE SESSION
exports.createAttendanceSession = async (req, res) => {
  try {
    const { title, subject, durationMinutes } = req.body;

    // 🔥 OPTIONAL: deactivate old sessions
    await AttendanceSession.updateMany(
      { lecturer: req.user.id },
      { isActive: false }
    );

    const sessionCode = generateSessionCode();

    const expiresAt = new Date(
      Date.now() + (durationMinutes || 10) * 60 * 1000
    );

    const session = await AttendanceSession.create({
      title,
      subject,
      lecturer: req.user.id,
      sessionCode,
      expiresAt,
      isActive: true,
    });

    const qrData = JSON.stringify({
      sessionCode: session.sessionCode,
    });

    const qrImage = await QRCode.toDataURL(qrData);

    res.status(201).json({
      message: "Attendance session created",
      session,
      qrImage,
    });

  } catch (error) {
    console.error("CREATE SESSION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔵 MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { sessionCode } = req.body;

    const session = await AttendanceSession.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 🔥 Check expiry automatically
    if (new Date() > session.expiresAt) {
      session.isActive = false;
      await session.save();

      return res.status(400).json({
        message: "Session expired",
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        message: "Session inactive",
      });
    }

    const record = await AttendanceRecord.create({
      session: session._id,
      student: req.user.id,
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      record,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    console.error("MARK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🟣 GET SESSION ATTENDANCE
exports.getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const records = await AttendanceRecord.find({
      session: sessionId,
    })
      .populate("student", "fullName email studentId")
      .sort({ createdAt: -1 });

    res.json(records);

  } catch (error) {
    console.error("GET SESSION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🆕 GET ALL SESSIONS (🔥 IMPORTANT FIX FOR YOUR ISSUE)
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await AttendanceSession.find({
      lecturer: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(sessions);

  } catch (error) {
    console.error("GET SESSIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// 📥 DOWNLOAD EXCEL
exports.downloadAttendanceExcel = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const records = await AttendanceRecord.find({ session: sessionId })
      .populate("student", "fullName email studentId");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Student ID", key: "studentId", width: 15 },
      { header: "Marked Time", key: "time", width: 25 },
    ];

    records.forEach((rec) => {
      worksheet.addRow({
        name: rec.student.fullName,
        email: rec.student.email,
        studentId: rec.student.studentId,
        time: new Date(rec.createdAt).toLocaleString(),
      });
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("EXCEL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};