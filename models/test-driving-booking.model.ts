// models/TestDriveBooking.ts
import mongoose from "mongoose";

const testDriveBookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookingDate: { type: Date, required: true },
    startTime: String, // HH:MM
    endTime: String, // HH:MM
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "PENDING",
    },
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TestDrivingBooking =
  mongoose.models.TestDriveBooking ||
  mongoose.model("TestDriveBooking", testDriveBookingSchema);

export default TestDrivingBooking;
