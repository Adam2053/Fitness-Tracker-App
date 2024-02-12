import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to database");
  } catch (error) {
    console.log(`Error while connecting to database ${error.message}`);
  }
};

export default connectDB;
