//https://eth-rinkeby.alchemyapi.io/v2/ETPrz7JhlMF9nh5FsSrAdhEDl5em1Q59
require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    Rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/ETPrz7JhlMF9nh5FsSrAdhEDl5em1Q59",
      accounts: ['4de82ca54c3fb77939e63c8b4c4fcd83c18bc5c7a4612bbcc6819299004b1c86']
    }
  }
};
