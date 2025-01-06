// Import the Hardhat runtime environment
const hre = require('hardhat');

async function main() {
  // Get the contract factory for the NFTMarketplace contract
  // hre.ethers provides access to ethers.js functionality within Hardhat
  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');

  // Deploy the NFTMarketplace contract
  // This creates a new instance of the contract on the blockchain
  const nftMarketplace = await NFTMarketplace.deploy();

  // Wait for the contract to be deployed and confirmed on the blockchain
  await nftMarketplace.deployed();

  // Log the address of the deployed contract to the console
  console.log('Market deployed to:', nftMarketplace.address);
}


// Handle promises and exit the process accordingly
main()
  .then(() => process.exit(0)) // Exit with code 0 (success) if deployment is successful
  .catch((error) => {
    console.error(error); // Log any errors that occur during deployment
    process.exit(1); // Exit with code 1 (error) if deployment fails
  });