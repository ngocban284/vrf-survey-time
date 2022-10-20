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

  for (let i = 0; i < transactionCount; i++) {
    // requestRandomWords
    requestTimestamp = await getCurrentTimestamp();
    await vftContract.connect(owner).requestRandomWords({ gasLimit: 1e7 });

    // wait 15s
    await new Promise((resolve) => setTimeout(resolve, 15000));

    let lastRequestId = await vftContract.lastRequestId();
    console.log("lastRequestId", lastRequestId.toString());
    // insert to database
    await Suvery.create({
      requestId: lastRequestId.toString(),
      requestTimestamp: requestTimestamp,
    });
  }

  await mongoose.disconnect();
  console.log("mongo connection disconnected");
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
