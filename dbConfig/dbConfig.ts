import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = await mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongodb Connected");
    });
    connection.on("error", () => {
      console.log("Error while connecting db");
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong in connecting Db", err);
  }
}
