async function main() {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const contract = await Token.deploy();
    console.log("Token address:", contract.address);   // log the contract address
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  