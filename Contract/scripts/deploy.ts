import { ethers, Wallet } from "ethers";
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/NFTCollection.sol/MyNFTCollection.json"

async function main() {
  const wallet = getWallet();
  console.log(`Using address ${wallet.address}`);

  console.log("Deploying NFT Collection contract");
  const tokenContractFactory = getContractFactory(wallet);
  const tokenContract = await tokenContractFactory.deploy([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  await tokenContract.deployed();
  console.log(`Contract deployed at ${tokenContract.address}`);
}

function getWallet(): Wallet {
  return new ethers.Wallet(process.env.PRIVATE_KEY!);
}

function getContractFactory(wallet: Wallet) {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_PROJ_ID
  );
  const signer = wallet.connect(provider);
  return new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
