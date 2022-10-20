const fs = require("fs");
const mongoose = require("mongoose");
const Suvery = require("../model/suverySchema");
const { connectDB } = require("../config/connectDB");
connectDB();

// get all results
async function getResults() {
  // wait 5s
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("now");
}

getResults();
