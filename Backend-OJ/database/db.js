import mongoose from "mongoose";
import "dotenv/config";
import "colors";

export const connectToDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${res.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`Error connecting to database: ${error}`.bgRed);
  }
};
