const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb atlas/compass url"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
}



module.exports = connectDB;
