// Get transactions from block
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/a35479a7460b486d99e11b735e3b548c')

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()