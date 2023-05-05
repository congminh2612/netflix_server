import mongoose from "mongoose";

export const mongooseConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log("MongoDB connected successfully");
  }
};
