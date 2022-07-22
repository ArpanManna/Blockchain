// Deploys contract on Kovan testnet by using Factory contractconst { ethers } = require("ethers");
//  Transfers entire balance of token of your choosing from account1 to account2 (on Kovan testnet)
const { ethers } = require("ethers")

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider('https://kovan.infura.io/v3/a35479a7460b486d99e11b735e3b548c')

const account1 = '0x5d5326608be6a7D282118902291e67cb49BFE23F' // Your account address 1 (sender)
const account2 = '0x78D264a8d6d036844230D2f60BC2A341fc3b98A8' // Your account address 2 (receiver)

const privateKey1 = '2b10ff3978155f363253980fd6fa154d40fe2a1f2e838ae535486860f45f038b' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns(bool)"
];

const address = '0x7f245D795a0FeeF0e4387018d3B4dB6De8e191f7'
const contract = new ethers.Contract(address, ERC20_ABI, provider)
const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)

}

main()