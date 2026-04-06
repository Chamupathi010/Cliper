import mongoose from "mongoose";

const virRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      unique: true,
      trim: true
    },

    courseName: {
      type: String,
      required: true,
      trim: true
    },

    hall: {
      type: String,
      required: true,
      trim: true
    },

    sessionPin: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{4,6}$/, "Session pin must be 4 to 6 digits"]
    },

    answeringMode: {
      type: String,
      enum: ["verbal", "written", "hybrid"],
      default: "written"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  },
  { timestamps: true }
);

const VirRoom = mongoose.model("VirRoom", virRoomSchema);

export default VirRoom;