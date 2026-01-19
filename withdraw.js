const hre = require("hardhat");

async function main() {
    const CONTRACT_ADDRESS = "0x..."; // Replace
    const nft = await hre.ethers.getContractAt("GenesisNFT", CONTRACT_ADDRESS);

    const balance = await hre.ethers.provider.getBalance(CONTRACT_ADDRESS);
    console.log(`Contract Balance: ${hre.ethers.formatEther(balance)} ETH`);

    if (balance > 0) {
        console.log("Withdrawing funds...");
        const tx = await nft.withdraw();
        await tx.wait();
        console.log("Funds withdrawn to owner wallet.");
    } else {
        console.log("No funds to withdraw.");
    }
}

main().catch(console.error);
