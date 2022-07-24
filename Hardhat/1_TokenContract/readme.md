# Token Contract
Create a Token contract, write tests and deply it on Kovan Testnet using INFURA

## Technology Stack & Tools

- Javascript (Writing scripts)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Node.js](https://nodejs.org/en/) (To run our scripts and install ethers.js)
- [Infura](https://infura.io/) (Node provider)
- [Hardhat](https://hardhat.org/) (for testing and deployment)
- [Mocha and Chai] (testing contract)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
$ npm install
```

## Run scripts

### Modify hardhat.config.js
- Input your infura project URL and API key (KOVAN testnet)
- Input your KOVAN wallet private key
```
$ npx hardhat run scripts/deploy.js --network kovan
```
