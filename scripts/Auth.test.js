const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

let vrfAddress;
let vftContract;
let owner;
let requestTimestamp;
let responseTimestamp;
let results = [];

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
  vftContract.on("RequestFulfilled", async (event) => {
    responseTimestamp = await getCurrentTimestamp();
    // request id
    let requestId = event.requestId;
    console.log("requestTimestamp", requestTimestamp);
    console.log("responseTimestamp", responseTimestamp);
    // add result to results object
    results.push({
      requestId: requestId,
      requestTimestamp: requestTimestamp,
      responseTimestamp: responseTimestamp,
      responseTime: responseTimestamp - requestTimestamp,
    });

    // improve this
    // write results to file
    // try {
    //   fs.writeFile("results.json", JSON.stringify(results), (err) => {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    // stop listener in this event
    vftContract.removeAllListeners("RequestFulfilled");
  });

  console.log("results", results);
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
