import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyNFTCollection } from "../typechain-types";

describe("MyNFTCollection", function () {
  let tokenContract: MyNFTCollection;
  let tokenIds = [1, 2, 3];
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer,] = await ethers.getSigners();
    const tokenContractFactory = await ethers.getContractFactory("MyNFTCollection");
    tokenContract = await tokenContractFactory.deploy(tokenIds);
    await tokenContract.deployed();
  })

  it("deploys NFT collection", async () => {
    tokenIds.forEach(async (element) => {
      expect(await tokenContract.ownerOf(element)).to.eq(deployer.address);
      expect(await tokenContract.tokenURI(element)).to.eq(`http://localhost:3000/NFT_uri/${element}`);
    });
  });
});
