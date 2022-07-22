// Transfers 0.025 ether from account1 to account2
const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider('https://kovan.infura.io/v3/a35479a7460b486d99e11b735e3b548c')

const account1 = '0x5d5326608be6a7D282118902291e67cb49BFE23F' // Your account address 1 (sender)
const account2 = '0x78D264a8d6d036844230D2f60BC2A341fc3b98A8' // Your account address 2 (receiver)

const privateKey1 = '2b10ff3978155f363253980fd6fa154d40fe2a1f2e838ae535486860f45f038b' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    // Show account1 balance before transfer
    // Show account2 balance before transfer
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    // Send ether
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.1")
    })

    // Wait for transaction to be mined
    await tx.wait()
    console.log(tx)

    // Show account1 balance before transfer
    // Show account2 balance before transfer
    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()