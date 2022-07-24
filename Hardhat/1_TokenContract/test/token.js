const {expect} = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract", function() {
    it("Deployment should assign total supply of tokens to owner", async function() {
        const [owner] = await ethers.getSigners()
        //console.log("Signers object", owner)
        const Token = await ethers.getContractFactory("Token")
        const hardhatToken = await Token.deploy()
        const ownerBalance = await hardhatToken.balanceOf(owner.address)
        console.log("owner address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
    })

    it("Should transfer tokens between accounts", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners()
        const TokenContract = await ethers.getContractFactory("Token")
        const contract = await TokenContract.deploy()
        // Transfer 10 tokens from owner to account 1
        await contract.transfer(addr1.address, 10)
        expect(await contract.balanceOf(addr1.address)).to.equal(10)

        // Transfer 5 tokens addr1 to addr2
        await contract.connect(addr1).transfer(addr2.address, 5)
        expect(await contract.balanceOf(addr2.address)).to.equal(5)
    })
})