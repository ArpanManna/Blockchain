// Generation of ABI and byte code
// Deploy the contract

solc = require('solc');
fs = require('fs');    // file system - to read and write files 
const { getContractAddress } = require('ethers/lib/utils');
let Web3 = require('web3');   // import web3 interface
let web3 = new Web3('HTTP://127.0.0.1:7545');    // connect to ganache

// read the contract file
let fileContent = fs.readFileSync("demo.sol").toString();
console.log(fileContent)


// create an input structure for my solidity compiler
var input = {
    language: "Solidity",
    sources: {
      "demo.sol": {
        content: fileContent,
      },
    },
  
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

// give input to the solc compiler and get the output
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output: ", output);

// generate abi and bytecode
ABI = output.contracts["demo.sol"]["demo"].abi;
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);
  
  
// Deploy the contract
let contract = new web3.eth.Contract(ABI)
let defaultAccount
// print all Ganache accounts
web3.eth.getAccounts().then(function(accounts) {
    defaultAccount = accounts[0];
    console.log("Default Account:", defaultAccount);  //to deploy the contract from default Account
    contract
      .deploy({ data: bytecode })
      .send({ from: defaultAccount, gas: 470000 })
      .on('receipt', function(receipt) { 
          //event,transactions,contract address will be returned by blockchain
        console.log("Contract Address:", receipt.contractAddress);
      })
      .then(function(demoContract) {
        demoContract.methods.x().call((err, data) => {
          console.log("Initial Value:", data);
        })
      })
})

