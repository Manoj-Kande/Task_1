const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://2210030472:2210030472@cluster0.hrp4gzh.mongodb.net/task_1"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}



module.exports = connectDB;
