const express = require("express");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db is connected ${connect.connection.host}`);
  } catch (error) {
    throw new error("Couldn't connect to Db");
  }
};

module.exports = connectDb;
