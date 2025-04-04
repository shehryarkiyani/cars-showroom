// models/WorkingHour.ts
import mongoose from "mongoose";

const workingHourSchema = new mongoose.Schema(
  {
    dealershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealershipinfo",
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
      required: true,
    },
    openTime: String, // HH:MM
    closeTime: String, // HH:MM
    isOpen: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const workingHoursModel =
  mongoose.models.WorkingHour ||
  mongoose.model("WorkingHour", workingHourSchema);

export default workingHoursModel;
