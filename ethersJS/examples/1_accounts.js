// Reads balance of ether of wallet address

const { ethers } = require('ethers');
const add = require('ipfs-api/src/files/add');
const INFURA_ID = 'a35479a7460b486d99e11b735e3b548c'
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/a35479a7460b486d99e11b735e3b548c')
const address = '0x1b3cB81E51011b549d78bf720b0d924ac763A7C2'

const main = async () => {
    let balance = await provider.getBalance(address)
    console.log(`\n Eth balance of ${address} --> ${ethers.utils.formatEther(balance)}ETH\n`)
}

main()
