const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Disable Mongoose buffering to prevent request hang-ups
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Parses MongoDB connection string correctly
      useUnifiedTopology: true, // Uses new server discovery engine
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the server if connection fails
  }
};

module.exports = connectDB;
