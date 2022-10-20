const { ethers } = require("hardhat");
const dotenv = require("dotenv");
const fs = require("fs");
const Suvery = require("../model/suverySchema");
const { connectDB } = require("../config/connectDB");
const mongoose = require("mongoose");
const { where } = require("../model/suverySchema");
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

  // listen for event
  vftContract.on("RequestFulfilled", async (requestId) => {
    responseTimestamp = await getCurrentTimestamp();
    console.log("requestId:", requestId);
    // update to database where requestId = requestId
    await Suvery.findOneAndUpdate(
      { requestId: requestId.toString() },
      {
        responseTimestamp: responseTimestamp,
      }
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function getCurrentTimestamp() {
  return (
    await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
  ).timestamp;
}
