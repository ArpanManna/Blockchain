const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");

describe("Token Contract", function () {
  let Token;
  let contractInst;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    contractInst = await Token.deploy();
  });

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
        expect(await contractInst.owner()).to.equal(owner.address)
    })
    it("Should assign the total supply of tokens to owner", async function() {
        // first check if total supply is set to 10000 
        expect(await contractInst.totalSupply()).to.equal(10000)
        // now check if owner has 10000 tokens or not
        const ownerBalance = await contractInst.balanceOf(owner.address)
        expect(await contractInst.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe("Transactions", function() {
    it("Should transfer tokens between account", async function() {
        // transfer 100 tokens from owner to addr1
        await contractInst.transfer(addr1.address, 100)
        expect(await contractInst.balanceOf(addr1.address)).to.equal(100)

        // now transfer 50 tokens from addr1 to addr2
        await contractInst.connect(addr1).transfer(addr2.address, 50)
        expect(await contractInst.balanceOf(addr2.address)).to.equal(50)
        expect(await contractInst.balanceOf(addr1.address)).to.equal(50)
    })

    it("Should fail if sender does not have enough tokens", async function() {
        let initialOwnerBalance = await contractInst.balanceOf(owner.address)
        await expect(
             contractInst.connect(addr1).transfer(owner.address, 1) //initially - 0 tokens addr1
          ).to.be.revertedWith("Do not have enough tokens");
        expect(await contractInst.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })

    it("Should update balances after transfers", async function() {
        let initialOwnerBalance = await contractInst.balanceOf(owner.address)
        // transfer 500 token from owner to addr1 and 1000 token to addr2
        await contractInst.transfer(addr1.address, 500)
        await contractInst.transfer(addr2.address, 1000)
        
        let finalOwnerBalance = await contractInst.balanceOf(owner.address)
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - 1500)
        expect(await contractInst.balanceOf(addr1.address)).to.equal(500)
        expect(await contractInst.balanceOf(addr2.address)).to.equal(1000)
    })
  })



  
});