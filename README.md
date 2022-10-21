# VRF SUVERY TIME

This is a time statistics application that returns a random number of the vrf contract on the blockchain binance smart chain network.

## Contract :

- VRFv2DirectFundingConsumer.sol : This is a contract that provides a function to find random numbers based on chainlink

## Call transaction and listen event to calculate response time :

#

#### scripts folder:

- Request.js : get the contract address and make a call to a large number of transactions and save the requestId in mongoDB
- Listen.js : get the contract address and listen to the event that generates a random number and then update the response time into mongodb. However, terminating the listening must be done manually.

## Schema :

- requestId : last requestId of smart contract
- requestTimeStamp : timestamp when calling random number function
- responseTimestamp : timestamp when event was heard

## scatterplot analyst

Get data from mongodb for scatterplot analyst

<img width="570" alt="Ảnh chụp Màn hình 2022-10-21 lúc 09 43 35" src="https://user-images.githubusercontent.com/92626813/197101836-6301f500-b27d-4ce9-9aa0-bb1ffd0518b1.png">

### Build With

- [![Solidity][solidity.org]][solidity-url]
- [![Javascript][javascript.com]][javascript-url]
- [![MongoDB][mongodb.com]][mongodb-url]
- [![Python][python]][python-url]
- [![Hardhat][hardhat.org]][hardhat-url]
- [![Git][gitscm.com]][git-url]
- [![Github][github.com]][github-url]

### Installation

1. Clone the repo

```sh
    https://github.com/ngocban284/vrf-survey-time.git
```

2. Install NPM packages

```sh
    npm install
```

3. You must enter your Environment variables

```sh
    VRF_ADDRESS = vrf contract address in bsc testnet
    MONGO_URI = your mongodb uri
```

4. Request and Listen event

```sh
    npx hardhat run ./scripts/Request.js --network bscTestnet
```

```sh
    npx hardhat run ./scripts/Listen.js --network bscTestnet
```

5. scatterplot analyst

```sh
    python3 ./analysis/index.py
```

### Note

You must make sure vrf contract has LINK token and your wallet address must have BNB testnet

[solidity.org]: https://img.shields.io/badge/solidity-%23007ACC.svg?style=for-the-badge&logo=solidity&logoColor=white&color=grey
[solidity-url]: https://docs.soliditylang.org/en/v0.8.17/
[javascript.com]: https://img.shields.io/badge/Javascript-%23E0234E.svg?style=for-the-badge&logo=Javascript&logoColor=white&color=yellow
[javascript-url]: https://www.javascript.com/
[mongodb.com]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[python]: https://img.shields.io/badge/Python-black?style=for-the-badge&logo=Python&badgeColor=010101&color=blue&logoColor=white
[python-url]: https://www.python.org/
[hardhat.org]: https://img.shields.io/badge/Hardhat-4B3263?style=for-the-badge&logo=Hardhat&logoColor=white&color=yellow
[hardhat-url]: https://hardhat.org/
[gitscm.com]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[github.com]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/
