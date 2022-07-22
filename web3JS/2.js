// connect Remix IDE with Ganache
// Function call of smart contract
// set value in function

let Web3 = require('web3');   // import
let web3 = new Web3('HTTP://127.0.0.1:7545');    // connect to ganache

// create instance of deployed contract
var contractAddress = "0x7CA78243dEC8F2E7824C0b9dBaEB8C1Ca9176c94"
var abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


let contract = new web3.eth.Contract(abi, contractAddress)

let main = async function() {
    let val = await contract.methods.x().call();
    console.log(val);

    // set value of x to 100
    await contract.methods.set(100).send({from: "0x31113887DB1b5Fe58765B1d79318d06814E3877f"})   // we need to specify the sender account, because for transaction we need to pay some gas

    // updated value of x
    val = await contract.methods.x().call();
    console.log(val);

}

main()