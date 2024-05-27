const express = require("express");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db is connected ${connect.connection.host}`);
  } catch (error) {
    throw Error("Couldn't connect to Db");
  }
};

module.exports = connectDb;
