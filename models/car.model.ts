import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    make: String,
    model: String,
    year: Number,
    price: {
      type: Number,
      default: 0,
    },
    mileage: Number,
    color: String,
    fuelType: String,
    transmission: String,
    bodyType: String,
    seats: Number,
    description: String,
    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },
    featured: { type: Boolean, default: false },
    images: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Car = mongoose.models.cars || mongoose.model("cars", carSchema);

export default Car;
