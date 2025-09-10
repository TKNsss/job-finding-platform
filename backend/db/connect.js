import mongoose from "mongoose";

// mongoose.connect() returns a promise
const connectDB = (url) => {
  return mongoose.connect(url);
}

export default connectDB;   