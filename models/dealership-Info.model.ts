import mongoose from "mongoose";

const dealershipInfoSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Vehiql Motors" },
    address: { type: String, default: "69 Car Street, Autoville, CA 69420" },
    phone: { type: String, default: "+1 (555) 123-4567" },
    email: { type: String, default: "contact@vehiql.com" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const DealerShipInfo =
  mongoose.models.Dealershipinfo ||
  mongoose.model("Dealershipinfo", dealershipInfoSchema);

export default DealerShipInfo;
