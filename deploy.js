const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Configuration
  const NAME = "CyberPunks";
  const SYMBOL = "CPNK";
  const IPFS_URI = "ipfs://QmYourHashHere/";

  const Contract = await hre.ethers.getContractFactory("GenesisNFT");
  const nft = await Contract.deploy(NAME, SYMBOL, IPFS_URI);
  
  await nft.waitForDeployment();

  console.log(`Contract deployed to: ${nft.target}`);
  console.log(`Don't forget to update .env with this address!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
