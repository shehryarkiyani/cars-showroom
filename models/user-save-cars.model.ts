import mongoose from "mongoose";

const userSavedCarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
      required: true,
    },
    savedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

userSavedCarSchema.index({ userId: 1, carId: 1 }, { unique: true });

const UserSavedCar =
  mongoose.models.UserSavedCar ||
  mongoose.model("UserSavedCar", userSavedCarSchema);

export default UserSavedCar;
