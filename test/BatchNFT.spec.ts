/* eslint-disable */
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BatchNFT__factory } from "../typechain/factories/BatchNFT__factory";
import { BatchNFT } from "../typechain/BatchNFT";

describe('Batch NFT Tests', function() {
    it("should batch mint and transfer", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        // anyではなくstring？
        const receivers: string[] = [];
        for (let i = 0; i < 100; i++) {
            receivers.push((ethers.Wallet.createRandom().address));
        }

        const BatchNFT = (await ethers.getContractFactory("BatchNFT")) as BatchNFT__factory;
        const batchNFT = await BatchNFT.connect(owner).deploy();
        await batchNFT.deployed();
        console.log(batchNFT.address);

        await batchNFT.connect(owner).addWhiteListAddress(
            addr1.address
        );

        await batchNFT.connect(addr1).batchMintAndTransfer(
            addr2.address,
            receivers,
            "https.xxx.yyy.com",
        );
    });
});