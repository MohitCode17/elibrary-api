import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async () => {
  try {
    // REGISTER EVENT IF DB CONNECTED SUCCESS
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully !!");
    });

    // REGISTER EVENT IF DB CONNECTED BUT WITH ERROR
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    // TRY TO CONNECT WITH DB
    await mongoose.connect(config.dbURL as string);
  } catch (error) {
    console.log("Failed to connect with database", error);
    // STOP THE PROCESS WITH ERROR CODE 1.
    process.exit(1);
  }
};
