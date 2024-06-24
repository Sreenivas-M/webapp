const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url, {})
    .then((res) => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
