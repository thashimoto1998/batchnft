/* eslint-disable */
import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const BatchNFT = await ethers.getContractFactory("BatchNFT");
    const batchNFT = await BatchNFT.deploy();
    console.log("receivers address:", batchNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });