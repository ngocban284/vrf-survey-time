const { ethers } = require("hardhat");
const dotenv = require("dotenv");
const fs = require("fs");
const Suvery = require("../model/suverySchema");
const { connectDB } = require("../config/connectDB");
const mongoose = require("mongoose");
dotenv.config();
connectDB();

let vrfAddress;
let vftContract;
let owner;
let requestTimestamp;
let responseTimestamp;
const transactionCount = 1000;

async function main() {
  vrfAddress = process.env.VRF_ADDRESS;
  owner = await ethers.getSigner();

  // get contract at address
  vftContract = await ethers.getContractAt(
    "VRFv2DirectFundingConsumer",
    vrfAddress
  );

  let count = 3;

  // listen for event
  vftContract.on("RequestFulfilled", async (requestId) => {
    responseTimestamp = await getCurrentTimestamp();

    // update to database
    await Suvery.findOneAndUpdate(
      { requestId: requestId.toString() },
      { responseTimestamp, responseTime: responseTimestamp - requestTimestamp }
    );

    count--;
    if (count == 0) {
      vftContract.removeAllListeners("RequestFulfilled");
      // disconnect mongo
      await mongoose.disconnect();
      console.log("mongo connection dissconnected");
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// disconnect db
mongoose.disconnect();

async function getCurrentTimestamp() {
  return (
    await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
  ).timestamp;
}
