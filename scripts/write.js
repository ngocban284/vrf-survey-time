const fs = require("fs");
const mongoose = require("mongoose");
const Suvery = require("../model/suverySchema");
const { connectDB } = require("../config/connectDB");
connectDB();

// get all results
async function getResults() {
  try {
    const results = await Suvery.find({});
    console.log("Results Fetch Successfully");
    await mongoose.disconnect();
    console.log("mongo connection dissconnected");
    return results;
  } catch (err) {
    console.error(err);
  }
}

getResults();
