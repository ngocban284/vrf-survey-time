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

async function main() {
  vrfAddress = process.env.VRF_ADDRESS;
  owner = await ethers.getSigner();

  // get contract at address
  vftContract = await ethers.getContractAt(
    "VRFv2DirectFundingConsumer",
    vrfAddress
  );

  console.log("vftContract", vftContract.address);
  // requestRandomWords

  let contractOwner = await vftContract.owner();
  console.log("contractOwner", contractOwner);
  console.log("owner", owner.address);

  requestTimestamp = await getCurrentTimestamp();
  await vftContract.connect(owner).requestRandomWords({ gasLimit: 1e7 });

  // listen for event
  vftContract.on("RequestFulfilled", async (requestId) => {
    responseTimestamp = await getCurrentTimestamp();
    // request id
    console.log("requestId:", requestId);
    console.log("requestTimestamp", requestTimestamp);
    console.log("responseTimestamp", responseTimestamp);

    // add result to results object
    await Suvery.create({
      requestId: requestId.toString(),
      requestTimestamp,
      responseTimestamp,
      responseTime: responseTimestamp - requestTimestamp,
    });

    vftContract.removeAllListeners("RequestFulfilled");
    // disconnect mongo
    await mongoose.disconnect();
    console.log("mongo connection dissconnected");
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
