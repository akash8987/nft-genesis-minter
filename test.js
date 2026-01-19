const { expect } = require("chai");
const hre = require("hardhat");

describe("GenesisNFT", function () {
  let nft, owner, buyer;
  const PRICE = hre.ethers.parseEther("0.05");

  beforeEach(async function () {
    [owner, buyer] = await hre.ethers.getSigners();
    const Contract = await hre.ethers.getContractFactory("GenesisNFT");
    nft = await Contract.deploy("Test", "TST", "ipfs://test/");
  });

  it("Should fail minting if sale is closed", async function () {
    await expect(
      nft.connect(buyer).mint(1, { value: PRICE })
    ).to.be.revertedWith("Sale is not active");
  });

  it("Should mint successfully after sale opens", async function () {
    await nft.toggleSale();
    await nft.connect(buyer).mint(2, { value: PRICE * 2n });
    expect(await nft.balanceOf(buyer.address)).to.equal(2);
  });

  it("Should respect wallet limits", async function () {
    await nft.toggleSale();
    await expect(
      nft.connect(buyer).mint(6, { value: PRICE * 6n })
    ).to.be.revertedWith("Wallet limit exceeded");
  });
});
