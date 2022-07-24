/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')

//const INFURA_API_KEY = "a35479a7460b486d99e11b735e3b548c"
//const KOVAN_PRIVATE_KEY = "2b10ff3978155f363253980fd6fa154d40fe2a1f2e838ae535486860f45f038b"
module.exports = {
  solidity: "0.8.9",
  networks: {
    kovan: {
      url: 'https://kovan.infura.io/v3/a35479a7460b486d99e11b735e3b548c',  // infura kovan testnet url 
      accounts: ['2b10ff3978155f363253980fd6fa154d40fe2a1f2e838ae535486860f45f038b']  // metamask account private key
    }
  }
};
