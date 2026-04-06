import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import virRoomRouter from "./routes/virRoomRoutes.js";
import lectureMessageRouter from "./routes/lectureMessageRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/rooms", virRoomRouter);
app.use("/api/messages", lectureMessageRouter);

app.get("/", (req, res) => {
  res.send("Cliper Backend is Running & DB Connected! 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📒 Server running on port ${PORT}`);
});