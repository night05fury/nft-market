const fs = require('fs');

require('@nomiclabs/hardhat-waffle');
// Read the private key securely from a file named '.secret'
const privateKey = fs.readFileSync('.secret').toString().trim();
console,.log(privateKey);

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
     // Mumbai testnet for Polygon network ('mumbai')
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey],
    },

  },
  solidity: '0.8.4',
};

