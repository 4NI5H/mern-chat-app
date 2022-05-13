const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database connection successful : ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error while connecting database: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
