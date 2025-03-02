import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Set Mongoose strictQuery to suppress deprecation warning
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // Optionally exit if the database connection fails
    process.exit(1);
  }
};

export default connectDB;
